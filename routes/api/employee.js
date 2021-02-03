const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Employee = require('../../models/Employee');
const User = require('../../models/User');

// @route    POST api/employees
// @desc     Register Employee
// @access   Private/User
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

// @route    GET api/employees
// @desc     Get All My Employees
// @access   Private/User
router.get('/', auth, async (req, res) => {
  try {
    const employees = await User.find({
      $or: [{ owner: req.user.id }, { _id: req.user.id }]
    });

    if (!employees)
      return res
        .status(500)
        .json({ msg: 'Not Authorized or Employees not Found' });

    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/employees/:id
// @desc     Get Employee by ID
// @access   Private/User
router.get('/:id', auth, async (req, res) => {
  try {
    const employee = await User.find({
      $or: [{ owner: req.user.id, _id: req.params.id }, { _id: req.user.id }]
    });

    if (!employee)
      return res
        .status(500)
        .json({ msg: 'Not Authorized or Employee not Found' });

    res.json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PATCH api/employees/:employeeId/information
// @desc     Update User Information
// @access   Private/User
router.patch('/:employeeId/information', auth, async (req, res) => {
  const { firstName, lastName, email, role, phone } = req.body;

  try {
    const employee = await User.findById(req.params.employeeId);

    if (!employee) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (
      employee.role === 'Owner' ||
      employee.isSubUser === false ||
      employee.isOwner === true
    ) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    if (employee.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    employee.firstName = firstName;
    employee.lastName = lastName;
    employee.email = email;
    employee.role = role;
    employee.phone = phone;

    await employee.save();

    res.status(200).json(employee);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'User not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PATCH api/employees/:employeeId/password
// @desc     Update User Password
// @access   Private/User
router.patch('/:employeeId/password', auth, async (req, res) => {
  const { password } = req.body;

  try {
    const employee = await User.findById(req.params.employeeId);
    const user = await User.findById(req.user.id);

    if (!employee) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (
      employee.owner.toString() !== req.user.id &&
      employee._id.toString() !== req.user.id &&
      user.role !== 'Admin'
    ) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    if (!user) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const salt = await bcrypt.genSalt(10);

    employee.password = await bcrypt.hash(password, salt);
    employee.passwordUpdated = Date.now();

    await employee.save();

    res.status(200).json(employee);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'User not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PATCH api/employees/:employeeId/inactive
// @desc     Toggle User Active
// @access   Private/User
router.patch('/:employeeId/inactive', auth, async (req, res) => {
  try {
    const employee = await User.findById(req.params.employeeId);

    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }

    if (
      employee.owner.toString() !== req.user.id &&
      employee.role !== 'Admin'
    ) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    employee.isActive = !employee.isActive;

    await employee.save();

    res.status(200).json(employee);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'User not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
