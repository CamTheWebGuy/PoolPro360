import React, { Fragment, useState, useEffect, useRef } from 'react';

import classnames from 'classnames';

import { Link } from 'react-router-dom';

import Alert from '../Layout/Alert';

import emailExample from '../../img/emails/Example.JPG';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  updateAccountEmailSettings,
  updateAccountEmailReadings,
  getEmailSettings
} from '../../actions/customer';
import {
  updateBusinessInfo,
  getBusinessInfo,
  updateMyInfo,
  updateMyPassword
} from '../../actions/user';

import {
  Container,
  Row,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  Input,
  FormGroup,
  Badge,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardText,
  CardTitle
} from 'reactstrap';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { SpinnerCircular } from 'spinners-react';
import ImageUploader from 'react-images-upload';

import axios from 'axios';

import Sidebar from '../dashboard/Sidebar';
import Dashnav from '../dashboard/Dashnav';
import Footer from '../Layout/Footer';

const Settings = ({
  updateAccountEmailSettings,
  updateAccountEmailReadings,
  updateBusinessInfo,
  getBusinessInfo,
  getEmailSettings,
  updateMyInfo,
  updateMyPassword,
  businessInfo: { businessInfo, emailSettings, loading, emailLoading },
  auth: { user, isAuthenticated }
}) => {
  const [activeTab, setActiveTab] = useState('1');
  const [isProcessing, setIsProcessing] = useState(false);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const emailRef = useRef();

  const handleEmailSubmit = () => {
    if (emailRef.current) {
      emailRef.current.handleSubmit();
    }
  };

  const [logoState, setLogoState] = useState({ pictures: [] });

  const onDrop = picture => {
    setLogoState({
      pictures: picture
    });
  };

  const uploadLogo = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      let uploadPromises = logoState.pictures.map(image => {
        let data = new FormData();
        data.append('image', image, image.name);
        return axios.post('/api/users/updateLogo', data, config);
      });

      await axios.all(uploadPromises);
    } catch (err) {
      console.log(err);
    }
  };

  const [infoProcessing, setInfoProcessing] = useState(null);

  const lowercaseRegex = /(?=.*[a-z])/;
  const uppercaseRegex = /(?=.*[A-X])/;
  const numericRegex = /(?=.*[0-9])/;

  const passSchema = Yup.object().shape({
    currentPassword: Yup.string().required(
      'Please enter your current password'
    ),
    newPassword: Yup.string()
      .required('Please enter a new password')
      .matches(lowercaseRegex, 'Password must contain lowercase letter')
      .matches(uppercaseRegex, 'Password must contain uppercase letter')
      .matches(numericRegex, 'Password must contain a number')
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
      .required('Please confirm your password')
  });

  useEffect(() => {
    if (user && user.role !== 'Technician') {
      getBusinessInfo();
      getEmailSettings();
    }
  }, [getBusinessInfo, getEmailSettings, user]);

  return (
    <Fragment>
      <Alert />
      <Sidebar active='settings' />
      <div className='main-content' id='panel'>
        <Dashnav />
        <div className='header bg-primary pb-6'>
          <div className='container-fluid'>
            <div className='header-body'>
              <div className='row align-items-center py-4'>
                <div className='col-lg-12 col-12'>
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
                      <li className='breadcrumb-item active'>
                        <Link to='/account-settings'>Settings</Link>
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
              <div className='row align-items-center'>
                <Col lg={{ size: 'auto' }}>
                  <h3 className='mb-0'>Account Settings</h3>
                </Col>
              </div>
            </CardHeader>
            {user && isAuthenticated && (
              <Fragment>
                {user.role === 'Technician' ? (
                  <CardBody>
                    <Row>
                      <Col>
                        <Formik
                          initialValues={{
                            firstName: user.firstName ? user.firstName : '',
                            lastName: user.lastName ? user.lastName : '',
                            email: user.email ? user.email : ''
                          }}
                          onSubmit={async data => {
                            updateMyInfo(data);
                          }}
                          render={({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values
                          }) => (
                            <Fragment>
                              <Form>
                                <Row>
                                  <Col>
                                    <Row>
                                      <Col>
                                        <FormGroup>
                                          <Label className='form-control-label'>
                                            First Name:
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
                                      <Col>
                                        <FormGroup>
                                          <Label className='form-control-label'>
                                            Last Name:
                                          </Label>
                                          <Input
                                            type='text'
                                            placeholder='Doe'
                                            name='lastName'
                                            value={values.lastName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                          />
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col>
                                        <FormGroup>
                                          <Label className='form-control-label'>
                                            Email:
                                          </Label>
                                          <Input
                                            type='text'
                                            name='email'
                                            placeholder='john.doe@example.com'
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                          />
                                          <small>
                                            If email is changed, the email
                                            linked to your account won't be
                                            updated until you confirm it. We
                                            will send a confirmation email to
                                            your currently linked email account.
                                          </small>
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                                <Button
                                  className='btn-icon'
                                  color='success'
                                  type='submit'
                                  onClick={handleSubmit}
                                  block
                                >
                                  <span className='btn-inner--icon'>
                                    <i className='fas fa-save'></i>
                                  </span>
                                  {infoProcessing ? (
                                    <span className='btn-inner--text'>
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
                                    <span className='btn-inner--text'>
                                      Save Changes
                                    </span>
                                  )}
                                </Button>
                              </Form>
                            </Fragment>
                          )}
                        />
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col>
                        <h3>Change Password:</h3>
                        <Formik
                          initialValues={{
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: ''
                          }}
                          onSubmit={data => {
                            updateMyPassword(data);
                          }}
                          validationSchema={passSchema}
                          render={({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            errors,
                            touched
                          }) => (
                            <Form onSubmit={handleSubmit}>
                              <Row>
                                <Col>
                                  <FormGroup>
                                    <Input
                                      type='password'
                                      name='currentPassword'
                                      value={values.currentPassword}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      placeholder='Current Password'
                                    />
                                    {errors.currentPassword &&
                                      touched.currentPassword && (
                                        <p className='color-red'>
                                          {errors.currentPassword}
                                        </p>
                                      )}
                                  </FormGroup>
                                </Col>
                                <Col>
                                  <FormGroup>
                                    <Input
                                      type='password'
                                      name='newPassword'
                                      value={values.newPassword}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      placeholder='New Password'
                                    />
                                    {errors.newPassword &&
                                      touched.newPassword && (
                                        <p className='color-red'>
                                          {errors.newPassword}
                                        </p>
                                      )}
                                  </FormGroup>
                                </Col>
                                <Col>
                                  <FormGroup>
                                    <Input
                                      type='password'
                                      name='confirmPassword'
                                      value={values.confirmPassword}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      placeholder='Confirm Password'
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
                                className='btn-icon'
                                color='primary'
                                type='submit'
                                onClick={handleSubmit}
                                block
                              >
                                <span className='btn-inner--icon'>
                                  <i className='fas fa-save'></i>
                                </span>
                                {infoProcessing ? (
                                  <span className='btn-inner--text'>
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
                                  <span className='btn-inner--text'>
                                    Change Password
                                  </span>
                                )}
                              </Button>
                            </Form>
                          )}
                        />
                      </Col>
                    </Row>
                  </CardBody>
                ) : (
                  <Fragment>
                    <CardBody>
                      <div>
                        <Nav tabs>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === '1'
                              })}
                              onClick={() => {
                                toggle('1');
                              }}
                            >
                              Business Information
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === '5'
                              })}
                              onClick={() => {
                                toggle('5');
                              }}
                            >
                              My Information
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === '2'
                              })}
                              onClick={() => {
                                toggle('2');
                              }}
                            >
                              Email Settings
                            </NavLink>
                          </NavItem>

                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === '3'
                              })}
                              onClick={() => {
                                toggle('3');
                              }}
                            >
                              Email Chemical Fields
                            </NavLink>
                          </NavItem>

                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === '4'
                              })}
                              onClick={() => {
                                toggle('4');
                              }}
                            >
                              User Permissions
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </div>

                      <TabContent activeTab={activeTab}>
                        <TabPane tabId='1'>
                          <Row>
                            <Col sm='12'>
                              {!loading && businessInfo ? (
                                <Formik
                                  initialValues={{
                                    businessName: businessInfo
                                      ? businessInfo.businessName
                                      : '',
                                    businessPhone: businessInfo
                                      ? businessInfo.businessPhone
                                      : '',
                                    businessEmail: businessInfo
                                      ? businessInfo.businessEmail
                                      : '',
                                    businessAddress:
                                      businessInfo.businessAddress
                                  }}
                                  onSubmit={async data => {
                                    setInfoProcessing(true);
                                    await uploadLogo();
                                    await updateBusinessInfo(data);
                                    // await getBusinessInfo();
                                    setInfoProcessing(false);
                                  }}
                                  render={({
                                    handleSubmit,
                                    handleChange,
                                    handleBlur,
                                    values
                                  }) => (
                                    <Container>
                                      <Form>
                                        <br />
                                        <h6 className='heading-small text-muted mb-4'>
                                          Business Settings:
                                        </h6>

                                        <div className='pl-lg-4'>
                                          <Row>
                                            <Col>
                                              <FormGroup>
                                                <Label className='form-control-label'>
                                                  Business Logo:
                                                </Label>{' '}
                                                <br />
                                                {businessInfo.businessLogo && (
                                                  <img
                                                    width='50%'
                                                    src={
                                                      businessInfo.businessLogo
                                                    }
                                                    alt={
                                                      businessInfo.businessName
                                                    }
                                                  />
                                                )}
                                                <ImageUploader
                                                  withIcon={true}
                                                  buttonText='Choose Image'
                                                  onChange={onDrop}
                                                  imgExtension={[
                                                    '.jpg',
                                                    '.gif',
                                                    '.png',
                                                    '.gif'
                                                  ]}
                                                  maxFileSize={5242880}
                                                  withPreview={true}
                                                  singleImage={true}
                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col>
                                              <FormGroup>
                                                <Label className='form-control-label'>
                                                  Business Name:
                                                </Label>
                                                <Input
                                                  type='text'
                                                  name='businessName'
                                                  value={values.businessName}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                />
                                              </FormGroup>

                                              <FormGroup>
                                                <Label className='form-control-label'>
                                                  Business Phone:
                                                </Label>
                                                <Input
                                                  type='tel'
                                                  name='businessPhone'
                                                  value={values.businessPhone}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                />
                                              </FormGroup>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <FormGroup>
                                                <Label className='form-control-label'>
                                                  Business Email:
                                                </Label>
                                                <Input
                                                  type='tel'
                                                  name='businessEmail'
                                                  value={values.businessEmail}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                />
                                              </FormGroup>

                                              <FormGroup>
                                                <Label className='form-control-label'>
                                                  Business Address:
                                                </Label>
                                                <Input
                                                  type='tel'
                                                  name='businessAddress'
                                                  value={values.businessAddress}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                />
                                              </FormGroup>
                                            </Col>
                                          </Row>
                                        </div>
                                      </Form>
                                      <Button
                                        className='btn-icon'
                                        color='success'
                                        type='submit'
                                        onClick={handleSubmit}
                                        block
                                      >
                                        <span className='btn-inner--icon'>
                                          <i className='fas fa-save'></i>
                                        </span>
                                        {infoProcessing ? (
                                          <span className='btn-inner--text'>
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
                                          <span className='btn-inner--text'>
                                            Save Changes
                                          </span>
                                        )}
                                      </Button>
                                    </Container>
                                  )}
                                />
                              ) : (
                                <Container>
                                  <div className='text-center mgn-top-50'>
                                    <Row>
                                      <Col sm='12'>
                                        <SpinnerCircular
                                          size={40}
                                          thickness={180}
                                          speed={100}
                                          color='rgba(57, 125, 172, 1)'
                                          secondaryColor='rgba(0, 0, 0, 0.44)'
                                        />{' '}
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col sm='12'>
                                        <h4>Loading Data...</h4>
                                      </Col>
                                    </Row>
                                  </div>
                                </Container>
                              )}
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId='2'>
                          <Row>
                            {!emailLoading && emailSettings ? (
                              <Formik
                                initialValues={{
                                  emailSendWorkOrder:
                                    emailSettings.emailSendWorkOrder,
                                  emailSendUnable:
                                    emailSettings.emailSendUnable,
                                  emailSendSummary:
                                    emailSettings.emailSendSummary,
                                  emailSendChecklist:
                                    emailSettings.emailSendChecklist,
                                  emailSendReadings:
                                    emailSettings.emailSendReadings,
                                  emailShowReadingNumbers:
                                    emailSettings.emailShowReadingNumbers,
                                  emailShowChemicalsUsed:
                                    emailSettings.emailShowChemicalsUsed,
                                  emailSendTechnician:
                                    emailSettings.emailShowTechnician
                                }}
                                onSubmit={async data => {
                                  setIsProcessing(true);

                                  await updateAccountEmailSettings(data);
                                  setIsProcessing(false);
                                }}
                                innerRef={emailRef}
                                render={({
                                  handleSubmit,
                                  handleChange,
                                  handleBlur,
                                  values
                                }) => (
                                  <Container>
                                    <Form onSubmit={handleSubmit}>
                                      <br />
                                      <h6 className='heading-small text-muted mb-4'>
                                        Service Emails:
                                      </h6>

                                      <div className='pl-lg-4'>
                                        <Row>
                                          <Col>
                                            {' '}
                                            <FormGroup>
                                              <Label className='form-control-label'>
                                                Send Email When Work Order
                                                Completed? <br />
                                                <small>
                                                  <em>
                                                    Default: Enabled - If
                                                    enabled, a email is sent to
                                                    the customer any time a work
                                                    order is marked "Completed".
                                                    An email will NOT be sent if
                                                    a work order is marked as
                                                    "Closed"
                                                  </em>
                                                </small>
                                              </Label>

                                              <br />
                                              <Label className='custom-toggle'>
                                                <Input
                                                  type='checkbox'
                                                  name='emailSendWorkOrder'
                                                  onChange={handleChange}
                                                  checked={
                                                    values.emailSendWorkOrder
                                                  }
                                                />
                                                <span
                                                  className='custom-toggle-slider rounded-circle'
                                                  data-label-off='No'
                                                  data-label-on='Yes'
                                                ></span>
                                              </Label>
                                            </FormGroup>
                                            <FormGroup>
                                              <Label className='form-control-label'>
                                                Send Email If Unable To Service?{' '}
                                                <br />
                                                <small>
                                                  <em>
                                                    Default: Enabled - If
                                                    enabled, a email is sent to
                                                    the customer any time a
                                                    technician marks a customer
                                                    as "Unable To Service"
                                                    during their route. This
                                                    will also send the customer
                                                    the reason for being unable
                                                    to service the pool that the
                                                    technician enters when they
                                                    mark it as such.
                                                  </em>
                                                </small>
                                              </Label>

                                              <br />
                                              <Label className='custom-toggle'>
                                                <Input
                                                  type='checkbox'
                                                  name='emailSendUnable'
                                                  onChange={handleChange}
                                                  checked={
                                                    values.emailSendUnable
                                                  }
                                                />
                                                <span
                                                  className='custom-toggle-slider rounded-circle'
                                                  data-label-off='No'
                                                  data-label-on='Yes'
                                                ></span>
                                              </Label>
                                            </FormGroup>
                                            <FormGroup>
                                              <Label className='form-control-label'>
                                                Send Service Summary to
                                                Customer? <br />
                                                <small>
                                                  <em>
                                                    Default: Enabled - If
                                                    enabled, a email summary
                                                    will be emailed to the
                                                    customer each time a
                                                    technician logs a service
                                                    visit for that customer.
                                                  </em>
                                                </small>
                                              </Label>

                                              <br />
                                              <Label className='custom-toggle'>
                                                <Input
                                                  type='checkbox'
                                                  name='emailSendSummary'
                                                  onChange={handleChange}
                                                  checked={
                                                    values.emailSendSummary
                                                  }
                                                />
                                                <span
                                                  className='custom-toggle-slider rounded-circle'
                                                  data-label-off='No'
                                                  data-label-on='Yes'
                                                ></span>
                                              </Label>
                                              <div
                                                style={{
                                                  width: 10,
                                                  height: 10,
                                                  backgroundColor: 'red'
                                                }}
                                              ></div>
                                            </FormGroup>
                                            <FormGroup>
                                              <Label className='form-control-label'>
                                                Send Technician Name? <br />
                                                <small>
                                                  <em>
                                                    Default: Enabled - If
                                                    enabled, will attach
                                                    technicians name to email
                                                    sent to customer.
                                                  </em>
                                                </small>
                                              </Label>

                                              <br />
                                              <Label className='custom-toggle'>
                                                <Input
                                                  type='checkbox'
                                                  name='emailSendTechnician'
                                                  onChange={handleChange}
                                                  checked={
                                                    values.emailSendTechnician
                                                  }
                                                />
                                                <span
                                                  className='custom-toggle-slider rounded-circle'
                                                  data-label-off='No'
                                                  data-label-on='Yes'
                                                ></span>
                                              </Label>
                                            </FormGroup>
                                            <FormGroup>
                                              <Label className='form-control-label'>
                                                Send Service Checklist?
                                                <br />
                                                <small>
                                                  <em>
                                                    Default: Enabled - This will
                                                    attach a list of all
                                                    completed services.
                                                  </em>
                                                </small>
                                              </Label>
                                              <br />
                                              <Label className='custom-toggle'>
                                                <Input
                                                  type='checkbox'
                                                  name='emailSendChecklist'
                                                  onChange={handleChange}
                                                  checked={
                                                    values.emailSendChecklist
                                                  }
                                                />
                                                <span
                                                  className='custom-toggle-slider rounded-circle'
                                                  data-label-off='No'
                                                  data-label-on='Yes'
                                                ></span>
                                              </Label>
                                              <div
                                                style={{
                                                  width: 10,
                                                  height: 10,
                                                  backgroundColor: 'orange'
                                                }}
                                              ></div>
                                            </FormGroup>
                                            <FormGroup>
                                              <Label className='form-control-label'>
                                                Send Chemical Readings?
                                                <br />
                                                <small>
                                                  <em>
                                                    Default: Enabled - This will
                                                    attach a list of chemical
                                                    readings.
                                                  </em>
                                                </small>
                                              </Label>
                                              <br />
                                              <Label className='custom-toggle'>
                                                <Input
                                                  type='checkbox'
                                                  name='emailSendReadings'
                                                  onChange={handleChange}
                                                  checked={
                                                    values.emailSendReadings
                                                  }
                                                />
                                                <span
                                                  className='custom-toggle-slider rounded-circle'
                                                  data-label-off='No'
                                                  data-label-on='Yes'
                                                ></span>
                                              </Label>
                                              <div
                                                style={{
                                                  width: 10,
                                                  height: 10,
                                                  backgroundColor: 'dodgerblue'
                                                }}
                                              ></div>
                                            </FormGroup>
                                            <FormGroup>
                                              <Label className='form-control-label'>
                                                Show Chemical Reading Numbers?
                                                <br />
                                                <small>
                                                  <em>
                                                    Default: Disabled - By
                                                    default the chemical
                                                    readings will be sent to the
                                                    customer as "Average",
                                                    "Below Average" or "Above
                                                    Average". With this option
                                                    enabled the exact reading
                                                    numbers will be sent to the
                                                    customer.
                                                  </em>
                                                </small>
                                              </Label>
                                              <br />
                                              <Label className='custom-toggle'>
                                                <Input
                                                  type='checkbox'
                                                  name='emailShowReadingNumbers'
                                                  onChange={handleChange}
                                                  checked={
                                                    values.emailShowReadingNumbers
                                                  }
                                                />
                                                <span
                                                  className='custom-toggle-slider rounded-circle'
                                                  data-label-off='No'
                                                  data-label-on='Yes'
                                                ></span>
                                              </Label>
                                              <div
                                                style={{
                                                  width: 10,
                                                  height: 10,
                                                  backgroundColor: 'dodgerblue'
                                                }}
                                              ></div>
                                            </FormGroup>
                                            <FormGroup>
                                              <Label className='form-control-label'>
                                                Send Chemicals Used?
                                                <br />
                                                <small>
                                                  <em>
                                                    Default: Enabled - Sends a
                                                    list of the chemicals added
                                                    to the pool during service
                                                    visit.
                                                  </em>
                                                </small>
                                              </Label>
                                              <br />
                                              <Label className='custom-toggle'>
                                                <Input
                                                  type='checkbox'
                                                  name='emailShowChemicalsUsed'
                                                  onChange={handleChange}
                                                  checked={
                                                    values.emailShowChemicalsUsed
                                                  }
                                                />
                                                <span
                                                  className='custom-toggle-slider rounded-circle'
                                                  data-label-off='No'
                                                  data-label-on='Yes'
                                                ></span>
                                              </Label>
                                              <div
                                                style={{
                                                  width: 10,
                                                  height: 10,
                                                  backgroundColor: 'purple'
                                                }}
                                              ></div>
                                            </FormGroup>
                                            <Button
                                              className='btn-icon'
                                              type='submit'
                                              color='success'
                                              onClick={handleSubmit}
                                              block
                                            >
                                              <span className='btn-inner--icon'>
                                                <i className='fas fa-save'></i>
                                              </span>
                                              {isProcessing ? (
                                                <span className='btn-inner--text'>
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
                                                <span className='btn-inner--text'>
                                                  Save Changes
                                                </span>
                                              )}
                                            </Button>
                                          </Col>
                                          <Col>
                                            <Card>
                                              <CardBody className='text-center'>
                                                <img src={emailExample} />
                                              </CardBody>
                                            </Card>
                                          </Col>
                                        </Row>
                                      </div>
                                    </Form>
                                  </Container>
                                )}
                              />
                            ) : (
                              <Container>
                                <div className='text-center mgn-top-50'>
                                  <Row>
                                    <Col sm='12'>
                                      <SpinnerCircular
                                        size={40}
                                        thickness={180}
                                        speed={100}
                                        color='rgba(57, 125, 172, 1)'
                                        secondaryColor='rgba(0, 0, 0, 0.44)'
                                      />{' '}
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col sm='12'>
                                      <h4>Loading Data...</h4>
                                    </Col>
                                  </Row>
                                </div>
                              </Container>
                            )}
                          </Row>
                        </TabPane>

                        <TabPane tabId='3'>
                          <Row>
                            <Col sm='12'>
                              {!emailLoading && emailSettings ? (
                                <Formik
                                  initialValues={{
                                    freeChlorine:
                                      emailSettings.emailSendFreeChlorine,
                                    pHlevel: emailSettings.emailSendpHlevel,
                                    alkalinity:
                                      emailSettings.emailSendAlkalinity,
                                    conditionerLevel:
                                      emailSettings.emailSendConditioner,
                                    hardness: emailSettings.emailSendHardness,
                                    phosphateLevel:
                                      emailSettings.emailSendPhosphateLevel,
                                    saltLevel: emailSettings.emailSendSaltLevel
                                  }}
                                  onSubmit={async data => {
                                    setIsProcessing(true);
                                    await updateAccountEmailReadings(data);

                                    setIsProcessing(false);
                                  }}
                                  render={({
                                    handleSubmit,
                                    handleChange,
                                    handleBlur,
                                    values
                                  }) => (
                                    <Container>
                                      <Form>
                                        <br />
                                        <h6 className='heading-small text-muted mb-4'>
                                          Email Chemical Field Settings: <br />
                                          <small>
                                            If the "Send Chemical Readings?"
                                            option is enabled you can choose
                                            what readings to send the customer
                                            here.
                                          </small>
                                        </h6>

                                        <div className='pl-lg-4'>
                                          <Row>
                                            <Col sm='6'>
                                              <FormGroup>
                                                <Label className='form-control-label'>
                                                  Send Free Chlorine Level?
                                                </Label>
                                                <br />
                                                <Label className='custom-toggle'>
                                                  <Input
                                                    type='checkbox'
                                                    name='freeChlorine'
                                                    onChange={handleChange}
                                                    checked={
                                                      values.freeChlorine
                                                    }
                                                  />
                                                  <span
                                                    className='custom-toggle-slider rounded-circle'
                                                    data-label-off='No'
                                                    data-label-on='Yes'
                                                  ></span>
                                                </Label>
                                              </FormGroup>
                                            </Col>
                                            <Col sm='6'>
                                              <FormGroup>
                                                <Label className='form-control-label'>
                                                  Send pH Level?
                                                </Label>
                                                <br />
                                                <Label className='custom-toggle'>
                                                  <Input
                                                    type='checkbox'
                                                    name='pHlevel'
                                                    onChange={handleChange}
                                                    checked={values.pHlevel}
                                                  />
                                                  <span
                                                    className='custom-toggle-slider rounded-circle'
                                                    data-label-off='No'
                                                    data-label-on='Yes'
                                                  ></span>
                                                </Label>
                                              </FormGroup>
                                            </Col>
                                          </Row>

                                          <Row>
                                            <Col sm='6'>
                                              <FormGroup>
                                                <Label className='form-control-label'>
                                                  Send Alkalinity Level?
                                                </Label>
                                                <br />
                                                <Label className='custom-toggle'>
                                                  <Input
                                                    type='checkbox'
                                                    name='alkalinity'
                                                    onChange={handleChange}
                                                    checked={values.alkalinity}
                                                  />
                                                  <span
                                                    className='custom-toggle-slider rounded-circle'
                                                    data-label-off='No'
                                                    data-label-on='Yes'
                                                  ></span>
                                                </Label>
                                              </FormGroup>
                                            </Col>
                                            <Col sm='6'>
                                              <FormGroup>
                                                <Label className='form-control-label'>
                                                  Send Conditioner Level?
                                                </Label>
                                                <br />
                                                <Label className='custom-toggle'>
                                                  <Input
                                                    type='checkbox'
                                                    name='conditionerLevel'
                                                    onChange={handleChange}
                                                    checked={
                                                      values.conditionerLevel
                                                    }
                                                  />
                                                  <span
                                                    className='custom-toggle-slider rounded-circle'
                                                    data-label-off='No'
                                                    data-label-on='Yes'
                                                  ></span>
                                                </Label>
                                              </FormGroup>
                                            </Col>
                                          </Row>

                                          <Row>
                                            <Col sm='6'>
                                              <FormGroup>
                                                <Label className='form-control-label'>
                                                  Send Hardness Level?
                                                </Label>
                                                <br />
                                                <Label className='custom-toggle'>
                                                  <Input
                                                    type='checkbox'
                                                    name='hardness'
                                                    onChange={handleChange}
                                                    checked={values.hardness}
                                                  />
                                                  <span
                                                    className='custom-toggle-slider rounded-circle'
                                                    data-label-off='No'
                                                    data-label-on='Yes'
                                                  ></span>
                                                </Label>
                                              </FormGroup>
                                            </Col>
                                            <Col sm='6'>
                                              <FormGroup>
                                                <Label className='form-control-label'>
                                                  Send Phosphate Level?
                                                </Label>
                                                <br />
                                                <Label className='custom-toggle'>
                                                  <Input
                                                    type='checkbox'
                                                    name='phosphateLevel'
                                                    onChange={handleChange}
                                                    checked={
                                                      values.phosphateLevel
                                                    }
                                                  />
                                                  <span
                                                    className='custom-toggle-slider rounded-circle'
                                                    data-label-off='No'
                                                    data-label-on='Yes'
                                                  ></span>
                                                </Label>
                                              </FormGroup>
                                            </Col>
                                          </Row>

                                          <Row>
                                            <Col sm='6'>
                                              <FormGroup>
                                                <Label className='form-control-label'>
                                                  Send Salt Level?
                                                </Label>
                                                <br />
                                                <Label className='custom-toggle'>
                                                  <Input
                                                    type='checkbox'
                                                    name='saltLevel'
                                                    onChange={handleChange}
                                                    checked={values.saltLevel}
                                                  />
                                                  <span
                                                    className='custom-toggle-slider rounded-circle'
                                                    data-label-off='No'
                                                    data-label-on='Yes'
                                                  ></span>
                                                </Label>
                                              </FormGroup>
                                            </Col>
                                          </Row>
                                          <Button
                                            className='btn-icon'
                                            type='submit'
                                            color='success'
                                            onClick={handleSubmit}
                                            block
                                          >
                                            <span className='btn-inner--icon'>
                                              <i className='fas fa-save'></i>
                                            </span>
                                            {isProcessing ? (
                                              <span className='btn-inner--text'>
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
                                              <span className='btn-inner--text'>
                                                Save Changes
                                              </span>
                                            )}
                                          </Button>
                                        </div>
                                      </Form>
                                    </Container>
                                  )}
                                />
                              ) : (
                                <Container>
                                  <div className='text-center mgn-top-50'>
                                    <Row>
                                      <Col sm='12'>
                                        <SpinnerCircular
                                          size={40}
                                          thickness={180}
                                          speed={100}
                                          color='rgba(57, 125, 172, 1)'
                                          secondaryColor='rgba(0, 0, 0, 0.44)'
                                        />{' '}
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col sm='12'>
                                        <h4>Loading Data...</h4>
                                      </Col>
                                    </Row>
                                  </div>
                                </Container>
                              )}
                            </Col>
                          </Row>
                        </TabPane>

                        <TabPane tabId='4'>
                          <Row>
                            <Col sm='12'>
                              <h4>User Permissions</h4>
                            </Col>
                          </Row>
                        </TabPane>

                        <TabPane tabId='5'>
                          <br />
                          <Row>
                            <Col>
                              <Formik
                                initialValues={{
                                  firstName: user.firstName
                                    ? user.firstName
                                    : '',
                                  lastName: user.lastName ? user.lastName : '',
                                  email: user.email ? user.email : ''
                                }}
                                onSubmit={async data => {
                                  updateMyInfo(data);
                                }}
                                render={({
                                  handleSubmit,
                                  handleChange,
                                  handleBlur,
                                  values
                                }) => (
                                  <Fragment>
                                    <Form>
                                      <Row>
                                        <Col>
                                          <Row>
                                            <Col>
                                              <FormGroup>
                                                <Label className='form-control-label'>
                                                  First Name:
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
                                            <Col>
                                              <FormGroup>
                                                <Label className='form-control-label'>
                                                  Last Name:
                                                </Label>
                                                <Input
                                                  type='text'
                                                  placeholder='Doe'
                                                  name='lastName'
                                                  value={values.lastName}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                />
                                              </FormGroup>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <FormGroup>
                                                <Label className='form-control-label'>
                                                  Email:
                                                </Label>
                                                <Input
                                                  type='text'
                                                  name='email'
                                                  placeholder='john.doe@example.com'
                                                  value={values.email}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                />
                                                <small>
                                                  If email is changed, the email
                                                  linked to your account won't
                                                  be updated until you confirm
                                                  it. We will send a
                                                  confirmation email to your
                                                  currently linked email
                                                  account.
                                                </small>
                                              </FormGroup>
                                            </Col>
                                          </Row>
                                        </Col>
                                      </Row>
                                      <Button
                                        className='btn-icon'
                                        color='success'
                                        type='submit'
                                        onClick={handleSubmit}
                                        block
                                      >
                                        <span className='btn-inner--icon'>
                                          <i className='fas fa-save'></i>
                                        </span>
                                        {infoProcessing ? (
                                          <span className='btn-inner--text'>
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
                                          <span className='btn-inner--text'>
                                            Save Changes
                                          </span>
                                        )}
                                      </Button>
                                    </Form>
                                  </Fragment>
                                )}
                              />
                            </Col>
                          </Row>
                          <hr />
                          <Row>
                            <Col>
                              <h3>Change Password:</h3>
                              <Formik
                                initialValues={{
                                  currentPassword: '',
                                  newPassword: '',
                                  confirmPassword: ''
                                }}
                                onSubmit={data => {
                                  updateMyPassword(data);
                                }}
                                validationSchema={passSchema}
                                render={({
                                  handleSubmit,
                                  handleChange,
                                  handleBlur,
                                  values,
                                  errors,
                                  touched
                                }) => (
                                  <Form onSubmit={handleSubmit}>
                                    <Row>
                                      <Col>
                                        <FormGroup>
                                          <Input
                                            type='password'
                                            name='currentPassword'
                                            value={values.currentPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='Current Password'
                                          />
                                          {errors.currentPassword &&
                                            touched.currentPassword && (
                                              <p className='color-red'>
                                                {errors.currentPassword}
                                              </p>
                                            )}
                                        </FormGroup>
                                      </Col>
                                      <Col>
                                        <FormGroup>
                                          <Input
                                            type='password'
                                            name='newPassword'
                                            value={values.newPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='New Password'
                                          />
                                          {errors.newPassword &&
                                            touched.newPassword && (
                                              <p className='color-red'>
                                                {errors.newPassword}
                                              </p>
                                            )}
                                        </FormGroup>
                                      </Col>
                                      <Col>
                                        <FormGroup>
                                          <Input
                                            type='password'
                                            name='confirmPassword'
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='Confirm Password'
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
                                      className='btn-icon'
                                      color='primary'
                                      type='submit'
                                      onClick={handleSubmit}
                                      block
                                    >
                                      <span className='btn-inner--icon'>
                                        <i className='fas fa-save'></i>
                                      </span>
                                      {infoProcessing ? (
                                        <span className='btn-inner--text'>
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
                                        <span className='btn-inner--text'>
                                          Change Password
                                        </span>
                                      )}
                                    </Button>
                                  </Form>
                                )}
                              />
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>
                    </CardBody>
                  </Fragment>
                )}
              </Fragment>
            )}
          </Card>
          <Footer />
        </Container>
      </div>
    </Fragment>
  );
};

Settings.propTypes = {
  updateAccountEmailSettings: PropTypes.func.isRequired,
  updateBusinessInfo: PropTypes.func.isRequired,
  getBusinessInfo: PropTypes.func.isRequired,
  updateAccountEmailReadings: PropTypes.func.isRequired,
  getEmailSettings: PropTypes.func.isRequired,
  updateMyInfo: PropTypes.func.isRequired,
  updateMyPassword: PropTypes.func.isRequired,
  businessInfo: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
  // emailSettings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  businessInfo: state.user,
  auth: state.auth
});

export default connect(mapStateToProps, {
  updateAccountEmailSettings,
  updateBusinessInfo,
  getBusinessInfo,
  updateAccountEmailReadings,
  getEmailSettings,
  updateMyInfo,
  updateMyPassword
})(Settings);
