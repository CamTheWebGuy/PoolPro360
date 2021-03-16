const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');

const User = require('../../models/User');

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

// @route    POST api/users
// @desc     Register User
// @access   Public
router.post(
  '/',
  [
    check('firstName', 'a First Name is required')
      .not()
      .isEmpty()
      .trim()
      .escape(),
    check('lastName', 'a Last Name is Required')
      .not()
      .isEmpty()
      .trim()
      .escape(),
    check('businessName')
      .trim()
      .escape(),
    check('country')
      .trim()
      .escape(),
    check('zip')
      .trim()
      .escape(),
    check('email', 'Please include a valid email')
      .isEmail()
      .normalizeEmail()
      .trim()
      .escape(),
    check(
      'password',
      'Please enter a password with 6 characters or more'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      businessName,
      country,
      state,
      zip,
      email,
      password,
      role
    } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        firstName,
        lastName,
        businessName,
        country,
        state,
        zip,
        email,
        password,
        role
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    POST api/users
// @desc     Register Sub User
// @access   Private/User
router.post(
  '/subuser',
  [
    auth,
    [
      check('firstName', 'a First Name is required')
        .not()
        .isEmpty()
        .trim()
        .escape(),
      check('lastName', 'a Last Name is Required')
        .not()
        .isEmpty()
        .trim()
        .escape(),
      check('businessName')
        .trim()
        .escape(),
      check('country')
        .trim()
        .escape(),
      check('zip')
        .trim()
        .escape(),
      check('email', 'Please include a valid email')
        .isEmail()
        .normalizeEmail()
        .trim()
        .escape(),
      check(
        'password',
        'Please enter a password with 6 characters or more'
      ).isLength({ min: 6 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      phone,
      businessName,
      country,
      state,
      zip,
      email,
      password,
      role
    } = req.body;

    try {
      let user = await User.findOne({ email });
      let creator = await User.findById(req.user.id);
      console.log(creator.role);

      if (!creator.role === 'Admin' && !creator.role === 'Owner') {
        return res.status(401).json({
          errors: [{ msg: 'You do not have permission to perform this action' }]
        });
      }

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        firstName,
        lastName,
        phone,
        businessName,
        country,
        state,
        zip,
        email,
        password,
        role,
        isOwner: false,
        isSubUser: true,
        owner: req.user.id
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.status(200).json({ msg: 'User Added' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    POST api/users/updateBusinessInfo
// @desc     Update User Business Information
// @access   Private/User
router.post(
  '/updateBusinessInfo',
  [
    auth,
    [
      check('businessName', 'a Business Name is required')
        .not()
        .isEmpty()
        .trim()
        .escape(),
      check('businessPhone')
        .trim()
        .escape(),
      check('businessEmail')
        .isEmail()
        .normalizeEmail()
        .trim()
        .escape(),
      check('businessAddress')
        .trim()
        .escape()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      businessName,
      businessPhone,
      businessEmail,
      businessAddress
    } = req.body;

    try {
      // Find user making request in DB where role is Admin or Owner
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

      // If user making request is a Admin, then check to get their owners ID. Then fetch owner information and make changes to the owner account.
      if (user.role === 'Admin') {
        const owner = User.findOne({ _id: req.user.owner, role: 'Owner' });

        // If no user found, return error
        if (!owner) {
          return res.status(404).json({ msg: 'User not found' });
        }

        owner.businessInfo.businessName = businessName;
        owner.businessInfo.businessPhone = businessPhone;
        owner.businessInfo.businessEmail = businessEmail;
        owner.businessInfo.businessAddress = businessAddress;

        await owner.save();

        return res.status(200).json(owner);
      }

      if (user.role === 'Owner') {
        user.businessInfo.businessName = businessName;
        user.businessInfo.businessPhone = businessPhone;
        user.businessInfo.businessEmail = businessEmail;
        user.businessInfo.businessAddress = businessAddress;

        await user.save();

        return res.status(200).json(user);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/users/businessInfo
// @desc     Get User Business Info
// @access   Private/User
router.get('/businessInfo', auth, async (req, res) => {
  try {
    // Find user making request in DB where role is Admin or Owner
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

    if (user.role === 'Admin') {
      const owner = User.findOne({ _id: req.user.owner, role: 'Owner' });

      // If no user found, return error
      if (!owner) {
        return res.status(404).json({ msg: 'User not found' });
      }

      const businessInfo = owner.businessInfo;

      return res.status(200).json(businessInfo);
    }

    if (user.role === 'Owner') {
      const businessInfo = user.businessInfo;

      return res.status(200).json(businessInfo);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/users/updateLogo
// @desc     Update User Logo
// @access   Private/User
router.post('/updateLogo', auth, async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [
        { _id: req.user.id, role: 'Admin', owner: req.user.owner },
        { _id: req.user.id, role: 'Owner' }
      ]
    });

    if (!user) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'User not found or not authorized' }] });
    }

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

    let s3Object = null;

    if (isOwner) {
      s3Object = user.businessInfo.businessLogo.split(
        'https://s3-us-west-2.amazonaws.com/poolpro360/'
      );
    } else {
      s3Object = owner.businessInfo.businessLogo.split(
        'https://s3-us-west-2.amazonaws.com/poolpro360/'
      );
    }

    // return console.log(s3Object[1]);

    await s3.deleteObject(
      {
        Bucket: 'poolpro360',
        Key: `${s3Object[1]}`
      },
      async (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        } else {
          try {
            const downloadUrl = await uploadToS3(req, res);

            if (isOwner) {
              user.businessInfo.businessLogo = downloadUrl;
              await user.save();
              return res.json(user.businessInfo.businessLogo);
            } else {
              owner.businessInfo.businessLogo = downloadUrl;
              await owner.save();
              return res.json(owner.businessInfo.businessLogo);
            }
          } catch (err) {
            console.log(err);
          }
          return res.status(200).send('File deleted');
        }
      }
    );

    // const downloadUrl = await uploadToS3(req, res);

    // if (isOwner) {
    //   user.businessInfo.businessLogo = downloadUrl;
    //   await user.save();
    //   return res.json(user.businessInfo.businessLogo);
    // } else {
    //   owner.businessInfo.businessLogo = downloadUrl;
    //   await owner.save();
    //   return res.json(owner.businessInfo.businessLogo);
    // }
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
