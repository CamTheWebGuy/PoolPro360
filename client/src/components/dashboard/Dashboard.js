import React, { Fragment, useEffect, useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dashnav from '../dashboard/Dashnav';

import { Formik } from 'formik';

import axios from 'axios';

import * as Yup from 'yup';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {
  Search,
  CSVExport
} from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';

import { Scrollbars } from 'react-custom-scrollbars';
import ImageUploader from 'react-images-upload';

import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import {
  Button,
  ButtonGroup,
  Badge,
  Collapse,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  UncontrolledDropdown,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Tooltip,
  Container,
  Col,
  Row,
  UncontrolledTooltip,
  ListGroup,
  ListGroupItem,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap';

import { getEmployeeRoute } from '../../actions/employee';
import {
  addServiceLog,
  getChecklist,
  getCustomerServiceNotes
} from '../../actions/customer';

import Chart from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { SpinnerCircular } from 'spinners-react';

import Footer from '../Layout/Footer';

// import { Container } from 'reactstrap';

import Moment from 'react-moment';
import moment from 'moment';

import Sidebar from './Sidebar';

import List from 'list.js';

import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from '../../variables/chart';
import map from '../../reducers/map';
import { set } from 'mongoose';
import customer from '../../reducers/customer';

const { generateTimeSlots } = require('@georgenet/timeslotter');

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

const Dashboard = ({
  auth: { user, isAuthenticated, loading, token },
  addServiceLog,
  getChecklist,
  getCustomerServiceNotes,
  getEmployeeRoute,
  customers: { checklist, serviceNotes, routeList }
}) => {
  useEffect(() => {
    let options = {
      valueNames: ['date', 'service', 'rate', 'status'],
      listClass: 'list'
    };

    let newList = new List('list-container', options);
  }, []);

  useEffect(() => {
    if (user) {
      getEmployeeRoute(user._id, moment(new Date()).format('dddd'));
    }
  }, [user]);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  const startTime = moment()
    .set('hour', 8)
    .set('minute', 0)
    .set('second', 0)
    .set('month', 12)
    .set('date', 1);
  const endTime = moment()
    .set('hour', 20)
    .set('minute', 0)
    .set('second', 0)
    .set('month', 12)
    .set('date', 1);

  // Push availability intervals to an array - then for each array, generate time slots and display those
  // Bookings are assigned technicians. Choose a randomly available technician from array and assign them to booking

  const booked = [
    {
      start: moment()
        .set('hour', 9)
        .set('minute', 0)
        .set('second', 0),
      end: moment()
        .set('hour', 9)
        .set('minute', 30)
        .set('second', 0)
    }
  ];

  const dontBookWithinDays = 1;

  const slots = generateTimeSlots(startTime, endTime, 30, 60, booked);

  const pagination = paginationFactory({
    page: 1,
    alwaysShowAllBtns: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPageRenderer: ({
      options,
      currSizePerPage,
      onSizePerPageChange
    }) => (
      <div className='dataTables_length' id='datatable-basic_length'>
        <select
          name='datatable-basic_length'
          aria-controls='datatable-basic'
          className='form-control form-control-sm'
          style={{ width: '30%' }}
          onChange={e => onSizePerPageChange(e.target.value)}
        >
          <option value='10'>10</option>
          <option value='25'>25</option>
          <option value='50'>50</option>
          <option value='100'>100</option>
        </select>
      </div>
    )
  });

  const dataTable = [
    {
      property: '3810 Cronin Skyway',
      package: 'Weekly Pool Maintenance | $69/wk',
      type: 'Residential',
      technician: 'Lindsey Stroud',
      gatecode: '#2368'
    },
    {
      property: '991 Delphine Stream',
      package: 'Weekly Pool Maintenance | $66/bwk',
      type: 'Residential',
      technician: 'Nicci Troiani',
      gatecode: 'N/A'
    },
    {
      property: '76767 Oklahoma Lane',
      package: 'Weekly Pool Maintenance | $129/wk',
      type: 'Residential',
      technician: 'George Fields',
      gatecode: '#463'
    },
    {
      property: '7652 Dogwood Ave',
      package: 'Weekly Pool Maintenance | $129/wk',
      type: 'Commercial',
      technician: 'Gavin Byrd',
      gatecode: '#7948'
    },
    {
      property: '658 Adams St',
      package: 'Weekly Pool Maintenance | $69/wk',
      type: 'Commercial',
      technician: 'Gavin Byrd',
      gatecode: '#9077'
    }
  ];

  const typeFormatter = cell => {
    if (cell === 'Residential') {
      return (
        <span>
          <i className='ni ni-shop text-primary'></i> {cell}
        </span>
      );
    } else if (cell === 'Commercial') {
      return (
        <span>
          <i className='ni ni-building text-red'></i> {cell}
        </span>
      );
    } else {
      return { cell };
    }
  };

  const columns = [
    {
      dataField: 'property',
      text: 'Property'
    },
    {
      dataField: 'package',
      text: 'Package'
    },
    {
      dataField: 'type',
      text: 'Type',
      formatter: typeFormatter
    },
    {
      dataField: 'technician',
      text: 'Technician'
    },
    {
      dataField: 'gatecode',
      text: 'Gate/Lock Code'
    }
  ];

  const [isProcessing, setIsProcessing] = useState(false);
  const [showChems, setShowChems] = useState(false);
  const [showRepair, setShowRepair] = useState(false);
  const [notesView, setNotesView] = useState(false);
  const [shockOpen, setShockOpen] = useState(false);
  const [algacidesOpen, setAlgacidesOpen] = useState(false);
  const [otherChemsOpen, setOtherChemsOpen] = useState(false);
  const [logModal, setLogModal] = useState({
    isOpen: false,
    active: '',
    activeName: '',
    isServiceInfoOpen: false,
    customerLock: '',
    customerNotes: null,
    customerChecklist: null,
    checkedItems: [],
    checkedNames: [],
    inProgress: false
  });

  const [logPictureState, setLogPictureState] = useState({ pictures: [] });

  // console.log(logPictureState);

  const uploadImages = async activity => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      let uploadPromises = logPictureState.pictures.map(image => {
        let data = new FormData();
        data.append('image', image, image.name);
        return axios.patch(
          `/api/customers/recentActivity/edit/${activity._id}`,
          data,
          config
        );
      });

      await axios.all(uploadPromises);
    } catch (err) {
      console.log(err);
    }
  };

  const onDrop = picture => {
    setLogPictureState({
      pictures: picture
    });
  };

  useEffect(() => {
    setLogModal({
      ...logModal,
      customerChecklist: checklist
    });
  }, [checklist]);

  useEffect(() => {
    setLogModal({
      ...logModal,
      customerNotes: serviceNotes
    });
  }, [serviceNotes]);

  return (
    <Fragment>
      <Sidebar active='dashboard' />
      <div className='main-content' id='panel'>
        {/* Topnav */}
        <Dashnav />
        {/* Header */}
        {/* Header */}
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
                      <li className='breadcrumb-item active'>
                        <a href='/dashboard'>Dashboard</a>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              {/* Card stats */}
              {isAuthenticated && (
                <div className='row'>
                  {!loading && token && user.role !== 'Technician' && (
                    <Fragment>
                      <div className='col-xl-3 col-md-6'>
                        <div className='card card-stats'>
                          {/* Card body */}
                          <div className='card-body'>
                            <div className='row'>
                              <div className='col'>
                                <h5 className='card-title text-uppercase text-muted mb-0'>
                                  Total Online Bookings
                                </h5>
                                <span className='h2 font-weight-bold mb-0'>
                                  116
                                </span>
                              </div>
                              <div className='col-auto'>
                                <div className='icon icon-shape bg-gradient-red text-white rounded-circle shadow'>
                                  <i className='ni ni-active-40' />
                                </div>
                              </div>
                            </div>
                            <p className='mt-3 mb-0 text-sm'>
                              <span className='text-success mr-2'>
                                <i className='fa fa-arrow-up' /> 3.48%
                              </span>
                              <span className='text-nowrap'>
                                Since last month
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='col-xl-3 col-md-6'>
                        <div className='card card-stats'>
                          {/* Card body */}
                          <div className='card-body'>
                            <div className='row'>
                              <div className='col'>
                                <h5 className='card-title text-uppercase text-muted mb-0'>
                                  New Customers
                                </h5>
                                <span className='h2 font-weight-bold mb-0'>
                                  12
                                </span>
                              </div>
                              <div className='col-auto'>
                                <div className='icon icon-shape bg-gradient-orange text-white rounded-circle shadow'>
                                  <i className='ni ni-chart-pie-35' />
                                </div>
                              </div>
                            </div>
                            <p className='mt-3 mb-0 text-sm'>
                              <span className='text-success mr-2'>
                                <i className='fa fa-arrow-up' /> 3.48%
                              </span>
                              <span className='text-nowrap'>
                                Since last month
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='col-xl-3 col-md-6'>
                        <div className='card card-stats'>
                          {/* Card body */}
                          <div className='card-body'>
                            <div className='row'>
                              <div className='col'>
                                <h5 className='card-title text-uppercase text-muted mb-0'>
                                  Total Active Customers
                                </h5>
                                <span className='h2 font-weight-bold mb-0'>
                                  23
                                </span>
                              </div>
                              <div className='col-auto'>
                                <div className='icon icon-shape bg-gradient-green text-white rounded-circle shadow'>
                                  <i className='ni ni-money-coins' />
                                </div>
                              </div>
                            </div>
                            <p className='mt-3 mb-0 text-sm'>
                              <span className='text-success mr-2'>
                                <i className='fa fa-arrow-up' /> 3.48%
                              </span>
                              <span className='text-nowrap'>
                                Since last month
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='col-xl-3 col-md-6'>
                        <div className='card card-stats'>
                          {/* Card body */}
                          <div className='card-body'>
                            <div className='row'>
                              <div className='col'>
                                <h5 className='card-title text-uppercase text-muted mb-0'>
                                  Open Work Orders
                                </h5>
                                <span className='h2 font-weight-bold mb-0'>
                                  2
                                </span>
                              </div>
                              <div className='col-auto'>
                                <div className='icon icon-shape bg-gradient-info text-white rounded-circle shadow'>
                                  <i className='ni ni-chart-bar-32' />
                                </div>
                              </div>
                            </div>
                            <p className='mt-3 mb-0 text-sm'>
                              <span className='text-success mr-2'>
                                <i className='fa fa-arrow-up' /> 3.48%
                              </span>
                              <span className='text-nowrap'>
                                Since last month
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  )}

                  {!loading && token && user.role === 'Technician' && (
                    <Fragment>
                      <div className='col-xl-3 col-md-6'>
                        <div className='card card-stats'>
                          {/* Card body */}
                          <div className='card-body'>
                            <div className='row'>
                              <div className='col'>
                                <h5 className='card-title text-uppercase text-muted mb-0'>
                                  Day Of Week
                                </h5>
                                <span className='h2 font-weight-bold mb-0'>
                                  {moment(new Date()).format('dddd')}
                                </span>
                              </div>
                              <div className='col-auto'>
                                <div className='icon icon-shape bg-gradient-red text-white rounded-circle shadow'>
                                  <i className='ni ni-calendar-grid-58' />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-xl-3 col-md-6'>
                        <div className='card card-stats'>
                          {/* Card body */}
                          <div className='card-body'>
                            <div className='row'>
                              <div className='col'>
                                <h5 className='card-title text-uppercase text-muted mb-0'>
                                  Today's Customers
                                </h5>
                                <span className='h2 font-weight-bold mb-0'>
                                  {routeList && routeList.length}
                                  {/* {
                                    customers.filter(
                                      customer =>
                                        customer.scheduledDay ===
                                        moment(new Date()).format('dddd')
                                    ).length
                                  } */}
                                </span>
                              </div>
                              <div className='col-auto'>
                                <div className='icon icon-shape bg-gradient-orange text-white rounded-circle shadow'>
                                  <i className='ni ni-collection' />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-xl-3 col-md-6'>
                        <div className='card card-stats'>
                          {/* Card body */}
                          <div className='card-body'>
                            <div className='row'>
                              <div className='col'>
                                <h5 className='card-title text-uppercase text-muted mb-0'>
                                  Customers Remaining
                                </h5>
                                <span className='h2 font-weight-bold mb-0'>
                                  {
                                    routeList.filter(
                                      c =>
                                        (moment(
                                          c.customer.lastServiced
                                        ).isBefore(Date.now(), 'day') &&
                                          c.customer.scheduledDay ===
                                            moment(new Date()).format(
                                              'dddd'
                                            )) ||
                                        (c.customer.lastServiced ===
                                          undefined &&
                                          c.customer.scheduledDay ===
                                            moment(new Date()).format('dddd'))
                                    ).length
                                  }

                                  {/* {
                                    customers.filter(
                                      customer =>
                                        (moment(customer.lastServiced).isBefore(
                                          Date.now(),
                                          'day'
                                        ) &&
                                          customer.scheduledDay ===
                                            moment(new Date()).format(
                                              'dddd'
                                            )) ||
                                        (customer.lastServiced === undefined &&
                                          customer.scheduledDay ===
                                            moment(new Date()).format('dddd'))
                                    ).length
                                  } */}
                                </span>
                              </div>
                              <div className='col-auto'>
                                <div className='icon icon-shape bg-gradient-green text-white rounded-circle shadow'>
                                  <i className='ni ni-delivery-fast' />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-xl-3 col-md-6'>
                        <div className='card card-stats'>
                          {/* Card body */}
                          <div className='card-body'>
                            <div className='row'>
                              <div className='col'>
                                <h5 className='card-title text-uppercase text-muted mb-0'>
                                  Customers Completed
                                </h5>
                                <span className='h2 font-weight-bold mb-0'>
                                  {
                                    routeList.filter(
                                      c =>
                                        moment(c.customer.lastServiced).isSame(
                                          Date.now(),
                                          'day'
                                        ) &&
                                        c.customer.scheduledDay ===
                                          moment(new Date()).format('dddd') &&
                                        c.customer.lastServiced !== undefined
                                    ).length
                                  }

                                  {/* {
                                    customers.filter(
                                      customer =>
                                        moment(customer.lastServiced).isSame(
                                          Date.now(),
                                          'day'
                                        ) &&
                                        customer.scheduledDay ===
                                          moment(new Date()).format('dddd') &&
                                        customer.lastServiced !== undefined
                                    ).length
                                  } */}
                                </span>
                              </div>
                              <div className='col-auto'>
                                <div className='icon icon-shape bg-gradient-info text-white rounded-circle shadow'>
                                  <i className='ni ni-check-bold' />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Page content */}
        {isAuthenticated && !loading && user.role === 'Technician' && (
          <Container fluid className='mt--6'>
            <Row>
              <Col md='4'>
                <Card className='shadow'>
                  <CardHeader>
                    <h3>Control Center</h3>
                  </CardHeader>
                  <CardBody>
                    <Button className='btn-icon mgn-btm-10' color='primary'>
                      <span className='btn-inner--icon'>
                        <i className='ni ni-settings'></i>
                      </span>
                      <span className='btn-inner--text'>Next Day's Route</span>
                    </Button>

                    <Button className='btn-icon mgn-btm-10' color='success'>
                      <span className='btn-inner--icon'>
                        <i className='ni ni-delivery-fast'></i>
                      </span>
                      <span className='btn-inner--text'>
                        Previous Day's Route
                      </span>
                    </Button>
                    <Button className='btn-icon mgn-btm-10' color='warning'>
                      <span className='btn-inner--icon'>
                        <i className='ni ni-badge'></i>
                      </span>
                      <span className='btn-inner--text'>Clock In/Out</span>
                    </Button>
                  </CardBody>
                </Card>
              </Col>

              <Modal
                isOpen={logModal.isServiceInfoOpen}
                toggle={() => {
                  setLogModal({
                    ...logModal,
                    isServiceInfoOpen: false
                  });
                }}
              >
                <ModalHeader
                  toggle={() => {
                    setLogModal({
                      ...logModal,
                      isServiceInfoOpen: false
                    });
                  }}
                >
                  Service Information For: {logModal.activeName}
                </ModalHeader>
                <ModalBody>
                  <div className='form-control-label'>Gate/Lock Code:</div>
                  <p>
                    {logModal.gatecode ? logModal.gatecode : <span>N/A</span>}
                  </p>
                  {logModal.customerChecklist && logModal.customerNotes && (
                    <Fragment>
                      <h4 className='form-control-label'>Service Notes:</h4>
                      <ListGroup>
                        <Fragment>
                          {logModal.customerNotes.length < 1 && (
                            <h4>No Service Notes...</h4>
                          )}
                        </Fragment>
                        {logModal.customerNotes &&
                          logModal.customerNotes.map(note => (
                            <Fragment key={note._id}>
                              {note.showDuringVisit && (
                                <ListGroupItem>{note.content}</ListGroupItem>
                              )}
                            </Fragment>
                          ))}

                        {/* <ListGroupItem>
                          Make sure to check chemicals
                        </ListGroupItem> */}
                      </ListGroup>
                      <br />
                      <h4 className='form-control-label'>Service Checklist:</h4>
                      <ListGroup>
                        <Fragment>
                          {logModal.customerChecklist.length < 1 && (
                            <h4>No Service Checklist...</h4>
                          )}
                        </Fragment>
                        {logModal.customerChecklist.map(list => (
                          <Fragment key={list._id}>
                            {logModal.checkedItems &&
                            logModal.checkedItems.find(e => e === list._id) ? (
                              <ListGroupItem
                                className='bg-green-wf'
                                onClick={() => {
                                  if (
                                    logModal.checkedItems.length === 0 ||
                                    logModal.checkedItems == undefined
                                  ) {
                                    setLogModal({
                                      ...logModal,
                                      checkedItems: [list._id],
                                      checkedNames: [list.item]
                                    });
                                  } else if (
                                    logModal.checkedItems.length >= 1 &&
                                    logModal.checkedItems.find(
                                      e => e === list._id
                                    )
                                  ) {
                                    const updated = logModal.checkedItems.filter(
                                      id => id !== list._id
                                    );
                                    const names = logModal.checkedNames.filter(
                                      name => name !== list.item
                                    );

                                    setLogModal({
                                      ...logModal,
                                      checkedItems: updated,
                                      checkedNames: names
                                    });
                                  } else if (
                                    logModal.checkedItems.length >= 1 &&
                                    logModal.checkedItems.find(
                                      e => e === list._id
                                    )
                                  ) {
                                    const updated = [...logModal.checkedItems];
                                    const names = [...logModal.checkedNames];

                                    updated.push(list._id);
                                    names.push(list.item);
                                    setLogModal({
                                      ...logModal,
                                      checkedItems: updated,
                                      checkedNames: names
                                    });
                                  }
                                }}
                              >
                                <i className='fas fa-times-circle'></i>{' '}
                                <strong>{list.item}</strong>
                              </ListGroupItem>
                            ) : (
                              <ListGroupItem
                                className='bg-red'
                                onClick={() => {
                                  if (
                                    logModal.checkedItems === undefined ||
                                    logModal.checkedItems.length === 0
                                  ) {
                                    setLogModal({
                                      ...logModal,
                                      checkedItems: [list._id],
                                      checkedNames: [list.item]
                                    });
                                  } else if (
                                    logModal.checkedItems.length >= 1
                                  ) {
                                    const updated = [...logModal.checkedItems];
                                    const names = [...logModal.checkedNames];

                                    updated.push(list._id);
                                    names.push(list.item);
                                    setLogModal({
                                      ...logModal,
                                      checkedItems: updated,
                                      checkedNames: names
                                    });
                                  }
                                }}
                              >
                                <i className='fas fa-times-circle'></i>{' '}
                                <strong>{list.item}</strong>
                              </ListGroupItem>
                            )}
                          </Fragment>
                        ))}
                        {/* <ListGroupItem className='bg-green-wf'>
                      <i className='fas fa-check-circle'></i>{' '}
                      <strong>Skim Water</strong>
                    </ListGroupItem>
                    <ListGroupItem className='bg-red'>
                      <i className='fas fa-times-circle'></i>{' '}
                      <strong>Check Filter</strong>
                    </ListGroupItem> */}
                      </ListGroup>
                    </Fragment>
                  )}

                  <br />
                  <div className='text-center'>
                    <Button className='btn-icon mgn-btm-10' color='info' block>
                      <span className='btn-inner--icon'>
                        <i className='fas fa-swimming-pool'></i>
                      </span>
                      <span className='btn-inner--text'>View Equipment</span>
                    </Button>
                    <hr />
                    <Button
                      className='btn-icon mgn-btm-10'
                      color='warning'
                      block
                    >
                      <span className='btn-inner--icon'>
                        <i className='fas fa-times'></i>
                      </span>
                      <span className='btn-inner--text'>Unable to Service</span>
                    </Button>
                    {logModal.customerChecklist &&
                    logModal.customerChecklist.length >= 1 ? (
                      <Fragment>
                        {logModal.checkedItems === undefined ||
                        logModal.checkedItems.length === 0 ? (
                          <Fragment>
                            <Button
                              className='btn-icon mgn-btm-10'
                              color='primary'
                              block
                              disabled
                              onClick={() => {
                                setLogModal({
                                  ...logModal,
                                  isServiceInfoOpen: false,
                                  isOpen: true
                                });
                              }}
                            >
                              <span className='btn-inner--icon'>
                                <i className='ni ni-check-bold'></i>
                              </span>
                              <span className='btn-inner--text'>
                                Log Service
                              </span>
                            </Button>
                            {logModal.customerChecklist &&
                              logModal.customerChecklist.length >= 1 && (
                                <p>
                                  Must have completed at least one item from
                                  service checklist
                                </p>
                              )}
                          </Fragment>
                        ) : (
                          <Button
                            className='btn-icon mgn-btm-10'
                            color='primary'
                            block
                            onClick={() => {
                              setLogModal({
                                ...logModal,
                                isServiceInfoOpen: false,
                                isOpen: true
                              });
                            }}
                          >
                            <span className='btn-inner--icon'>
                              <i className='ni ni-check-bold'></i>
                            </span>
                            <span className='btn-inner--text'>Log Service</span>
                          </Button>
                        )}
                      </Fragment>
                    ) : (
                      <Button
                        className='btn-icon mgn-btm-10'
                        color='primary'
                        block
                        onClick={() => {
                          setLogModal({
                            ...logModal,
                            isServiceInfoOpen: false,
                            isOpen: true
                          });
                        }}
                      >
                        <span className='btn-inner--icon'>
                          <i className='ni ni-check-bold'></i>
                        </span>
                        <span className='btn-inner--text'>Log Service</span>
                      </Button>
                    )}
                  </div>
                </ModalBody>
              </Modal>

              <Modal
                isOpen={logModal.isOpen}
                toggle={() => {
                  setLogModal({
                    isOpen: false,
                    active: null,
                    activeName: null
                  });
                  setShowChems(false);
                  setNotesView(false);
                }}
              >
                <ModalHeader
                  toggle={() => {
                    setLogModal({
                      isOpen: false,
                      active: null,
                      activeName: null
                    });
                    setShowChems(false);
                    setNotesView(false);
                  }}
                >
                  Log Service for: {logModal.activeName}
                </ModalHeader>
                <ModalBody>
                  <Formik
                    initialValues={{
                      totalChlorine: '',
                      freeChlorine: '',
                      pHlevel: '',
                      alkalinity: '',
                      conditionerLevel: '',
                      hardness: '',
                      phosphateLevel: '',
                      saltLevel: '',
                      chlorineTablets: '',
                      liquidChlorine: '',
                      liquidAcid: '',
                      triChlor: '',
                      diChlor: '',
                      calHypo: '',
                      potassiumMono: '',
                      ammonia: '',
                      copperBased: '',
                      polyQuat: '',
                      copperBlend: '',
                      sodaAsh: '',
                      CalciumChloride: '',
                      conditioner: '',
                      sodiumBicar: '',
                      diatomaceous: '',
                      diatomaceousAlt: '',
                      sodiumBro: '',
                      dryAcid: '',
                      clarifier: '',
                      phosphateRemover: '',
                      salt: '',
                      enzymes: '',
                      metalSequester: '',
                      bromineGran: '',
                      bromineTab: '',
                      poolFlocc: '',
                      borate: '',
                      privateNote: '',
                      publicNote: '',
                      repairOrder: false,
                      repairType:
                        'Repair Request (Submit a Order for Future Repair)',
                      repairNotify: false,
                      repairDescription: '',
                      repairOfficeNote: ''
                    }}
                    onSubmit={async data => {
                      setIsProcessing(true);

                      const log = await addServiceLog(
                        logModal.active,
                        logModal.checkedNames,
                        logPictureState.pictures,
                        data
                      );
                      await uploadImages(log);

                      await getEmployeeRoute(
                        user._id,
                        moment(new Date()).format('dddd')
                      );
                      setLogModal({
                        isOpen: false,
                        active: null,
                        activeName: null,
                        isServiceInfoOpen: false
                      });

                      setShowChems(false);
                      setShowRepair(false);
                      setNotesView(false);
                      setShockOpen(false);
                      setAlgacidesOpen(false);
                      setOtherChemsOpen(false);

                      setIsProcessing(false);
                    }}
                    render={({
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      values,
                      setFieldValue,
                      errors,
                      touched
                    }) => (
                      <Fragment>
                        <Form>
                          {!showChems && !notesView ? (
                            <Fragment>
                              <div className='text-center'>
                                <h4>Readings:</h4>
                              </div>
                              <FormGroup>
                                <Label className='form-control-label'>
                                  Total Chlorine
                                </Label>
                                <Input
                                  type='select'
                                  name='totalChlorine'
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option>0</option>
                                  <option>0.5</option>
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                  <option>6</option>
                                  <option>7</option>
                                  <option>8</option>
                                  <option>9</option>
                                  <option>10</option>
                                  <option>15</option>
                                  <option>20</option>
                                  <option>30</option>
                                </Input>
                              </FormGroup>

                              <FormGroup>
                                <Label className='form-control-label'>
                                  Free Chlorine
                                </Label>
                                <Input
                                  type='select'
                                  name='freeChlorine'
                                  value={values.freeChlorine}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option>0</option>
                                  <option>0.5</option>
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                  <option>6</option>
                                  <option>7</option>
                                  <option>8</option>
                                  <option>9</option>
                                  <option>10</option>
                                  <option>15</option>
                                  <option>20</option>
                                  <option>30</option>
                                </Input>
                              </FormGroup>

                              <FormGroup>
                                <Label className='form-control-label'>
                                  PH Level
                                </Label>
                                <Input
                                  type='select'
                                  name='pHlevel'
                                  value={values.pHlevel}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option>6.2</option>
                                  <option>6.8</option>
                                  <option>7.0</option>
                                  <option>7.4</option>
                                  <option>7.6</option>
                                  <option>7.8</option>
                                  <option>8.0</option>
                                  <option>8.4+</option>
                                </Input>
                              </FormGroup>

                              <FormGroup>
                                <Label className='form-control-label'>
                                  Alkalinity Level
                                </Label>
                                <Input
                                  type='select'
                                  name='alkalinity'
                                  value={values.alkalinity}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option>0</option>
                                  <option>10</option>
                                  <option>20</option>
                                  <option>30</option>
                                  <option>40</option>
                                  <option>50</option>
                                  <option>60</option>
                                  <option>70</option>
                                  <option>80</option>
                                  <option>90</option>
                                  <option>100</option>
                                  <option>110</option>
                                  <option>120</option>
                                  <option>130</option>
                                  <option>140</option>
                                  <option>150</option>
                                  <option>160</option>
                                  <option>170</option>
                                  <option>180</option>
                                  <option>190</option>
                                  <option>200</option>
                                  <option>210</option>
                                  <option>220</option>
                                  <option>230</option>
                                  <option>240</option>
                                  <option>250</option>
                                  <option>300</option>
                                  <option>350</option>
                                  <option>400</option>
                                  <option>500</option>
                                  <option>600</option>
                                  <option>700</option>
                                  <option>800</option>
                                  <option>900</option>
                                  <option>1000</option>
                                </Input>
                              </FormGroup>

                              <FormGroup>
                                <Label className='form-control-label'>
                                  Conditioner Level
                                </Label>
                                <Input
                                  type='select'
                                  name='conditionerLevel'
                                  value={values.conditionerLevel}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option>N/A</option>
                                  <option>0</option>
                                  <option>30</option>
                                  <option>40</option>
                                  <option>50</option>
                                  <option>60</option>
                                  <option>70</option>
                                  <option>80</option>
                                  <option>90</option>
                                  <option>100</option>
                                  <option>110</option>
                                  <option>120</option>
                                  <option>130</option>
                                  <option>140</option>
                                  <option>150</option>
                                  <option>175</option>
                                  <option>200</option>
                                  <option>225+</option>
                                </Input>
                              </FormGroup>

                              <FormGroup>
                                <Label className='form-control-label'>
                                  Hardness Level
                                </Label>
                                <Input
                                  type='select'
                                  name='hardness'
                                  value={values.hardness}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option>N/A</option>
                                  <option>0</option>
                                  <option>10</option>
                                  <option>15</option>
                                  <option>20</option>
                                  <option>25</option>
                                  <option>30</option>
                                  <option>40</option>
                                  <option>50</option>
                                  <option>60</option>
                                  <option>70</option>
                                  <option>180</option>
                                  <option>90</option>
                                  <option>100</option>
                                  <option>110</option>
                                  <option>125</option>
                                  <option>150</option>
                                  <option>175</option>
                                  <option>200</option>
                                  <option>250</option>
                                  <option>300</option>
                                  <option>350</option>
                                  <option>400</option>
                                  <option>500</option>
                                  <option>600</option>
                                  <option>700</option>
                                  <option>800</option>
                                  <option>900</option>
                                  <option>1000</option>
                                </Input>
                              </FormGroup>

                              <FormGroup>
                                <Label className='form-control-label'>
                                  Phosphate Level
                                </Label>
                                <Input
                                  type='select'
                                  name='phosphateLevel'
                                  value={values.phosphateLevel}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option>N/A</option>
                                  <option>0</option>
                                  <option>125</option>
                                  <option>250</option>
                                  <option>500</option>
                                  <option>700</option>
                                  <option>1000+</option>
                                </Input>
                              </FormGroup>

                              <FormGroup>
                                <Label className='form-control-label'>
                                  Salt Level
                                </Label>
                                <Input
                                  type='select'
                                  name='saltLevel'
                                  value={values.saltLevel}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option>N/A</option>
                                  <option>0</option>
                                  <option>100</option>
                                  <option>150</option>
                                  <option>200</option>
                                  <option>250</option>
                                  <option>300</option>
                                  <option>350</option>
                                  <option>400</option>
                                  <option>450</option>
                                  <option>500</option>
                                  <option>550</option>
                                  <option>600</option>
                                  <option>650</option>
                                  <option>700</option>
                                  <option>750</option>
                                  <option>800</option>
                                  <option>850</option>
                                  <option>900</option>
                                  <option>1000</option>
                                  <option>1100</option>
                                  <option>1150</option>
                                  <option>1200</option>
                                  <option>1250</option>
                                  <option>1300</option>
                                  <option>1350</option>
                                  <option>1400</option>
                                  <option>1450</option>
                                  <option>1500</option>
                                  <option>1550</option>
                                  <option>1600</option>
                                  <option>1650</option>
                                  <option>1700</option>
                                  <option>1750</option>
                                  <option>1800</option>
                                  <option>1850</option>
                                  <option>1900</option>
                                  <option>1950</option>
                                  <option>2000</option>
                                  <option>2050</option>
                                  <option>2100</option>
                                  <option>2150</option>
                                  <option>2200</option>
                                  <option>2250</option>
                                  <option>2300</option>
                                  <option>2350</option>
                                  <option>2400</option>
                                  <option>2450</option>
                                  <option>2500</option>
                                  <option>2550</option>
                                  <option>2600</option>
                                  <option>2650</option>
                                  <option>2700</option>
                                  <option>2750</option>
                                  <option>2800</option>
                                  <option>2850</option>
                                  <option>2900</option>
                                  <option>2950</option>
                                  <option>3000</option>
                                  <option>3050</option>
                                  <option>3100</option>
                                  <option>3150</option>
                                  <option>3200</option>
                                  <option>3250</option>
                                  <option>3300</option>
                                  <option>3350</option>
                                  <option>3400</option>
                                  <option>3450</option>
                                  <option>3500</option>
                                  <option>3550</option>
                                  <option>3600</option>
                                  <option>3650</option>
                                  <option>3700</option>
                                  <option>3750</option>
                                  <option>3800</option>
                                  <option>3850</option>
                                  <option>3900</option>
                                  <option>3950</option>
                                  <option>4000</option>
                                  <option>4050</option>
                                  <option>4100</option>
                                  <option>4200</option>
                                  <option>4300</option>
                                  <option>4350</option>
                                  <option>4400</option>
                                  <option>4450</option>
                                  <option>4500</option>
                                  <option>4550</option>
                                  <option>4600</option>
                                  <option>4600</option>
                                  <option>4700</option>
                                  <option>4750</option>
                                  <option>4800</option>
                                  <option>4850</option>
                                  <option>4900</option>
                                  <option>4950</option>
                                  <option>5000</option>
                                  <option>5050</option>
                                  <option>5100</option>
                                  <option>5150</option>
                                  <option>5200</option>
                                  <option>5250</option>
                                  <option>5300</option>
                                  <option>5350</option>
                                  <option>5400</option>
                                  <option>5450</option>
                                  <option>5500</option>
                                  <option>5550</option>
                                  <option>5600</option>
                                  <option>5650</option>
                                  <option>5700</option>
                                  <option>5750</option>
                                  <option>5800</option>
                                  <option>5850</option>
                                  <option>5900</option>
                                  <option>5950</option>
                                  <option>6000</option>
                                </Input>
                              </FormGroup>
                            </Fragment>
                          ) : (
                            showChems &&
                            !notesView && (
                              <Fragment>
                                <div className='text-center'>
                                  <h4>Chemical Usage:</h4>
                                </div>
                                <FormGroup>
                                  <Label className='form-control-label'>
                                    Chlorine Tablets
                                  </Label>
                                  <Input
                                    type='select'
                                    name='chlorineTablets'
                                    value={values.chlorineTablets}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  >
                                    <option>No Tabs Used</option>
                                    <option className='option-heading' disabled>
                                      3 Inch Tabs
                                    </option>
                                    <option>1 Tab</option>
                                    <option>2 Tabs</option>
                                    <option>3 Tabs</option>
                                    <option>4 Tabs</option>
                                    <option>5 Tabs</option>
                                    <option>6 Tabs</option>
                                    <option>7 Tabs</option>
                                    <option>8 Tabs</option>
                                    <option>9 Tabs</option>
                                    <option>10 Tabs</option>
                                    <option>15 Tabs</option>
                                    <option className='option-heading' disabled>
                                      1 Inch Tabs
                                    </option>
                                    <option>1 Tab</option>
                                    <option>2 Tabs</option>
                                    <option>3 Tabs</option>
                                    <option>4 Tabs</option>
                                    <option>5 Tabs</option>
                                    <option>6 Tabs</option>
                                    <option>7 Tabs</option>
                                    <option>8 Tabs</option>
                                    <option>9 Tabs</option>
                                    <option>10 Tabs</option>
                                    <option>15 Tabs</option>
                                  </Input>
                                </FormGroup>

                                <FormGroup>
                                  <Label className='form-control-label'>
                                    Liquid Chlorine
                                  </Label>
                                  <Input
                                    type='select'
                                    name='liquidChlorine'
                                    value={values.liquidChlorine}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  >
                                    <option>No Liquid Chlorine Used</option>
                                    <option>1/8 Gallon</option>
                                    <option>1/4 Gallon</option>
                                    <option>1/3 Gallon</option>
                                    <option>1/2 Gallon</option>
                                    <option>2/3 Gallon</option>
                                    <option>3/4 Gallon</option>
                                    <option>1 Gallon</option>
                                    <option>1.5 Gallons</option>
                                    <option>2 Gallons</option>
                                    <option>2.5 Gallons</option>
                                    <option>3 Gallons</option>
                                    <option>3.5 Gallons</option>
                                    <option>4 Gallon</option>
                                    <option>5 Gallons</option>
                                    <option>6 Gallons</option>
                                    <option>7 Gallons</option>
                                    <option>8 Gallons</option>
                                    <option>9 Gallons</option>
                                    <option>10 Gallon</option>
                                    <option>11 Gallons</option>
                                    <option>12 Gallons</option>
                                    <option>13 Gallons</option>
                                    <option>14 Gallons</option>
                                    <option>15 Gallons</option>
                                    <option>16 Gallon</option>
                                    <option>17 Gallons</option>
                                    <option>18 Gallons</option>
                                    <option>19 Gallons</option>
                                    <option>20 Gallons</option>
                                    <option className='option-heading' disabled>
                                      Smaller Doses
                                    </option>
                                    <option>1/8 Cup</option>
                                    <option>1/4 Cup</option>
                                    <option>1/3 Cup</option>
                                    <option>1/2 Cup</option>
                                    <option>2/3 Cup</option>
                                    <option>3/4 Cup</option>
                                    <option>1 Cup</option>
                                    <option>1.5 Cups</option>
                                    <option>2 Cups</option>
                                    <option>2.5 Cups</option>
                                    <option>3 Cups</option>
                                    <option>3.5 Cups</option>
                                    <option>4 Cups</option>
                                    <option>4.5 Cups</option>
                                    <option>5 Cups</option>
                                    <option>6 Cups</option>
                                    <option>7 Cups</option>
                                    <option>8 Cups</option>
                                    <option>9 Cups</option>
                                    <option>10 Cups</option>
                                  </Input>
                                </FormGroup>

                                <FormGroup>
                                  <Label className='form-control-label'>
                                    Liquid Acid
                                  </Label>
                                  <Input
                                    type='select'
                                    name='liquidAcid'
                                    value={values.liquidAcid}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  >
                                    <option>No Liquid Acid Used</option>
                                    <option>1/8 Gallon</option>
                                    <option>1/4 Gallon</option>
                                    <option>1/3 Gallon</option>
                                    <option>1/2 Gallon</option>
                                    <option>2/3 Gallon</option>
                                    <option>3/4 Gallon</option>
                                    <option>1 Gallon</option>
                                    <option>1.5 Gallons</option>
                                    <option>2 Gallons</option>
                                    <option>2.5 Gallons</option>
                                    <option>3 Gallons</option>
                                    <option>3.5 Gallons</option>
                                    <option>4 Gallon</option>
                                    <option>5 Gallons</option>
                                    <option>6 Gallons</option>
                                    <option>7 Gallons</option>
                                    <option>8 Gallons</option>
                                    <option>9 Gallons</option>
                                    <option>10 Gallon</option>
                                    <option>11 Gallons</option>
                                    <option>12 Gallons</option>
                                    <option>13 Gallons</option>
                                    <option>14 Gallons</option>
                                    <option>15 Gallons</option>
                                    <option>16 Gallon</option>
                                    <option>17 Gallons</option>
                                    <option>18 Gallons</option>
                                    <option>19 Gallons</option>
                                    <option>20 Gallons</option>
                                    <option className='option-heading' disabled>
                                      Smaller Doses
                                    </option>
                                    <option>1/8 Cup</option>
                                    <option>1/4 Cup</option>
                                    <option>1/3 Cup</option>
                                    <option>1/2 Cup</option>
                                    <option>2/3 Cup</option>
                                    <option>3/4 Cup</option>
                                    <option>1 Cup</option>
                                    <option>1.5 Cups</option>
                                    <option>2 Cups</option>
                                    <option>2.5 Cups</option>
                                    <option>3 Cups</option>
                                    <option>3.5 Cups</option>
                                    <option>4 Cups</option>
                                    <option>4.5 Cups</option>
                                    <option>5 Cups</option>
                                    <option>6 Cups</option>
                                    <option>7 Cups</option>
                                    <option>8 Cups</option>
                                    <option>9 Cups</option>
                                    <option>10 Cups</option>
                                    <option className='option-heading' disabled>
                                      In Ounces
                                    </option>
                                    <option>2 Ounces</option>
                                    <option>4 Ounces</option>
                                    <option>6 Ounces</option>
                                    <option>8 Ounces</option>
                                    <option>10 Ounces</option>
                                    <option>12 Ounces</option>
                                    <option>14 Ounces</option>
                                    <option>16 Ounces</option>
                                  </Input>
                                </FormGroup>

                                <FormGroup>
                                  <Button
                                    className='btn-icon'
                                    color='info'
                                    onClick={() => {
                                      if (shockOpen) {
                                        setFieldValue('triChlor', '');
                                        setFieldValue('diChlor', '');
                                        setFieldValue('calHypo', '');
                                        setFieldValue('potassiumMono', '');
                                      }
                                      setShockOpen(!shockOpen);
                                    }}
                                    block
                                  >
                                    {shockOpen ? (
                                      <Fragment>
                                        <span className='btn-inner--icon'>
                                          <i className='fas fa-minus'></i>
                                        </span>
                                        <span className='btn-inner--text'>
                                          Shock
                                        </span>
                                      </Fragment>
                                    ) : (
                                      <Fragment>
                                        <span className='btn-inner--icon'>
                                          <i className='fas fa-plus'></i>
                                        </span>
                                        <span className='btn-inner--text'>
                                          Shock
                                        </span>
                                      </Fragment>
                                    )}
                                  </Button>

                                  <Collapse isOpen={shockOpen}>
                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        TriChlor Shock
                                      </Label>
                                      <Input
                                        type='select'
                                        name='triChlor'
                                        value={values.triChlor}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>No TriChlor Added</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          D.E. Scoop Measurement
                                        </option>
                                        <option>1/8 Scoop</option>
                                        <option>1/4 Scoop</option>
                                        <option>1/3 Scoop</option>
                                        <option>1/2 Scoop</option>
                                        <option>2/3 Scoop</option>
                                        <option>3/4 Scoop</option>
                                        <option>1 Full D.E. Scoop</option>
                                        <option>1.5 D.E. Scoops</option>
                                        <option>2 D.E. Scoops</option>
                                        <option>3 D.E. Scoops</option>
                                        <option>4 D.E. Scoops</option>
                                        <option>5 D.E. Scoops</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Ounces Measurement
                                        </option>
                                        <option>2 Ounces</option>
                                        <option>4 Ounces</option>
                                        <option>8 Ounces</option>
                                        <option>12 Ounces</option>
                                        <option>18 Ounces</option>
                                        <option>22 Ounces</option>
                                        <option>26 Ounces</option>
                                        <option>30 Ounces</option>
                                        <option>36 Ounces</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Pounds Measurement
                                        </option>
                                        <option>1/2 Pound</option>
                                        <option>1 Pound</option>
                                        <option>1.5 Pounds</option>
                                        <option>2 Pounds</option>
                                        <option>2.5 Pounds</option>
                                        <option>3 Pounds</option>
                                        <option>3.5 Pounds</option>
                                        <option>4 Pounds</option>
                                        <option>4.5 Pounds</option>
                                        <option>5 Pounds</option>
                                        <option>6 Pounds</option>
                                        <option>7 Pounds</option>
                                        <option>8 Pounds</option>
                                        <option>9 Pounds</option>
                                        <option>10 Pounds</option>
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        DiChlor Shock
                                      </Label>
                                      <Input
                                        type='select'
                                        name='diChlor'
                                        value={values.diChlor}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>No DiChlor Added</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          D.E. Scoop Measurement
                                        </option>
                                        <option>1/8 Scoop</option>
                                        <option>1/4 Scoop</option>
                                        <option>1/3 Scoop</option>
                                        <option>1/2 Scoop</option>
                                        <option>2/3 Scoop</option>
                                        <option>3/4 Scoop</option>
                                        <option>1 Full D.E. Scoop</option>
                                        <option>1.5 D.E. Scoops</option>
                                        <option>2 D.E. Scoops</option>
                                        <option>3 D.E. Scoops</option>
                                        <option>4 D.E. Scoops</option>
                                        <option>5 D.E. Scoops</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Ounces Measurement
                                        </option>
                                        <option>2 Ounces</option>
                                        <option>4 Ounces</option>
                                        <option>8 Ounces</option>
                                        <option>12 Ounces</option>
                                        <option>18 Ounces</option>
                                        <option>22 Ounces</option>
                                        <option>26 Ounces</option>
                                        <option>30 Ounces</option>
                                        <option>36 Ounces</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Pounds Measurement
                                        </option>
                                        <option>1/2 Pound</option>
                                        <option>1 Pound</option>
                                        <option>1.5 Pounds</option>
                                        <option>2 Pounds</option>
                                        <option>2.5 Pounds</option>
                                        <option>3 Pounds</option>
                                        <option>3.5 Pounds</option>
                                        <option>4 Pounds</option>
                                        <option>4.5 Pounds</option>
                                        <option>5 Pounds</option>
                                        <option>6 Pounds</option>
                                        <option>7 Pounds</option>
                                        <option>8 Pounds</option>
                                        <option>9 Pounds</option>
                                        <option>10 Pounds</option>
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        CalHypo Shock
                                      </Label>
                                      <Input
                                        type='select'
                                        name='calHypo'
                                        value={values.calHypo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>No CalHypo Added</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          D.E. Scoop Measurement
                                        </option>
                                        <option>1/8 Scoop</option>
                                        <option>1/4 Scoop</option>
                                        <option>1/3 Scoop</option>
                                        <option>1/2 Scoop</option>
                                        <option>2/3 Scoop</option>
                                        <option>3/4 Scoop</option>
                                        <option>1 Full D.E. Scoop</option>
                                        <option>1.5 D.E. Scoops</option>
                                        <option>2 D.E. Scoops</option>
                                        <option>3 D.E. Scoops</option>
                                        <option>4 D.E. Scoops</option>
                                        <option>5 D.E. Scoops</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Ounces Measurement
                                        </option>
                                        <option>2 Ounces</option>
                                        <option>4 Ounces</option>
                                        <option>8 Ounces</option>
                                        <option>12 Ounces</option>
                                        <option>18 Ounces</option>
                                        <option>22 Ounces</option>
                                        <option>26 Ounces</option>
                                        <option>30 Ounces</option>
                                        <option>36 Ounces</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Pounds Measurement
                                        </option>

                                        <option>1/2 Pound</option>
                                        <option>1 Pound</option>
                                        <option>1.5 Pounds</option>
                                        <option>2 Pounds</option>
                                        <option>2.5 Pounds</option>
                                        <option>3 Pounds</option>
                                        <option>3.5 Pounds</option>
                                        <option>4 Pounds</option>
                                        <option>4.5 Pounds</option>
                                        <option>5 Pounds</option>
                                        <option>6 Pounds</option>
                                        <option>7 Pounds</option>
                                        <option>8 Pounds</option>
                                        <option>9 Pounds</option>
                                        <option>10 Pounds</option>
                                        <option>11 Pounds</option>
                                        <option>12 Pounds</option>
                                        <option>13 Pounds</option>
                                        <option>14 Pounds</option>
                                        <option>15 Pounds</option>
                                        <option>16 Pounds</option>
                                        <option>17 Pounds</option>
                                        <option>18 Pounds</option>
                                        <option>19 Pounds</option>
                                        <option>20 Pounds</option>
                                        <option>21 Pounds</option>
                                        <option>22 Pounds</option>
                                        <option>23 Pounds</option>
                                        <option>24 Pounds</option>
                                        <option>25 Pounds</option>
                                        <option>26 Pounds</option>
                                        <option>27 Pounds</option>
                                        <option>28 Pounds</option>
                                        <option>29 Pounds</option>
                                        <option>30 Pounds</option>
                                        <option>31 Pounds</option>
                                        <option>32 Pounds</option>
                                        <option>33 Pounds</option>
                                        <option>34 Pounds</option>
                                        <option>35 Pounds</option>
                                        <option>36 Pounds</option>
                                        <option>37 Pounds</option>
                                        <option>38 Pounds</option>
                                        <option>39 Pounds</option>
                                        <option>40 Pounds</option>
                                        <option>41 Pounds</option>
                                        <option>42 Pounds</option>
                                        <option>43 Pounds</option>
                                        <option>44 Pounds</option>
                                        <option>45 Pounds</option>
                                        <option>46 Pounds</option>
                                        <option>47 Pounds</option>
                                        <option>48 Pounds</option>
                                        <option>49 Pounds</option>
                                        <option>50 Pounds</option>
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Non-Chlorine Shock/Potassium
                                        Monopersulfate
                                      </Label>
                                      <Input
                                        type='select'
                                        name='potassiumMono'
                                        value={values.potassiumMono}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>
                                          No Potassium Monopersulfate Added
                                        </option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          D.E. Scoop Measurement
                                        </option>
                                        <option>1/8 Scoop</option>
                                        <option>1/4 Scoop</option>
                                        <option>1/3 Scoop</option>
                                        <option>1/2 Scoop</option>
                                        <option>2/3 Scoop</option>
                                        <option>3/4 Scoop</option>
                                        <option>1 Full D.E. Scoop</option>
                                        <option>1.5 D.E. Scoops</option>
                                        <option>2 D.E. Scoops</option>
                                        <option>3 D.E. Scoops</option>
                                        <option>4 D.E. Scoops</option>
                                        <option>5 D.E. Scoops</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Ounces Measurement
                                        </option>
                                        <option>2 Ounces</option>
                                        <option>4 Ounces</option>
                                        <option>8 Ounces</option>
                                        <option>12 Ounces</option>
                                        <option>18 Ounces</option>
                                        <option>22 Ounces</option>
                                        <option>26 Ounces</option>
                                        <option>30 Ounces</option>
                                        <option>36 Ounces</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Pounds Measurement
                                        </option>

                                        <option>1/2 Pound</option>
                                        <option>1 Pound</option>
                                        <option>1.5 Pounds</option>
                                        <option>2 Pounds</option>
                                        <option>2.5 Pounds</option>
                                        <option>3 Pounds</option>
                                        <option>3.5 Pounds</option>
                                        <option>4 Pounds</option>
                                        <option>4.5 Pounds</option>
                                        <option>5 Pounds</option>
                                        <option>6 Pounds</option>
                                        <option>7 Pounds</option>
                                        <option>8 Pounds</option>
                                        <option>9 Pounds</option>
                                        <option>10 Pounds</option>
                                        <option>11 Pounds</option>
                                        <option>12 Pounds</option>
                                        <option>13 Pounds</option>
                                        <option>14 Pounds</option>
                                        <option>15 Pounds</option>
                                        <option>16 Pounds</option>
                                        <option>17 Pounds</option>
                                        <option>18 Pounds</option>
                                        <option>19 Pounds</option>
                                        <option>20 Pounds</option>
                                        <option>21 Pounds</option>
                                        <option>22 Pounds</option>
                                        <option>23 Pounds</option>
                                        <option>24 Pounds</option>
                                        <option>25 Pounds</option>
                                        <option>26 Pounds</option>
                                        <option>27 Pounds</option>
                                        <option>28 Pounds</option>
                                        <option>29 Pounds</option>
                                        <option>30 Pounds</option>
                                        <option>31 Pounds</option>
                                        <option>32 Pounds</option>
                                        <option>33 Pounds</option>
                                        <option>34 Pounds</option>
                                        <option>35 Pounds</option>
                                        <option>36 Pounds</option>
                                        <option>37 Pounds</option>
                                        <option>38 Pounds</option>
                                        <option>39 Pounds</option>
                                        <option>40 Pounds</option>
                                        <option>41 Pounds</option>
                                        <option>42 Pounds</option>
                                        <option>43 Pounds</option>
                                        <option>44 Pounds</option>
                                        <option>45 Pounds</option>
                                        <option>46 Pounds</option>
                                        <option>47 Pounds</option>
                                        <option>48 Pounds</option>
                                        <option>49 Pounds</option>
                                        <option>50 Pounds</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Cups Measurement
                                        </option>

                                        <option>1/8 Cup</option>
                                        <option>1/4 Cup</option>
                                        <option>1/3 Cup</option>
                                        <option>1/2 Cup</option>
                                        <option>2/3 Cup</option>
                                        <option>3/4 Cup</option>
                                        <option>1 Cup</option>
                                        <option>1.5 Cups</option>
                                        <option>2 Cups</option>
                                        <option>2.5 Cups</option>
                                        <option>3 Cups</option>
                                        <option>3.5 Cups</option>
                                        <option>4 Cups</option>
                                        <option>4.5 Cups</option>
                                        <option>5 Cups</option>
                                        <option>6 Cups</option>
                                        <option>7 Cups</option>
                                        <option>8 Cups</option>
                                        <option>9 Cups</option>
                                        <option>10 Cups</option>
                                        <option>11 Cups</option>
                                        <option>12 Cups</option>
                                      </Input>
                                    </FormGroup>
                                  </Collapse>
                                  <br />
                                  <Button
                                    className='btn-icon'
                                    color='info'
                                    onClick={() => {
                                      if (algacidesOpen) {
                                        setFieldValue('ammonia', '');
                                        setFieldValue('copperBased', '');
                                        setFieldValue('polyQuat', '');
                                        setFieldValue('copperBlend', '');
                                      }
                                      setAlgacidesOpen(!algacidesOpen);
                                    }}
                                    block
                                  >
                                    {algacidesOpen ? (
                                      <Fragment>
                                        <span className='btn-inner--icon'>
                                          <i className='fas fa-minus'></i>
                                        </span>
                                        <span className='btn-inner--text'>
                                          Algacides
                                        </span>
                                      </Fragment>
                                    ) : (
                                      <Fragment>
                                        <span className='btn-inner--icon'>
                                          <i className='fas fa-plus'></i>
                                        </span>
                                        <span className='btn-inner--text'>
                                          Algacides
                                        </span>
                                      </Fragment>
                                    )}
                                  </Button>

                                  <Collapse isOpen={algacidesOpen}>
                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Ammonia Based Liquid Algacide
                                      </Label>
                                      <Input
                                        type='select'
                                        name='ammonia'
                                        value={values.ammonia}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>
                                          No Ammonia Algacide Added
                                        </option>

                                        <option>2 Ounces</option>
                                        <option>4 Ounces</option>
                                        <option>6 Ounces</option>
                                        <option>8 Ounces</option>
                                        <option>10 Ounces</option>
                                        <option>12 Ounces</option>
                                        <option>14 Ounces</option>
                                        <option>16 Ounces</option>
                                        <option>18 Ounces</option>
                                        <option>20 Ounces</option>
                                        <option>22 Ounces</option>
                                        <option>24 Ounces</option>
                                        <option>26 Ounces</option>
                                        <option>28 Ounces</option>
                                        <option>30 Ounces</option>
                                        <option>32 Ounces</option>
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Copper Based Liquid Algacide
                                      </Label>
                                      <Input
                                        type='select'
                                        name='copperBased'
                                        value={values.copperBased}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>
                                          No Copper Algacide Added
                                        </option>

                                        <option>2 Ounces</option>
                                        <option>4 Ounces</option>
                                        <option>6 Ounces</option>
                                        <option>8 Ounces</option>
                                        <option>10 Ounces</option>
                                        <option>12 Ounces</option>
                                        <option>14 Ounces</option>
                                        <option>16 Ounces</option>
                                        <option>18 Ounces</option>
                                        <option>20 Ounces</option>
                                        <option>22 Ounces</option>
                                        <option>24 Ounces</option>
                                        <option>26 Ounces</option>
                                        <option>28 Ounces</option>
                                        <option>30 Ounces</option>
                                        <option>32 Ounces</option>
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        PolyQuat Based Liquid Algacide
                                      </Label>
                                      <Input
                                        type='select'
                                        name='polyQuat'
                                        value={values.polyQuat}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>
                                          No PolyQuat Algacide Added
                                        </option>

                                        <option>2 Ounces</option>
                                        <option>4 Ounces</option>
                                        <option>6 Ounces</option>
                                        <option>8 Ounces</option>
                                        <option>10 Ounces</option>
                                        <option>12 Ounces</option>
                                        <option>14 Ounces</option>
                                        <option>16 Ounces</option>
                                        <option>18 Ounces</option>
                                        <option>20 Ounces</option>
                                        <option>22 Ounces</option>
                                        <option>24 Ounces</option>
                                        <option>26 Ounces</option>
                                        <option>28 Ounces</option>
                                        <option>30 Ounces</option>
                                        <option>32 Ounces</option>
                                        <option>48 Ounces</option>
                                        <option>64 Ounces</option>
                                        <option>96 Ounces</option>
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Copper/PolyQuat Blend Liquid Algacide
                                        (Aqua Pure)
                                      </Label>
                                      <Input
                                        type='select'
                                        name='copperBlend'
                                        value={values.copperBlend}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>
                                          No Copper/PolyQuat Blend Algacide
                                          Added
                                        </option>

                                        <option>2 Ounces</option>
                                        <option>4 Ounces</option>
                                        <option>6 Ounces</option>
                                        <option>8 Ounces</option>
                                        <option>10 Ounces</option>
                                        <option>12 Ounces</option>
                                        <option>14 Ounces</option>
                                        <option>16 Ounces</option>
                                        <option>18 Ounces</option>
                                        <option>20 Ounces</option>
                                        <option>22 Ounces</option>
                                        <option>24 Ounces</option>
                                        <option>26 Ounces</option>
                                        <option>28 Ounces</option>
                                        <option>30 Ounces</option>
                                        <option>32 Ounces</option>
                                        <option>48 Ounces</option>
                                        <option>64 Ounces</option>
                                        <option>96 Ounces</option>
                                      </Input>
                                    </FormGroup>
                                  </Collapse>
                                  <br />
                                  <Button
                                    className='btn-icon'
                                    color='info'
                                    onClick={() => {
                                      if (otherChemsOpen) {
                                        setFieldValue('sodaAsh', '');
                                        setFieldValue('CalciumChloride', '');
                                        setFieldValue('conditioner', '');
                                        setFieldValue('sodiumBicar', '');
                                        setFieldValue('diatomaceous', '');
                                        setFieldValue('diatomaceousAlt', '');
                                        setFieldValue('sodiumBro', '');
                                        setFieldValue('dryAcid', '');
                                        setFieldValue('clarifier', '');
                                        setFieldValue('phosphateRemover', '');
                                        setFieldValue('salt', '');
                                        setFieldValue('enzymes', '');
                                        setFieldValue('metalSequester', '');
                                        setFieldValue('bromineGran', '');
                                        setFieldValue('bromineTab', '');
                                        setFieldValue('poolFlocc', '');
                                        setFieldValue('borate', '');
                                      }
                                      setOtherChemsOpen(!otherChemsOpen);
                                    }}
                                    block
                                  >
                                    {otherChemsOpen ? (
                                      <Fragment>
                                        <span className='btn-inner--icon'>
                                          <i className='fas fa-minus'></i>
                                        </span>
                                        <span className='btn-inner--text'>
                                          Other Chems
                                        </span>
                                      </Fragment>
                                    ) : (
                                      <Fragment>
                                        <span className='btn-inner--icon'>
                                          <i className='fas fa-plus'></i>
                                        </span>
                                        <span className='btn-inner--text'>
                                          Other Chems
                                        </span>
                                      </Fragment>
                                    )}
                                  </Button>

                                  <Collapse isOpen={otherChemsOpen}>
                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Soda Ash (Sodium Carbonate)
                                      </Label>
                                      <Input
                                        type='select'
                                        name='sodaAsh'
                                        value={values.sodaAsh}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>No Soda Ash Added</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          D.E. Scoop Measurement
                                        </option>

                                        <option>1/8 D.E. Scoop</option>
                                        <option>1/4 D.E. Scoop</option>
                                        <option>1/2 D.E. Scoop</option>
                                        <option>3/4 D.E. Scoop</option>
                                        <option>1 Full D.E. Scoop</option>
                                        <option>1.5 D.E. Scoops</option>
                                        <option>2 D.E. Scoops</option>
                                        <option>3 D.E. Scoops</option>
                                        <option>4 D.E. Scoops</option>
                                        <option>5 D.E. Scoops</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Ounces Measurement
                                        </option>
                                        <option>2 Ounces</option>
                                        <option>4 Ounces</option>
                                        <option>8 Ounces</option>
                                        <option>12 Ounces</option>
                                        <option>18 Ounces</option>
                                        <option>22 Ounces</option>
                                        <option>26 Ounces</option>
                                        <option>30 Ounces</option>
                                        <option>36 Ounces</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Pounds Measurement
                                        </option>
                                        <option>1/2 Pound</option>
                                        <option>1 Pound</option>
                                        <option>1.5 Pounds</option>
                                        <option>2 Pounds</option>
                                        <option>2.5 Pounds</option>
                                        <option>3 Pounds</option>
                                        <option>3.5 Pounds</option>
                                        <option>4 Pounds</option>
                                        <option>4.5 Pounds</option>
                                        <option>5 Pounds</option>
                                        <option>6 Pounds</option>
                                        <option>7 Pounds</option>
                                        <option>8 Pounds</option>
                                        <option>9 Pounds</option>
                                        <option>10 Pounds</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Cups Measurement
                                        </option>
                                        <option>1/8 Cup</option>
                                        <option>1/4 Cup</option>
                                        <option>1/3 Cup</option>
                                        <option>1/2 Cup</option>
                                        <option>2/3 Cup</option>
                                        <option>3/4 Cup</option>
                                        <option>1 Cup</option>
                                        <option>1.5 Cups</option>
                                        <option>2 Cups</option>
                                        <option>2.5 Cups</option>
                                        <option>3 Cups</option>
                                        <option>3.5 Cups</option>
                                        <option>4 Cups</option>
                                        <option>4.5 Cups</option>
                                        <option>5 Cups</option>
                                        <option>6 Cups</option>
                                        <option>7 Cups</option>
                                        <option>8 Cups</option>
                                        <option>9 Cups</option>
                                        <option>10 Cups</option>
                                        <option>11 Cups</option>
                                        <option>12 Cups</option>
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Calcium Chloride (Hardness+)
                                      </Label>
                                      <Input
                                        type='select'
                                        name='CalciumChloride'
                                        value={values.CalciumChloride}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>
                                          No Calcium Chloride Added
                                        </option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          D.E. Scoop Measurement
                                        </option>

                                        <option>1/8 D.E. Scoop</option>
                                        <option>1/4 D.E. Scoop</option>
                                        <option>1/2 D.E. Scoop</option>
                                        <option>3/4 D.E. Scoop</option>
                                        <option>1 Full D.E. Scoop</option>
                                        <option>1.5 D.E. Scoops</option>
                                        <option>2 D.E. Scoops</option>
                                        <option>3 D.E. Scoops</option>
                                        <option>4 D.E. Scoops</option>
                                        <option>5 D.E. Scoops</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Ounces Measurement
                                        </option>
                                        <option>2 Ounces</option>
                                        <option>4 Ounces</option>
                                        <option>8 Ounces</option>
                                        <option>12 Ounces</option>
                                        <option>18 Ounces</option>
                                        <option>22 Ounces</option>
                                        <option>26 Ounces</option>
                                        <option>30 Ounces</option>
                                        <option>36 Ounces</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Pounds Measurement
                                        </option>
                                        <option>1/2 Pound</option>
                                        <option>1 Pound</option>
                                        <option>1.5 Pounds</option>
                                        <option>2 Pounds</option>
                                        <option>2.5 Pounds</option>
                                        <option>3 Pounds</option>
                                        <option>3.5 Pounds</option>
                                        <option>4 Pounds</option>
                                        <option>4.5 Pounds</option>
                                        <option>5 Pounds</option>
                                        <option>6 Pounds</option>
                                        <option>7 Pounds</option>
                                        <option>8 Pounds</option>
                                        <option>9 Pounds</option>
                                        <option>10 Pounds</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Cups Measurement
                                        </option>
                                        <option>1/8 Cup</option>
                                        <option>1/4 Cup</option>
                                        <option>1/3 Cup</option>
                                        <option>1/2 Cup</option>
                                        <option>2/3 Cup</option>
                                        <option>3/4 Cup</option>
                                        <option>1 Cup</option>
                                        <option>1.5 Cups</option>
                                        <option>2 Cups</option>
                                        <option>2.5 Cups</option>
                                        <option>3 Cups</option>
                                        <option>3.5 Cups</option>
                                        <option>4 Cups</option>
                                        <option>4.5 Cups</option>
                                        <option>5 Cups</option>
                                        <option>6 Cups</option>
                                        <option>7 Cups</option>
                                        <option>8 Cups</option>
                                        <option>9 Cups</option>
                                        <option>10 Cups</option>
                                        <option>11 Cups</option>
                                        <option>12 Cups</option>
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Conditioner (Cyanuric Acid)
                                      </Label>
                                      <Input
                                        type='select'
                                        name='conditioner'
                                        value={values.conditioner}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>No Conditioner Added</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          D.E. Scoop Measurement
                                        </option>

                                        <option>1/8 D.E. Scoop</option>
                                        <option>1/4 D.E. Scoop</option>
                                        <option>1/2 D.E. Scoop</option>
                                        <option>3/4 D.E. Scoop</option>
                                        <option>1 Full D.E. Scoop</option>
                                        <option>1.5 D.E. Scoops</option>
                                        <option>2 D.E. Scoops</option>
                                        <option>3 D.E. Scoops</option>
                                        <option>4 D.E. Scoops</option>
                                        <option>5 D.E. Scoops</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Ounces Measurement
                                        </option>
                                        <option>2 Ounces</option>
                                        <option>4 Ounces</option>
                                        <option>8 Ounces</option>
                                        <option>12 Ounces</option>
                                        <option>18 Ounces</option>
                                        <option>22 Ounces</option>
                                        <option>26 Ounces</option>
                                        <option>30 Ounces</option>
                                        <option>36 Ounces</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Pounds Measurement
                                        </option>
                                        <option>1/2 Pound</option>
                                        <option>1 Pound</option>
                                        <option>1.5 Pounds</option>
                                        <option>2 Pounds</option>
                                        <option>2.5 Pounds</option>
                                        <option>3 Pounds</option>
                                        <option>3.5 Pounds</option>
                                        <option>4 Pounds</option>
                                        <option>4.5 Pounds</option>
                                        <option>5 Pounds</option>
                                        <option>6 Pounds</option>
                                        <option>7 Pounds</option>
                                        <option>8 Pounds</option>
                                        <option>9 Pounds</option>
                                        <option>10 Pounds</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Cups Measurement
                                        </option>
                                        <option>1/8 Cup</option>
                                        <option>1/4 Cup</option>
                                        <option>1/3 Cup</option>
                                        <option>1/2 Cup</option>
                                        <option>2/3 Cup</option>
                                        <option>3/4 Cup</option>
                                        <option>1 Cup</option>
                                        <option>1.5 Cups</option>
                                        <option>2 Cups</option>
                                        <option>2.5 Cups</option>
                                        <option>3 Cups</option>
                                        <option>3.5 Cups</option>
                                        <option>4 Cups</option>
                                        <option>4.5 Cups</option>
                                        <option>5 Cups</option>
                                        <option>6 Cups</option>
                                        <option>7 Cups</option>
                                        <option>8 Cups</option>
                                        <option>9 Cups</option>
                                        <option>10 Cups</option>
                                        <option>11 Cups</option>
                                        <option>12 Cups</option>
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Sodium Bicarbonate (baking soda)
                                      </Label>
                                      <Input
                                        type='select'
                                        name='sodiumBicar'
                                        value={values.sodiumBicar}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>
                                          No Sodium Bicarbonate Added
                                        </option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          D.E. Scoop Measurement
                                        </option>

                                        <option>1/8 D.E. Scoop</option>
                                        <option>1/4 D.E. Scoop</option>
                                        <option>1/2 D.E. Scoop</option>
                                        <option>3/4 D.E. Scoop</option>
                                        <option>1 Full D.E. Scoop</option>
                                        <option>1.5 D.E. Scoops</option>
                                        <option>2 D.E. Scoops</option>
                                        <option>3 D.E. Scoops</option>
                                        <option>4 D.E. Scoops</option>
                                        <option>5 D.E. Scoops</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Ounces Measurement
                                        </option>
                                        <option>2 Ounces</option>
                                        <option>4 Ounces</option>
                                        <option>8 Ounces</option>
                                        <option>12 Ounces</option>
                                        <option>18 Ounces</option>
                                        <option>22 Ounces</option>
                                        <option>26 Ounces</option>
                                        <option>30 Ounces</option>
                                        <option>36 Ounces</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Pounds Measurement
                                        </option>
                                        <option>1/2 Pound</option>
                                        <option>1 Pound</option>
                                        <option>1.5 Pounds</option>
                                        <option>2 Pounds</option>
                                        <option>2.5 Pounds</option>
                                        <option>3 Pounds</option>
                                        <option>3.5 Pounds</option>
                                        <option>4 Pounds</option>
                                        <option>4.5 Pounds</option>
                                        <option>5 Pounds</option>
                                        <option>6 Pounds</option>
                                        <option>7 Pounds</option>
                                        <option>8 Pounds</option>
                                        <option>9 Pounds</option>
                                        <option>10 Pounds</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Cups Measurement
                                        </option>
                                        <option>1/8 Cup</option>
                                        <option>1/4 Cup</option>
                                        <option>1/3 Cup</option>
                                        <option>1/2 Cup</option>
                                        <option>2/3 Cup</option>
                                        <option>3/4 Cup</option>
                                        <option>1 Cup</option>
                                        <option>1.5 Cups</option>
                                        <option>2 Cups</option>
                                        <option>2.5 Cups</option>
                                        <option>3 Cups</option>
                                        <option>3.5 Cups</option>
                                        <option>4 Cups</option>
                                        <option>4.5 Cups</option>
                                        <option>5 Cups</option>
                                        <option>6 Cups</option>
                                        <option>7 Cups</option>
                                        <option>8 Cups</option>
                                        <option>9 Cups</option>
                                        <option>10 Cups</option>
                                        <option>11 Cups</option>
                                        <option>12 Cups</option>
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Diatomaceous Earth
                                      </Label>
                                      <Input
                                        type='select'
                                        name='diatomaceous'
                                        value={values.diatomaceous}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>
                                          No Diatomaceous Earth Added
                                        </option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          D.E. Scoop Measurement
                                        </option>

                                        <option>1/8 D.E. Scoop</option>
                                        <option>1/4 D.E. Scoop</option>
                                        <option>1/2 D.E. Scoop</option>
                                        <option>3/4 D.E. Scoop</option>
                                        <option>1 Full D.E. Scoop</option>
                                        <option>1.5 D.E. Scoops</option>
                                        <option>2 D.E. Scoops</option>
                                        <option>3 D.E. Scoops</option>
                                        <option>4 D.E. Scoops</option>
                                        <option>5 D.E. Scoops</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Ounces Measurement
                                        </option>
                                        <option>2 Ounces</option>
                                        <option>4 Ounces</option>
                                        <option>8 Ounces</option>
                                        <option>12 Ounces</option>
                                        <option>18 Ounces</option>
                                        <option>22 Ounces</option>
                                        <option>26 Ounces</option>
                                        <option>30 Ounces</option>
                                        <option>36 Ounces</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Pounds Measurement
                                        </option>
                                        <option>1/2 Pound</option>
                                        <option>1 Pound</option>
                                        <option>1.5 Pounds</option>
                                        <option>2 Pounds</option>
                                        <option>2.5 Pounds</option>
                                        <option>3 Pounds</option>
                                        <option>3.5 Pounds</option>
                                        <option>4 Pounds</option>
                                        <option>4.5 Pounds</option>
                                        <option>5 Pounds</option>
                                        <option>6 Pounds</option>
                                        <option>7 Pounds</option>
                                        <option>8 Pounds</option>
                                        <option>9 Pounds</option>
                                        <option>10 Pounds</option>
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Diatomaceous Earth Alternative (Aqua
                                        Perl, FiberClear etc)
                                      </Label>
                                      <Input
                                        type='select'
                                        name='diatomaceousAlt'
                                        value={values.diatomaceousAlt}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>
                                          No Diatomaceous Earth Alternative
                                          Added
                                        </option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          D.E. Scoop Measurement
                                        </option>

                                        <option>1/8 D.E. Scoop</option>
                                        <option>1/4 D.E. Scoop</option>
                                        <option>1/2 D.E. Scoop</option>
                                        <option>3/4 D.E. Scoop</option>
                                        <option>1 Full D.E. Scoop</option>
                                        <option>1.5 D.E. Scoops</option>
                                        <option>2 D.E. Scoops</option>
                                        <option>3 D.E. Scoops</option>
                                        <option>4 D.E. Scoops</option>
                                        <option>5 D.E. Scoops</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Ounces Measurement
                                        </option>
                                        <option>2 Ounces</option>
                                        <option>4 Ounces</option>
                                        <option>8 Ounces</option>
                                        <option>12 Ounces</option>
                                        <option>18 Ounces</option>
                                        <option>22 Ounces</option>
                                        <option>26 Ounces</option>
                                        <option>30 Ounces</option>
                                        <option>36 Ounces</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Pounds Measurement
                                        </option>
                                        <option>1/2 Pound</option>
                                        <option>1 Pound</option>
                                        <option>1.5 Pounds</option>
                                        <option>2 Pounds</option>
                                        <option>2.5 Pounds</option>
                                        <option>3 Pounds</option>
                                        <option>3.5 Pounds</option>
                                        <option>4 Pounds</option>
                                        <option>4.5 Pounds</option>
                                        <option>5 Pounds</option>
                                        <option>6 Pounds</option>
                                        <option>7 Pounds</option>
                                        <option>8 Pounds</option>
                                        <option>9 Pounds</option>
                                        <option>10 Pounds</option>
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Sodium Bromide
                                      </Label>
                                      <Input
                                        type='select'
                                        name='sodiumBro'
                                        value={values.sodiumBro}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>No Sodium Bromide Added</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          D.E. Scoop Measurement
                                        </option>

                                        <option>1/8 D.E. Scoop</option>
                                        <option>1/4 D.E. Scoop</option>
                                        <option>1/2 D.E. Scoop</option>
                                        <option>3/4 D.E. Scoop</option>
                                        <option>1 Full D.E. Scoop</option>
                                        <option>1.5 D.E. Scoops</option>
                                        <option>2 D.E. Scoops</option>
                                        <option>3 D.E. Scoops</option>
                                        <option>4 D.E. Scoops</option>
                                        <option>5 D.E. Scoops</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Ounces Measurement
                                        </option>
                                        <option>2 Ounces</option>
                                        <option>4 Ounces</option>
                                        <option>8 Ounces</option>
                                        <option>12 Ounces</option>
                                        <option>18 Ounces</option>
                                        <option>22 Ounces</option>
                                        <option>26 Ounces</option>
                                        <option>30 Ounces</option>
                                        <option>36 Ounces</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Pounds Measurement
                                        </option>
                                        <option>1/2 Pound</option>
                                        <option>1 Pound</option>
                                        <option>1.5 Pounds</option>
                                        <option>2 Pounds</option>
                                        <option>2.5 Pounds</option>
                                        <option>3 Pounds</option>
                                        <option>3.5 Pounds</option>
                                        <option>4 Pounds</option>
                                        <option>4.5 Pounds</option>
                                        <option>5 Pounds</option>
                                        <option>6 Pounds</option>
                                        <option>7 Pounds</option>
                                        <option>8 Pounds</option>
                                        <option>9 Pounds</option>
                                        <option>10 Pounds</option>
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Dry Acid
                                      </Label>
                                      <Input
                                        type='select'
                                        name='dryAcid'
                                        value={values.dryAcid}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>No Dry Acid Added</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          D.E. Scoop Measurement
                                        </option>

                                        <option>1/8 D.E. Scoop</option>
                                        <option>1/4 D.E. Scoop</option>
                                        <option>1/2 D.E. Scoop</option>
                                        <option>3/4 D.E. Scoop</option>
                                        <option>1 Full D.E. Scoop</option>
                                        <option>1.5 D.E. Scoops</option>
                                        <option>2 D.E. Scoops</option>
                                        <option>3 D.E. Scoops</option>
                                        <option>4 D.E. Scoops</option>
                                        <option>5 D.E. Scoops</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Ounces Measurement
                                        </option>
                                        <option>2 Ounces</option>
                                        <option>4 Ounces</option>
                                        <option>8 Ounces</option>
                                        <option>12 Ounces</option>
                                        <option>18 Ounces</option>
                                        <option>22 Ounces</option>
                                        <option>26 Ounces</option>
                                        <option>30 Ounces</option>
                                        <option>36 Ounces</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Pounds Measurement
                                        </option>
                                        <option>1/2 Pound</option>
                                        <option>1 Pound</option>
                                        <option>1.5 Pounds</option>
                                        <option>2 Pounds</option>
                                        <option>2.5 Pounds</option>
                                        <option>3 Pounds</option>
                                        <option>3.5 Pounds</option>
                                        <option>4 Pounds</option>
                                        <option>4.5 Pounds</option>
                                        <option>5 Pounds</option>
                                        <option>6 Pounds</option>
                                        <option>7 Pounds</option>
                                        <option>8 Pounds</option>
                                        <option>9 Pounds</option>
                                        <option>10 Pounds</option>
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Clarifier
                                      </Label>
                                      <Input
                                        type='select'
                                        name='clarifier'
                                        value={values.clarifier}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>No Clarifier Added</option>
                                        <option>2 Ounces</option>
                                        <option>4 Ounces</option>
                                        <option>6 Ounces</option>
                                        <option>8 Ounces</option>
                                        <option>10 Ounces</option>
                                        <option>12 Ounces</option>
                                        <option>14 Ounces</option>
                                        <option>16 Ounces</option>
                                        <option>18 Ounces</option>
                                        <option>20 Ounces</option>
                                        <option>22 Ounces</option>
                                        <option>24 Ounces</option>
                                        <option>26 Ounces</option>
                                        <option>28 Ounces</option>
                                        <option>30 Ounces</option>
                                        <option>32 Ounces</option>
                                        <option>48 Ounces</option>
                                        <option>64 Ounces</option>
                                        <option>96 Ounces</option>
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Phosphate Remover
                                      </Label>
                                      <Input
                                        type='select'
                                        name='phosphateRemover'
                                        value={values.phosphateRemover}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>
                                          No Phosphate Remover Added
                                        </option>
                                        <option>2 Ounces</option>
                                        <option>4 Ounces</option>
                                        <option>6 Ounces</option>
                                        <option>8 Ounces</option>
                                        <option>10 Ounces</option>
                                        <option>12 Ounces</option>
                                        <option>14 Ounces</option>
                                        <option>16 Ounces</option>
                                        <option>18 Ounces</option>
                                        <option>20 Ounces</option>
                                        <option>22 Ounces</option>
                                        <option>24 Ounces</option>
                                        <option>26 Ounces</option>
                                        <option>28 Ounces</option>
                                        <option>30 Ounces</option>
                                        <option>32 Ounces</option>
                                        <option>48 Ounces</option>
                                        <option>64 Ounces</option>
                                        <option>96 Ounces</option>
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Salt
                                      </Label>
                                      <Input
                                        type='select'
                                        name='salt'
                                        value={values.salt}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>No Salt Added</option>
                                        <option>1 bag of Salt</option>
                                        <option>2 bags of Salt</option>
                                        <option>3 bags of Salt</option>
                                        <option>4 bags of Salt</option>
                                        <option>5 bags of Salt</option>
                                        <option>6 bags of Salt</option>
                                        <option>7 bags of Salt</option>
                                        <option>8 bags of Salt</option>
                                        <option>9 bags of Salt</option>
                                        <option>10 bags of Salt</option>
                                        <option>11 bags of Salt</option>
                                        <option>12 bags of Salt</option>
                                        <option>13 bags of Salt</option>
                                        <option>14 bags of Salt</option>
                                        <option>15 bags of Salt</option>
                                        <option>16 bags of Salt</option>
                                        <option>17 bags of Salt</option>
                                        <option>18 bags of Salt</option>
                                        <option>19 bags of Salt</option>
                                        <option>20 bags of Salt</option>
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Pool Enzymes (Pool Perfect, Pool Zyme
                                        etc)
                                      </Label>
                                      <Input
                                        type='select'
                                        name='enzymes'
                                        value={values.enzymes}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>No Pool Enzymes Added</option>
                                        <option>2 Ounces</option>
                                        <option>4 Ounces</option>
                                        <option>6 Ounces</option>
                                        <option>8 Ounces</option>
                                        <option>10 Ounces</option>
                                        <option>12 Ounces</option>
                                        <option>14 Ounces</option>
                                        <option>16 Ounces</option>
                                        <option>18 Ounces</option>
                                        <option>20 Ounces</option>
                                        <option>22 Ounces</option>
                                        <option>24 Ounces</option>
                                        <option>26 Ounces</option>
                                        <option>28 Ounces</option>
                                        <option>30 Ounces</option>
                                        <option>32 Ounces</option>
                                        <option>48 Ounces</option>
                                        <option>64 Ounces</option>
                                        <option>96 Ounces</option>
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Metal Sequestering Agent
                                      </Label>
                                      <Input
                                        type='select'
                                        name='metalSequester'
                                        value={values.metalSequester}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>
                                          No Sequestering Agent Added
                                        </option>
                                        <option>2 Ounces</option>
                                        <option>4 Ounces</option>
                                        <option>6 Ounces</option>
                                        <option>8 Ounces</option>
                                        <option>10 Ounces</option>
                                        <option>12 Ounces</option>
                                        <option>14 Ounces</option>
                                        <option>16 Ounces</option>
                                        <option>18 Ounces</option>
                                        <option>20 Ounces</option>
                                        <option>22 Ounces</option>
                                        <option>24 Ounces</option>
                                        <option>26 Ounces</option>
                                        <option>28 Ounces</option>
                                        <option>30 Ounces</option>
                                        <option>32 Ounces</option>
                                        <option>48 Ounces</option>
                                        <option>64 Ounces</option>
                                        <option>96 Ounces</option>
                                        <option>128 Ounces</option>
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Bromine Granular
                                      </Label>
                                      <Input
                                        type='select'
                                        name='bromineGran'
                                        value={values.bromineGran}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>
                                          No Bromine Granular Added
                                        </option>
                                        <option>2 Ounces</option>
                                        <option>4 Ounces</option>
                                        <option>6 Ounces</option>
                                        <option>8 Ounces</option>
                                        <option>10 Ounces</option>
                                        <option>12 Ounces</option>
                                        <option>14 Ounces</option>
                                        <option>16 Ounces</option>
                                        <option>18 Ounces</option>
                                        <option>20 Ounces</option>
                                        <option>22 Ounces</option>
                                        <option>24 Ounces</option>
                                        <option>26 Ounces</option>
                                        <option>28 Ounces</option>
                                        <option>30 Ounces</option>
                                        <option>32 Ounces</option>
                                        <option>48 Ounces</option>
                                        <option>64 Ounces</option>
                                        <option>96 Ounces</option>
                                        <option>128 Ounces</option>
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Bromine Tablets
                                      </Label>
                                      <Input
                                        type='select'
                                        name='bromineTab'
                                        value={values.bromineTab}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>No Bromine Tablets Used</option>
                                        <option>1 Tab</option>
                                        <option>2 Tabs</option>
                                        <option>3 Tabs</option>
                                        <option>4 Tabs</option>
                                        <option>5 Tabs</option>
                                        <option>6 Tabs</option>
                                        <option>7 Tabs</option>
                                        <option>8 Tabs</option>
                                        <option>9 Tabs</option>
                                        <option>10 Tabs</option>
                                        <option>11 Tabs</option>
                                        <option>12 Tabs</option>
                                        <option>13 Tabs</option>
                                        <option>14 Tabs</option>
                                        <option>15 Tabs</option>
                                        <option>16 Tabs</option>
                                        <option>17 Tabs</option>
                                        <option>18 Tabs</option>
                                        <option>19 Tabs</option>
                                        <option>20 Tabs</option>
                                        <option>21 Tabs</option>
                                        <option>22 Tabs</option>
                                        <option>23 Tabs</option>
                                        <option>24 Tabs</option>
                                        <option>25 Tabs</option>
                                        <option>26 Tabs</option>
                                        <option>27 Tabs</option>
                                        <option>28 Tabs</option>
                                        <option>29 Tabs</option>
                                        <option>30 Tabs</option>
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Pool Flocculant
                                      </Label>
                                      <Input
                                        type='select'
                                        name='poolFlocc'
                                        value={values.poolFlocc}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>
                                          No Pool Flocculant Added
                                        </option>
                                        <option>2 Ounces</option>
                                        <option>4 Ounces</option>
                                        <option>6 Ounces</option>
                                        <option>8 Ounces</option>
                                        <option>10 Ounces</option>
                                        <option>12 Ounces</option>
                                        <option>14 Ounces</option>
                                        <option>16 Ounces</option>
                                        <option>18 Ounces</option>
                                        <option>20 Ounces</option>
                                        <option>22 Ounces</option>
                                        <option>24 Ounces</option>
                                        <option>26 Ounces</option>
                                        <option>28 Ounces</option>
                                        <option>30 Ounces</option>
                                        <option>32 Ounces</option>
                                        <option>48 Ounces</option>
                                        <option>64 Ounces</option>
                                        <option>96 Ounces</option>
                                        <option>128 Ounces</option>
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Borate
                                      </Label>
                                      <Input
                                        type='select'
                                        name='borate'
                                        value={values.borate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option>No Borate Added</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          D.E. Scoop Measurement
                                        </option>

                                        <option>1/8 D.E. Scoop</option>
                                        <option>1/4 D.E. Scoop</option>
                                        <option>1/2 D.E. Scoop</option>
                                        <option>3/4 D.E. Scoop</option>
                                        <option>1 Full D.E. Scoop</option>
                                        <option>1.5 D.E. Scoops</option>
                                        <option>2 D.E. Scoops</option>
                                        <option>3 D.E. Scoops</option>
                                        <option>4 D.E. Scoops</option>
                                        <option>5 D.E. Scoops</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Ounces Measurement
                                        </option>
                                        <option>2 Ounces</option>
                                        <option>4 Ounces</option>
                                        <option>8 Ounces</option>
                                        <option>12 Ounces</option>
                                        <option>18 Ounces</option>
                                        <option>22 Ounces</option>
                                        <option>26 Ounces</option>
                                        <option>30 Ounces</option>
                                        <option>36 Ounces</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Pounds Measurement
                                        </option>
                                        <option>1/2 Pound</option>
                                        <option>1 Pound</option>
                                        <option>1.5 Pounds</option>
                                        <option>2 Pounds</option>
                                        <option>2.5 Pounds</option>
                                        <option>3 Pounds</option>
                                        <option>3.5 Pounds</option>
                                        <option>4 Pounds</option>
                                        <option>4.5 Pounds</option>
                                        <option>5 Pounds</option>
                                        <option>6 Pounds</option>
                                        <option>7 Pounds</option>
                                        <option>8 Pounds</option>
                                        <option>9 Pounds</option>
                                        <option>10 Pounds</option>
                                        <option>11 Pounds</option>
                                        <option>12 Pounds</option>
                                        <option>13 Pounds</option>
                                        <option>14 Pounds</option>
                                        <option>15 Pounds</option>
                                        <option>16 Pounds</option>
                                        <option>17 Pounds</option>
                                        <option>18 Pounds</option>
                                        <option>19 Pounds</option>
                                        <option>20 Pounds</option>
                                        <option>21 Pounds</option>
                                        <option>22 Pounds</option>
                                        <option>23 Pounds</option>
                                        <option>24 Pounds</option>
                                        <option>25 Pounds</option>
                                        <option>26 Pounds</option>
                                        <option>27 Pounds</option>
                                        <option>28 Pounds</option>
                                        <option>29 Pounds</option>
                                        <option>30 Pounds</option>
                                        <option>31 Pounds</option>
                                        <option>32 Pounds</option>
                                        <option>33 Pounds</option>
                                        <option>34 Pounds</option>
                                        <option>35 Pounds</option>
                                        <option>36 Pounds</option>
                                        <option>37 Pounds</option>
                                        <option>38 Pounds</option>
                                        <option>39 Pounds</option>
                                        <option>40 Pounds</option>
                                        <option>41 Pounds</option>
                                        <option>42 Pounds</option>
                                        <option>43 Pounds</option>
                                        <option>44 Pounds</option>
                                        <option>45 Pounds</option>
                                        <option>46 Pounds</option>
                                        <option>47 Pounds</option>
                                        <option>48 Pounds</option>
                                        <option>49 Pounds</option>
                                        <option>50 Pounds</option>
                                        <option
                                          className='option-heading'
                                          disabled
                                        >
                                          Cups Measurement
                                        </option>
                                        <option>1/8 Cup</option>
                                        <option>1/4 Cup</option>
                                        <option>1/3 Cup</option>
                                        <option>1/2 Cup</option>
                                        <option>2/3 Cup</option>
                                        <option>3/4 Cup</option>
                                        <option>1 Cup</option>
                                        <option>1.5 Cups</option>
                                        <option>2 Cups</option>
                                        <option>2.5 Cups</option>
                                        <option>3 Cups</option>
                                        <option>3.5 Cups</option>
                                        <option>4 Cups</option>
                                        <option>4.5 Cups</option>
                                        <option>5 Cups</option>
                                        <option>6 Cups</option>
                                        <option>7 Cups</option>
                                        <option>8 Cups</option>
                                        <option>9 Cups</option>
                                        <option>10 Cups</option>
                                        <option>11 Cups</option>
                                        <option>12 Cups</option>
                                      </Input>
                                    </FormGroup>
                                  </Collapse>
                                </FormGroup>
                              </Fragment>
                            )
                          )}

                          <Fragment>
                            {notesView && !showChems && (
                              <Fragment>
                                <FormGroup>
                                  <Label className='form-control-label'>
                                    Log Images (Emailed to Customer)
                                  </Label>
                                  <ImageUploader
                                    withIcon={true}
                                    buttonText='Choose images'
                                    onChange={onDrop}
                                    imgExtension={[
                                      '.jpg',
                                      '.gif',
                                      '.png',
                                      '.gif'
                                    ]}
                                    maxFileSize={5242880}
                                    withPreview={true}
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label className='form-control-label'>
                                    Private Notes (Only Visible to Company)
                                  </Label>
                                  <Input
                                    type='textarea'
                                    name='privateNote'
                                    onChange={handleChange}
                                    value={values.privateNote}
                                    onBlur={handleBlur}
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label className='form-control-label'>
                                    Note To Customer (Emailed to Customer)
                                  </Label>
                                  <Input
                                    type='textarea'
                                    name='publicNote'
                                    onChange={handleChange}
                                    value={values.publicNote}
                                    onBlur={handleBlur}
                                  />
                                </FormGroup>

                                <Button
                                  color='info'
                                  block
                                  onClick={() => {
                                    setShowRepair(!showRepair);
                                  }}
                                >
                                  Repair Order
                                </Button>
                                <Collapse isOpen={showRepair}>
                                  <Fragment>
                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Repair Type
                                      </Label>
                                      <Input type='select'>
                                        <option>
                                          Repair Request (Submit a Order for
                                          Future Repair)
                                        </option>
                                        <option>Repair Completed</option>
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Notify Customer?
                                      </Label>{' '}
                                      <br />
                                      <label className='custom-toggle'>
                                        <Input type='checkbox' />
                                        <span
                                          className='custom-toggle-slider rounded-circle'
                                          data-label-off='No'
                                          data-label-on='Yes'
                                        ></span>
                                      </label>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Enter Description of Repair (Sent to
                                        Customer)
                                      </Label>
                                      <Input type='textarea' />
                                    </FormGroup>

                                    <FormGroup>
                                      <Label className='form-control-label'>
                                        Note for Office (Company Only)
                                      </Label>
                                      <Input type='textarea' />
                                    </FormGroup>

                                    <ImageUploader
                                      withIcon={true}
                                      buttonText='Choose images'
                                      onChange={onDrop}
                                      imgExtension={[
                                        '.jpg',
                                        '.gif',
                                        '.png',
                                        '.gif'
                                      ]}
                                      maxFileSize={5242880}
                                      withPreview={true}
                                    />
                                  </Fragment>
                                </Collapse>
                                <br />
                              </Fragment>
                            )}
                          </Fragment>

                          <Fragment>
                            {!showChems && !notesView && (
                              <Button
                                color='primary'
                                className='btn-icon'
                                block
                                onClick={() => {
                                  setShowChems(!showChems);
                                }}
                              >
                                <span className='btn-inner--text'>Next</span>
                                <span className='btn-inner--icon'>
                                  <i className='ni ni-bold-right'></i>
                                </span>
                              </Button>
                            )}
                          </Fragment>

                          <Fragment>
                            {!showChems && notesView && (
                              <Row>
                                <Col>
                                  <Button
                                    color='secondary'
                                    className='btn-icon'
                                    block
                                    onClick={() => {
                                      setShowChems(!showChems);
                                      setNotesView(!notesView);
                                    }}
                                  >
                                    <span className='btn-inner--icon'>
                                      <i className='ni ni-bold-left'></i>
                                    </span>
                                    <span className='btn-inner--text'>
                                      Back
                                    </span>
                                  </Button>
                                </Col>
                                <Col>
                                  <Button
                                    color='success'
                                    className='btn-icon'
                                    block
                                    type='submit'
                                    onClick={handleSubmit}
                                  >
                                    <span className='btn-inner--icon'>
                                      <i className='fas fa-check-circle'></i>
                                    </span>
                                    {isProcessing ? (
                                      <span className='btn-inner--text'>
                                        <SpinnerCircular
                                          size={24}
                                          thickness={180}
                                          speed={100}
                                          color='rgba(57, 125, 172, 1)'
                                          secondaryColor='rgba(0, 0, 0, 0.44)'
                                        />
                                        Processing...
                                      </span>
                                    ) : (
                                      <span className='btn-inner--text'>
                                        Complete Service
                                      </span>
                                    )}
                                  </Button>
                                </Col>
                              </Row>
                            )}
                          </Fragment>

                          <Fragment>
                            {showChems && !notesView && (
                              <Row>
                                <Col>
                                  <Button
                                    color='secondary'
                                    className='btn-icon'
                                    block
                                    onClick={() => {
                                      setShowChems(!showChems);
                                    }}
                                  >
                                    <span className='btn-inner--icon'>
                                      <i className='ni ni-bold-left'></i>
                                    </span>
                                    <span className='btn-inner--text'>
                                      Back
                                    </span>
                                  </Button>
                                </Col>
                                <Col>
                                  <Button
                                    color='primary'
                                    className='btn-icon'
                                    block
                                    onClick={() => {
                                      setNotesView(!notesView);
                                      setShowChems(!showChems);
                                    }}
                                  >
                                    <span className='btn-inner--text'>
                                      Next
                                    </span>
                                    <span className='btn-inner--icon'>
                                      <i className='ni ni-bold-right'></i>
                                    </span>
                                  </Button>
                                </Col>
                              </Row>
                            )}
                          </Fragment>

                          {/* <Fragment>
                            {!showChems && !notesView ? (
                              <Button
                                color='primary'
                                className='btn-icon'
                                block
                                onClick={() => {
                                  setNotesView(!notesView);
                                }}
                              >
                                <span className='btn-inner--text'>Next</span>
                                <span className='btn-inner--icon'>
                                  <i className='ni ni-bold-right'></i>
                                </span>
                              </Button>
                            ) : (
                              <Row>
                                <Col>
                                  <Button
                                    color='secondary'
                                    className='btn-icon'
                                    block
                                    onClick={() => {
                                      setShowChems(!showChems);
                                    }}
                                  >
                                    <span className='btn-inner--icon'>
                                      <i className='ni ni-bold-left'></i>
                                    </span>
                                    <span className='btn-inner--text'>
                                      Back
                                    </span>
                                  </Button>
                                </Col>
                                <Col>
                                  <Button
                                    color='success'
                                    type='submit'
                                    className='btn-icon'
                                    block
                                    onClick={handleSubmit}
                                  >
                                    <span className='btn-inner--text'>
                                      {isProcessing ? (
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
                                        <span>Save Log</span>
                                      )}
                                    </span>
                                    <span className='btn-inner--icon'>
                                      <i className='ni ni-cloud-upload-96'></i>
                                    </span>
                                  </Button>
                                </Col>
                              </Row>
                            )}
                          </Fragment> */}
                        </Form>
                      </Fragment>
                    )}
                  />
                </ModalBody>
              </Modal>

              <Col md='8'>
                <Card className='shadow'>
                  <CardHeader>
                    <h3>Today's Route</h3>
                    <Progress
                      animated
                      value={
                        (100 *
                          routeList.filter(
                            c =>
                              moment(c.customer.lastServiced).isSame(
                                Date.now(),
                                'day'
                              ) &&
                              c.customer.scheduledDay ===
                                moment(new Date()).format('dddd') &&
                              c.customer.lastServiced !== undefined
                          ).length) /
                        routeList.length
                      }
                    />
                  </CardHeader>
                  <CardBody>
                    <ListGroup>
                      {isAuthenticated && routeList && (
                        <Fragment>
                          {routeList.map((customer, index) => (
                            <Fragment key={customer._id}>
                              {customer.customer.scheduledDay ===
                                moment(new Date()).format('dddd') && (
                                <ListGroupItem>
                                  <Row>
                                    <Col md='2'>
                                      {moment(
                                        customer.customer.lastServiced
                                      ).isSame(Date.now(), 'day') &&
                                      customer.customer.lastServiced !=
                                        undefined ? (
                                        <div className='route-box bg-green text-center'>
                                          <h2>
                                            <i className='fas fa-check-circle'></i>
                                          </h2>
                                        </div>
                                      ) : (
                                        <div className='route-box text-center'>
                                          <h2>{index + 1}</h2>
                                        </div>
                                      )}
                                    </Col>
                                    <Col md='8'>
                                      <div className='text-center'>
                                        <h3>
                                          {customer.customer.firstName}{' '}
                                          {customer.customer.lastName}
                                        </h3>
                                        <p>
                                          {customer.customer.serviceAddress}
                                        </p>
                                        {moment(
                                          customer.customer.lastServiced
                                        ).isSame(Date.now(), 'day') &&
                                        customer.customer.lastServiced !=
                                          undefined ? (
                                          <span></span>
                                        ) : (
                                          <Row>
                                            <Col>
                                              {' '}
                                              <Button
                                                className='btn-icon mgn-btm-10'
                                                color='success'
                                                href={`https://www.google.com/maps/dir/Current+Location/${customer.customer.serviceLat},${customer.customer.serviceLng}`}
                                                target='_blank'
                                              >
                                                <span className='btn-inner--icon'>
                                                  <i className='ni ni-delivery-fast'></i>
                                                </span>
                                                <span className='btn-inner--text'>
                                                  GPS To Stop
                                                </span>
                                              </Button>
                                            </Col>
                                            <Col>
                                              {' '}
                                              <Button
                                                className='btn-icon mgn-btm-10'
                                                color='primary'
                                                onClick={() => {
                                                  getChecklist(
                                                    customer.customer._id
                                                  );
                                                  getCustomerServiceNotes(
                                                    customer.customer._id
                                                  );

                                                  setLogModal({
                                                    isServiceInfoOpen: true,
                                                    active:
                                                      customer.customer._id,
                                                    activeName:
                                                      customer.customer
                                                        .firstName +
                                                      ' ' +
                                                      customer.customer
                                                        .lastName,
                                                    customerLock:
                                                      customer.customer.gatecode
                                                  });
                                                }}
                                              >
                                                <span className='btn-inner--icon'>
                                                  <i className='ni ni-settings'></i>
                                                </span>
                                                <span className='btn-inner--text'>
                                                  Start Service
                                                </span>
                                              </Button>
                                            </Col>
                                          </Row>
                                        )}
                                      </div>
                                    </Col>
                                  </Row>
                                </ListGroupItem>
                              )}
                            </Fragment>
                          ))}
                        </Fragment>
                      )}
                    </ListGroup>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        )}

        {isAuthenticated && !loading && user.role !== 'Technician' && (
          <div className='container-fluid mt--6'>
            <div className='row'>
              <div className='col-xl-8'>
                <Card className='bg-default shadow'>
                  <CardHeader className='bg-transparent border-0'>
                    <Row>
                      <Col>
                        <h6 className='text-light text-uppercase ls-1 mb-1'>
                          Overview
                        </h6>
                        <h5 className='h3 text-white mb-0'>Work Orders</h5>
                      </Col>
                      <Col>
                        <ul className='nav nav-pills justify-content-end'>
                          <li
                            className='nav-item mr-2 mr-md-0'
                            data-toggle='chart'
                            data-target='#chart-sales-dark'
                            data-update='{"data":{"datasets":[{"data":[0, 20, 10, 30, 15, 40, 20, 60, 60]}]}}'
                            data-prefix='$'
                            data-suffix='k'
                          >
                            <a
                              href='#'
                              className='nav-link py-2 px-3 active'
                              data-toggle='tab'
                            >
                              <span className='d-none d-lg-block'>
                                New Customers
                              </span>
                              <span className='d-lg-none'>N</span>
                            </a>
                          </li>
                          <li
                            className='nav-item'
                            data-toggle='chart'
                            data-target='#chart-sales-dark'
                            data-update='{"data":{"datasets":[{"data":[0, 20, 5, 25, 10, 30, 15, 40, 40]}]}}'
                            data-prefix='$'
                            data-suffix='k'
                          >
                            <a
                              href='#'
                              className='nav-link py-2 px-3'
                              data-toggle='tab'
                            >
                              <span className='d-none d-lg-block'>
                                Current Customers
                              </span>
                              <span className='d-lg-none'>C</span>
                            </a>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </CardHeader>
                  <div
                    className='table-responsive'
                    id='list-container'
                    style={{ minHeight: '399px' }}
                  >
                    <Table className='align-items-center table-dark table-flush'>
                      <thead className='thead-dark'>
                        <tr>
                          <th className='sort' data-sort='date' scope='col'>
                            Order Date
                          </th>
                          <th className='sort' data-sort='service' scope='col'>
                            Service
                          </th>
                          <th className='sort' data-sort='rate' scope='col'>
                            Rate
                          </th>
                          <th className='sort' data-sort='status' scope='col'>
                            Status
                          </th>
                          <th scope='col' />
                        </tr>
                      </thead>
                      <tbody className='list'>
                        <tr>
                          <th scope='row'>
                            <Media className='align-items-center'>
                              <span className='date mb-0 text-sm'>
                                Aug 10, 2020
                              </span>
                            </Media>
                          </th>
                          <td className='service'>Weekly Pool Maintenance</td>

                          <td className='rate'>$99/wk</td>
                          <td>
                            <Badge color='' className='badge-dot mr-4'>
                              <i className='bg-danger' />
                              <span className='status'>Unassigned</span>
                            </Badge>
                          </td>

                          <td className='text-right'>
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className='btn-icon-only text-light'
                                color=''
                                role='button'
                                size='sm'
                              >
                                <i className='fas fa-ellipsis-v' />
                              </DropdownToggle>
                              <DropdownMenu
                                className='dropdown-menu-arrow'
                                right
                              >
                                <DropdownItem
                                  href='#pablo'
                                  onClick={e => e.preventDefault()}
                                >
                                  View
                                </DropdownItem>
                                <DropdownItem
                                  href='#pablo'
                                  onClick={e => e.preventDefault()}
                                >
                                  Edit
                                </DropdownItem>
                                <DropdownItem
                                  href='#pablo'
                                  onClick={e => e.preventDefault()}
                                >
                                  Mask As Closed
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>

                        <tr>
                          <th scope='row'>
                            <Media className='align-items-center'>
                              <span className='name mb-0 text-sm'>
                                Aug 08, 2020
                              </span>
                            </Media>
                          </th>
                          <td className='budget'>Weekly Pool Maintenance</td>

                          <td className='budget'>$69/wk</td>
                          <td>
                            <Badge color='' className='badge-dot mr-4'>
                              <i className='bg-info' />
                              <span className='status'>Assigned</span>
                            </Badge>
                          </td>

                          <td className='text-right'>
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className='btn-icon-only text-light'
                                color=''
                                role='button'
                                size='sm'
                              >
                                <i className='fas fa-ellipsis-v' />
                              </DropdownToggle>
                              <DropdownMenu
                                className='dropdown-menu-arrow'
                                right
                              >
                                <DropdownItem
                                  href='#pablo'
                                  onClick={e => e.preventDefault()}
                                >
                                  View
                                </DropdownItem>
                                <DropdownItem
                                  href='#pablo'
                                  onClick={e => e.preventDefault()}
                                >
                                  Edit
                                </DropdownItem>
                                <DropdownItem
                                  href='#pablo'
                                  onClick={e => e.preventDefault()}
                                >
                                  Mask As Closed
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>

                        <tr>
                          <th scope='row'>
                            <Media className='align-items-center'>
                              <span className='name mb-0 text-sm'>
                                Aug 05, 2020
                              </span>
                            </Media>
                          </th>
                          <td className='budget'>Equipment Repair</td>

                          <td className='budget'>$129.99</td>
                          <td>
                            <Badge color='' className='badge-dot mr-4'>
                              <i className='bg-success' />
                              <span className='status'>Complete</span>
                            </Badge>
                          </td>

                          <td className='text-right'>
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className='btn-icon-only text-light'
                                color=''
                                role='button'
                                size='sm'
                              >
                                <i className='fas fa-ellipsis-v' />
                              </DropdownToggle>
                              <DropdownMenu
                                className='dropdown-menu-arrow'
                                right
                              >
                                <DropdownItem
                                  href='#pablo'
                                  onClick={e => e.preventDefault()}
                                >
                                  View
                                </DropdownItem>
                                <DropdownItem
                                  href='#pablo'
                                  onClick={e => e.preventDefault()}
                                >
                                  Edit
                                </DropdownItem>
                                <DropdownItem
                                  href='#pablo'
                                  onClick={e => e.preventDefault()}
                                >
                                  Mask As Closed
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <Button color='primary'>View All</Button>
                </Card>
              </div>
              <div className='col-xl-4'>
                <div className='card'>
                  <div className='card-header bg-transparent'>
                    <div className='row align-items-center'>
                      <div className='col'>
                        <h6 className='text-uppercase text-muted ls-1 mb-1'>
                          Performance
                        </h6>
                        <h5 className='h3 mb-0'>Income</h5>
                      </div>
                    </div>
                  </div>
                  <div className='card-body'>
                    {/* Chart */}
                    <div className='chart'>
                      <Bar
                        data={chartExample2.data}
                        options={chartExample2.options}
                        className='chart-canvas'
                        id='chart-bars'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-xl-12'>
                <div className='card'>
                  <div className='card-header'>
                    <h3 className='mb-0'>Customers</h3>{' '}
                    <Button
                      color='primary'
                      className='float-right mgn-ng-top-28'
                    >
                      <span className='btn-inner--icon'>
                        <i className='ni ni-fat-add' />
                      </span>
                      <span className='btn-inner--text'> Add Customer</span>
                    </Button>
                  </div>

                  <ToolkitProvider
                    data={dataTable}
                    keyField='property'
                    columns={columns}
                    search
                    exportCSV
                  >
                    {props => (
                      <div
                        className='py-4 table-responsive'
                        style={{ padding: '25px' }}
                      >
                        <div id='datatable-basic_filter' className='px-4 pb-1'>
                          <Row>
                            <Col md='6'>
                              <ExportCSVButton
                                className='buttons-copy buttons-html5 btn-sm'
                                {...props.csvProps}
                              >
                                <i className='ni ni-align-left-2'></i> Export
                                CSV
                              </ExportCSVButton>
                            </Col>
                            <Col md={{ size: 'auto', offset: 3 }}>
                              <SearchBar
                                className='form-control-sm'
                                placeholder='Search Customers'
                                {...props.searchProps}
                              />
                            </Col>
                          </Row>
                        </div>

                        <BootstrapTable
                          {...props.baseProps}
                          bootstrap4={true}
                          pagination={pagination}
                          bordered={false}
                          wrapperClasses='table-responsive'
                        />
                      </div>
                    )}
                  </ToolkitProvider>
                </div>
              </div>
            </div>{' '}
            <Footer />
          </div>
        )}
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  addServiceLog: PropTypes.func.isRequired,
  getChecklist: PropTypes.func.isRequired,
  getCustomerServiceNotes: PropTypes.func.isRequired,
  getEmployeeRoute: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  customers: state.customer
});

export default connect(mapStateToProps, {
  addServiceLog,
  getChecklist,
  getCustomerServiceNotes,
  getEmployeeRoute
})(Dashboard);
