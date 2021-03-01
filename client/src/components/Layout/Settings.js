import React, { Fragment, useState, useEffect, useRef } from 'react';

import classnames from 'classnames';

import { Link } from 'react-router-dom';

import Alert from '../Layout/Alert';

import emailExample from '../../img/emails/Example.JPG';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateAccountEmailSettings } from '../../actions/customer';
import { updateBusinessInfo, getBusinessInfo } from '../../actions/user';

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
import { SpinnerCircular } from 'spinners-react';
import ImageUploader from 'react-images-upload';

import axios from 'axios';

import Sidebar from '../dashboard/Sidebar';
import Dashnav from '../dashboard/Dashnav';
import Footer from '../Layout/Footer';

const Settings = ({
  updateAccountEmailSettings,
  updateBusinessInfo,
  getBusinessInfo,
  businessInfo: { businessInfo, loading }
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
        return axios.post(`/api/users/updateLogo`, data, config);
      });

      await axios.all(uploadPromises);
    } catch (err) {
      console.log(err);
    }
  };

  const [infoProcessing, setInfoProcessing] = useState(null);

  useEffect(() => {
    getBusinessInfo();
  }, [getBusinessInfo]);

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
                      <li className='breadcrumb-item'>
                        <Link to='/customers'>Settings</Link>
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
            <CardBody>
              <div>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '1' })}
                      onClick={() => {
                        toggle('1');
                      }}
                    >
                      Business Information
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '2' })}
                      onClick={() => {
                        toggle('2');
                      }}
                    >
                      Email Settings
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '3' })}
                      onClick={() => {
                        toggle('3');
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
                            businessAddress: businessInfo.businessAddress
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
                                        </Label>
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
                    <Formik
                      initialValues={{
                        emailSendSummary: true,
                        emailSendChecklist: true,
                        emailSendReadings: true,
                        emailShowReadingNumbers: false,
                        emailShowChemicalsUsed: true,
                        emailSendTechnician: true
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
                                      Send Service Summary to Customer? <br />
                                      <small>
                                        <em>
                                          Default: Enabled - If enabled, a email
                                          summary will be emailed to the
                                          customer each time a technician logs a
                                          service visit for that customer.
                                        </em>
                                      </small>
                                    </Label>

                                    <br />
                                    <Label className='custom-toggle'>
                                      <Input
                                        type='checkbox'
                                        name='emailSendSummary'
                                        onChange={handleChange}
                                        checked={values.emailSendSummary}
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
                                          Default: Enabled - If enabled, will
                                          attach technicians name to email sent
                                          to customer.
                                        </em>
                                      </small>
                                    </Label>

                                    <br />
                                    <Label className='custom-toggle'>
                                      <Input
                                        type='checkbox'
                                        name='emailSendTechnician'
                                        onChange={handleChange}
                                        checked={values.emailSendTechnician}
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
                                          Default: Enabled - This will attach a
                                          list of all completed services.
                                        </em>
                                      </small>
                                    </Label>
                                    <br />
                                    <Label className='custom-toggle'>
                                      <Input
                                        type='checkbox'
                                        name='emailSendChecklist'
                                        onChange={handleChange}
                                        checked={values.emailSendChecklist}
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
                                          Default: Enabled - This will attach a
                                          list of chemical readings.
                                        </em>
                                      </small>
                                    </Label>
                                    <br />
                                    <Label className='custom-toggle'>
                                      <Input
                                        type='checkbox'
                                        name='emailSendReadings'
                                        onChange={handleChange}
                                        checked={values.emailSendReadings}
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
                                          Default: Disabled - By default the
                                          chemical readings will be sent to the
                                          customer as "Average", "Below Average"
                                          or "Above Average". With this option
                                          enabled the exact reading numbers will
                                          be sent to the customer.
                                        </em>
                                      </small>
                                    </Label>
                                    <br />
                                    <Label className='custom-toggle'>
                                      <Input
                                        type='checkbox'
                                        name='emailShowReadingNumbers'
                                        onChange={handleChange}
                                        checked={values.emailShowReadingNumbers}
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
                                          Default: Enabled - Sends a list of the
                                          chemicals added to the pool during
                                          service visit.
                                        </em>
                                      </small>
                                    </Label>
                                    <br />
                                    <Label className='custom-toggle'>
                                      <Input
                                        type='checkbox'
                                        name='emailShowChemicalsUsed'
                                        onChange={handleChange}
                                        checked={values.emailShowChemicalsUsed}
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
                  </Row>
                </TabPane>

                <TabPane tabId='3'>
                  <Row>
                    <Col sm='12'>
                      <h4>User Permissions</h4>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </CardBody>
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
  businessInfo: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  businessInfo: state.user
});

export default connect(mapStateToProps, {
  updateAccountEmailSettings,
  updateBusinessInfo,
  getBusinessInfo
})(Settings);
