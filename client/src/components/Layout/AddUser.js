import React, { Fragment, useRef, useState } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';

import { addEmployee } from '../../actions/employee';
import { registerSubuser } from '../../actions/auth';

import Sidebar from '../dashboard/Sidebar';
import Dashnav from '../dashboard/Dashnav';
import Footer from '../Layout/Footer';
import Alert from '../Layout/Alert';

import {
  Button,
  Col,
  Row,
  Container,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';

import { Formik } from 'formik';

import * as Yup from 'yup';
import generator from 'generate-password';

const AddUser = ({ addEmployee, registerSubuser }) => {
  const [generatedPassword, setGeneratedPassword] = useState(null);

  const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  const lowercaseRegex = /(?=.*[a-z])/;
  const uppercaseRegex = /(?=.*[A-X])/;
  const numericRegex = /(?=.*[0-9])/;

  const formSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
      .email('Please provide a valid email')
      .required('Email is required'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone is required'),
    password: Yup.string()
      .matches(lowercaseRegex, 'Password must contain lowercase letter')
      .matches(uppercaseRegex, 'Password must contain uppercase letter')
      .matches(numericRegex, 'Password must contain a number')
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords do not match')
      .required('Confirm password is required')
  });

  const formRef = useRef();
  const history = useHistory();
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const onGeneratePassword = () => {
    setGeneratedPassword(generator.generate({ length: 12, numbers: true }));
  };

  return (
    <Fragment>
      <Sidebar active='users' />
      <div className='main-content' id='panel'>
        <Dashnav />
        <Alert />
        <div className='header bg-primary pb-6'>
          <div className='container-fluid'>
            <div className='header-body'>
              <div className='row align-items-center py-4'>
                <div className='col-lg-6 col-7'>
                  <h6 className='h2 text-white d-inline-block mb-0'>
                    PoolPro360
                  </h6>
                  <nav
                    aria-label='breadcrumb'
                    className='d-none d-md-inline-block ml-md-4'
                  >
                    <ol className='breadcrumb breadcrumb-links breadcrumb-dark'>
                      <li className='breadcrumb-item'>
                        <a href='/'>
                          <i className='fas fa-home' />
                        </a>
                      </li>
                      <li className='breadcrumb-item'>
                        <a href='/dashboard'>Dashboard</a>
                      </li>
                      <li className='breadcrumb-item'>
                        <a href='/users'>Users</a>
                      </li>
                      <li className='breadcrumb-item active'>
                        <a href='/users/add'>Add User</a>
                      </li>
                    </ol>
                  </nav>
                </div>
                <div className='col-lg-6 col-5 text-right'>
                  <a href='#' className='btn btn-sm btn-neutral'>
                    New
                  </a>
                  <a href='#' className='btn btn-sm btn-neutral'>
                    Filters
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Container className='mgn-ng-top-60'>
          <Card>
            <CardHeader>
              <div className='row align-items-center'>
                <div className='col-8'>
                  <h3 className='mb-0'>Add User </h3>
                </div>
                <div className='col-4 text-right'>
                  <Button type='submit' color='primary' onClick={handleSubmit}>
                    <span className='btn-inner--icon'>
                      <i className='fas fa-save'></i>
                    </span>{' '}
                    <span className='btn-inner--text'>Save User</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <Formik
                initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  phone: '',
                  role: 'Technician',
                  password: '',
                  confirmPassword: ''
                }}
                innerRef={formRef}
                onSubmit={async data => {
                  await registerSubuser(data);
                  history.push('/users');
                }}
                validationSchema={formSchema}
                render={({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  errors,
                  touched
                }) => (
                  <Fragment>
                    <Form onSubmit={handleSubmit}>
                      <h6 className='heading-small text-muted mb-4'>
                        User Information
                      </h6>
                      <div className='pl-lg-4'>
                        <Row>
                          <Col lg='6'>
                            <FormGroup>
                              <Label
                                for='firstName'
                                className='form-control-label'
                              >
                                First Name
                              </Label>
                              <Input
                                type='text'
                                name='firstName'
                                placeholder='John'
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.firstName && touched.firstName && (
                                <p className='color-red'>{errors.firstName}</p>
                              )}
                            </FormGroup>
                          </Col>
                          <Col lg='6'>
                            <FormGroup>
                              <Label
                                for='lastName'
                                className='form-control-label'
                              >
                                Last Name
                              </Label>
                              <Input
                                type='text'
                                name='lastName'
                                placeholder='Doe'
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.lastName && touched.lastName && (
                                <p className='color-red'>{errors.lastName}</p>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg='6'>
                            <FormGroup>
                              <Label for='email' className='form-control-label'>
                                Email
                              </Label>
                              <Input
                                type='text'
                                name='email'
                                placeholder='john.doe@gmail.com'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.email && touched.email && (
                                <p className='color-red'>{errors.email}</p>
                              )}
                            </FormGroup>
                          </Col>
                          <Col lg='6'>
                            <FormGroup>
                              <Label for='Phone' className='form-control-label'>
                                Phone
                              </Label>
                              <Input
                                type='text'
                                name='phone'
                                placeholder='555-555-5555'
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.phone && touched.phone && (
                                <p className='color-red'>{errors.phone}</p>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg='12'>
                            <FormGroup>
                              <Label for='role' className='form-control-label'>
                                User Role
                              </Label>
                              <Input
                                type='select'
                                name='role'
                                value={values.role}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>Technician</option>
                                <option>Logistics</option>
                                <option>Admin</option>
                              </Input>
                              {errors.role && touched.role && (
                                <p className='color-red'>{errors.role}</p>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg='6'>
                            <FormGroup>
                              <Label
                                for='password'
                                className='form-control-label'
                              >
                                Password
                              </Label>
                              <Input
                                type='password'
                                name='password'
                                autoComplete='on'
                                placeholder='Password'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.password && touched.password && (
                                <p className='color-red'>{errors.password}</p>
                              )}
                            </FormGroup>
                          </Col>
                          <Col lg='6'>
                            <FormGroup>
                              <Label
                                for='confirmPassword'
                                className='form-control-label'
                              >
                                Confirm Password
                              </Label>
                              <Input
                                type='password'
                                name='confirmPassword'
                                autoComplete='on'
                                placeholder='Confirm Password'
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.confirmPassword &&
                                touched.confirmPassword && (
                                  <p className='color-red'>
                                    {errors.confirmPassword}
                                  </p>
                                )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg='12'>
                            {generatedPassword && (
                              <Fragment>
                                <span>Password: {generatedPassword}</span>
                                <br />
                                <small>
                                  Make sure to save or write down this password
                                </small>
                                <br />
                                <br />
                              </Fragment>
                            )}

                            <Button
                              color='success'
                              onClick={onGeneratePassword}
                            >
                              Generate a Password
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Form>
                  </Fragment>
                )}
              />
            </CardBody>
          </Card>
        </Container>

        <Footer />
      </div>
    </Fragment>
  );
};

AddUser.propTypes = {
  addEmployee: PropTypes.func.isRequired,
  registerSubuser: PropTypes.func.isRequired
};

export default connect(null, { addEmployee, registerSubuser })(AddUser);
