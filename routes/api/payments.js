const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');
const axios = require('axios');
const moment = require('moment');

const Stripe = require('stripe');
const queryString = require('query-string');
const User = require('../../models/User');
const Customer = require('../../models/Customer');

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
      type: 'account_onboarding',
      settings: {
        payments: {
          statement_descriptor: user.businessName || 'PoolPro360 Billing'
        }
      }
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
        { _id: req.user.id, role: 'Owner' }
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
      user.stripePriceWeekly = weeklyPrice.id;
      user.stripePriceMonthly = monthlyPrice.id;
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

// @route    POST api/stripe/payment-method/:customerId
// @desc     Create Stripe Customer Payment Method
// @access   Private/User
router.post('/payment-method/:customerId', auth, async (req, res) => {
  const { cvc, expiry, number, billingFrequency } = req.body;

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

    const customer = await Customer.findOne({
      user: user.role === 'Owner' ? req.user.id : user.owner,
      _id: req.params.customerId
    });

    if (!customer.stripeCustomerId) {
      let stripeCustomer = await stripe.customers.create(
        {
          description: 'Pro360 Customer',
          email: customer.email,
          name: customer.firstName + ' ' + customer.lastName
        },
        {
          stripeAccount: user.stripe_account_id
        }
      );
      customer.stripeCustomerId = stripeCustomer.id;
    }

    if (cvc && expiry && number) {
      const expiration = expiry.split(' / ');

      if (customer.paymentMethod) {
        const paymentMethod = await stripe.paymentMethods.create(
          {
            type: 'card',
            card: {
              number,
              exp_month: expiration[0],
              exp_year: expiration[1],
              cvc: cvc
            }
          },
          {
            stripeAccount: user.stripe_account_id
          }
        );

        const paymentAttach = await stripe.paymentMethods.attach(
          paymentMethod.id,
          { customer: customer.stripeCustomerId },
          {
            stripeAccount: user.stripe_account_id
          }
        );

        const customerInfo = await stripe.customers.update(
          customer.stripeCustomerId,
          {
            invoice_settings: {
              default_payment_method: paymentMethod.id
            }
          },
          {
            stripeAccount: user.stripe_account_id
          }
        );

        customer.paymentMethod = paymentMethod.id;
        customer.paymentLast4 = paymentMethod.card.last4;
        customer.paymentExpDate = expiry;
        customer.billingFrequency = billingFrequency
          ? billingFrequency
          : customer.billingFrequency;
        await customer.save();
        res.status(200).send({ msg: 'Settings Saved' });
      } else {
        const paymentMethod = await stripe.paymentMethods.create(
          {
            type: 'card',
            card: {
              number,
              exp_month: expiration[0],
              exp_year: expiration[1],
              cvc: cvc
            }
          },
          {
            stripeAccount: user.stripe_account_id
          }
        );

        const paymentAttach = await stripe.paymentMethods.attach(
          paymentMethod.id,
          { customer: customer.stripeCustomerId },
          {
            stripeAccount: user.stripe_account_id
          }
        );

        customer.paymentMethod = paymentMethod.id;
        customer.paymentLast4 = paymentMethod.card.last4;
        customer.paymentExpDate = expiry;
        customer.billingFrequency = billingFrequency;
        await customer.save();
        res.status(200).send({ msg: 'Settings Saved' });
      }
    } else {
      customer.billingFrequency = billingFrequency;
      await customer.save();

      res.status(200).send({ msg: 'Settings Saved' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/stripe/subscription/:customerId
// @desc     Create Stripe Customer Subscription
// @access   Private/User
router.post('/subscription/:customerId', auth, async (req, res) => {
  const { billingStart } = req.body;
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

    const customer = await Customer.findOne({
      user: user.role === 'Owner' ? req.user.id : user.owner,
      _id: req.params.customerId
    });

    let difference = null;

    if (billingStart) {
      difference = moment(billingStart).diff(Date.now(), 'days');
      const subscription = await stripe.subscriptions.create(
        {
          customer: customer.stripeCustomerId,
          default_payment_method: customer.paymentMethod,
          items: [
            {
              price:
                customer.billingFrequency === 'Monthly'
                  ? user.stripePriceMonthly
                  : user.stripePriceWeekly,
              quantity: customer.serviceRate
            }
          ],
          trial_period_days: difference
        },
        {
          stripeAccount: user.stripe_account_id
        }
      );
      customer.billingType = 'Autobilling';
      customer.stripeSubscriptionStatus = 'Active';
      customer.stripeSubscriptionId = subscription.id;
      customer.stripeSubscription = subscription;
      await customer.save();
    } else {
      const subscription = await stripe.subscriptions.create(
        {
          customer: customer.stripeCustomerId,
          default_payment_method: customer.paymentMethod,
          items: [
            {
              price:
                customer.billingFrequency === 'Monthly'
                  ? user.stripePriceMonthly
                  : user.stripePriceWeekly,
              quantity: customer.serviceRate
            }
          ]
        },
        {
          stripeAccount: user.stripe_account_id
        }
      );
      customer.billingType = 'Autobilling';
      customer.stripeSubscriptionId = subscription.id;
      customer.stripeSubscription = subscription;
      await customer.save();
    }

    res.status(200).send({ msg: 'Subscription Added' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PATCH api/stripe/subscriptionInfo/:customerId
// @desc     Update Stripe Customer Subscription
// @access   Private/User
router.patch('/subscriptionInfo/:customerId', auth, async (req, res) => {
  const { rate, billingFrequency } = req.body;
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

    const customer = await Customer.findOne({
      user: user.role === 'Owner' ? req.user.id : user.owner,
      _id: req.params.customerId
    });

    customer.serviceRate = rate;
    customer.billingFrequency = billingFrequency;

    if (!customer.stripeCustomerId) {
      let stripeCustomer = await stripe.customers.create(
        {
          description: 'Pro360 Customer',
          email: customer.email,
          name: customer.firstName + ' ' + customer.lastName
        },
        {
          stripeAccount: user.stripe_account_id
        }
      );

      customer.stripeCustomerId = stripeCustomer.id;
    }

    if (!customer.stripeSubscriptionId) {
      const subscription = await stripe.subscriptions.create(
        {
          customer: customer.stripeCustomerId,
          default_payment_method: customer.paymentMethod,
          items: [
            {
              price:
                customer.billingFrequency === 'Monthly'
                  ? user.stripePriceMonthly
                  : user.stripePriceWeekly,
              quantity: customer.serviceRate
            }
          ]
        },
        {
          stripeAccount: user.stripe_account_id
        }
      );

      customer.stripeSubscription = subscription;
      customer.stripeSubscriptionId = subscription.id;
    }

    const subscription = await stripe.subscriptions.update(
      customer.stripeSubscriptionId,
      {
        items: [
          {
            id: customer.stripeSubscription.items.data[0].id,
            price:
              customer.billingFrequency === 'Monthly'
                ? user.stripePriceMonthly
                : user.stripePriceWeekly,
            quantity: customer.serviceRate
          }
        ]
      },
      {
        stripeAccount: user.stripe_account_id
      }
    );

    customer.stripeSubscription = subscription;

    await customer.save();

    res.status(200).send({ msg: 'Subscription Updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/stripe/subscription/pause/:customerId
// @desc     Pause Stripe Customer Subscription
// @access   Private/User
router.post('/subscription/pause/:customerId', auth, async (req, res) => {
  const { date } = req.body;
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

    const customer = await Customer.findOne({
      user: user.role === 'Owner' ? req.user.id : user.owner,
      _id: req.params.customerId
    });

    Date.prototype.getUnixTime = function() {
      return (this.getTime() / 1000) | 0;
    };
    if (!Date.now)
      Date.now = function() {
        return new Date();
      };
    Date.time = function() {
      return Date.now().getUnixTime();
    };

    const resumeDate = new Date(date);
    const theUnixTime = resumeDate.getUnixTime();

    const subscription = await stripe.subscriptions.update(
      customer.stripeSubscriptionId,
      {
        pause_collection: {
          behavior: 'void',
          resumes_at: theUnixTime
        }
      },
      {
        stripeAccount: user.stripe_account_id
      }
    );

    customer.stripeSubscriptionId = subscription.id;
    customer.stripeSubscriptionStatus = 'Paused';
    customer.stripeSubscription = subscription;

    await customer.save();

    res.status(200).send({ msg: 'Subscription Updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/stripe/subscription/cancel/:customerId
// @desc     Cancel Stripe Customer Subscription
// @access   Private/User
router.post('/subscription/cancel/:customerId', auth, async (req, res) => {
  const { date } = req.body;
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

    const customer = await Customer.findOne({
      user: user.role === 'Owner' ? req.user.id : user.owner,
      _id: req.params.customerId
    });

    const deleted = await stripe.subscriptions.del(
      customer.stripeSubscriptionId,
      {
        stripeAccount: user.stripe_account_id
      }
    );

    customer.stripeSubscriptionId = subscription.id;
    customer.stripeSubscriptionStatus = 'Canceled';
    customer.stripeSubscription = subscription;
    customer.billingType = 'Manual Billing';

    await customer.save();

    res.status(200).send({ msg: 'Subscription Updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
