const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Customer = require('../../models/Customer');
const ServiceNotes = require('../../models/ServiceNotes');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');
const { findOneAndDelete } = require('../../models/Customer');
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
      billingAddress,
      billingCity,
      billingState,
      billingZip
    } = req.body;

    try {
      const existingCustomer = Customer.find({
        user: req.user.id,
        email: email
      });

      if (existingCustomer) {
        return res.status(409).json({
          errors: [{ msg: 'Error: Customer with this email already exists' }]
        });
      }

      let customer = new Customer({
        user: req.user.id,
        firstName,
        lastName,
        email,
        mobilePhone,
        serviceAddress,
        serviceCity,
        serviceState,
        serviceZip,
        gateCode,
        canText,
        poolType,
        technician,
        servicePackageAndRate,
        billingSame,
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
    const customer = await Customer.find({ user: req.user.id });
    res.json(customer);
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
// @desc     Delete Service Note by ID
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

module.exports = router;
