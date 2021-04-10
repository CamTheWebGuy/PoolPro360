const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const axios = require('axios');

const User = require('../../models/User');

// @route    GET api/auth
// @desc     Get User by token
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/auth/googleapi
// @desc     Get Google API Key
// @access   Private
router.get('/googleapi', auth, async (req, res) => {
  try {
    const api = await axios.get(
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyBPTZtirCX7Ar2bIandK2EZzj10V2bBUag&callback=initMap'
    );

    res.send('requested');
  } catch (err) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth
// @desc     Authenticate User and Get Token
// @access   Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
          role: user.role,
          owner: user.owner,
          stripe_account_id: user.stripe_account_id,
          stripe_seller: user.stripe_seller
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
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
