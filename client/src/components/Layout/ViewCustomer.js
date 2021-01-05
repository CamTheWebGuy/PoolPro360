import React, { Fragment, useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

// import Carousel from 'react-multi-carousel';
import Carousel from 'react-elastic-carousel';
import ModalImage from 'react-modal-image';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSingleCustomer } from '../../actions/customer';

import { SpinnerCircular } from 'spinners-react';
import ImageUploader from 'react-images-upload';

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
  Badge
} from 'reactstrap';

import Sidebar from '../dashboard/Sidebar';
import Dashnav from '../dashboard/Dashnav';
import Footer from '../Layout/Footer';

import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ViewCustomer = ({
  getSingleCustomer,
  customer: { customer, singleLoading },
  match
}) => {
  useEffect(async () => {
    getSingleCustomer(match.params.id);
  }, [getSingleCustomer, match.params.id]);

  const [serviceNoteModal, setServiceNoteModal] = useState(false);
  const toggleServiceNoteModal = () => setServiceNoteModal(!serviceNoteModal);

  const [activityModal, setActivityModal] = useState(false);
  const toggleActivityModal = () => setActivityModal(!activityModal);

  const [pictureState, setPictureState] = useState({ pictures: [] });

  const [addImageModal, setAddImageModal] = useState(false);
  const [loadingNewImages, setLoadingNewImages] = useState(false);

  const toggleAddImageModal = () => setAddImageModal(!addImageModal);

  const onDrop = picture => {
    setPictureState({
      pictures: picture
    });
  };

  const uploadImages = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      let uploadPromises = pictureState.pictures.map(image => {
        let data = new FormData();
        data.append('image', image, image.name);
        return axios.post(
          `/api/customers/${match.params.id}/uploadImage`,
          data,
          config
        );
      });

      await axios.all(uploadPromises);
    } catch (err) {
      console.log(err);
    }
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <Fragment>
      <Sidebar active='customers' />
      <div className='main-content' id='panel'>
        <Dashnav />
        <div
          className='header pb-6 d-flex align-items-center'
          style={{
            minHeight: '500px',
            backgroundImage:
              'url(https://www.lathampool.com/wp-content/uploads/2020/01/bh-header.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top'
          }}
        >
          {/* Mask */}
          <span className='mask bg-gradient-default opacity-8' />
          {/* Header container */}
          <div className='container-fluid d-flex align-items-center'>
            <div className='row'>
              <div className='col-md-12'>
                {!customer || singleLoading ? (
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
                    {!customer[0].serviceRate && !customer[0].servicePackage && (
                      <Fragment>
                        <Badge color='danger'>No Service Assigned</Badge>{' '}
                      </Fragment>
                    )}
                    <Badge color='success'>No Open Work Orders</Badge>{' '}
                    <Badge color='secondary'>No Pending Expenses</Badge>
                    <h1 className='display-2 text-white'>
                      {customer[0].serviceAddress}
                    </h1>
                    <p className='text-white mt-0 mb-5'>
                      <strong>
                        {customer[0].poolType} Pool - Gate/Lock Code:{' '}
                        {customer[0].gateCode}
                      </strong>{' '}
                      <br />
                      <em>
                        Last Serviced: Aug 01, 2020 <br /> Next Service: Aug 08,
                        2020
                      </em>
                    </p>
                  </Fragment>
                )}

                <a href='#!' className='btn btn-neutral mb-4'>
                  Edit Customer Details
                </a>
                <a href='#!' className='btn btn-primary mb-4'>
                  Email Customer
                </a>
              </div>
            </div>
          </div>
        </div>

        <Container className='mgn-ng-top-60' fluid>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <div className='row align-items-center'>
                    <div className='col-4 d-none d-lg-inline'>
                      <h3 className='mb-0'>Customer Information </h3>
                    </div>
                    <div className='col-8 d-lg-none'>
                      <h3 className='mb-0'>Customer Information </h3>
                    </div>
                    <div className='col-8 text-right d-none d-lg-inline'>
                      <a href='#!' className='btn btn-success'>
                        Start Service
                      </a>
                      <a href='#!' className='btn btn-primary'>
                        Add Expense
                      </a>
                      <a href='#!' className='btn btn-default'>
                        Add Work Order
                      </a>
                    </div>
                    <div className='col-4 text-right'>
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className='btn btn-primary d-lg-none'
                          color=''
                          role='button'
                          size='sm'
                        >
                          <i className='fas fa-ellipsis-v' /> Actions
                        </DropdownToggle>
                        <DropdownMenu className='dropdown-menu-arrow' right>
                          <DropdownItem tag={Link} to='/'>
                            Start Service
                          </DropdownItem>
                          <DropdownItem tag={Link} to='/'>
                            Add Expense
                          </DropdownItem>
                          <DropdownItem tag={Link} to='/'>
                            Add Work Order
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  {!customer || singleLoading ? (
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
                      <h6 className='heading-small text-muted mb-4'>
                        Contact Information
                      </h6>
                      <Row>
                        <Col sm='3'>
                          <div className='form-control-label'>First name</div>
                          <p>{customer[0].firstName}</p>
                        </Col>
                        <Col sm='3'>
                          <div className='form-control-label'>Last name</div>
                          <p>{customer[0].lastName}</p>
                        </Col>
                        <Col sm='3'>
                          <div className='form-control-label'>Email</div>
                          <p>{customer[0].email}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm='3'>
                          <div className='form-control-label'>Mobile phone</div>
                          <p>{customer[0].mobilePhone}</p>
                        </Col>
                        <Col sm='3'>
                          <div className='form-control-label'>Can text?</div>
                          <p>{customer[0].canText}</p>
                        </Col>
                        <Col sm='3'>
                          <div className='form-control-label'>Alt Phone</div>
                          <p>N/A</p>
                        </Col>
                      </Row>
                      <hr className='my-4' />
                      <h6 className='heading-small text-muted mb-4'>
                        Service Information
                      </h6>
                      <Row>
                        <Col sm='3'>
                          <div className='form-control-label'>
                            Service Address
                          </div>
                          <p>{customer[0].serviceAddress}</p>
                        </Col>
                        <Col sm='3'>
                          <div className='form-control-label'>City</div>
                          <p>{customer[0].serviceCity}</p>
                        </Col>
                        <Col sm='3'>
                          <div className='form-control-label'>State</div>
                          <p>{customer[0].serviceState}</p>
                        </Col>
                        <Col sm='3'>
                          <div className='form-control-label'>Zip</div>
                          <p>{customer[0].serviceZip}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm='3'>
                          <div className='form-control-label'>Service Type</div>
                          <p>{customer[0].poolType}</p>
                        </Col>
                        <Col sm='3'>
                          <div className='form-control-label'>Technician</div>
                          <p>{customer[0].technician}</p>
                        </Col>
                        <Col sm='3'>
                          <div className='form-control-label'>Rate</div>
                          {customer[0].serviceRate ? (
                            <p>{customer[0].serviceRate}</p>
                          ) : (
                            <p>N/A</p>
                          )}
                        </Col>
                        <Col>
                          <div className='form-control-label'>
                            Gate/Lock Code:
                          </div>
                          <p>{customer[0].gateCode}</p>
                        </Col>
                      </Row>
                    </Fragment>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <div className='row align-items-center'>
                    <div className='col-8'>
                      <h3 className='mb-0'>Pool & Equipment Information </h3>
                    </div>
                    <div className='col-4 text-right'>
                      <a href='#!' className='btn btn-sm btn-primary'>
                        Edit Equipment
                      </a>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  {!customer || singleLoading ? (
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
                      <Row>
                        <Col sm='3'>
                          <div className='form-control-label'>Pool Type</div>
                          <p>{customer[0].poolEquipment.poolType}</p>
                        </Col>
                        <Col sm='3'>
                          <div className='form-control-label'>
                            Bodies of Water
                          </div>
                          <p>{customer[0].poolEquipment.bodiesOfWater}</p>
                        </Col>
                        <Col sm='3'>
                          <div className='form-control-label'>Pump</div>
                          <p>{customer[0].poolEquipment.pump}</p>
                        </Col>
                        <Col sm='3'>
                          <div className='form-control-label'>Filter</div>
                          <p>{customer[0].poolEquipment.filter}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm='3'>
                          <div className='form-control-label'>Pool Heater</div>
                          <p>{customer[0].poolEquipment.heater}</p>
                        </Col>
                        {customer[0].poolEquipment.other && (
                          <Fragment>
                            {customer[0].poolEquipment.other.map(item => (
                              <Col sm='3' key={item.itemName}>
                                <div className='form-control-label'>
                                  {item.itemName}
                                </div>
                                <p>{item.itemContent}</p>
                              </Col>
                            ))}
                          </Fragment>
                        )}
                      </Row>
                      <hr className='my-4' />
                      <h6 className='heading-small text-muted mb-4'>
                        Equipment Images
                      </h6>
                      {customer[0].images.length >= 1 ? (
                        <Fragment>
                          <Row>
                            <Carousel
                              itemsToShow={4}
                              itemPadding={[10, 10]}
                              pagination={false}
                              enableMouseSwipe={false}
                            >
                              {customer[0].images.map(image => (
                                <ModalImage
                                  key={image._id}
                                  small={image.url}
                                  large={image.url}
                                  showRotate={true}
                                  hideZoom={true}
                                  className='modal-image-thumb'
                                />
                              ))}
                            </Carousel>
                          </Row>

                          <Modal
                            isOpen={addImageModal}
                            toggle={toggleAddImageModal}
                          >
                            <ModalHeader toggle={toggleAddImageModal}>
                              Upload Images
                            </ModalHeader>
                            <ModalBody>
                              <ImageUploader
                                withIcon={true}
                                buttonText='Choose images'
                                onChange={onDrop}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                                withPreview={true}
                              />
                              <ModalFooter>
                                <Button onClick={toggleAddImageModal}>
                                  Cancel
                                </Button>
                                <Button
                                  onClick={async () => {
                                    setLoadingNewImages(true);
                                    await uploadImages();
                                    await getSingleCustomer(match.params.id);
                                    setLoadingNewImages(false);
                                    toggleAddImageModal();
                                    setPictureState({ pictures: [] });
                                  }}
                                  color='success'
                                >
                                  {loadingNewImages ? (
                                    <span>Loading...</span>
                                  ) : (
                                    <span>Upload Image(s)</span>
                                  )}
                                </Button>
                              </ModalFooter>
                            </ModalBody>
                          </Modal>

                          <div className='text-center'>
                            <Button
                              size='sm'
                              color='primary'
                              onClick={toggleAddImageModal}
                            >
                              Add/Delete Images
                            </Button>
                          </div>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <Modal
                            isOpen={addImageModal}
                            toggle={toggleAddImageModal}
                          >
                            <ModalHeader toggle={toggleAddImageModal}>
                              Upload Images
                            </ModalHeader>
                            <ModalBody>
                              <ImageUploader
                                withIcon={true}
                                buttonText='Choose images'
                                onChange={onDrop}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                                withPreview={true}
                              />
                              <ModalFooter>
                                <Button onClick={toggleAddImageModal}>
                                  Cancel
                                </Button>
                                <Button
                                  onClick={async () => {
                                    setLoadingNewImages(true);
                                    await uploadImages();
                                    await getSingleCustomer(match.params.id);
                                    setLoadingNewImages(false);
                                    toggleAddImageModal();
                                    setPictureState({ pictures: [] });
                                  }}
                                  color='success'
                                >
                                  {loadingNewImages ? (
                                    <span>Loading...</span>
                                  ) : (
                                    <span>Upload Image(s)</span>
                                  )}
                                </Button>
                              </ModalFooter>
                            </ModalBody>
                          </Modal>

                          <div className='text-center'>
                            <h3>No Images Found</h3>
                            <Button
                              size='sm'
                              color='primary'
                              onClick={toggleAddImageModal}
                            >
                              Upload Image(s)
                            </Button>
                          </div>
                        </Fragment>
                      )}
                    </Fragment>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal isOpen={activityModal} toggle={toggleActivityModal}>
            <ModalHeader toggle={toggleActivityModal}>
              Log Recent Activity
            </ModalHeader>

            <Formik
              initialValues={{
                type: 'Phone Call',
                options: '',
                comments: ''
              }}
              onSubmit={data => console.log(data)}
              render={({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                touched
              }) => (
                <Fragment>
                  <ModalBody>
                    <Form onSubmit={handleSubmit}>
                      <FormGroup>
                        <Label for='type'>What do you want to log?</Label>
                        <Input
                          type='select'
                          name='type'
                          onChange={handleChange}
                          value={values.type}
                        >
                          <option>Phone Call</option>
                          <option>Email</option>
                          <option>Other</option>
                        </Input>
                      </FormGroup>
                      {(values.type === 'Phone Call' ||
                        values.type === 'Email') && (
                        <Fragment>
                          <FormGroup>
                            {values.type === 'Phone Call' ? (
                              <Label>Type Of Call?</Label>
                            ) : (
                              <Label>Type Of Email?</Label>
                            )}
                            <Input
                              type='select'
                              name='options'
                              onChange={handleChange}
                              value={values.options}
                            >
                              <option value='' disabled>
                                Choose One
                              </option>
                              <option value='Outgoing'>Outgoing</option>
                              <option value='Incoming'>Incoming</option>
                            </Input>
                          </FormGroup>
                        </Fragment>
                      )}
                      <FormGroup>
                        <Label for='comments'>Comments:</Label>
                        <Input
                          type='textarea'
                          name='comments'
                          onChange={handleChange}
                          value={values.comments}
                          placeholder='Message...'
                        />
                      </FormGroup>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color='primary'
                      type='submit'
                      onClick={handleSubmit}
                    >
                      Log Activity
                    </Button>{' '}
                    <Button color='secondary'>Cancel</Button>
                  </ModalFooter>
                </Fragment>
              )}
            />
          </Modal>

          <Row>
            <Col xs='6'>
              <Card>
                <CardHeader>
                  <div className='row align-items-center'>
                    <div className='col-8'>
                      <h3 className='mb-0'>Recent Activity </h3>
                    </div>
                    <div className='col-4 text-right'>
                      <Button
                        size='sm'
                        color='primary'
                        onClick={toggleActivityModal}
                      >
                        Add Activity
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  {!customer || singleLoading ? (
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
                      <h6 className='heading-small text-muted mb-4'>
                        Aug 2020
                      </h6>
                      <Row className='mb-4'>
                        <Col xs={{ size: 'auto' }}>
                          <i className='fas fa-envelope fa-2x color-yellow'></i>
                        </Col>
                        <Col xs={{ size: 'auto' }}>
                          <h3>You sent an Email to Jane Prescott</h3>
                          <small>Monday, 3rd at 2:30PM</small>{' '}
                          <Button size='sm' color='primary'>
                            Edit
                          </Button>
                          <Button size='sm' color='warning'>
                            Delete
                          </Button>
                        </Col>
                      </Row>
                      <Row className='mb-4'>
                        <Col xs={{ size: 'auto' }}>
                          <i className='fas fa-check-circle fa-2x color-purple'></i>
                        </Col>
                        <Col xs={{ size: 'auto' }}>
                          <h3>Service Logged</h3>
                          <small>Saturday, 1st at 11:04AM</small>{' '}
                          <Button size='sm' color='primary'>
                            Edit
                          </Button>
                          <Button size='sm' color='warning'>
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </Fragment>
                  )}
                </CardBody>
              </Card>
            </Col>
            <Modal isOpen={serviceNoteModal} toggle={toggleServiceNoteModal}>
              <ModalHeader toggle={toggleServiceNoteModal}>
                Add a Service Note
              </ModalHeader>

              <Formik
                initialValues={{
                  content: '',
                  showNextService: false,
                  showAllService: false
                }}
                onSubmit={data => console.log(data)}
                render={({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  errors,
                  touched
                }) => (
                  <Fragment>
                    <ModalBody>
                      <Form>
                        <Row>
                          <Col lg='12'>
                            <FormGroup>
                              <Label
                                for='content'
                                className='form-control-label'
                              >
                                Note Content
                              </Label>
                              <Input
                                type='textarea'
                                name='content'
                                placeholder='Some note here...'
                                value={values.content}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.content && touched.content && (
                                <p className='color-red'>{errors.content}</p>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg='6'>
                            <FormGroup>
                              <p>Show on next service visit?</p>
                              <Label className='custom-toggle'>
                                <Input
                                  type='checkbox'
                                  name='showNextService'
                                  onChange={handleChange}
                                  value={values.showNextService}
                                />
                                <span
                                  className='custom-toggle-slider rounded-circle'
                                  data-label-off='No'
                                  data-label-on='Yes'
                                ></span>
                              </Label>
                            </FormGroup>
                          </Col>
                          <Col lg='6'>
                            <FormGroup>
                              <p>Show on all service visits?</p>
                              <Label className='custom-toggle'>
                                <Input
                                  type='checkbox'
                                  name='showAllService'
                                  onChange={handleChange}
                                  value={values.showAllService}
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
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color='primary'
                        type='submit'
                        onClick={handleSubmit}
                      >
                        Save Note
                      </Button>{' '}
                      <Button
                        color='secondary'
                        onClick={toggleServiceNoteModal}
                      >
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Fragment>
                )}
              />
            </Modal>
            <Col xs='6'>
              <Card>
                <CardHeader>
                  <div className='row align-items-center'>
                    <div className='col-8'>
                      <h3 className='mb-0'>Service Notes </h3>
                    </div>
                    <div className='col-4 text-right'>
                      <Button
                        color='primary'
                        size='sm'
                        onClick={toggleServiceNoteModal}
                      >
                        Add Service Note
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  {!customer || singleLoading ? (
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
                      <h6 className='heading-small text-muted mb-4'>
                        July 2020
                      </h6>
                      <Row className='mb-4'>
                        <Col xs={{ size: '1' }}>
                          <i className='fas fa-clipboard fa-2x color-orange'></i>
                        </Col>
                        <Col xs={{ size: '11' }}>
                          <h3>You created a Service Note</h3>{' '}
                          <p>
                            Jane’s pool needs a new filter for the pump. Bring
                            replacement on next service visit. Also needs some
                            more chlorine.
                          </p>
                          <small>Thursday, 3rd at 1:32PM</small>{' '}
                          <Button size='sm' color='primary'>
                            Edit
                          </Button>
                          <Button size='sm' color='warning'>
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </Fragment>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs='7'>
              <Card>
                <CardHeader>
                  <div className='row align-items-center'>
                    <div className='col-8'>
                      <h3 className='mb-0'>Billing Details </h3>
                    </div>
                    <div className='col-4 text-right'>
                      <a href='#!' className='btn btn-sm btn-primary'>
                        Edit Billing Details
                      </a>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <Row className='mb-4'>
                    <Col sm='4'>
                      <div className='form-control-label'>Billing Type</div>
                      <p>Autobilling</p>
                    </Col>
                    <Col sm='4'>
                      <div className='form-control-label'>Billing Address</div>
                      <p>Same as Service Address</p>
                    </Col>
                    <Col sm='4'>
                      <div className='form-control-label'>Payment Method</div>
                      <p>Paypal</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col xs='5'>
              <Card>
                <CardHeader>
                  <div className='row align-items-center'>
                    <div className='col-8'>
                      <h3 className='mb-0'>Service Tasks </h3>
                    </div>
                    <div className='col-4 text-right'>
                      <a href='#!' className='btn btn-sm btn-primary'>
                        Edit Tasks
                      </a>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  {!customer || singleLoading ? (
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
                      <Row>
                        <Col xs={{ size: '1' }}>
                          <i className='fas fa-chevron-right fa-1x color-green'></i>
                        </Col>
                        <Col xs={{ size: '11' }}>
                          <h3>Check Filter</h3>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={{ size: '1' }}>
                          <i className='fas fa-chevron-right fa-1x color-green'></i>
                        </Col>
                        <Col xs={{ size: '11' }}>
                          <h3>Skim Pool</h3>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={{ size: '1' }}>
                          <i className='fas fa-chevron-right fa-1x color-green'></i>
                        </Col>
                        <Col xs={{ size: '11' }}>
                          <h3>Balance Chemicals</h3>
                        </Col>
                      </Row>
                    </Fragment>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Footer />
        </Container>
      </div>
    </Fragment>
  );
};

ViewCustomer.propTypes = {
  getSingleCustomer: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  customer: state.customer.singleCustomer
});

export default connect(mapStateToProps, {
  getSingleCustomer
})(ViewCustomer);