import React, { Fragment, useState, useRef, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Formik } from 'formik';
import { SpinnerCircular } from 'spinners-react';

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
  CardHeader,
  CardBody
} from 'reactstrap';

import { getSingleCustomer, updateCustomer } from '../../actions/customer';
import { getEmployees } from '../../actions/employee';

const EditCustomerInformation = ({
  getSingleCustomer,
  updateCustomer,
  getEmployees,
  customer: { customer, singleLoading },
  employees: { employees, loading },
  match
}) => {
  useEffect(() => {
    getSingleCustomer(match.params.id);
    getEmployees();
  }, [getSingleCustomer, getEmployees]);

  const formRef = useRef();
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const [loadingSave, setLoadingSave] = useState(false);

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
                <div className='col-lg-12'>
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
                        <Link to='/customers'>Customers</Link>
                      </li>
                      {customer && customer.length >= 1 && (
                        <li className='breadcrumb-item'>
                          <Link to={`/customers/${match.params.id}`}>
                            {customer[0].firstName} {customer[0].lastName}
                          </Link>
                        </li>
                      )}
                      <li className='breadcrumb-item active'>
                        <Link to='/customers/add'>Edit Customer Details</Link>
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
                  <h3 className='mb-0'>Manage Customer Details:</h3>
                </Col>
                <Col sm={{ size: 4 }} className='d-none d-lg-block'>
                  <div className='text-right'>
                    <Button
                      type='submit'
                      color='success'
                      onClick={handleSubmit}
                    >
                      {loadingSave ? (
                        <span>
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
                        <span>Save Changes</span>
                      )}
                    </Button>
                  </div>
                </Col>
                <Col
                  sm={{ size: 4 }}
                  className='d-block d-sm-block d-md-block d-lg-none'
                >
                  <br />
                  <Button type='submit' color='success' onClick={handleSubmit}>
                    {loadingSave ? (
                      <span>
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
                      <span>Save Changes</span>
                    )}
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            {customer && !singleLoading ? (
              <CardBody>
                <Formik
                  initialValues={{
                    firstName: customer[0].firstName,
                    lastName: customer[0].lastName,
                    email: customer[0].email,
                    mobilePhone: customer[0].mobilePhone,
                    serviceAddress: customer[0].serviceAddress,
                    serviceCity: customer[0].serviceCity,
                    serviceState: customer[0].serviceState,
                    serviceZip: customer[0].serviceZip,
                    gateCode: customer[0].gateCode,
                    canText: customer[0].canText,
                    poolType: customer[0].poolType,
                    technician: customer[0].technician,
                    servicePackageAndRate: customer[0].servicePackageAndRate,
                    altPhone: customer[0].altPhone
                  }}
                  innerRef={formRef}
                  onSubmit={async data => {
                    // console.log(data);
                    setLoadingSave(true);
                    await updateCustomer(match.params.id, data);
                    setLoadingSave(false);
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
                                  value={values.lastName}
                                  placeholder='Doe'
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
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
                                  value={values.mobilePhone}
                                  placeholder='(555) 555-5555'
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg='6'>
                              <FormGroup>
                                <Label
                                  for='email'
                                  className='form-control-label'
                                >
                                  Email address
                                </Label>
                                <Input
                                  type='email'
                                  name='email'
                                  value={values.email}
                                  placeholder='jessie@example.com'
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
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
                              </FormGroup>
                            </Col>
                            <Col lg='6'>
                              <FormGroup>
                                <Label
                                  for='altPhone'
                                  className='form-control-label'
                                >
                                  Alt Phone
                                </Label>
                                <Input
                                  type='text'
                                  name='altPhone'
                                  value={values.altPhone}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  placeholder='(555) 123-4567'
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                        <hr className='my-4' />
                        {/* Address */}
                        <h6 className='heading-small text-muted mb-4'>
                          Service Address
                        </h6>
                        <div className='pl-lg-4'>
                          <Row>
                            <Col lg='12'>
                              <FormGroup>
                                <Label
                                  for='serviceAddress'
                                  className='form-control-label'
                                >
                                  Service Address
                                </Label>
                                <Input
                                  type='text'
                                  name='serviceAddress'
                                  value={values.serviceAddress}
                                  placeholder='2070 Libby Street'
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
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
                                  value={values.serviceCity}
                                  placeholder='Beverly Hills'
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
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
                                  value={values.serviceState}
                                  placeholder='CA'
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
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
                                  value={values.serviceZip}
                                  placeholder='90210'
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <hr className='my-4' />

                          <h6 className='heading-small text-muted mb-4'>
                            Service Information
                          </h6>
                          <div className='pl-lg-4'>
                            <Row>
                              <Col lg='4'>
                                <Label
                                  for='gateCode'
                                  className='form-control-label'
                                >
                                  Gate/Lock Code
                                </Label>
                                <Input
                                  type='text'
                                  name='gateCode'
                                  value={values.gateCode}
                                  placeholder='12345'
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </Col>
                              <Col lg='4'>
                                <Label
                                  for='servicePackage'
                                  className='form-control-label'
                                >
                                  Rate / Service Package
                                </Label>
                                <Input
                                  type='text'
                                  name='servicePackageAndRate'
                                  value={values.servicePackageAndRate}
                                  placeholder='12345'
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </Col>
                              <Col lg='4'>
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

                                  {employees.map(employee => (
                                    <option
                                      key={employee._id}
                                      value={employee._id}
                                    >
                                      {employee.firstName} {employee.lastName}
                                    </option>
                                  ))}
                                </Input>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </Form>
                    </Fragment>
                  )}
                />
              </CardBody>
            ) : (
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
            )}
          </Card>
        </Container>
      </div>
    </Fragment>
  );
};

EditCustomerInformation.propTypes = {
  getSingleCustomer: PropTypes.func.isRequired,
  updateCustomer: PropTypes.func.isRequired,
  getEmployees: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  customer: state.customer.singleCustomer,
  employees: state.employee
});

export default connect(mapStateToProps, {
  getSingleCustomer,
  updateCustomer,
  getEmployees
})(EditCustomerInformation);
