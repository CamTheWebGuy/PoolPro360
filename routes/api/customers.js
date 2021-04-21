const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');

const nodemailer = require('nodemailer');
const nodemailMailgun = require('nodemailer-mailgun-transport');
const moment = require('moment');

const Customer = require('../../models/Customer');
const ServiceNotes = require('../../models/ServiceNotes');
const Activity = require('../../models/Activity');
const User = require('../../models/User');
const Route = require('../../models/Routes');

const axios = require('axios');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');
// const { findOneAndDelete } = require('../../models/Customer');
const { Service } = require('aws-sdk');
const WorkOrders = require('../../models/WorkOrders');

const Stripe = require('stripe');

const stripe = Stripe(config.get('stripe_sk'));

aws.config.update({
  secretAccessKey: config.get('aws_secret_key'),
  accessKeyId: config.get('aws_access_key'),
  region: 'us-west-2'
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'poolpro360',
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, req.s3Key);
    }
  })
});

const singleFileUpload = upload.single('image');

const uploadToS3 = (req, res) => {
  req.s3Key = uuidv4();
  let downloadUrl = `https://s3-us-west-2.amazonaws.com/poolpro360/${req.s3Key}`;
  return new Promise((resolve, reject) => {
    return singleFileUpload(req, res, err => {
      if (err) return reject(err);
      return resolve(downloadUrl);
    });
  });
};

// const deleteImageS3 = s3Object => {
//   s3.deleteObject(
//     {
//       bucket: 'poolpro360',
//       key: `${s3Object}`
//     },
//     (err, data) => {
//       if (err) {
//         console.log(err);
//         return res.status(500).send(err);
//       } else {
//         console.log(data);
//         return res.status(200).send('File deleted');
//       }
//     }
//   );
// };

// @route    POST api/customers
// @desc     Add Customer
// @access   Private/User
router.post(
  '/',
  [
    auth,
    [
      check('firstName', 'First name is required')
        .not()
        .isEmpty()
        .trim()
        .escape(),
      check('lastName', 'Last name is required')
        .not()
        .isEmpty()
        .trim()
        .escape(),
      check('email', 'Email is required')
        .isEmail()
        .normalizeEmail()
        .trim()
        .escape(),
      check('serviceAddress', 'Service Address is required')
        .not()
        .isEmpty()
        .trim()
        .escape(),
      check('serviceState', 'Service State is required')
        .not()
        .isEmpty()
        .trim()
        .escape(),
      check('serviceZip', 'Service State is required')
        .not()
        .isEmpty()
        .trim()
        .escape(),
      check('poolType', 'Pool Type is required')
        .not()
        .isEmpty()
        .trim()
        .escape()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      mobilePhone,
      email,
      canText,
      poolType,
      serviceAddress,
      serviceCity,
      serviceState,
      serviceZip,
      gateCode,
      serviceDay,
      serviceFrequency,
      dogName,
      rate,
      rateType,
      servicePackageAndRate,
      technician,
      billingSame,
      billingType,
      paymentMethod,
      billingAddress,
      billingCity,
      billingState,
      billingZip
    } = req.body;

    try {
      const existingCustomer = await Customer.find({
        user: req.user.id,
        email: email
      });

      if (existingCustomer.length >= 1) {
        return res.status(409).json({
          errors: [{ msg: 'Error: Customer with this email already exists' }]
        });
      }

      let technicianId = technician;
      let technicianName = null;
      if (technician === 'N/A') {
        technicianId = null;
      } else {
        const tech = await User.findById(technician);
        technicianName = tech.firstName + ' ' + tech.lastName;
      }

      const serviceQuery =
        serviceAddress.replace(/\s/g, '+') +
        ',+' +
        serviceCity.replace(/\s/g, '+') +
        ',+' +
        serviceState.replace(/\s/g, '+') +
        ',+' +
        serviceZip;

      // console.log(serviceQuery);

      const result = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${serviceQuery}&key=${config.get(
          'google_api_key'
        )}`
      );

      // console.log(result.data);

      // console.log(result.data.results[0].geometry.location);
      const serviceLng = result.data.results[0].geometry.location.lng;
      const serviceLat = result.data.results[0].geometry.location.lat;

      // await customer.save();

      const user = await User.findById(req.user.id);

      let stripeCustomer = await stripe.customers.create(
        {
          description: 'Pro360 Customer',
          email: email,
          name: firstName + ' ' + lastName
        },
        {
          stripeAccount: user.stripe_account_id
        }
      );

      let customer = new Customer({
        user: req.user.id,
        stripeCustomerId: stripeCustomer.id,
        name: { first: firstName, last: lastName },
        firstName,
        lastName,
        email,
        mobilePhone,
        serviceLng,
        serviceLat,
        serviceAddress,
        serviceCity,
        serviceState,
        serviceZip,
        scheduledDay: serviceDay,
        frequency: serviceFrequency,
        serviceRate: rate,
        rateType,
        dogName,
        gateCode,
        canText,
        poolType,
        technician: technicianId,
        technicianName,
        servicePackageAndRate,
        billingSame,
        billingType,
        paymentMethod,
        billingAddress,
        billingCity,
        billingState,
        billingZip
      });

      await customer.save();

      res.json({ customer });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/customers
// @desc     Get Users Customers
// @access   Private/User
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (user.role !== 'Owner' && user.role !== 'Admin') {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    if (user.role === 'Owner') {
      const customer = await Customer.find({ user: req.user.id });
      return res.json(customer);
    }

    if (user.role === 'Admin') {
      const customer = await Customer.find({ user: user.owner });
      return res.json(customer);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/customers/emailSettings
// @desc     Get Email Settings
// @access   Private/User
router.get('/emailSettings', auth, async (req, res) => {
  try {
    // Search for User Making Request in DB
    const user = await User.findOne({
      $or: [
        { _id: req.user.id, role: 'Admin', owner: req.user.owner },
        { _id: req.user.id, role: 'Owner' }
      ]
    });

    // If no user found, return error
    if (!user) {
      return res.status(401).json({ msg: 'User not found or not authorized' });
    }

    // If user making request is a Admin, then check to get their owners ID. Then fetch owner information and make changes to the owner.
    if (user.role === 'Admin') {
      const owner = User.findOne({ _id: req.user.owner, role: 'Owner' });

      // If no user found, return error
      if (!owner) {
        return res.status(404).json({ msg: 'User not found' });
      }

      return res.status(200).json(owner.emailSettings);
    }

    if (user.role === 'Owner') {
      return res.status(200).json(user.emailSettings);
    }
  } catch (err) {
    console.log(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    GET api/customers/:id
// @desc     Get a Customer
// @access   Private/User
router.get('/:id', auth, async (req, res) => {
  try {
    // Search for User Making Request in DB
    const user = await User.findOne({
      $or: [
        { _id: req.user.id, role: 'Admin', owner: req.user.owner },
        { _id: req.user.id, role: 'Owner' }
      ]
    });

    const customer = await Customer.find({
      user: user.role === 'Owner' ? req.user.id : user.owner,
      _id: req.params.id
    });

    if (!customer) {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }

    res.json({ customer });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/customers/:customerId/uploadImage
// @desc     Save a Image to Customer
// @access   Private/User
router.post('/:customerId/uploadImage', auth, async (req, res) => {
  try {
    const customer = await Customer.findOne({
      user: req.user.id,
      _id: req.params.customerId
    });

    if (!customer) {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }

    const downloadUrl = await uploadToS3(req, res);

    const newImage = {
      url: downloadUrl
    };

    customer.images = customer.images || [];

    await customer.images.push(newImage);

    await customer.save();

    res.json(customer.images);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/customers/:customerId/deleteImage
// @desc     Delete Image from Customer
// @access   Private/User
router.post('/:customerId/deleteImage', auth, async (req, res) => {
  try {
    const customer = await Customer.findOne({
      user: req.user.id,
      _id: req.params.customerId
    });

    if (!customer) {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }

    const { objectId, s3Object } = req.body;

    await s3.deleteObject(
      {
        Bucket: 'poolpro360',
        Key: `${s3Object}`
      },
      async (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        } else {
          try {
            await Customer.updateOne(
              { _id: req.params.customerId },
              { $pull: { images: { _id: objectId } } }
            );
          } catch (err) {
            console.log(err);
          }
          return res.status(200).send('File deleted');
        }
      }
    );
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PATCH api/customers/:customerId/serviceRate
// @desc     Update Customer Service Rate
// @access   Private/User
router.patch('/:customerId/serviceRate', auth, async (req, res) => {
  const { rate } = req.body;
  try {
    // Get user making request
    const user = await User.findOne({
      $or: [
        { _id: req.user.id, role: 'Admin', owner: req.user.owner },
        { _id: req.user.id, role: 'Owner' }
      ]
    });

    // Make sure the user making request exists
    if (!user) {
      return res.status(404).json({ msg: 'User not found or Not Authorized' });
    }

    let owner = null;
    let isOwner = null;

    if (user.role === 'Owner') {
      isOwner = true;
    } else {
      isOwner = false;
      owner = await User.findOne({
        _id: user.owner,
        role: 'Owner'
      });
    }

    const customer = await Customer.findOne({
      user: isOwner ? user._id : owner._id,
      _id: req.params.customerId
    });

    if (!customer) {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }

    customer.serviceRate = rate;

    await customer.save();

    res.status(200).json({ msg: 'Updated Customer Service Rate' });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/customers/:customerId/serviceNote/add
// @desc     Add a Service Note to a Customer
// @access   Private/User
router.post(
  '/:customerId/serviceNote/add',
  [
    auth,
    [
      check('content', 'Content is required for a service note')
        .not()
        .isEmpty()
        .trim()
        .escape()
    ]
  ],
  async (req, res) => {
    try {
      const customer = await Customer.findOne({
        user: req.user.id,
        _id: req.params.customerId
      });

      if (!customer) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Customer not found' }] });
      }

      const { showDuringVisit, content } = req.body;

      let serviceNote = new ServiceNotes({
        showDuringVisit,
        content,
        customer: req.params.customerId,
        user: req.user.id,
        dateAdded: Date.now()
      });

      await serviceNote.save();

      res.status(200).json(serviceNote);
    } catch (err) {
      console.log(err.message);
      if (err.kind === 'ObjectId') {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Customer not found' }] });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/customers/:customerId/serviceNotes
// @desc     Get All a Customers Service Notes
// @access   Private/User
router.get('/:customerId/serviceNotes', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const customer = await Customer.findOne({
      _id: req.params.customerId
    });

    if (user.role === 'Admin' || user.role === 'Technician') {
      if (customer.user.toString() !== user.owner.toString()) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    } else if (user.role === 'Owner') {
      if (user._id.toString() !== customer.user.toString()) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    }

    const notes = await ServiceNotes.find({
      customer: req.params.customerId
    }).sort({
      dateAdded: -1
    });

    res.status(200).json(notes);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/customers/:customerId/serviceNotes/:noteId
// @desc     Delete Service Note by ID
// @access   Private/User
router.delete('/:customerId/serviceNotes/:noteId', auth, async (req, res) => {
  try {
    // await serviceNotes.findOneAndDelete({
    //   _id: req.params.noteId,
    //   customer: req.params.customerId
    // });

    const note = await ServiceNotes.findById(req.params.noteId);

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    if (note.customer.toString() !== req.params.customerId) {
      return res
        .status(401)
        .json({ msg: 'A note with this ID does not belong to this customer' });
    }

    await note.remove();

    res.status(200).json({ msg: 'Note Removed' });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PATCH api/customers/:customerId/serviceNotes/:noteId
// @desc     Update Service Note by ID
// @access   Private/User
router.patch('/:customerId/serviceNotes/:noteId', auth, async (req, res) => {
  const { content, showDuringVisit } = req.body;
  try {
    const note = await ServiceNotes.findById(req.params.noteId);

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    if (note.customer.toString() !== req.params.customerId) {
      return res
        .status(401)
        .json({ msg: 'A note with this ID does not belong to this customer' });
    }

    note.content = content;
    note.showDuringVisit = showDuringVisit;
    note.lastUpdated = Date.now();

    await note.save();

    res.status(200).json({ msg: 'Note Updated' });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/customers/:customerId/recentActivity/add
// @desc     Log Recent Activity to a Customer
// @access   Private/User
router.post(
  '/:customerId/recentActivity/add',
  [
    auth,
    [
      check('comments')
        .trim()
        .escape(),
      check('log')
        .trim()
        .escape(),
      check('type')
        .trim()
        .escape()
    ]
  ],
  async (req, res) => {
    try {
      const user = await User.find({
        $or: [
          { _id: req.user.id, role: 'Admin', owner: req.user.owner },
          { _id: req.user.id, role: 'Owner' },
          { _id: req.user.id, role: 'Technician', owner: req.user.owner }
        ]
      });

      const customer = await Customer.findOne({
        user:
          user.role === 'Technician' || user.role === 'Admin'
            ? req.user.owner
            : req.user.id,
        _id: req.params.customerId
      });

      if (!customer) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Customer not found' }] });
      }

      if (user.role === 'Admin' || user.role === 'Technician') {
        if (customer.user.toString() !== user.owner.toString()) {
          return res.status(401).json({ msg: 'User not authorized' });
        }
      } else if (user.role === 'Owner') {
        if (user._id.toString() !== customer.user.toString()) {
          return res.status(401).json({ msg: 'User not authorized' });
        }
      }

      const { comments, log, type, icon } = req.body;

      let activity = new Activity({
        comments,
        log,
        type,
        icon,
        customer: req.params.customerId,
        user:
          user.role === 'Technician' || user.role === 'Admin'
            ? req.user.owner
            : req.user.id,
        creator: req.user.id,
        dateAdded: Date.now()
      });

      await activity.save();

      res.status(200).json(activity);
    } catch (err) {
      console.log(err.message);
      if (err.kind === 'ObjectId') {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Customer not found' }] });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route    PATCH api/customers/recentActivity/edit/:activityId
// @desc     Update Activity Images by ID
// @access   Private/User
router.patch('/recentActivity/edit/:activityId', auth, async (req, res) => {
  const user = await User.findById(req.user.id);

  const activity = await Activity.findById(req.params.activityId);

  try {
    // Permissions Check
    if (user.role === 'Admin' || user.role === 'Technician') {
      if (activity.user.toString() !== user.owner.toString()) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    } else if (user.role === 'Owner') {
      if (user._id.toString() !== activity.user.toString()) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    }

    const downloadUrl = await uploadToS3(req, res);

    const newImage = {
      url: downloadUrl
    };

    activity.images = activity.images || [];

    await activity.images.push(newImage);

    activity.save();

    res.status(200).json({ msg: 'Activity Updated' });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    GET api/customers/:customerId/recentActivity/
// @desc     Get All a Customers Recent Activity
// @access   Private/User
router.get('/:customerId/recentActivity', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const customer = await Customer.findOne({
      _id: req.params.customerId
    });

    if (user.role === 'Admin' || user.role === 'Technician') {
      if (customer.user.toString() !== user.owner.toString()) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    } else if (user.role === 'Owner') {
      if (user._id.toString() !== customer.user.toString()) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    }

    const activities = await Activity.find({
      customer: req.params.customerId
    })
      .sort({ dateAdded: -1 })
      .populate('customer');

    res.status(200).json(activities);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/customers/:customerId/recentActivity/:id
// @desc     Delete Activity by ID
// @access   Private/User
router.delete('/:customerId/recentActivity/:id', auth, async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    if (activity.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    if (activity.customer.toString() !== req.params.customerId) {
      return res
        .status(401)
        .json({ msg: 'A log with this ID does not belong to this customer' });
    }

    await activity.remove();

    res.status(200).json({ msg: 'Activity Log Removed' });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/customers/:customerId/checklist/add
// @desc     Add Item to Service Checklist
// @access   Private/User
router.post('/:customerId/checklist/add', auth, async (req, res) => {
  try {
    const customer = await Customer.findOne({
      user: req.user.id,
      _id: req.params.customerId
    });

    if (!customer) {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }

    const { item } = req.body;

    const newItem = {
      item
    };

    await customer.serviceChecklist.push(newItem);

    await customer.save();

    res.json(customer.serviceChecklist);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    GET api/customers/:customerId/checklist/
// @desc     Get a Customers Service Checklist
// @access   Private/User
router.get('/:customerId/checklist', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const customer = await Customer.findOne({
      _id: req.params.customerId
    });

    if (user.role === 'Admin' || user.role === 'Technician') {
      if (customer.user.toString() !== user.owner.toString()) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    } else if (user.role === 'Owner') {
      if (user._id.toString() !== customer.user.toString()) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    }

    res.status(200).json(customer.serviceChecklist);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PATCH api/customers/:customerId/checklist
// @desc     Update Customer Checklist
// @access   Private/User
router.patch('/:customerId/checklist', auth, async (req, res) => {
  const { list } = req.body;
  try {
    const customer = await Customer.findById(req.params.customerId);

    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    if (customer.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    customer.serviceChecklist = list;

    await customer.save();

    res.status(200).json(customer.serviceChecklist);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PATCH api/customers/:customerId/billing
// @desc     Update Customer Billing Information
// @access   Private/User
router.patch('/:customerId/billing', auth, async (req, res) => {
  const {
    billingSame,
    billingType,
    billingAddress,
    billingCity,
    billingState,
    billingZip
  } = req.body;

  try {
    const customer = await Customer.findById(req.params.customerId);

    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    if (customer.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    (customer.billingSame = billingSame), (customer.billingType = billingType);
    customer.billingAddress = billingAddress;
    (customer.billingCity = billingCity),
      (customer.billingState = billingState),
      (customer.billingZip = billingZip);

    await customer.save();

    res.status(200).json(customer);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PATCH api/customers/:customerId/equipment
// @desc     Update Customer Equipment
// @access   Private/User
router.patch('/:customerId/equipment', auth, async (req, res) => {
  const {
    poolType,
    poolGallons,
    bodiesOfWater,
    pumpMake,
    pumpModel,
    filterMake,
    filterModel,
    heaterMake,
    heaterModel,
    cleanerMake,
    cleanerModel,
    itemList
  } = req.body;

  try {
    const customer = await Customer.findById(req.params.customerId);

    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    if (customer.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    customer.poolEquipment.poolType = poolType;
    customer.poolEquipment.poolGallons = poolGallons;
    customer.poolEquipment.bodiesOfWater = bodiesOfWater;
    customer.poolEquipment.pumpModel = pumpModel;
    customer.poolEquipment.pumpMake = pumpMake;
    customer.poolEquipment.filterMake = filterMake;
    customer.poolEquipment.filterModel = filterModel;
    customer.poolEquipment.heaterMake = heaterMake;
    customer.poolEquipment.heaterModel = heaterModel;
    customer.poolEquipment.cleanerMake = cleanerMake;
    customer.poolEquipment.cleanerModel = cleanerModel;

    // customer.poolEquipment.other = itemList;

    customer.poolEquipment.other.push(...itemList);

    await customer.save();

    res.status(200).json(customer);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/customers/:customerId/equipment/:id
// @desc     Delete Activity by ID
// @access   Private/User
router.delete('/:customerId/equipment/:id', auth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId);

    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    if (customer.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const itemIndex = customer.poolEquipment.other.findIndex(
      item => item._id == `${req.params.id}`
    );
    const newData = [
      ...customer.poolEquipment.other.slice(0, itemIndex),
      ...customer.poolEquipment.other.slice(itemIndex + 1)
    ];

    customer.poolEquipment.other = newData;

    await customer.save();

    res.status(200).json({ msg: 'Item Removed' });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PATCH api/customers/:customerId/information
// @desc     Update Customer Information
// @access   Private/User
router.patch('/:customerId/information', auth, async (req, res) => {
  const {
    firstName,
    lastName,
    mobilePhone,
    email,
    canText,
    altPhone,
    serviceAddress,
    serviceCity,
    serviceState,
    serviceZip,
    gateCode,
    servicePackageAndRate,
    technician
  } = req.body;

  try {
    const customer = await Customer.findById(req.params.customerId);
    const tech = await User.findById(technician);

    const technicianName = tech.firstName + ' ' + tech.lastName;

    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    if (customer.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    (customer.firstName = firstName),
      (customer.lastName = lastName),
      (customer.mobilePhone = mobilePhone),
      (customer.mobilePhone = mobilePhone),
      (customer.canText = canText),
      (customer.altPhone = altPhone),
      (customer.serviceAddress = serviceAddress),
      (customer.serviceCity = serviceCity),
      (customer.serviceState = serviceState),
      (customer.serviceZip = serviceZip),
      (customer.email = email),
      (customer.gateCode = gateCode),
      (customer.servicePackageAndRate = servicePackageAndRate),
      (customer.technician = technician),
      (customer.technicianName = technicianName);
    await customer.save();

    res.status(200).json(customer);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    GET api/customers/employee/:employeeId
// @desc     Get a Employee's Customers
// @access   Private/User
router.get('/employee/:employeeId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const customers = await Customer.find({
      technician: req.params.employeeId,
      $or: [{ user: req.user.id }, { user: user.owner }]
    });

    if (!customers) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.status(200).json(customers);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PATCH api/customers/:customerId/schedule
// @desc     Set Customer Schedule
// @access   Private/User
router.patch('/:customerId/schedule/:techId', auth, async (req, res) => {
  const { day } = req.body;
  try {
    const customer = await Customer.findById(req.params.customerId);
    const user = await User.findById(req.user.id);
    const route = await Route.findOne({
      technician: req.params.techId,
      day: day
    });

    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    if (
      customer.user.toString() !== req.user.id &&
      user.role !== 'Admin' &&
      user.owner !== customer.user
    ) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    route.customers.push({ customer: req.params.customerId });

    customer.isScheduled = true;
    customer.scheduledDay = day;

    await customer.save();
    await route.save();

    res.status(200).json(customer);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'User not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PATCH api/customers/:customerId/unschedule
// @desc     Unschedule Customer From Route
// @access   Private/User
router.patch('/:customerId/unschedule', auth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId);
    const user = await User.findById(req.user.id);
    let route = await Route.findOne({
      'customers.customer': req.params.customerId
    });

    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    if (customer.user.toString() !== req.user.id && user.role !== 'Admin') {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    if (user.role === 'Admin' && user.owner !== customer.user.toString()) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    customer.isScheduled = false;
    customer.scheduledDay = null;

    const index = route.customers.findIndex(
      e => e.customer == req.params.customerId
    );

    route.customers.splice(index, 1);

    await route.save();
    await customer.save();

    res.status(200).json(customer);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'User not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PATCH api/customers/route/:techId
// @desc     Update a Route
// @access   Private/User
router.patch('/route/:techId', auth, async (req, res) => {
  const { day, routeList } = req.body;

  try {
    const user = await User.findById(req.params.techId);
    let route = await Route.findOne({
      technician: req.params.techId,
      day: day
    });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (req.user.role !== 'Admin' && req.user.role !== 'Owner') {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    if (req.user.role === 'Admin' && req.user.owner !== user.owner) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    if (!route) {
      return res
        .status(500)
        .send(
          'Error: No Route Found. Please contact support or use /api/customers/route/:techId/:day to create a new route.'
        );
    }

    for (var i = 0; i < routeList.length; i++) {
      route.customers[i].customer = routeList[i]._id;
    }

    route.save();
    return res.status(200).json(route);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    GET api/customers/route/:techId/:day
// @desc     Get a Employee's Route by Day
// @access   Private/User
router.get('/route/:techId/:day', auth, async (req, res) => {
  try {
    let route = await Route.findOne({
      technician: req.params.techId,
      day: req.params.day
    })
      .populate({ path: 'customers.customer' })
      .populate('technician');

    const today = moment().startOf('day');

    const orders = await WorkOrders.find({
      technician: req.params.techId,
      $or: [
        { status: 'Approved' },
        {
          status: 'Completed',
          completedOn: {
            $gte: today.toDate(),
            $lte: moment(today)
              .endOf('day')
              .toDate()
          }
        }
      ]
      // status: 'Approved'
      // $or: [{ scheduledDate: null }, { scheduledDate: undefined }]
    }).populate('customer');

    const user = await User.findOne({
      $or: [
        { _id: req.user.id, role: 'Admin', owner: req.user.owner },
        { _id: req.user.id, role: 'Owner' },
        { _id: req.user.id, role: 'Technician', owner: req.user.owner }
      ]
    });

    if (!user || user === undefined || user.length === 0) {
      return res.status(401).json({ msg: 'User not found or not authorized' });
    }

    if (!route) {
      route = new Route({
        technician: req.params.techId,
        day: req.params.day,
        customers: []
      });

      await route.save();

      return res.status(201).json(route.customers);
    }

    if (user.role === 'Technician' || user.role === 'Admin') {
      if (
        route.technician._id.toString() !== user._id.toString() &&
        route.technician._id.toString() !== user.owner
      ) {
        return res
          .status(401)
          .json({ msg: 'User not found or not authorized' });
      }
    } else {
      if (route.technician._id.toString() !== user._id.toString()) {
        return res
          .status(401)
          .json({ msg: 'User not found or not authorized' });
      }
    }

    let filteredCustomers = route.customers.filter(e => {
      const frequency = e.customer.frequency;

      if (
        e.customer.stripeSubscriptionStatus === 'Paused' ||
        e.customer.stripeSubscriptionStatus === 'Canceled'
      ) {
        return;
      }

      if (
        frequency === 'Weekly' ||
        frequency === '' ||
        frequency === undefined ||
        frequency === null
      ) {
        return e;
      } else if (frequency === 'Bi-Weekly (Every 2 Weeks)') {
        const difference = moment(Date.now()).diff(
          moment(e.customer.lastServiced),
          'days'
        );

        if (difference >= 14 || difference === 0) {
          return e;
        }
      }

      if (frequency === 'Tri-Weekly (Every 3 Weeks)') {
        const difference = moment(Date.now()).diff(
          moment(e.customer.lastServiced),
          'days'
        );

        if (difference >= 21 || difference === 0) {
          return e;
        }
      }

      if (frequency === 'Monthly (Every 4 Weeks)') {
        const difference = moment(Date.now()).diff(
          moment(e.customer.lastServiced),
          'days'
        );

        if (difference >= 28 || difference === 0) {
          return e;
        }
      }
    });

    // console.log(filteredCustomers);

    // const insert = (arr, index, ...newItems) => [
    //   ...arr.slice(0, index),
    //   ...newItems,
    //   ...arr.slice(index)
    // ];

    orders.map(e => {
      let index = filteredCustomers.findIndex(
        customer =>
          customer.customer._id.toString() === e.customer._id.toString() &&
          customer.type !== 'Work Order'
      );

      if (
        moment(e.scheduledDate).isSame(Date.now(), 'day') &&
        filteredCustomers.find(
          customer =>
            customer.customer._id.toString() === e.customer._id.toString()
        )
      ) {
        const newCustomer = {
          customer: e.customer,
          type: 'Work Order',
          status: e.status,
          _id: e._id,
          scheduledDate: e.scheduledDate
        };

        // filteredCustomers = insert(filteredCustomers, index, newCustomer);

        filteredCustomers.splice(index + 1, 0, newCustomer);
      } else {
        if (moment(e.scheduledDate).isSame(Date.now(), 'day')) {
          const newCustomer = {
            customer: e.customer,
            type: 'Work Order',
            status: e.status,
            _id: e._id,
            scheduledDate: e.scheduledDate
          };
          filteredCustomers.push(newCustomer);
        }
      }
    });

    // orders.map(e => {
    //   // console.log(
    //   //   filteredCustomers.filter(
    //   //     c => c.customer._id.toString() === e.customer._id.toString()
    //   //   )
    //   // );
    //   if (
    //     e.technician.toString() === e.customer.technician.toString() &&
    //     moment(e.customer.scheduledDay).isSame(Date.now(), 'day')
    //   ) {
    //     // filteredCustomers.filter(
    //     //   c => c.customer._id.toString() === e.customer._id.toString()
    //     // ).length >= 1
    //     return;
    //   } else {
    //     if (moment(e.scheduledDate).isSame(Date.now(), 'day')) {
    //       if (
    //         filteredCustomers.find(
    //           customer =>
    //             customer.customer._id.toString() === e.customer._id.toString()
    //         )
    //       ) {
    //         const index = filteredCustomers.findIndex(
    //           customer =>
    //             customer.customer._id.toString() ===
    //               e.customer._id.toString() && customer.type !== 'Work Order'
    //         );

    //         // console.log(index, filteredCustomers);

    //         const newCustomer = {
    //           customer: e.customer,
    //           type: 'Work Order',
    //           status: e.status
    //         };

    //         filteredCustomers.splice(index, 0, newCustomer);
    //       } else {
    //         const newCustomer = {
    //           customer: e.customer,
    //           type: 'Work Order',
    //           status: e.status
    //         };
    //         filteredCustomers.push(newCustomer);
    //       }
    //     }
    //   }
    // });

    res.status(200).json(filteredCustomers);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    GET api/customers/route/builder/:techId/:day
// @desc     Get a Employee's Route by Day (Route Builder)
// @access   Private/User
router.get('/route/builder/:techId/:day', auth, async (req, res) => {
  try {
    let route = await Route.findOne({
      technician: req.params.techId,
      day: req.params.day
    })
      .populate({ path: 'customers.customer' })
      .populate('technician');

    const user = await User.findOne({
      $or: [
        { _id: req.user.id, role: 'Admin', owner: req.user.owner },
        { _id: req.user.id, role: 'Owner' },
        { _id: req.user.id, role: 'Technician', owner: req.user.owner }
      ]
    });

    if (!user || user === undefined || user.length === 0) {
      return res.status(401).json({ msg: 'User not found or not authorized' });
    }

    if (!route) {
      route = new Route({
        technician: req.params.techId,
        day: req.params.day,
        customers: []
      });

      await route.save();

      return res.status(201).json(route.customers);
    }

    if (user.role === 'Technician' || user.role === 'Admin') {
      if (
        route.technician._id.toString() !== user._id.toString() &&
        route.technician._id.toString() !== user.owner
      ) {
        return res
          .status(401)
          .json({ msg: 'User not found or not authorized' });
      }
    } else {
      const tech = await User.findById(req.params.techId);
      if (
        route.technician._id.toString() !== user._id.toString() &&
        tech.owner.toString() !== user._id.toString()
      ) {
        return res
          .status(401)
          .json({ msg: 'User not found or not authorized' });
      }
    }

    let filteredCustomers = route.customers.filter(e => {
      const frequency = e.customer.frequency;

      if (
        frequency === 'Weekly' ||
        frequency === '' ||
        frequency === undefined ||
        frequency === null
      ) {
        return e;
      } else if (frequency === 'Bi-Weekly (Every 2 Weeks)') {
        const difference = moment(Date.now()).diff(
          moment(e.customer.lastServiced),
          'days'
        );

        if (difference >= 14 || difference === 0) {
          return e;
        }
      }

      if (frequency === 'Tri-Weekly (Every 3 Weeks)') {
        const difference = moment(Date.now()).diff(
          moment(e.customer.lastServiced),
          'days'
        );

        if (difference >= 21 || difference === 0) {
          return e;
        }
      }

      if (frequency === 'Monthly (Every 4 Weeks)') {
        const difference = moment(Date.now()).diff(
          moment(e.customer.lastServiced),
          'days'
        );

        if (difference >= 28 || difference === 0) {
          return e;
        }
      }
    });

    // console.log(filteredCustomers);

    res.status(200).json(filteredCustomers);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/customers/route/optimize/:techId/:day
// @desc     Optimize a technicians route
// @access   Private/User
router.post('/route/optimize/:techId/:day', auth, async (req, res) => {
  //console.log(req.body);

  const routeList = req.body;

  const body = {
    vehicles: [
      {
        vehicle_id: 'my_vehicle',
        start_address: {
          location_id: 'Start Location',
          lon: parseFloat(routeList[0].serviceLng),
          lat: parseFloat(routeList[0].serviceLat)
        },
        return_to_depot: false
      }
    ],
    services: routeList.map((customer, index) => ({
      id: customer._id,
      name: customer.firstName + '_' + customer.lastName,
      address: {
        location_id: customer.firstName + ' ' + customer.lastName,
        lon: parseFloat(customer.serviceLng),
        lat: parseFloat(customer.serviceLat)
      },
      duration: 900
    }))
  };

  const jsonBody = JSON.stringify(body);

  try {
    let route = await Route.findOne({
      technician: req.params.techId,
      day: req.params.day
    });
    const user = await User.find({
      $or: [
        { _id: req.user.id, role: 'Admin', owner: req.user.owner },
        { _id: req.user.id, role: 'Owner' }
      ]
    });
    const tech = await User.find({ _id: req.params.techId });
    if (!user) {
      return res.status(401).json({ msg: 'User not found or not authorized' });
    }
    if (user.role === 'Admin') {
      if (tech.owner !== user.owner) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    } else if (user.role === 'Owner') {
      if (user._id !== tech.owner) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    }
    const result = await axios.post(
      `https://graphhopper.com/api/1/vrp?key=${config.get(
        'graphhopper_api_key'
      )}`,
      jsonBody,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const resultRoute = result.data.solution.routes[0].activities;

    for (var i = 0; i < route.customers.length; i++) {
      route.customers[i].customer = resultRoute[i + 1].id;
    }

    route.isOptimized = true;

    route.save();

    return res.status(200).json(route);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PATCH api/customers/frequency/:customerId/:freq
// @desc     Set Customer Service Frequency
// @access   Private/User
router.patch('/frequency/:customerId/:freq', auth, async (req, res) => {
  try {
    const user = await User.find({
      $or: [
        { _id: req.user.id, role: 'Admin', owner: req.user.owner },
        { _id: req.user.id, role: 'Owner' }
      ]
    });

    const customer = await Customer.findById(req.params.customerId);

    if (!user) {
      return res.status(401).json({ msg: 'User not found or not authorized' });
    }
    if (user.role === 'Admin') {
      if (customer.owner !== user.owner) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    } else if (user.role === 'Owner') {
      if (user._id !== customer.owner) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    }

    customer.frequency = req.params.freq;

    customer.save();

    return res.status(200).json(customer);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PATCH api/customers/:customerId/tech/:techId
// @desc     Update Customer Tech (Route Builder)
// @access   Private/User
router.patch('/:customerId/tech/:techId', auth, async (req, res) => {
  try {
    const user = await User.find({
      $or: [
        { _id: req.user.id, role: 'Admin', owner: req.user.owner },
        { _id: req.user.id, role: 'Owner' }
      ]
    });

    const customer = await Customer.findById(req.params.customerId);

    if (!user) {
      return res.status(401).json({ msg: 'User not found or not authorized' });
    }
    if (user.role === 'Admin') {
      if (customer.user.toString() !== user.owner.toString()) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    } else if (user.role === 'Owner') {
      if (user._id.toString() !== customer.user.toString()) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    }

    const tech = await User.findById(req.params.techId);

    if (!tech) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (escape(tech.owner) !== escape(customer.user)) {
      if (tech.role !== 'Owner') {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    }

    if (tech.role === 'Owner') {
      if (customer.user.toString() !== tech._id.toString()) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    }

    customer.technician = tech._id;
    customer.technicianName = tech.firstName + ' ' + tech.lastName;
    customer.isScheduled = false;
    customer.scheduledDay = null;

    await customer.save();

    return res.status(200).json(customer);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/customers/route/complete/:customerId
// @desc     Mark Customer as Serviced
// @access   Private/Technicians
router.post('/route/complete/:customerId', auth, async (req, res) => {
  const {
    names,
    totalChlorine,
    freeChlorine,
    pHlevel,
    alkalinity,
    conditionerLevel,
    hardness,
    phosphateLevel,
    saltLevel,
    chlorineTablets,
    liquidChlorine,
    liquidAcid,
    triChlor,
    diChlor,
    calHypo,
    potassiumMono,
    ammonia,
    copperBased,
    polyQuat,
    copperBlend,
    sodaAsh,
    CalciumChloride,
    conditioner,
    sodiumBicar,
    diatomaceous,
    diatomaceousAlt,
    sodiumBro,
    dryAcid,
    clarifier,
    phosphateRemover,
    salt,
    enzymes,
    metalSequester,
    bromineGran,
    bromineTab,
    poolFlocc,
    borate,
    privateNote,
    publicNote,
    repairOrder,
    repairType,
    repairNotify,
    repairDescription,
    repairOfficeNote
  } = req.body;

  try {
    const user = await User.findOne({
      $or: [
        { _id: req.user.id, role: 'Admin', owner: req.user.owner },
        { _id: req.user.id, role: 'Owner' },
        { _id: req.user.id, role: 'Technician', owner: req.user.owner }
      ]
    });

    if (!user) {
      return res.status(401).json({ msg: 'User not found or not authorized' });
    }

    let customer = await Customer.findById({ _id: req.params.customerId });

    if (user.role === 'Admin' || user.role === 'Technician') {
      if (customer.user.toString() !== user.owner.toString()) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    } else if (user.role === 'Owner') {
      if (user._id.toString() !== customer.user.toString()) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    }

    let activity = new Activity({
      comments: 'Service Stop Completed',
      log: 'Service',
      type: '',
      icon: 'check-circle',
      customer: req.params.customerId,
      creator: req.user.id,
      user:
        user.role === 'Technician' || user.role === 'Admin'
          ? user.owner
          : req.user.id,
      dateAdded: Date.now(),
      noteToCustomer: publicNote,
      serviceLog: {
        totalChlorine,
        freeChlorine,
        pHlevel,
        alkalinity,
        conditionerLevel,
        hardness,
        phosphateLevel,
        saltLevel,
        chlorineTablets,
        liquidChlorine,
        liquidAcid,
        triChlor,
        diChlor,
        calHypo,
        potassiumMono,
        ammonia,
        copperBased,
        polyQuat,
        copperBlend,
        sodaAsh,
        CalciumChloride,
        conditioner,
        sodiumBicar,
        diatomaceous,
        diatomaceousAlt,
        sodiumBro,
        dryAcid,
        clarifier,
        phosphateRemover,
        salt,
        enzymes,
        metalSequester,
        bromineGran,
        bromineTab,
        poolFlocc,
        borate,
        checkList: names
      }
    });

    if (privateNote) {
      let serviceNote = new ServiceNotes({
        showDuringVisit: false,
        content: privateNote,
        customer: req.params.customerId,
        user:
          user.role === 'Admin' || user.role === 'Technician'
            ? user.owner
            : user._id,
        dateAdded: Date.now()
      });

      await serviceNote.save();
    }

    let repairStatus = null;
    if (repairType.includes('Requires Part Purchase')) {
      repairStatus = 'Approval Needed';
    } else if (repairType.includes('Future Repair')) {
      repairStatus = 'Assigned';
    } else if (repairType.includes('Repair Completed')) {
      repairStatus = 'Completed';
    } else {
      return;
    }

    if (repairOrder) {
      let workOrder = new WorkOrders({
        method: 'Manual',
        orderType: 'Equipment Repair',
        status: repairStatus,
        description: repairDescription,
        creator: user._id,
        customer: req.params.customerId,
        officeNote: repairOfficeNote,
        technicianName: user.firstName + ' ' + user.lastName,
        owner:
          user.role === 'Admin' || user.role === 'Technician'
            ? user.owner
            : user._id,
        notifyCustomer: repairNotify
      });

      await workOrder.save();

      if (repairNotify === true) {
        let isOwner = null;

        if (user.role !== 'Owner') {
          isOwner = false;
        } else {
          isOwner = true;
        }

        let owner = null;

        if (isOwner === false) {
          owner = await User.findOne({ _id: user.owner, role: 'Owner' });
        }

        // Nodemailer Auth
        const auth = {
          auth: {
            api_key: config.get('mailgun_api_key'),
            domain: config.get('mailgun_domain')
          }
        };

        // Nodemailer Transporter
        let transporter = nodemailer.createTransport(nodemailMailgun(auth));

        // Mail Options
        const mailOptions = {
          from: `${
            isOwner
              ? user.businessInfo.businessName
              : owner.businessInfo.businessName
          } <no-reply@poolpro360.com>`,
          to: 'cameronanchondo@gmail.com',
          replyTo: isOwner ? user.email : owner.email,
          subject: `${
            repairType === 'Repair Completed'
              ? 'A Repair Was Completed On Your Pool'
              : 'A Repair Request Has Been Submitted.'
          }`,
          template: 'repairorder',
          'h:X-Mailgun-Variables': JSON.stringify({
            firstName: customer.firstName,
            businessName: isOwner
              ? user.businessInfo.businessName
              : owner.businessInfo.businessName,
            businessEmail: isOwner
              ? user.businessInfo.businessEmail
              : owner.businessInfo.businessEmail,
            businessAddress: isOwner
              ? user.businessInfo.businessAddress
              : owner.businessInfo.businessAddress,
            businessPhone: isOwner
              ? user.businessInfo.businessPhone
              : owner.businessInfo.businessPhone,
            businessLogo: isOwner
              ? user.businessInfo.businessLogo
              : owner.businessInfo.businessLogo,
            description: repairDescription,
            heading:
              repairType === 'Repair Completed'
                ? `We've Completed a Repair On Your Pool!`
                : `We've Submitted a Repair Order!`,
            info:
              repairType === 'Repair Completed'
                ? `One of our technicians noticed an issue with your pool while servicing it and was able to repair it for you today.`
                : `One of our technicians noticed an issue with your pool while servicing it and wasn't able to repair it today. We have submitted a repair request for a future repair.`
          })
        };

        // Send Email
        transporter.sendMail(mailOptions, (err, data) => {
          if (err) {
            return console.log('Error: ', err);
          } else {
            console.log('Repair Message has been sent');
          }
        });
      }
    }

    customer.lastServiced = Date.now();
    await activity.save();
    await customer.save();

    return res.status(200).json(activity);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/customers/route/unableservice/:customerId
// @desc     Mark as Unable to Service
// @access   Private/Technicians
router.post('/route/unableservice/:customerId', auth, async (req, res) => {
  const { message } = req.body;

  try {
    const user = await User.findOne({
      $or: [
        { _id: req.user.id, role: 'Admin', owner: req.user.owner },
        { _id: req.user.id, role: 'Owner' },
        { _id: req.user.id, role: 'Technician', owner: req.user.owner }
      ]
    });

    if (!user) {
      return res.status(401).json({ msg: 'User not found or not authorized' });
    }

    let customer = await Customer.findById({ _id: req.params.customerId });

    if (user.role === 'Admin' || user.role === 'Technician') {
      if (customer.user.toString() !== user.owner.toString()) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    } else if (user.role === 'Owner') {
      if (user._id.toString() !== customer.user.toString()) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    }

    let activity = new Activity({
      comments: `Unable to Service | ${message}`,
      log: 'Service',
      type: '',
      icon: 'check-circle',
      customer: req.params.customerId,
      creator: req.user.id,
      user:
        user.role === 'Technician' || user.role === 'Admin'
          ? user.owner
          : req.user.id,
      dateAdded: Date.now()
    });

    // Set Customer Unable to Service Node
    customer.unableService = Date.now();

    await customer.save();
    await activity.save();

    // Nodemailer Auth
    const auth = {
      auth: {
        api_key: config.get('mailgun_api_key'),
        domain: config.get('mailgun_domain')
      }
    };

    let isOwner = null;

    if (user.role !== 'Owner') {
      isOwner = false;
    } else {
      isOwner = true;
    }

    let owner = null;

    if (isOwner === false) {
      owner = await User.findOne({ _id: user.owner, role: 'Owner' });
    }

    if (
      (isOwner && user.emailSettings.emailSendUnable) ||
      (!isOwner && owner.emailSettings.emailSendUnable)
    ) {
      // Nodemailer Transporter
      let transporter = nodemailer.createTransport(nodemailMailgun(auth));

      // Mail Options
      const mailOptions = {
        from: `${
          isOwner
            ? user.businessInfo.businessName
            : owner.businessInfo.businessName
        } <no-reply@poolpro360.com>`,
        to: 'cameronanchondo@gmail.com',
        replyTo: isOwner ? user.email : owner.email,
        subject: `Unable To Service Your Pool`,
        template: 'unableservice',
        'h:X-Mailgun-Variables': JSON.stringify({
          firstName: customer.firstName,
          businessName: isOwner
            ? user.businessInfo.businessName
            : owner.businessInfo.businessName,
          businessEmail: isOwner
            ? user.businessInfo.businessEmail
            : owner.businessInfo.businessEmail,
          businessAddress: isOwner
            ? user.businessInfo.businessAddress
            : owner.businessInfo.businessAddress,
          businessPhone: isOwner
            ? user.businessInfo.businessPhone
            : owner.businessInfo.businessPhone,
          businessLogo: isOwner
            ? user.businessInfo.businessLogo
            : owner.businessInfo.businessLogo,
          message: message
        })
      };

      // Send Email
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          return console.log('Error: ', err);
        } else {
          console.log('Message has been sent');
        }
      });
    }

    return res.status(200).json(activity);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/customers/servicereport/:customerId/:activityId
// @desc     Email Customer Service Report by ID
// @access   Private/User
router.post(
  '/servicereport/:customerId/:activityId',
  auth,
  async (req, res) => {
    try {
      // Search for User making request in DB
      const user = await User.findOne({
        $or: [
          { _id: req.user.id, role: 'Admin', owner: req.user.owner },
          { _id: req.user.id, role: 'Owner' },
          { _id: req.user.id, role: 'Technician', owner: req.user.owner }
        ]
      });

      // If no user found, return error
      if (!user) {
        return res
          .status(401)
          .json({ msg: 'User not found or not authorized' });
      }

      let isOwner = null;

      if (user.role !== 'Owner') {
        isOwner = false;
      } else {
        isOwner = true;
      }

      // Search for Customer in DB
      let customer = await Customer.findById({ _id: req.params.customerId });

      // Permissions Check
      if (user.role === 'Admin' || user.role === 'Technician') {
        if (customer.user.toString() !== user.owner.toString()) {
          return res.status(401).json({ msg: 'User not authorized' });
        }
      } else if (user.role === 'Owner') {
        if (user._id.toString() !== customer.user.toString()) {
          return res.status(401).json({ msg: 'User not authorized' });
        }
      }

      let owner = null;

      if (isOwner === false) {
        owner = await User.findOne({ _id: user.owner, role: 'Owner' });
      }

      // Get Activity Log
      const activity = await Activity.findOne({
        _id: req.params.activityId,
        customer: customer._id
      });

      // If no user found, return error
      if (!activity) {
        return res.status(401).json({ msg: 'Not found or not authorized' });
      }

      // Calculate Chlorine Level
      let freeChlorine = '';
      let fcColor = '';
      // The values are stored as strings, we are convering them back into numbers so we can run the calculations
      const fcNumber = parseInt(activity.serviceLog.freeChlorine);

      const readingNumbers = isOwner
        ? user.emailSettings.emailShowReadingNumbers
        : owner.emailSettings.emailShowReadingNumbers;

      if (readingNumbers === true) {
        freeChlorine = parseInt(activity.serviceLog.freeChlorine);
        fcColor = '2dc26b';
      } else {
        if (fcNumber >= 2.0 && fcNumber <= 4.0) {
          freeChlorine = 'Average';
          fcColor = '2dc26b';
        } else if (fcNumber < 2.0) {
          freeChlorine = 'Below Average';
          fcColor = 'df4c43';
        } else if (fcNumber > 4.0) {
          freeChlorine = 'Above Average';
          fcColor = 'e67e23';
        }
      }

      // Calculate PH Level
      let ph = '';
      let phColor = '';
      const phNumber = parseInt(activity.serviceLog.pHlevel);

      if (readingNumbers === true) {
        ph = parseInt(activity.serviceLog.pHlevel);
        phColor = '2dc26b';
      } else {
        if (phNumber >= 7.4 && phNumber <= 7.6) {
          ph = 'Average';
          phColor = '2dc26b';
        } else if (phNumber < 7.4) {
          ph = 'Below Average';
          phColor = 'df4c43';
        } else if (phNumber > 7.6) {
          ph = 'Above Average';
          phColor = 'e67e23';
        }
      }

      // Calculate Alkalinity
      let alk = '';
      let alkColor = '';
      const alkNumber = parseInt(activity.serviceLog.alkalinity);

      if (readingNumbers === true) {
        alk = parseInt(activity.serviceLog.alkalinity);
        alkColor = '2dc26b';
      } else {
        if (alkNumber >= 100 && alkNumber <= 150) {
          alk = 'Average';
          alkColor = '2dc26b';
        } else if (alkNumber < 100) {
          alk = 'Below Average';
          alkColor = 'df4c43';
        } else if (alkNumber > 150) {
          alk = 'Above Average';
          alkColor = 'e67e23';
        }
      }

      // Calculate Conditoner
      let conditioner = '';
      let conditionerColor = '';
      const conditionerNumber = parseInt(activity.serviceLog.conditionerLevel);

      if (readingNumbers === true) {
        conditioner = parseInt(activity.serviceLog.conditionerLevel);
        conditionerColor = '2dc26b';
      } else {
        if (conditionerNumber >= 40 && conditionerNumber <= 100) {
          conditioner = 'Average';
          conditionerColor = '2dc26b';
        } else if (conditionerNumber < 40) {
          conditioner = 'Below Average';
          conditionerColor = 'df4c43';
        } else if (conditionerNumber > 100) {
          conditioner = 'Above Average';
          conditionerColor = 'e67e23';
        }
      }

      // Calculate Hardness
      let hardness = '';
      let hardnessColor = '';
      const hardnessNumber = parseInt(activity.serviceLog.hardness);

      if (readingNumbers === true) {
        hardness = parseInt(activity.serviceLog.hardness);
        hardnessColor = '2dc26b';
      } else {
        if (hardnessNumber >= 180 && hardnessNumber <= 220) {
          hardness = 'Average';
          hardnessColor = '2dc26b';
        } else if (hardnessNumber < 180) {
          hardness = 'Below Average';
          hardnessColor = 'df4c43';
        } else if (hardnessNumber > 220) {
          hardness = 'Above Average';
          hardnessColor = 'e67e23';
        }
      }

      // Calculate Phosphate
      let phosphate = '';
      let phosphateColor = '';
      const phosphateNumber = parseInt(activity.serviceLog.phosphateLevel);

      if (readingNumbers === true) {
        phosphate = parseInt(activity.serviceLog.phosphateLevel);
        phosphateColor = '2dc26b';
      } else {
        if (phosphateNumber >= 100 && phosphateNumber <= 125) {
          phosphate = 'Average';
          phosphateColor = '2dc26b';
        } else if (phosphateNumber < 100) {
          phosphate = 'Below Average';
          phosphateColor = 'df4c43';
        } else if (phosphateNumber > 125) {
          phosphate = 'Above Average';
          phosphateColor = 'e67e23';
        }
      }

      // Calculate Salt Level
      let salt = '';
      let saltColor = '';
      const saltNumber = parseInt(activity.serviceLog.saltLevel);

      if (readingNumbers === true) {
        salt = parseInt(activity.serviceLog.saltLevel);
        saltColor = '2dc26b';
      } else {
        if (saltNumber >= 2700 && saltNumber <= 3400) {
          salt = 'Average';
          saltColor = '2dc26b';
        } else if (saltNumber < 2700) {
          salt = 'Below Average';
          saltColor = 'df4c43';
        } else if (saltNumber > 3400) {
          salt = 'Above Average';
          saltColor = 'e67e23';
        }
      }

      // Get Images URLs
      let imageArray = [];
      const images = activity.images;
      images.map(image => imageArray.push(image.url));

      // Nodemailer Auth
      const auth = {
        auth: {
          api_key: config.get('mailgun_api_key'),
          domain: config.get('mailgun_domain')
        }
      };

      // Nodemailer Transporter
      let transporter = nodemailer.createTransport(nodemailMailgun(auth));

      // Mail Options
      const mailOptions = {
        from: `${
          isOwner
            ? user.businessInfo.businessName
            : owner.businessInfo.businessName
        } <no-reply@poolpro360.com>`,
        to: 'cameronanchondo@gmail.com',
        replyTo: isOwner ? user.email : owner.email,
        subject: `Pool Service Report for ${moment(activity.dateAdded).format(
          'MM/DD/YYYY'
        )}`,
        template: 'service',
        'h:X-Mailgun-Variables': JSON.stringify({
          sendServiceChecklist: isOwner
            ? user.emailSettings.emailSendChecklist
            : owner.emailSettings.emailSendChecklist,
          sendChemicalReadings: isOwner
            ? user.emailSettings.emailSendReadings
            : owner.emailSettings.emailSendReadings,
          sendChemicalsUsed: isOwner
            ? user.emailSettings.emailShowChemicalsUsed
            : owner.emailSettings.emailShowChemicalsUsed,
          sendTechnician: isOwner
            ? user.emailSettings.emailShowTechnician
            : owner.emailSettings.emailShowTechnician,
          technician: customer.technicianName,
          firstName: customer.firstName,
          businessName: isOwner
            ? user.businessInfo.businessName
            : owner.businessInfo.businessName,
          businessEmail: isOwner
            ? user.businessInfo.businessEmail
            : owner.businessInfo.businessEmail,
          businessAddress: isOwner
            ? user.businessInfo.businessAddress
            : owner.businessInfo.businessAddress,
          businessPhone: isOwner
            ? user.businessInfo.businessPhone
            : owner.businessInfo.businessPhone,
          businessLogo: isOwner
            ? user.businessInfo.businessLogo
            : owner.businessInfo.businessLogo,
          showFreeChlorine: isOwner
            ? user.emailSettings.emailSendFreeChlorine
            : owner.emailSettings.emailSendFreeChlorine,
          fchlorine: freeChlorine,
          fchlorcolor: '2dc26b',
          showPH: isOwner
            ? user.emailSettings.emailSendpHlevel
            : owner.emailSettings.emailSendpHlevel,
          phBalance: ph,
          phcolor: phColor,
          showAlk: isOwner
            ? user.emailSettings.emailSendAlkalinity
            : owner.emailSettings.emailSendAlkalinity,
          alkalinity: alk,
          alkcolor: alkColor,
          showConditioner: isOwner
            ? user.emailSettings.emailSendConditioner
            : owner.emailSettings.emailSendConditioner,
          conditioner: conditioner,
          conditionerColor: conditionerColor,
          showHardnesss: isOwner
            ? user.emailSettings.emailSendHardness
            : owner.emailSettings.emailSendHardness,
          hardness: hardness,
          hardnessColor: hardnessColor,
          showPhosphate: isOwner
            ? user.emailSettings.emailSendPhosphateLevel
            : owner.emailSettings.emailSendPhosphateLevel,
          phosphate: phosphate,
          phosphateColor: phosphateColor,
          showSalt: isOwner
            ? user.emailSettings.emailSendSaltLevel
            : owner.emailSettings.emailSendSaltLevel,
          salt: salt,
          saltColor: saltColor,

          chlorineTablets: activity.serviceLog.chlorineTablets,
          liquidChlorine: activity.serviceLog.liquidChlorine,
          liquidAcid: activity.serviceLog.liquidAcid,
          triChlor: activity.serviceLog.triChlor,
          diChlor: activity.serviceLog.diChlor,
          calHypo: activity.serviceLog.calHypo,
          potassiumMono: activity.serviceLog.potassiumMono,
          ammonia: activity.serviceLog.ammonia,

          copperBased: activity.serviceLog.copperBased,
          polyQuat: activity.serviceLog.polyQuat,
          copperBlend: activity.serviceLog.copperBlend,
          sodaAsh: activity.serviceLog.sodaAsh,
          CalciumChloride: activity.serviceLog.CalciumChloride,
          conditioner: activity.serviceLog.conditioner,
          sodiumBicar: activity.serviceLog.sodiumBicar,
          diatomaceous: activity.serviceLog.diatomaceous,

          diatomaceousAlt: activity.serviceLog.diatomaceousAlt,
          sodiumBro: activity.serviceLog.sodiumBro,
          dryAcid: activity.serviceLog.dryAcid,
          clarifier: activity.serviceLog.clarifier,
          phosphateRemover: activity.serviceLog.phosphateRemover,
          salt: activity.serviceLog.salt,
          enzymes: activity.serviceLog.enzymes,
          metalSequester: activity.serviceLog.metalSequester,

          bromineGran: activity.serviceLog.bromineGran,
          bromineTab: activity.serviceLog.bromineTab,
          poolFlocc: activity.serviceLog.poolFlocc,
          borate: activity.serviceLog.borate,

          images: imageArray,
          serviceAddress: customer.serviceAddress,
          serviceDate: moment(activity.dateAdded).format('MMM DD, YYYY'),
          serviceTime: moment(activity.dateAdded).format('h:mm a'),
          serviceNote: activity.noteToCustomer,
          checklist: activity.serviceLog.checkList
        })
      };

      // Send Email
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          return console.log('Error: ', err);
        } else {
          console.log('Message has been sent');
        }
      });

      return res.status(200).json('Sent');
    } catch (err) {
      console.log(err.message);
      if (err.kind === 'ObjectId') {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Customer not found' }] });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route    POST api/customers/updateEmailSettings
// @desc     Update Email Settings
// @access   Private/User
router.post(
  '/updateEmailSettings',
  [
    auth,
    [
      check('emailSendWorkOrder')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .toBoolean(),
      check('emailSendUnable')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .toBoolean(),
      check('emailSendSummary')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .toBoolean(),
      check('emailSendChecklist')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .toBoolean(),
      check('emailSendReadings')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .toBoolean(),
      check('emailShowReadingNumbers')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .toBoolean(),
      check('emailShowChemicalsUsed')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .toBoolean(),
      check('emailSendTechnician')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .toBoolean()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      emailSendWorkOrder,
      emailSendUnable,
      emailSendSummary,
      emailSendChecklist,
      emailSendReadings,
      emailShowReadingNumbers,
      emailShowChemicalsUsed,
      emailSendTechnician
    } = req.body;

    try {
      // Search for User in DB
      const user = await User.findOne({
        $or: [
          { _id: req.user.id, role: 'Admin', owner: req.user.owner },
          { _id: req.user.id, role: 'Owner' }
        ]
      });

      // If no user found, return error
      if (!user) {
        return res
          .status(401)
          .json({ msg: 'User not found or not authorized' });
      }

      // Technicians not allowed to use this route
      // Edit: Simplified DB Query to run this check itself.
      // if (user.role === 'Technician') {
      //   return res.status(401).json({ msg: 'User not authorized' });
      // }

      // If user making request is a Admin, then check to get their owners ID. Then fetch owner information and make changes to the owner.
      if (user.role === 'Admin') {
        const owner = User.findOne({ _id: req.user.owner, role: 'Owner' });

        // If no user found, return error
        if (!owner) {
          return res.status(404).json({ msg: 'User not found' });
        }
        owner.emailSettings.emailSendWorkOrder = emailSendWorkOrder;
        owner.emailSettings.emailSendUnable = emailSendUnable;
        owner.emailSettings.emailSendSummary = emailSendSummary;
        owner.emailSettings.emailSendChecklist = emailSendChecklist;
        owner.emailSettings.emailSendReadings = emailSendReadings;
        owner.emailSettings.emailShowReadingNumbers = emailShowReadingNumbers;
        owner.emailSettings.emailShowChemicalsUsed = emailShowChemicalsUsed;
        owner.emailSettings.emailShowTechnician = emailSendTechnician;

        await owner.save();

        return res.status(200).json(owner);
      }

      if (user.role === 'Owner') {
        user.emailSettings.emailSendWorkOrder = emailSendWorkOrder;
        user.emailSettings.emailSendUnable = emailSendUnable;
        user.emailSettings.emailSendSummary = emailSendSummary;
        user.emailSettings.emailSendChecklist = emailSendChecklist;
        user.emailSettings.emailSendReadings = emailSendReadings;
        user.emailSettings.emailShowReadingNumbers = emailShowReadingNumbers;
        user.emailSettings.emailShowChemicalsUsed = emailShowChemicalsUsed;
        user.emailSettings.emailShowTechnician = emailSendTechnician;

        await user.save();

        return res.status(200).json(user);
      }
    } catch (err) {
      console.log(err.message);
      if (err.kind === 'ObjectId') {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Customer not found' }] });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route    POST api/customers/updateEmailChemicalFields
// @desc     Update Email Settings Chem Fields
// @access   Private/User
router.post(
  '/updateEmailChemicalFields',
  [
    auth,
    [
      check('freeChlorine')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .toBoolean(),
      check('pHlevel')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .toBoolean(),
      check('alkalinity')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .toBoolean(),
      check('conditionerLevel')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .toBoolean(),
      check('hardness')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .toBoolean(),
      check('phosphateLevel')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .toBoolean(),
      check('saltLevel')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .toBoolean()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      freeChlorine,
      pHlevel,
      alkalinity,
      conditionerLevel,
      hardness,
      phosphateLevel,
      saltLevel
    } = req.body;

    try {
      // Search for User Making Request in DB
      const user = await User.findOne({
        $or: [
          { _id: req.user.id, role: 'Admin', owner: req.user.owner },
          { _id: req.user.id, role: 'Owner' }
        ]
      });

      // If no user found, return error
      if (!user) {
        return res
          .status(401)
          .json({ msg: 'User not found or not authorized' });
      }

      // If user making request is a Admin, then check to get their owners ID. Then fetch owner information and make changes to the owner.
      if (user.role === 'Admin') {
        const owner = User.findOne({ _id: req.user.owner, role: 'Owner' });

        // If no user found, return error
        if (!owner) {
          return res.status(404).json({ msg: 'User not found' });
        }

        owner.emailSettings.emailSendFreeChlorine = freeChlorine;
        owner.emailSettings.emailSendpHlevel = pHlevel;
        owner.emailSettings.emailSendAlkalinity = alkalinity;
        owner.emailSettings.emailSendConditioner = conditionerLevel;
        owner.emailSettings.emailSendHardness = hardness;
        owner.emailSettings.emailSendPhosphateLevel = phosphateLevel;
        owner.emailSettings.emailSendSaltLevel = saltLevel;

        await owner.save();

        return res.status(200).json(owner);
      }

      if (user.role === 'Owner') {
        user.emailSettings.emailSendFreeChlorine = freeChlorine;
        user.emailSettings.emailSendpHlevel = pHlevel;
        user.emailSettings.emailSendAlkalinity = alkalinity;
        user.emailSettings.emailSendConditioner = conditionerLevel;
        user.emailSettings.emailSendHardness = hardness;
        user.emailSettings.emailSendPhosphateLevel = phosphateLevel;
        user.emailSettings.emailSendSaltLevel = saltLevel;

        await user.save();

        return res.status(200).json(user);
      }
    } catch (err) {
      console.log(err.message);

      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/customers/serviceLogs/:techId
// @desc     Get Technicians Service Logs by Tech ID
// @access   Private/User
router.get('/serviceLogs/:techId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Make sure the user making request exists
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check that we have permission to get this technicians service logs.

    if (
      user.role === 'Technician' &&
      user._id.toString() === req.params.techId.toString()
    ) {
      const activities = await Activity.find({
        creator: user._id,
        log: 'Service'
      }).populate('customer');
      if (!activities) return res.status(404).send('No Logs Found');
      return res.status(200).json(activities);
    }

    if (user.role === 'Admin') {
      const tech = User.findById(req.params.techId);
      if (user.owner === tech.owner) {
        const activities = await Activity.find({
          creator: user._id,
          log: 'Service'
        }).populate('customer');
        if (!activities) return res.status(404).send('No Logs Found');
        return res.status(200).json(activities);
      }
    }

    if (user.role === 'Owner') {
      const activities = await Activity.find({
        user: user._id,
        log: 'Service'
      }).populate('customer');
      if (!activities) return res.status(404).send('No Logs Found');
      return res.status(200).json(activities);
    }
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'User not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/customers/workOrders
// @desc     Get All Work Orders For Account
// @access   Private/Admin
router.post('/workOrders/', auth, async (req, res) => {
  // GET wasnt working so made it a 'POST' request instead. Will investigate in the future.
  try {
    const user = await User.findOne({
      $or: [
        { _id: req.user.id, role: 'Admin', owner: req.user.owner },
        { _id: req.user.id, role: 'Owner' }
      ]
    });

    // Make sure the user making request exists
    if (!user) {
      return res.status(401).json({ msg: 'User not found or Not Authorized' });
    }

    const orders = await WorkOrders.find({
      $or: [{ owner: user._id }, { owner: user.owner }]
    })
      .sort({
        dateCreated: -1
      })
      .populate('customer');

    return res.status(200).json(orders);
  } catch (err) {
    console.log(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    POST api/customers/add/workOrder
// @desc     Add Work Order
// @access   Private/Admin
router.post(
  '/add/workOrder',
  [
    auth,
    [
      check('orderType')
        .not()
        .isEmpty()
        .trim()
        .escape(),
      check('customer')
        .not()
        .isEmpty()
        .trim()
        .escape(),
      check('description')
        .trim()
        .escape(),
      check('officeNote')
        .trim()
        .escape(),
      check('estimatedMinutes')
        .trim()
        .escape()
        .toInt(),
      check('notifyCustomer')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .isBoolean(),
      check('scheduledDate')
        .trim()
        .escape()
        .toDate(),
      check('status')
        .not()
        .isEmpty()
        .trim()
        .escape(),
      check('laborCost')
        .trim()
        .escape()
        .toInt(),
      check('price')
        .trim()
        .escape()
        .toInt()
    ]
  ],
  async (req, res) => {
    const {
      orderType,
      customer,
      description,
      officeNote,
      estimatedMinutes,
      technician,
      notifyCustomer,
      scheduledDate,
      status,
      laborCost,
      price
    } = req.body;

    try {
      // Find user making request as long as they are Admin or Owner role.
      const user = await User.findOne({
        $or: [
          { _id: req.user.id, role: 'Admin', owner: req.user.owner },
          { _id: req.user.id, role: 'Owner' }
        ]
      });

      // Make sure the user making request exists
      if (!user) {
        return res
          .status(404)
          .json({ msg: 'User not found or Not Authorized' });
      }

      const tech = await User.findById(technician);

      let workOrder = new WorkOrders({
        method: 'Manual',
        orderType,
        status,
        description,
        creator: user._id,
        customer,
        estimatedMinutes,
        laborCost,
        price,
        scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
        officeNote,
        technician,
        technicianName: tech.firstName + ' ' + tech.lastName,
        owner:
          user.role === 'Admin' || user.role === 'Technician'
            ? user.owner
            : user._id,
        notifyCustomer
      });

      await workOrder.save();

      const customerInfo = await Customer.findById(customer);
      console.log(customerInfo.activeWorkOrders);
      if (workOrder.status === 'Approved') {
        const newOrder = {
          order: workOrder._id
        };
        customerInfo.activeWorkOrders.push(newOrder);
        console.log(customerInfo.activeWorkOrders);
        await customerInfo.save();
      }

      if (notifyCustomer === true || notifyCustomer === 'true') {
        let isOwner = null;

        if (user.role !== 'Owner') {
          isOwner = false;
        } else {
          isOwner = true;
        }

        let owner = null;

        if (isOwner === false) {
          owner = await User.findOne({ _id: user.owner, role: 'Owner' });
        }

        // Nodemailer Auth
        const auth = {
          auth: {
            api_key: config.get('mailgun_api_key'),
            domain: config.get('mailgun_domain')
          }
        };

        // Nodemailer Transporter
        let transporter = nodemailer.createTransport(nodemailMailgun(auth));

        // Mail Options
        const mailOptions = {
          from: `${
            isOwner
              ? user.businessInfo.businessName
              : owner.businessInfo.businessName
          } <no-reply@poolpro360.com>`,
          to: 'cameronanchondo@gmail.com',
          replyTo: isOwner ? user.email : owner.email,
          subject: `A Work Order Has Been Created For You`,
          template: 'workorder',
          'h:X-Mailgun-Variables': JSON.stringify({
            firstName: customer.firstName,
            businessName: isOwner
              ? user.businessInfo.businessName
              : owner.businessInfo.businessName,
            businessEmail: isOwner
              ? user.businessInfo.businessEmail
              : owner.businessInfo.businessEmail,
            businessAddress: isOwner
              ? user.businessInfo.businessAddress
              : owner.businessInfo.businessAddress,
            businessPhone: isOwner
              ? user.businessInfo.businessPhone
              : owner.businessInfo.businessPhone,
            businessLogo: isOwner
              ? user.businessInfo.businessLogo
              : owner.businessInfo.businessLogo,
            description: description,
            serviceAddress: customerInfo.serviceAddress,
            scheduledDate: scheduledDate
              ? moment(scheduledDate).format('MMMM Do, YYYY')
              : null
          })
        };

        // Send Email
        transporter.sendMail(mailOptions, (err, data) => {
          if (err) {
            return console.log('Error: ', err);
          } else {
            console.log('Message has been sent');
          }
        });
      }

      return res.status(200).json(workOrder);
    } catch (err) {
      console.log(err.message);

      res.status(500).send('Server Error');
    }
  }
);

// @route    PATCH api/customers/workOrder
// @desc     Edit Work Order
// @access   Private/Admin
router.patch(
  '/workOrder/:id',
  [
    auth,
    [
      check('orderType')
        .not()
        .isEmpty()
        .trim()
        .escape(),
      check('customer')
        .not()
        .isEmpty()
        .trim()
        .escape(),
      check('description')
        .trim()
        .escape(),
      check('officeNote')
        .trim()
        .escape(),
      check('estimatedMinutes')
        .trim()
        .escape()
        .toInt(),
      check('scheduledDate')
        .trim()
        .escape()
        .toDate(),
      check('status')
        .not()
        .isEmpty()
        .trim()
        .escape(),
      check('laborCost')
        .trim()
        .escape()
        .toInt(),
      check('price')
        .trim()
        .escape()
        .toInt()
    ]
  ],
  async (req, res) => {
    const {
      orderType,
      customer,
      description,
      officeNote,
      estimatedMinutes,
      technician,
      showDate,
      scheduledDate,
      status,
      laborCost,
      price
    } = req.body;

    try {
      // Find user making request as long as they are Admin or Owner role.
      const user = await User.findOne({
        $or: [
          { _id: req.user.id, role: 'Admin', owner: req.user.owner },
          { _id: req.user.id, role: 'Owner' }
        ]
      });

      // Make sure the user making request exists
      if (!user) {
        return res
          .status(404)
          .json({ msg: 'User not found or Not Authorized' });
      }

      const workOrder = await WorkOrders.findById(req.params.id);

      if (!workOrder) {
        return res.status(404).json({ msg: 'Work Order not found' });
      }

      if (
        !workOrder.technician ||
        workOrder.technician.toString() !== technician.toString()
      ) {
        const tech = await User.findById(technician);
        workOrder.technicianName = tech.firstName + ' ' + tech.lastName;
        workOrder.technician = technician;
      }

      let statusChange = null;
      if (status !== workOrder.status) {
        statusChange = true;
      } else {
        statusChange = false;
      }

      workOrder.orderType = orderType;
      workOrder.customer = customer;
      workOrder.description = description;
      workOrder.officeNote = officeNote;
      workOrder.estimatedMinutes = estimatedMinutes;
      workOrder.scheduledDate =
        showDate === true || showDate === 'true'
          ? new Date(scheduledDate)
          : null;
      statusChange === true && (workOrder.status = status);
      workOrder.laborCost = laborCost;
      workOrder.price = price;
      workOrder.lastUpdate = Date.now();

      await workOrder.save();

      const customerInfo = await Customer.findById(customer);

      if (statusChange === true && workOrder.status === 'Approved') {
        const newOrder = {
          order: workOrder._id
        };
        customerInfo.activeWorkOrders.push(newOrder);
        customerInfo.save();
      } else if (statusChange === true && workOrder.status !== 'Approved') {
        const index = customerInfo.activeWorkOrders.findIndex(
          e => e.order._id === workOrder._id
        );
        customerInfo.activeWorkOrders.splice(index, 1);
        customerInfo.save();
      }

      return res.status(200).json(workOrder);
    } catch (err) {
      console.log(err.message);

      res.status(500).send('Server Error');
    }
  }
);

// @route    PATCH api/customers/workOrder/:id/approve
// @desc     Approve Work Order
// @access   Private/Admin
router.patch('/workOrder/:id/approve', auth, async (req, res) => {
  try {
    // Find user making request as long as they are Admin or Owner role.
    const user = await User.findOne({
      $or: [
        { _id: req.user.id, role: 'Admin', owner: req.user.owner },
        { _id: req.user.id, role: 'Owner' }
      ]
    });

    // Make sure the user making request exists
    if (!user) {
      return res.status(404).json({ msg: 'User not found or Not Authorized' });
    }

    const workOrder = await WorkOrders.findById(req.params.id);

    if (!workOrder) {
      return res.status(404).json({ msg: 'Work Order not found' });
    }

    // Checking to see if work order belows to user
    if (user.role === 'Owner') {
      if (user._id.toString() !== workOrder.owner.toString()) {
        return res.status(401).json({ msg: 'User Not Authorized' });
      }
    }

    // Checking to see if work order belows to the same owner
    if (user.role === 'Admin') {
      if (user.owner.toString !== workOrder.owner.toString()) {
        return res.status(401).json({ msg: 'User Not Authorized' });
      }
    }

    workOrder.status = 'Approved';
    workOrder.lastUpdate = Date.now();

    await workOrder.save();

    const customerInfo = await Customer.findById(workOrder.customer);

    const newOrder = {
      order: workOrder._id
    };
    customerInfo.activeWorkOrders.push(newOrder);
    customerInfo.save();

    return res.status(200).json(workOrder);
  } catch (err) {
    console.log(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PATCH api/customers/workOrder/:id/completed
// @desc     Complete Work Order
// @access   Private/Admin
router.patch('/workOrder/:id/completed', auth, async (req, res) => {
  try {
    // Find user making request as long as they are Admin or Owner role.
    const user = await User.findOne({
      $or: [
        { _id: req.user.id, role: 'Admin', owner: req.user.owner },
        { _id: req.user.id, role: 'Owner' },
        { _id: req.user.id, role: 'Technician', owner: req.user.owner }
      ]
    });

    // Make sure the user making request exists
    if (!user) {
      return res.status(404).json({ msg: 'User not found or Not Authorized' });
    }

    const workOrder = await WorkOrders.findById(req.params.id);

    if (!workOrder) {
      return res.status(404).json({ msg: 'Work Order not found' });
    }

    // Checking to see if work order belows to user
    if (user.role === 'Owner') {
      if (user._id.toString() !== workOrder.owner.toString()) {
        return res.status(401).json({ msg: 'User Not Authorized' });
      }
    }

    // Checking to see if work order belows to the same owner
    if (user.role === 'Admin') {
      if (user.owner.toString !== workOrder.owner.toString()) {
        return res.status(401).json({ msg: 'User Not Authorized' });
      }
    }

    workOrder.status = 'Completed';
    workOrder.lastUpdate = Date.now();
    workOrder.completedOn = Date.now();

    await workOrder.save();

    const customerInfo = await Customer.findById(workOrder.customer);

    const index = customerInfo.activeWorkOrders.findIndex(
      e => e.order._id === workOrder._id
    );
    customerInfo.activeWorkOrders.splice(index, 1);
    customerInfo.save();

    // Nodemailer Auth
    const auth = {
      auth: {
        api_key: config.get('mailgun_api_key'),
        domain: config.get('mailgun_domain')
      }
    };

    let isOwner = null;

    if (user.role !== 'Owner') {
      isOwner = false;
    } else {
      isOwner = true;
    }

    let owner = null;

    if (isOwner === false) {
      owner = await User.findOne({ _id: user.owner, role: 'Owner' });
    }

    if (
      (isOwner && user.emailSettings.emailSendWorkOrder) ||
      (!isOwner && owner.emailSettings.emailSendWorkOrder)
    ) {
      // Nodemailer Transporter
      let transporter = nodemailer.createTransport(nodemailMailgun(auth));

      // Mail Options
      const mailOptions = {
        from: `${
          isOwner
            ? user.businessInfo.businessName
            : owner.businessInfo.businessName
        } <no-reply@poolpro360.com>`,
        to: 'cameronanchondo@gmail.com',
        replyTo: isOwner ? user.email : owner.email,
        subject: `${workOrder.orderType} has been completed on your pool.`,
        template: 'workordercomplete',
        'h:X-Mailgun-Variables': JSON.stringify({
          firstName: customerInfo.firstName,
          businessName: isOwner
            ? user.businessInfo.businessName
            : owner.businessInfo.businessName,
          businessEmail: isOwner
            ? user.businessInfo.businessEmail
            : owner.businessInfo.businessEmail,
          businessAddress: isOwner
            ? user.businessInfo.businessAddress
            : owner.businessInfo.businessAddress,
          businessPhone: isOwner
            ? user.businessInfo.businessPhone
            : owner.businessInfo.businessPhone,
          businessLogo: isOwner
            ? user.businessInfo.businessLogo
            : owner.businessInfo.businessLogo,
          orderType: workOrder.orderType,
          orderCompleted: workOrder.completedOn
        })
      };

      // Send Email
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          return console.log('Error: ', err);
        } else {
          console.log('Message has been sent');
        }
      });
    }

    return res.status(200).json(workOrder);
  } catch (err) {
    console.log(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PATCH api/customers/recentActivity/:id/edit/comment
// @desc     Edit Recent Activity Comment
// @access   Private/Admin
router.patch(
  '/recentActivity/:id/edit/comment',
  [
    auth,
    [
      check('comments')
        .not()
        .isEmpty()
        .trim()
        .escape()
    ]
  ],
  async (req, res) => {
    const { comments } = req.body;
    try {
      // Find user making request as long as they are Admin or Owner role.
      const user = await User.findOne({
        $or: [
          { _id: req.user.id, role: 'Admin', owner: req.user.owner },
          { _id: req.user.id, role: 'Owner' }
        ]
      });

      // Make sure the user making request exists
      if (!user) {
        return res
          .status(404)
          .json({ msg: 'User not found or Not Authorized' });
      }

      const recentActivity = await Activity.findById(req.params.id);

      if (!recentActivity) {
        return res.status(404).json({ msg: 'Work Order not found' });
      }

      // Checking to see if work order belows to user
      if (user.role === 'Owner') {
        if (user._id.toString() !== recentActivity.user.toString()) {
          return res.status(401).json({ msg: 'User Not Authorized' });
        }
      }

      // Checking to see if work order belows to the same owner
      if (user.role === 'Admin') {
        if (user.owner.toString !== recentActivity.user.toString()) {
          return res.status(401).json({ msg: 'User Not Authorized' });
        }
      }

      recentActivity.comments = comments;
      recentActivity.lastUpdate = Date.now();

      await recentActivity.save();

      return res.status(200).json(recentActivity);
    } catch (err) {
      console.log(err.message);

      res.status(500).send('Server Error');
    }
  }
);

// // @route    GET api/customers/workOrders/:techId
// // @desc     Get Technicians Work Orders by Tech ID
// // @access   Private/User
// router.get('/workOrders/:techId', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     // Make sure the user making request exists
//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     // Check that we have permission to get this technicians service logs.

//     if (
//       user.role === 'Technician' &&
//       user._id.toString() === req.params.techId.toString()
//     ) {
//       const orders = await WorkOrders.find({
//         technician: user._id
//       }).populate('customer');

//       if (!orders) return res.status(404).send('No Work Orders Found');
//       return res.status(200).json(orders);
//     }

//     if (user.role === 'Admin') {
//       const tech = User.findById(req.params.techId);
//       if (user.owner.toString() === tech.owner.toString()) {
//         const orders = await WorkOrders.find({
//           technician: tech._id
//         }).populate('orders');
//         if (!activities) return res.status(404).send('No Work Orders Found');
//         return res.status(200).json(orders);
//       }
//     }

//     if (user.role === 'Owner') {
//       const tech = User.findById(req.params.techId);
//       if (tech._id !== user._id && tech._owner !== user._id) {
//         return res
//           .status(401)
//           .json({ msg: 'User not found or not authorized' });
//       }

//       const orders = await WorkOrders.find({
//         technician: user._id
//       }).populate('customer');
//       if (!orders) return res.status(404).send('No Work Orders Found');
//       return res.status(200).json(orders);
//     }

//     return res.status(401).json({ msg: 'User not found or not authorized' });
//   } catch (err) {
//     console.log(err.message);
//     if (err.kind === 'ObjectId') {
//       return res.status(404).json({ errors: [{ msg: 'User not found' }] });
//     }
//     res.status(500).send('Server Error');
//   }
// });

module.exports = router;
