const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Employee = require('../../models/Employee');

// @route    POST api/employees
// @desc     Register Employee
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
        .trim()
        .escape(),
      check('role')
        .not()
        .isEmpty()
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

    const { name, phone, role, email, password } = req.body;

    try {
      let employee = await Employee.findOne({ email });

      if (employee) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Employee already exists' }] });
      }

      employee = new Employee({
        admin: req.user.id,
        name,
        phone,
        role,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      employee.password = await bcrypt.hash(password, salt);

      await employee.save();

      res.json(employee);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    POST api/employees
// @desc     Get All My Employees
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const employees = await Employee.find({ admin: req.user.id });
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
