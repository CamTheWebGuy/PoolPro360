import React, { Fragment, useEffect, useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dashnav from '../dashboard/Dashnav';

import { Formik } from 'formik';

import axios from 'axios';
import DatePicker from 'reactstrap-date-picker';

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

import { getEmployeeRoute, getEmployees } from '../../actions/employee';
import {
  addServiceLog,
  getChecklist,
  getCustomerServiceNotes,
  sendServiceReport,
  unableService,
  getWorkOrders,
  approveWorkOrder,
  updateWorkOrder,
  getCustomers
} from '../../actions/customer';

import Chart from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { SpinnerCircular } from 'spinners-react';

import Footer from '../Layout/Footer';
import { Link } from 'react-router-dom';

// import { Container } from 'reactstrap';

import Moment from 'react-moment';
import moment from 'moment';

import Sidebar from './Sidebar';
import RouteViewerCards from '../Layout/RouteViewerCards';
import RouteViewer from '../Layout/RouteViewer';

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
  sendServiceReport,
  unableService,
  getWorkOrders,
  approveWorkOrder,
  updateWorkOrder,
  getCustomers,
  getEmployees,
  customers: { customers, checklist, serviceNotes, routeList, workOrders },
  employees: { employees }
}) => {
  useEffect(() => {
    // let options = {
    //   valueNames: ['date', 'service', 'rate', 'status'],
    //   listClass: 'list'
    // };
    // let newList = new List('list-container', options);
  }, []);

  const formSchema = Yup.object().shape({
    customer: Yup.string()
      .required('Must Select a Customer')
      .notOneOf(['Select Customer'], 'Must Select a Customer'),
    technician: Yup.string()
      .required('Must Select a Technician')
      .notOneOf(['Select Technician'], 'Must Select a Technician')
  });

  useEffect(() => {
    if (user && user.role !== 'Technician') {
      getWorkOrders();
      getCustomers();
      getEmployees();
    }
  }, [user, getWorkOrders, getCustomers, getEmployees]);

  const [infoModal, setInfoModal] = useState({
    isOpen: false,
    isEditOpen: false,
    active: '',
    order: null,
    isLoading: false
  });

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

  const nameFormatter = cell => {
    if (cell === undefined) {
      return <span></span>;
    } else {
      return (
        <span>
          {cell.first} {cell.last}
        </span>
      );
    }
  };

  const filterFunction = (cell, row) => {
    const string = `${cell.first} ${cell.last}`;
    return string;
  };

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
      return <span>N/A</span>;
    }
  };

  const actionFormatter = cell => {
    return (
      <UncontrolledDropdown>
        <DropdownToggle
          className='btn-icon-only text-light'
          color=''
          role='button'
          size='sm'
        >
          <i className='fas fa-ellipsis-v' />
        </DropdownToggle>
        <DropdownMenu className='dropdown-menu-arrow' right>
          <DropdownItem tag={Link} to={`/customers/${cell}`}>
            View
          </DropdownItem>
          <DropdownItem tag={Link} to={`/customers/${cell}/manage/info`}>
            Edit
          </DropdownItem>
          <DropdownItem tag={Link} to={`/customers/${cell}/inactive`}>
            Mark Inactive
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  const statusFormatter = cell => {
    if (cell === true) {
      return <Badge color='success'>Active</Badge>;
    } else {
      return <Badge color='warning'>Inactive</Badge>;
    }
  };

  const columns = [
    {
      dataField: 'isActive',
      text: 'Status',
      formatter: statusFormatter
    },
    {
      dataField: 'name',
      text: 'Name',
      formatter: nameFormatter,
      filterValue: filterFunction,
      csvFormatter: cell => {
        const string = `${cell.first} ${cell.last}`;
        return string;
      }
    },
    {
      dataField: 'poolType',
      text: 'Type',
      formatter: typeFormatter
    },
    {
      dataField: 'serviceAddress',
      text: 'Property'
    },
    {
      dataField: 'email',
      text: 'Email'
    },
    {
      dataField: '_id',
      text: 'Actions',
      formatter: actionFormatter
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
    inProgress: false,
    equipment: null
  });

  const [routeDay, setRouteDay] = useState('Today');
  const [showEquipmentList, setShowEquipmentList] = useState(false);
  const [showUnableService, setShowUnableService] = useState(false);

  const [unableServiceMessage, setUnableServiceMessage] = useState('');
  const [unableProcessing, setUnableProcessing] = useState(false);

  const submitUnableService = async () => {
    setUnableProcessing(true);
    await unableService(logModal.active, unableServiceMessage);
    if (routeDay === 'Today') {
      await getEmployeeRoute(user._id, moment(new Date()).format('dddd'));
    } else {
      await getEmployeeRoute(user._id, routeDay);
    }

    setLogModal({
      isOpen: false,
      active: '',
      activeName: '',
      isServiceInfoOpen: false,
      customerLock: '',
      customerNotes: null,
      customerChecklist: null,
      checkedItems: [],
      checkedNames: [],
      inProgress: false,
      equipment: null
    });
    setShowUnableService(false);
    setUnableProcessing(false);
  };

  const onUnableChange = e => {
    setUnableServiceMessage(e.target.value);
  };

  useEffect(async () => {
    if (user) {
      if (routeDay === 'Today') {
        return await getEmployeeRoute(
          user._id,
          moment(new Date()).format('dddd')
        );
      }

      await getEmployeeRoute(user._id, routeDay);
    }
  }, [routeDay]);

  const [logPictureState, setLogPictureState] = useState({ pictures: [] });
  const [repairPictureState, setRepairPictureState] = useState({
    pictures: []
  });

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

  const onDropRepair = picture => {
    setRepairPictureState({ pictures: picture });
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
      <Modal
        isOpen={infoModal.isEditOpen}
        toggle={() =>
          setInfoModal({
            ...infoModal,
            isEditOpen: !infoModal.isEditOpen,
            isOpen: false,
            isLoading: false
          })
        }
      >
        <ModalHeader
          toggle={() =>
            setInfoModal({
              ...infoModal,
              isEditOpen: !infoModal.isEditOpen,
              isOpen: false,
              isLoading: false
            })
          }
        >
          Edit Work Order:
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              orderType: infoModal.active
                ? workOrders[infoModal.order].orderType
                : '',
              customer: infoModal.active
                ? workOrders[infoModal.order].customer._id
                : '',
              description: infoModal.active
                ? workOrders[infoModal.order].description
                : '',
              officeNote: infoModal.active
                ? workOrders[infoModal.order].officeNote
                : '',
              estimatedMinutes: infoModal.active
                ? workOrders[infoModal.order].estimatedMinutes
                : '',
              technician: infoModal.active
                ? workOrders[infoModal.order].technician
                : '',
              showDate: true,

              notifyCustomer: infoModal.active
                ? workOrders[infoModal.order].notifyCustomer
                : '',
              scheduledDate: infoModal.active
                ? workOrders[infoModal.order].scheduledDate
                : '',
              status: infoModal.active
                ? workOrders[infoModal.order].status
                : '',
              laborCost: infoModal.active
                ? workOrders[infoModal.order].laborCost
                : '',
              price: infoModal.active ? workOrders[infoModal.order].price : ''
            }}
            validationSchema={formSchema}
            onSubmit={async data => {
              setInfoModal({ ...infoModal, isLoading: true });
              await updateWorkOrder(data, infoModal.active);
              await getWorkOrders();
              setInfoModal({
                ...infoModal,
                isLoading: false,
                isEditOpen: false,
                isOpen: false
              });
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
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className='form-control-label'>Order Type:</Label>
                      <Input
                        type='select'
                        name='orderType'
                        value={values.orderType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option>Service Call</option>
                        <option>Equipment Repair</option>
                        <option>Filter Clean</option>
                        <option>Pool Opening</option>
                        <option>Pool Closing</option>
                      </Input>
                      {errors.orderType && touched.orderType && (
                        <p className='color-red'>{errors.orderType}</p>
                      )}
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className='form-control-label'>Customer:</Label>
                      <Input
                        type='select'
                        name='customer'
                        value={values.customer}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value={'Select Customer'}>
                          Select Customer
                        </option>
                        {customers &&
                          customers.map(customer => (
                            <option value={customer._id}>
                              {customer.firstName} {customer.lastName}
                            </option>
                          ))}
                      </Input>
                      {errors.customer && touched.customer && (
                        <p className='color-red'>{errors.customer}</p>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className='form-control-label'>
                        Order Status:
                      </Label>
                      <Input
                        type='select'
                        name='status'
                        value={values.status}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option>Approval Needed</option>
                        <option>Approved</option>
                        <option>Completed</option>
                        <option>Closed</option>
                      </Input>
                      {errors.status && touched.status && (
                        <p className='color-red'>{errors.status}</p>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className='form-control-label'>
                        Order Description:
                      </Label>
                      <Input
                        type='textarea'
                        name='description'
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.description && touched.description && (
                        <p className='color-red'>{errors.description}</p>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <Label className='form-control-label'>Technician:</Label>
                      <Input
                        type='select'
                        name='technician'
                        value={values.technician}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value={'Select Technician'}>
                          Select Technician
                        </option>
                        {employees &&
                          employees.map(em => (
                            <option value={em._id}>
                              {em.firstName} {em.lastName}
                            </option>
                          ))}
                      </Input>
                      {errors.technician && touched.technician && (
                        <p className='color-red'>{errors.technician}</p>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                {values.scheduledDate && (
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className='form-control-label'>
                          Date to Complete:
                        </Label>
                        <DatePicker
                          value={values.scheduledDate}
                          onChange={value => {
                            setFieldValue('scheduledDate', value);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className='form-control-label'>
                        Est. Minutes to Complete:
                      </Label>
                      <Input
                        type='number'
                        name='estimatedMinutes'
                        value={values.estimatedMinutes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.estimatedMinutes && touched.estimatedMinutes && (
                        <p className='color-red'>{errors.estimatedMinutes}</p>
                      )}
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className='form-control-label'>Labor Cost:</Label>
                      <Input
                        type='number'
                        name='laborCost'
                        value={values.laborCost}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.laborCost && touched.laborCost && (
                        <p className='color-red'>{errors.laborCost}</p>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className='form-control-label'>Price:</Label>
                      <Input
                        type='number'
                        name='price'
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.price && touched.price && (
                        <p className='color-red'>{errors.price}</p>
                      )}
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className='form-control-label'>Office Note:</Label>
                      <Input
                        type='textarea'
                        name='officeNote'
                        value={values.officeNote}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.officeNote && touched.officeNote && (
                        <p className='color-red'>{errors.officeNote}</p>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Button
                  color='success'
                  type='submit'
                  block
                  className='btn-icon'
                >
                  <span className='btn-inner--icon'>
                    <i className='fas fa-save'></i>
                  </span>
                  {infoModal.isLoading === true ? (
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
                    <span className='btn-inner--text'>Save Changes</span>
                  )}
                </Button>
              </Form>
            )}
          />
        </ModalBody>
      </Modal>

      {workOrders && infoModal.active && (
        <Modal
          isOpen={infoModal.isOpen}
          toggle={() => {
            setInfoModal({
              ...infoModal,
              isOpen: false,
              isEditOpen: false,
              isLoading: false
            });
          }}
        >
          <ModalHeader
            toggle={() => {
              setInfoModal({
                ...infoModal,
                isOpen: false,
                isEditOpen: false,
                isLoading: false
              });
            }}
          >
            View Work Order: {workOrders[infoModal.order].orderType}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <Label className='form-control-label'>Creation Method:</Label>
                {workOrders[infoModal.order].method ? (
                  <p>{workOrders[infoModal.order].method}</p>
                ) : (
                  <p>N/A</p>
                )}
              </Col>
              <Col>
                <Label className='form-control-label'>Order Type:</Label>
                {workOrders[infoModal.order].orderType ? (
                  <p>{workOrders[infoModal.order].orderType}</p>
                ) : (
                  <p>N/A</p>
                )}
              </Col>
            </Row>

            <Row>
              <Col>
                <Label className='form-control-label'>Status:</Label>
                <p>
                  {workOrders[infoModal.order].status === 'Completed' ? (
                    <Badge color='success'>Completed</Badge>
                  ) : workOrders[infoModal.order].status === 'Assigned' ? (
                    <Badge color='info'>Assigned</Badge>
                  ) : workOrders[infoModal.order].status === 'Unassigned' ? (
                    <Badge color='danger'>Unassigned</Badge>
                  ) : workOrders[infoModal.order].status === 'Approved' ? (
                    <Badge color='primary'>Approved</Badge>
                  ) : workOrders[infoModal.order].status ===
                    'Approval Needed' ? (
                    <Badge color='warning'>Approval Needed</Badge>
                  ) : workOrders[infoModal.order].status === 'Closed' ? (
                    <Badge color='danger'>Closed</Badge>
                  ) : (
                    <Badge color='danger'>N/A</Badge>
                  )}
                </p>
              </Col>
              <Col>
                <Label className='form-control-label'>Notified Customer:</Label>
                {workOrders[infoModal.order].notifyCustomer === true ? (
                  <p>Yes</p>
                ) : (
                  <p>No</p>
                )}
              </Col>
            </Row>

            <Row>
              <Col>
                <Label className='form-control-label'>Description:</Label>
                {workOrders[infoModal.order].description ? (
                  <p>{workOrders[infoModal.order].description}</p>
                ) : (
                  <p>N/A</p>
                )}
              </Col>
              <Col>
                <Label className='form-control-label'>Office Note:</Label>
                {workOrders[infoModal.order].officeNote ? (
                  <p>{workOrders[infoModal.order].officeNote}</p>
                ) : (
                  <p>N/A</p>
                )}
              </Col>
            </Row>

            <Row>
              <Col>
                <Label className='form-control-label'>Technician:</Label>
                {workOrders[infoModal.order].technicianName ? (
                  <p>{workOrders[infoModal.order].technicianName}</p>
                ) : (
                  <p>N/A</p>
                )}
              </Col>
              <Col>
                <Label className='form-control-label'>Date Of Order:</Label>
                {workOrders[infoModal.order].dateCreated ? (
                  <p>
                    {moment(workOrders[infoModal.order].dateCreated).format(
                      'MMMM Do, YYYY'
                    )}
                  </p>
                ) : (
                  <p>N/A</p>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className='form-control-label'>Estimated Minutes:</Label>
                {workOrders[infoModal.order].estimatedMinutes ? (
                  <p>{workOrders[infoModal.order].estimatedMinutes}</p>
                ) : (
                  <p>0</p>
                )}
              </Col>
              <Col>
                <Label className='form-control-label'>Labor Cost:</Label>
                {workOrders[infoModal.order].laborCost ? (
                  <p>{workOrders[infoModal.order].laborCost}</p>
                ) : (
                  <p>0</p>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className='form-control-label'>Price:</Label>
                {workOrders[infoModal.order].price ? (
                  <p>{workOrders[infoModal.order].price}</p>
                ) : (
                  <p>0</p>
                )}
              </Col>
              <Col>
                <Label className='form-control-label'>Scheduled Date:</Label>
                {workOrders[infoModal.order].scheduledDate ? (
                  <p>
                    {moment(workOrders[infoModal.order].scheduledDate).format(
                      'MMMM Do, YYYY'
                    )}
                  </p>
                ) : (
                  <p>N/A</p>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                {workOrders[infoModal.order].status === 'Approval Needed' && (
                  <Button
                    className='btn-icon'
                    color='primary'
                    block
                    onClick={async e => {
                      e.preventDefault();
                      setInfoModal({ ...infoModal, isLoading: true });
                      await approveWorkOrder(infoModal.active);
                      await getWorkOrders();
                      setInfoModal({
                        ...infoModal,
                        isLoading: false,
                        isOpen: false,
                        isEditOpen: false
                      });
                    }}
                  >
                    <span className='btn-inner--icon'>
                      <i className='fas fa-thumbs-up'></i>
                    </span>
                    {infoModal.isLoading ? (
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
                        Approve Work Order
                      </span>
                    )}
                  </Button>
                )}

                {/* <Button className='btn-icon' color='info' block>
                      <span className='btn-inner--icon'>
                        <i className='fas fa-user-alt'></i>
                      </span>
                      <span className='btn-inner--text'>
                        Change Assigned Technician
                      </span>
                    </Button> */}
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      )}
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
                    <RouteViewerCards />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Page content */}
        {isAuthenticated && !loading && user.role === 'Technician' && (
          <Container fluid className='mt--6'>
            <RouteViewer />
            <Footer />
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
                      {/* <Col>
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
                      </Col> */}
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
                        {workOrders ? (
                          workOrders.slice(0, 5).map(order => (
                            <tr key={order._id}>
                              <th scope='row'>
                                <Media className='align-items-center'>
                                  <span className='date mb-0 text-sm'>
                                    {moment(order.dateCreated).format(
                                      'MMM Do, YYYY'
                                    )}
                                  </span>
                                </Media>
                              </th>
                              <td className='service'>{order.orderType}</td>

                              <td className='rate'>
                                {order.rate ? (
                                  <span>{order.price}</span>
                                ) : (
                                  <span>N/A</span>
                                )}
                              </td>
                              <td>
                                <Badge color='' className='badge-dot mr-4'>
                                  {order.status === 'Closed' ? (
                                    <i className='bg-danger' />
                                  ) : order.status === 'Approved' ? (
                                    <i className='bg-info' />
                                  ) : order.status === 'Completed' ? (
                                    <i className='bg-success' />
                                  ) : order.status === 'Approval Needed' ? (
                                    <i className='bg-warning' />
                                  ) : (
                                    <i className='bg-danger' />
                                  )}
                                  <span className='status'>{order.status}</span>
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
                                      onClick={e => {
                                        e.preventDefault();
                                        setInfoModal({
                                          ...infoModal,
                                          isOpen: true,
                                          active: order._id,
                                          order: workOrders.findIndex(
                                            x => x._id === order._id
                                          )
                                        });
                                      }}
                                    >
                                      View
                                    </DropdownItem>
                                    <DropdownItem
                                      href='#pablo'
                                      onClick={e => {
                                        e.preventDefault();
                                        setInfoModal({
                                          ...infoModal,
                                          isEditOpen: true,
                                          active: order._id,
                                          order: workOrders.findIndex(
                                            x => x._id === order._id
                                          )
                                        });
                                      }}
                                    >
                                      Edit
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <Fragment>Loading...</Fragment>
                        )}
                      </tbody>
                    </Table>
                  </div>
                  <Button color='primary' href='/work-orders'>
                    View All
                  </Button>
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
                        <h5 className='h3 mb-0'>Customer Activity</h5>
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
                      href='/customers/add'
                    >
                      <span className='btn-inner--icon'>
                        <i className='ni ni-fat-add' />
                      </span>
                      <span className='btn-inner--text'> Add Customer</span>
                    </Button>
                  </div>

                  {loading ? (
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
                    <ToolkitProvider
                      data={customers}
                      keyField='_id'
                      columns={columns}
                      search
                      exportCSV={{ fileName: 'PP360 | Customers.csv' }}
                    >
                      {props => (
                        <div
                          className='py-4 table-responsive'
                          style={{ padding: '25px' }}
                        >
                          <div
                            id='datatable-basic_filter'
                            className='px-4 pb-1'
                          >
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
                            wrapperClasses='table-responsive mh-330'
                          />
                        </div>
                      )}
                    </ToolkitProvider>
                  )}
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
  getEmployeeRoute: PropTypes.func.isRequired,
  sendServiceReport: PropTypes.func.isRequired,
  unableService: PropTypes.func.isRequired,
  getWorkOrders: PropTypes.func.isRequired,
  approveWorkOrder: PropTypes.func.isRequired,
  getEmployees: PropTypes.func.isRequired,
  updateWorkOrder: PropTypes.func.isRequired,
  customers: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  customers: state.customer,
  employees: state.employee
});

export default connect(mapStateToProps, {
  addServiceLog,
  getChecklist,
  getCustomerServiceNotes,
  getEmployeeRoute,
  sendServiceReport,
  unableService,
  getWorkOrders,
  approveWorkOrder,
  updateWorkOrder,
  getEmployees,
  getCustomers
})(Dashboard);
