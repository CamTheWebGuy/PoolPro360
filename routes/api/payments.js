const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');
const axios = require('axios');

const Stripe = require('stripe');
const queryString = require('query-string');
const User = require('../../models/User');

const stripe = Stripe(config.get('stripe_sk'));

// @route    POST api/stripe
// @desc     Create Stripe Connect Account
// @access   Private/User
router.post('/create-connect-account', auth, async (req, res) => {
  try {
    // Get user making request
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

    if (!user.stripe_account_id) {
      // If user doesn't have a stripe_account_id yet, create one.
      const account = await stripe.accounts.create({
        type: 'express'
      });
      user.stripe_account_id = account.id;
      await user.save();
    }

    // Create login link based on account id (for frontend to complete onboarding)
    let accountLink = await stripe.accountLinks.create({
      account: user.stripe_account_id,
      refresh_url: 'http://localhost:3000/stripe/callback',
      return_url: 'http://localhost:3000/stripe/callback',
      type: 'account_onboarding'
    });

    // prefill user info
    accountLink = Object.assign(accountLink, {
      'stripe_user[email': user.email || undefined
    });

    res
      .status(200)
      .send(`${accountLink.url}?${queryString.stringify(accountLink)} `);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/stripe/create-product
// @desc     Create Stripe Product
// @access   Private/User
router.post('/create-product', auth, async (req, res) => {
  try {
    // Get user making request
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

    if (!user.stripeProduct) {
      const product = await stripe.products.create(
        {
          name: 'Pool Maintenance Services'
        },
        {
          stripeAccount: user.stripe_account_id
        }
      );

      const monthlyPrice = await stripe.prices.create(
        {
          unit_amount: 100,
          currency: 'usd',
          recurring: { interval: 'month' },
          product: product.id
        },
        {
          stripeAccount: user.stripe_account_id
        }
      );

      const weeklyPrice = await stripe.prices.create(
        {
          unit_amount: 100,
          currency: 'usd',
          recurring: { interval: 'week' },
          product: product.id
        },
        {
          stripeAccount: user.stripe_account_id
        }
      );

      user.stripeProduct = product.id;
      await user.save();

      res.status(200).send({ msg: 'Created Products' });
    } else {
      return res.status(200).send({ msg: 'Product already exists' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/stripe
// @desc     Get Stripe Account Status
// @access   Private/User
router.get('/get-account-status', auth, async (req, res) => {
  try {
    // Get user making request
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

    const account = await stripe.accounts.retrieve(user.stripe_account_id);

    user.stripe_seller = account;
    await user.save();

    res.status(200).send(user);

    // console.log('USER ACCOUNT: ', account);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/stripe
// @desc     Get Stripe Account Balance
// @access   Private/User
router.get('/get-account-balance', auth, async (req, res) => {
  try {
    // Get user making request
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

    const balance = await stripe.balance.retrieve({
      stripeAccount: user.stripe_account_id
    });

    res.status(200).send(balance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/stripe/payout-settings
// @desc     Get Stripe Account Balance
// @access   Private/User
router.post('/payout-settings', auth, async (req, res) => {
  try {
    // Get user making request
    const user = await User.findOne({
      $or: [
        { _id: req.user.id, role: 'Admin', owner: req.user.owner },
        { _id: req.user.id, role: 'Owner' },
        { _id: req.user.id, role: 'Technician', owner: req.user.owner }
      ]
    });

    // Make sure the user making request exists
    if (!user) {
      return res.status(401).json({ msg: 'User not found or Not Authorized' });
    }

    const loginLink = await stripe.accounts.createLoginLink(
      user.stripe_account_id,
      {
        redirect_url: 'http://localhost:3000/payments'
      }
    );

    res.status(200).send(loginLink);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
