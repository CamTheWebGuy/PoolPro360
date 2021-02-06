const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');

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

      let customer = new Customer({
        user: req.user.id,
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

// @route    GET api/customers/:id
// @desc     Get a Customer
// @access   Private/User
router.get('/:id', auth, async (req, res) => {
  try {
    const customer = await Customer.find({
      user: req.user.id,
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

    console.log(downloadUrl);

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
    const notes = await ServiceNotes.find({
      customer: req.params.customerId,
      user: req.user.id
    }).sort({ dateAdded: -1 });

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
      const customer = await Customer.findOne({
        user: req.user.id,
        _id: req.params.customerId
      });

      if (!customer) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Customer not found' }] });
      }

      const { comments, log, type, icon } = req.body;

      let activity = new Activity({
        comments,
        log,
        type,
        icon,
        customer: req.params.customerId,
        user: req.user.id,
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

// @route    GET api/customers/:customerId/recentActivity/
// @desc     Get All a Customers Recent Activity
// @access   Private/User
router.get('/:customerId/recentActivity', auth, async (req, res) => {
  try {
    const activities = await Activity.find({
      customer: req.params.customerId,
      user: req.user.id
    }).sort({ dateAdded: -1 });

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
    const customer = await Customer.findOne({
      _id: req.params.customerId,
      user: req.user.id
    });

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
    paymentMethod,
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
    customer.paymentMethod = paymentMethod;

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
    }).populate({ path: 'customers.customer' });

    const user = await User.find({
      $or: [
        { _id: req.user.id, role: 'Admin', owner: req.user.owner },
        { _id: req.user.id, role: 'Owner' }
      ]
    });

    if (!user) {
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

    res.status(200).json(route.customers);
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
          lon: parseInt(routeList[0].serviceLng),
          lat: parseInt(routeList[0].serviceLat)
        }
      }
    ],
    services: routeList.map(customer => ({
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
      if (customer.user !== user.owner) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    } else if (user.role === 'Owner') {
      if (user._id !== customer.user) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    }

    const tech = await User.findById(req.params.techId);
    console.log(tech.owner);
    console.log(customer.user);

    if (!tech) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (escape(tech.owner) !== escape(customer.user)) {
      if (tech.role !== 'Owner') {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    }

    if (tech.role === 'Owner') {
      if (customer.user !== tech._id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    }

    customer.technician = tech._id;
    customer.technicianName = tech.firstName + ' ' + tech.lastName;

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

module.exports = router;
