const express = require('express');
const connectDB = require('./config/db');
// const config = require('config');
// const stripe = require('stripe')(config.get('stripeSecretkey'));

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define routes
// app.use('/api/stripe', require('./routes/api/stripe'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/customers', require('./routes/api/customers'));
app.use('/api/employees', require('./routes/api/employee'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
