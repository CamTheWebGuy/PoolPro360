import React, { Fragment, useState, useRef } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addCustomer } from '../../actions/customer';

import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

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
  FormGroup
} from 'reactstrap';

import { Formik } from 'formik';

import * as Yup from 'yup';

const AddCustomers = ({ addCustomer }) => {
  const [showBilling, setShowBilling] = useState(false);

  const toggleBilling = () => setShowBilling(!showBilling);

  const formSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Please provide a valid email'),
    mobilePhone: Yup.string(),
    serviceAddress: Yup.string().required('Service address is required'),
    serviceCity: Yup.string().required('Service city is required'),
    serviceState: Yup.string().required('Service state is required'),
    serviceZip: Yup.string().required('Service zip is required')
  });

  const formRef = useRef();
  const history = useHistory();
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <Fragment>
      <Sidebar active='customers' />
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
                        <a href='/customers'>Customers</a>
                      </li>
                      <li className='breadcrumb-item active'>
                        <a href='/customers/add'>Add Customer</a>
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
          <div className='card'>
            <div className='card-header'>
              <div className='row align-items-center'>
                <div className='col-8'>
                  <h3 className='mb-0'>Add Customer </h3>
                </div>
                <div className='col-4 text-right'>
                  <Button type='submit' color='primary' onClick={handleSubmit}>
                    Save Customer
                  </Button>
                </div>
              </div>
            </div>
            <div className='card-body'>
              <Formik
                initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  mobilePhone: '',
                  serviceAddress: '',
                  serviceCity: '',
                  serviceState: '',
                  serviceZip: '',
                  gateCode: '',
                  canText: 'N/A',
                  poolType: 'N/A',
                  technician: 'N/A',
                  servicePackageAndRate:
                    'Inactive (Customer Will Not Be Serviced)',
                  billingSame: false,
                  billingType: 'Manual Billing',
                  paymentMethod: 'N/A',
                  billingAddress: '',
                  billingCity: '',
                  billingState: '',
                  billingZip: ''
                }}
                innerRef={formRef}
                validationSchema={formSchema}
                onSubmit={async data => {
                  await addCustomer(data);
                  history.push('/customers');
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
                    <Form onSubmit={handleSubmit}>
                      <h6 className='heading-small text-muted mb-4'>
                        Customer Information
                      </h6>
                      <div className='pl-lg-4'>
                        <Row>
                          <Col lg='6'>
                            <FormGroup>
                              <Label
                                for='firstName'
                                className='form-control-label'
                              >
                                First name
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
                                Last name
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
                              <Label
                                for='mobilePhone'
                                className='form-control-label'
                              >
                                Mobile Number
                              </Label>
                              <Input
                                type='text'
                                name='mobilePhone'
                                placeholder='(555) 555-5555'
                                value={values.mobilePhone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.mobilePhone && touched.mobilePhone && (
                                <p className='color-red'>
                                  {errors.mobilePhone}
                                </p>
                              )}
                            </FormGroup>
                          </Col>
                          <Col lg='6'>
                            <FormGroup>
                              <Label for='email' className='form-control-label'>
                                Email address
                              </Label>
                              <Input
                                type='email'
                                name='email'
                                placeholder='jessie@example.com'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.email && touched.email && (
                                <p className='color-red'>{errors.email}</p>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg='6'>
                            <FormGroup>
                              <Label
                                for='canText'
                                className='form-control-label'
                              >
                                Can text?
                              </Label>
                              <Input
                                type='select'
                                name='canText'
                                value={values.canText}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>N/A</option>
                                <option>Yes</option>
                                <option>No</option>
                              </Input>
                              {errors.canText && touched.canText && (
                                <p className='color-red'>{errors.canText}</p>
                              )}
                            </FormGroup>
                          </Col>
                          <Col lg='6'>
                            <FormGroup>
                              <Label
                                for='poolType'
                                className='form-control-label'
                              >
                                Pool Type
                              </Label>
                              <Input
                                type='select'
                                name='poolType'
                                value={values.poolType}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>N/A</option>
                                <option>Residential</option>
                                <option>Commercial</option>
                              </Input>
                              {errors.poolType && touched.poolType && (
                                <p className='color-red'>{errors.poolType}</p>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                      <hr className='my-4' />
                      {/* Address */}
                      <h6 className='heading-small text-muted mb-4'>
                        Service information
                      </h6>
                      <div className='pl-lg-4'>
                        <Row>
                          <Col lg='12'>
                            <FormGroup>
                              <Label
                                for='serviceAddress'
                                className='form-control-label'
                              >
                                Address
                              </Label>
                              <Input
                                type='text'
                                name='serviceAddress'
                                placeholder='2070 Libby Street'
                                value={values.serviceAddress}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.serviceAddress &&
                                touched.serviceAddress && (
                                  <p className='color-red'>
                                    {errors.serviceAddress}
                                  </p>
                                )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg='4'>
                            <FormGroup>
                              <Label
                                for='serviceCity'
                                className='form-control-label'
                              >
                                City
                              </Label>
                              <Input
                                type='text'
                                name='serviceCity'
                                placeholder='Beverly Hills'
                                value={values.serviceCity}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.serviceCity && touched.serviceCity && (
                                <p className='color-red'>
                                  {errors.serviceCity}
                                </p>
                              )}
                            </FormGroup>
                          </Col>
                          <Col lg='4'>
                            <FormGroup>
                              <Label
                                for='serviceState'
                                className='form-control-label'
                              >
                                State
                              </Label>
                              <Input
                                type='text'
                                name='serviceState'
                                placeholder='CA'
                                value={values.serviceState}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.serviceState && touched.serviceState && (
                                <p className='color-red'>
                                  {errors.serviceState}
                                </p>
                              )}
                            </FormGroup>
                          </Col>
                          <Col lg='4'>
                            <FormGroup>
                              <Label
                                for='serviceZip'
                                className='form-control-label'
                              >
                                Zip
                              </Label>
                              <Input
                                type='text'
                                name='serviceZip'
                                placeholder='90210'
                                value={values.serviceZip}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.serviceZip && touched.serviceZip && (
                                <p className='color-red'>{errors.serviceZip}</p>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg='6'>
                            <Label
                              for='gateCode'
                              className='form-control-label'
                            >
                              Gate/Lock Code
                            </Label>
                            <Input
                              type='text'
                              name='gateCode'
                              placeholder='12345'
                              value={values.gateCode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Col>
                          <Col lg='6'>
                            <Label
                              for='technician'
                              className='form-control-label'
                            >
                              Assigned Technician
                            </Label>
                            <Input
                              type='select'
                              name='technician'
                              value={values.technician}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option>N/A</option>
                              <option>Gavin Byrd</option>
                              <option>Nicci Troiani</option>
                              <option>George Fields</option>
                            </Input>
                          </Col>
                        </Row>
                      </div>
                      <hr className='my-4' />
                      <h6 className='heading-small text-muted mb-4'>
                        Billing information
                      </h6>
                      <div className='pl-lg-4'>
                        <Row>
                          <Col lg='12'>
                            <FormGroup>
                              <Input
                                name='billingSame'
                                type='checkbox'
                                onClick={toggleBilling}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <Label
                                for='billingSame'
                                className='form-control-label'
                              >
                                Billing Address Same as Service Address?
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                        {!showBilling && (
                          <Fragment>
                            <Row>
                              <Col lg='12'>
                                <FormGroup>
                                  <Label
                                    for='billingAddress'
                                    className='form-control-label'
                                  >
                                    Billing Address
                                  </Label>
                                  <Input
                                    name='billingAddress'
                                    type='text'
                                    placeholder='2070 Mercer Avenue'
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg='4'>
                                <FormGroup>
                                  <Label
                                    for='billingCity'
                                    className='form-control-label'
                                  >
                                    Billing City
                                  </Label>
                                  <Input
                                    name='billingCity'
                                    type='text'
                                    placeholder='Beverly Hills'
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg='4'>
                                <FormGroup>
                                  <Label
                                    for='billingState'
                                    className='form-control-label'
                                  >
                                    Billing State
                                  </Label>
                                  <Input
                                    name='billingState'
                                    type='text'
                                    placeholder='CA'
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg='4'>
                                <FormGroup>
                                  <Label
                                    for='billingZip'
                                    className='form-control-label'
                                  >
                                    Billing Zip
                                  </Label>
                                  <Input
                                    name='billingZip'
                                    type='text'
                                    placeholder='90210'
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </Fragment>
                        )}
                      </div>
                    </Form>
                  </Fragment>
                )}
              />
            </div>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

AddCustomers.propTypes = {
  addCustomer: PropTypes.func.isRequired
};

export default connect(null, { addCustomer })(AddCustomers);
