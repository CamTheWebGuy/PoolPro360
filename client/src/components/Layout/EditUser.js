import React, { Fragment, useState, useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { SpinnerCircular } from 'spinners-react';
import {
  updateEmployee,
  getSingleEmployee,
  updateEmployeePassword
} from '../../actions/employee';

import Sidebar from '../dashboard/Sidebar';
import Dashnav from '../dashboard/Dashnav';
import Alert from '../Layout/Alert';
import {
  Button,
  Col,
  Row,
  Container,
  Input,
  Form,
  Label,
  FormGroup,
  Card,
  CardBody,
  CardHeader,
  CardFooter
} from 'reactstrap';

import { Formik } from 'formik';
import * as Yup from 'yup';

const EditUser = ({
  match,
  updateEmployee,
  getSingleEmployee,
  updateEmployeePassword,
  employee
}) => {
  const [savingInfo, setSavingInfo] = useState(false);

  useEffect(() => {
    getSingleEmployee(match.params.id);
  }, [getSingleEmployee]);

  const lowercaseRegex = /(?=.*[a-z])/;
  const uppercaseRegex = /(?=.*[A-X])/;
  const numericRegex = /(?=.*[0-9])/;

  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .matches(lowercaseRegex, 'Password must contain lowercase letter')
      .matches(uppercaseRegex, 'Password must contain uppercase letter')
      .matches(numericRegex, 'Password must contain a number')
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords do not match')
      .required('Please Confirm Password')
  });

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
                        <Link to='/'>
                          <i className='fas fa-home' />
                        </Link>
                      </li>
                      <li className='breadcrumb-item'>
                        <Link to='/dashboard'>Dashboard</Link>
                      </li>
                      <li className='breadcrumb-item'>
                        <Link to='/users'>Users</Link>
                      </li>
                      {employee.length >= 1 && (
                        <li className='breadcrumb-item'>
                          <Link to={`/users/${match.params.id}/view`}>
                            {employee[0].firstName} {employee[0].lastName}
                          </Link>
                        </li>
                      )}
                      <li className='breadcrumb-item active'>
                        <Link to={`/users/${match.params.id}/edit`}>
                          Edit User
                        </Link>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Container className='mgn-ng-top-60'>
          <Card>
            <CardHeader>
              <Row className='align-items-center'>
                <Col sm={{ size: 8 }}>
                  <h3 className='mb-0'>Edit User:</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              {!employee || !employee.length >= 1 ? (
                <Fragment>
                  <div className='text-center'>
                    <h4>Loading Data...</h4>
                    <SpinnerCircular
                      size={54}
                      thickness={180}
                      speed={100}
                      color='rgba(57, 125, 172, 1)'
                      secondaryColor='rgba(0, 0, 0, 0.44)'
                    />
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <Formik
                    initialValues={{
                      firstName: employee[0].firstName,
                      lastName: employee[0].lastName,
                      email: employee[0].email,
                      phone: employee[0].phone,
                      role: employee[0].role
                    }}
                    onSubmit={async data => {
                      setSavingInfo(true);
                      await updateEmployee(match.params.id, data);
                      setSavingInfo(false);
                    }}
                    render={({
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      values,
                      errors,
                      touched,
                      validateForm,
                      isValid
                    }) => (
                      <Fragment>
                        <Form>
                          <h6 className='heading-small text-muted mb-4'>
                            User Information
                          </h6>
                          <div className='pl-lg-4'>
                            <Row>
                              <Col md='3'>
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
                                    placeholder='Johnny'
                                    value={values.firstName}
                                    onChange={handleChange}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md='3'>
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
                                    value={values.lastName}
                                    placeholder='Appleseed'
                                    onChange={handleChange}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md='6'>
                                <FormGroup>
                                  <Label
                                    for='email'
                                    className='form-control-label'
                                  >
                                    Email
                                  </Label>
                                  <Input
                                    type='email'
                                    name='email'
                                    value={values.email}
                                    placeholder='johnny@example.com'
                                    onChange={handleChange}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md='6'>
                                <FormGroup>
                                  <Label
                                    for='role'
                                    className='form-control-label'
                                  >
                                    Role
                                  </Label>
                                  <Input
                                    type='select'
                                    name='role'
                                    value={values.role}
                                    onChange={handleChange}
                                  >
                                    <option>Technician</option>
                                    <option>Logistics</option>
                                    <option>Admin</option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col md='6'>
                                <FormGroup>
                                  <Label
                                    for='Phone'
                                    className='form-control-label'
                                  >
                                    Phone
                                  </Label>
                                  <Input
                                    type='text'
                                    name='phone'
                                    value={values.phone}
                                    placeholder='(555) 555-5555'
                                    onChange={handleChange}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Button
                              color='success'
                              type='submit'
                              onClick={handleSubmit}
                            >
                              {savingInfo ? (
                                <span>
                                  {' '}
                                  <SpinnerCircular
                                    size={24}
                                    thickness={180}
                                    speed={100}
                                    color='rgba(57, 125, 172, 1)'
                                    secondaryColor='rgba(0, 0, 0, 0.44)'
                                  />{' '}
                                  Processing...
                                </span>
                              ) : (
                                <span>Save User Info</span>
                              )}
                            </Button>
                          </div>
                        </Form>
                      </Fragment>
                    )}
                  />

                  <hr className='my-4' />

                  <Formik
                    initialValues={{
                      password: '',
                      confirmPassword: ''
                    }}
                    onSubmit={async data => {
                      updateEmployeePassword(match.params.id, data);
                    }}
                    validationSchema={passwordSchema}
                    render={({
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      values,
                      errors,
                      touched,
                      validateForm,
                      isValid
                    }) => (
                      <Fragment>
                        <h6 className='heading-small text-muted mb-4'>
                          Change Password
                        </h6>
                        <div className='pl-lg-4'>
                          <Form>
                            <Row>
                              <Col md='6'>
                                <FormGroup>
                                  <Label
                                    for='password'
                                    className='form-control-label'
                                  >
                                    New Password
                                  </Label>
                                  <Input
                                    type='password'
                                    name='password'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {errors.password && touched.password && (
                                    <p className='color-red'>
                                      {errors.password}
                                    </p>
                                  )}
                                </FormGroup>
                              </Col>

                              <Col md='6'>
                                <FormGroup>
                                  <Label
                                    for='confirmPassword'
                                    className='form-control-label'
                                  >
                                    Confirm New Password
                                  </Label>
                                  <Input
                                    type='password'
                                    name='confirmPassword'
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
                            <Button
                              color='success'
                              type='submit'
                              onClick={handleSubmit}
                            >
                              Save New Password
                            </Button>
                          </Form>
                        </div>
                      </Fragment>
                    )}
                  />
                </Fragment>
              )}
            </CardBody>
          </Card>
        </Container>
      </div>
    </Fragment>
  );
};

EditUser.propTypes = {
  updateEmployee: PropTypes.func.isRequired,
  getSingleEmployee: PropTypes.func.isRequired,
  updateEmployeePassword: PropTypes.func.isRequired,
  employee: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  employee: state.employee.singleEmployee
});

export default connect(mapStateToProps, {
  updateEmployee,
  getSingleEmployee,
  updateEmployeePassword
})(EditUser);
