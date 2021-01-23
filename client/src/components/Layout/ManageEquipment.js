import React, { Fragment, useState, useEffect, useRef } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';

import { v4 as uuidv4 } from 'uuid';

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
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Badge
} from 'reactstrap';

import { Formik } from 'formik';
import { getSingleCustomer } from '../../actions/customer';

import Alert from '../Layout/Alert';
import Sidebar from '../dashboard/Sidebar';
import Dashnav from '../dashboard/Dashnav';
import Footer from '../Layout/Footer';

import PumpManager from '../EquipmentManagers/PumpManager';
import FilterManager from '../EquipmentManagers/FilterManager';
import HeaterManager from '../EquipmentManagers/HeaterManager';
import CleanerManager from '../EquipmentManagers/CleanerManager.';
import CustomManager from '../EquipmentManagers/CustomManager';

const ManageEquipment = ({
  match,
  getSingleCustomer,
  customer: { customer, singleLoading }
}) => {
  useEffect(() => {
    getSingleCustomer(match.params.id);
  }, [getSingleCustomer]);

  const [itemsList, setItemsList] = useState([]);

  const onAddItem = () => {
    const object = {};
    object._id = uuidv4();
    object.category = 'Cleaners';
    object.make = 'Aqua Products';
    object.model = 'AquaBot AB';

    setItemsList([...itemsList, object]);
  };

  const handleCategoryChange = (id, data) => {
    const itemIndex = itemsList.findIndex(item => item._id == `${id}`);

    const list = [...itemsList];
    const itemToEdit = { ...list[itemIndex] };

    itemToEdit.category = data.target.value;

    list[itemIndex] = itemToEdit;

    setItemsList(list);
  };

  const handleMakeChange = (id, data) => {
    const itemIndex = itemsList.findIndex(item => item._id == `${id}`);

    const list = [...itemsList];
    const itemToEdit = { ...list[itemIndex] };

    itemToEdit.make = data.target.value;

    list[itemIndex] = itemToEdit;

    setItemsList(list);
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
                        <Link to='/customers'>Customers</Link>
                      </li>
                      <li className='breadcrumb-item'>
                        <Link to={`/customers/${match.params.id}`}>
                          {match.params.id}
                        </Link>
                      </li>
                      <li className='breadcrumb-item active'>
                        <Link
                          to={`/customers/${match.params.id}/manage/equipment`}
                        >
                          Manage Equipment
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
          {!customer ? (
            <Card>
              <CardHeader>
                {' '}
                <div className='row align-items-center'>
                  <div className='col-8'>
                    <h3 className='mb-0'>Manage Equipment:</h3>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
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
              </CardBody>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                {' '}
                <div className='row align-items-center'>
                  <div className='col-8'>
                    <h3 className='mb-0'>Manage Equipment:</h3>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <Fragment>
                  <Formik
                    initialValues={{
                      poolType: '',
                      bodiesOfWater: '',
                      pumpMake: customer[0].poolEquipment.pumpMake,
                      pumpModel: customer[0].poolEquipment.pumpModel,
                      heaterMake: customer[0].poolEquipment.heaterMake,
                      heaterModel: customer[0].poolEquipment.heaterModel,
                      filterMake: customer[0].poolEquipment.filterMake,
                      filterModel: customer[0].poolEquipment.filterModel,
                      cleanerMake: customer[0].poolEquipment.cleanerMake,
                      cleanerModel: customer[0].poolEquipment.cleanerModel
                    }}
                    onSubmit={data => console.log(data, itemsList)}
                    render={({
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      values
                    }) => (
                      <Fragment>
                        <Form onSubmit={handleSubmit}>
                          <Row>
                            <Col lg='4'>
                              <FormGroup>
                                <Label
                                  for='poolType'
                                  className='form-control-label'
                                >
                                  Pool Type:
                                </Label>
                                <Input type='select' name='poolType'>
                                  <option>N/A</option>
                                  <option>Inground Pool</option>
                                  <option>Above Ground Pool</option>
                                  <option>Other</option>
                                </Input>
                              </FormGroup>
                              <FormGroup>
                                <Label className='form-control-label'>
                                  How Many Gallons Is The Pool?:
                                </Label>
                                <InputGroup>
                                  <Input type='number' placeholder='28000' />
                                  <InputGroupAddon addonType='append'>
                                    <InputGroupText>Gallons</InputGroupText>
                                  </InputGroupAddon>
                                </InputGroup>
                              </FormGroup>
                            </Col>
                            <Col lg='4'>
                              <FormGroup>
                                <Label
                                  for='bodiesOfWater'
                                  className='form-control-label'
                                >
                                  Bodies Of Water:
                                </Label>
                                <Input type='select' name='bodiesOfWater'>
                                  <option>N/A</option>
                                  <option>Pool</option>
                                  <option>Spa</option>
                                  <option>Pool & Spa</option>
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col lg='4'>
                              <PumpManager
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                              />
                            </Col>
                          </Row>
                          <hr />
                          <Row>
                            <Col lg='4'>
                              <FilterManager
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                              />
                            </Col>
                            <Col lg='4'>
                              <HeaterManager
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                              />
                            </Col>

                            <Col lg='4'>
                              <CleanerManager
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                              />
                            </Col>
                          </Row>
                          <hr />
                          <CustomManager
                            itemsList={itemsList}
                            handleCategoryChange={handleCategoryChange}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            handleMakeChange={handleMakeChange}
                          />
                          <Row>
                            <Col lg='12'>
                              <div className='text-center'>
                                <Button
                                  className='btn-icon'
                                  color='success'
                                  onClick={onAddItem}
                                  block
                                >
                                  <span className='btn-inner--icon'>
                                    <i className='fas fa-plus'></i>
                                  </span>
                                  <span className='btn-inner--text'>
                                    Add Item
                                  </span>
                                </Button>
                              </div>
                            </Col>
                          </Row>
                          <br />
                          <Button type='submit'>Submit Data</Button>
                        </Form>
                      </Fragment>
                    )}
                  />
                </Fragment>
              </CardBody>
            </Card>
          )}
        </Container>
      </div>
    </Fragment>
  );
};

ManageEquipment.propTypes = {
  getSingleCustomer: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  customer: state.customer.singleCustomer
});

export default connect(mapStateToProps, { getSingleCustomer })(ManageEquipment);
