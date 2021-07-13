import React, { Fragment, useState, useEffect, useRef } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Alert from '../Layout/Alert';

import Sidebar from '../dashboard/Sidebar';
import Dashnav from '../dashboard/Dashnav';
import Footer from '../Layout/Footer';

import DatePicker from 'reactstrap-date-picker';
import { SpinnerCircular } from 'spinners-react';

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

import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from 'moment';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {
  Search,
  CSVExport
} from 'react-bootstrap-table2-toolkit';

import {
  getWorkOrders,
  getCustomers,
  createWorkOrder,
  updateWorkOrder,
  approveWorkOrder,
  clearCustomers
} from '../../actions/customer';

import { getEmployees } from '../../actions/employee';

import { Formik } from 'formik';
import * as Yup from 'yup';
import WorkOrderModal from './WorkOrderModal';

const pagination = paginationFactory({
  page: 1,
  alwaysShowAllBtns: true,
  showTotal: true,
  withFirstAndLast: false,
  sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
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

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

const dateFormatter = cell => {
  return moment(cell).format('MMMM Do, YYYY');
};

const statusFormatter = cell => {
  if (cell === 'Completed') {
    return <Badge color='success'>Completed</Badge>;
  } else if (cell.includes('Unassigned')) {
    return <Badge color='danger'>Unassigned</Badge>;
  } else if (cell.includes('Approval Needed')) {
    return <Badge color='warning'>Approval Needed</Badge>;
  } else if (cell.includes('Assigned')) {
    return <Badge color='info'>Assigned</Badge>;
  } else if (cell.includes('Approved')) {
    return <Badge color='primary'>Approved</Badge>;
  } else if (cell.includes('Closed')) {
    return <Badge color='danger'>Closed</Badge>;
  } else {
    return <Badge color='danger'>N/A</Badge>;
  }
};

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

const WorkOrders = ({
  getWorkOrders,
  getCustomers,
  getEmployees,
  createWorkOrder,
  updateWorkOrder,
  approveWorkOrder,
  customers: { customers, workOrders },
  employees: { employees }
}) => {
  useEffect(() => {
    clearCustomers();
    getWorkOrders();
    getCustomers();
    getEmployees();
  }, [getWorkOrders, getCustomers, getEmployees, clearCustomers]);

  const formSchema = Yup.object().shape({
    customer: Yup.string()
      .required('Must Select a Customer')
      .notOneOf(['Select Customer'], 'Must Select a Customer'),
    technician: Yup.string()
      .required('Must Select a Technician')
      .notOneOf(['Select Technician'], 'Must Select a Technician')
  });

  const [infoModal, setInfoModal] = useState({
    isOpen: false,
    isEditOpen: false,
    active: '',
    order: null,
    isLoading: false
  });

  const [addModal, setAddModal] = useState({
    isOpen: false,
    isLoading: false
  });

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
          <DropdownItem
            onClick={() => {
              setInfoModal({
                ...infoModal,
                isOpen: true,
                isEditOpen: false,
                active: cell,
                isLoading: false,
                order: workOrders.findIndex(x => x._id === cell)
              });
            }}
          >
            View
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              setInfoModal({
                ...infoModal,
                isEditOpen: true,
                isOpen: false,
                isLoading: false,
                active: cell,
                order: workOrders.findIndex(x => x._id === cell)
              });
            }}
          >
            Edit
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  const columns = [
    {
      dataField: 'dateCreated',
      text: 'Order Date',
      sort: true,
      formatter: dateFormatter
    },
    {
      dataField: 'orderType',
      text: 'Type',
      sort: true
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      formatter: statusFormatter
    },
    {
      dataField: 'customer.name',
      text: 'Customer',
      sort: true,
      formatter: nameFormatter,
      filterValue: filterFunction,
      csvFormatter: cell => {
        const string = `${cell.first} ${cell.last}`;
        return string;
      }
    },
    {
      dataField: '_id',
      text: 'Actions',
      formatter: actionFormatter
    }
  ];

  return (
    <Fragment>
      <Alert />
      <Sidebar active='workorders' />
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
                        <Link to='/work-orders'>Work Orders</Link>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Container className='mgn-ng-top-60'>
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
                  showDate:
                    infoModal.active &&
                    workOrders[infoModal.order].scheduledDate
                      ? true
                      : '',
                  scheduledDate: infoModal.active
                    ? workOrders[infoModal.order].scheduledDate
                    : '',
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
                  price: infoModal.active
                    ? workOrders[infoModal.order].price
                    : ''
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
                          <Label className='form-control-label'>
                            Order Type:
                          </Label>
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
                          <Label className='form-control-label'>
                            Customer:
                          </Label>
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
                          <Label className='form-control-label'>
                            Technician:
                          </Label>
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
                      <Col>
                        <FormGroup>
                          <Label className='form-control-label'>
                            When To Complete?:
                          </Label>
                          <Input
                            type='select'
                            name='showDate'
                            value={values.showDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value={true}>Pick a Date</option>
                            <option value=''>Next Scheduled Visit</option>
                          </Input>
                          {errors.showDate && touched.showDate && (
                            <p className='color-red'>{errors.showDate}</p>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>

                    {values.showDate && (
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
                          {errors.estimatedMinutes &&
                            touched.estimatedMinutes && (
                              <p className='color-red'>
                                {errors.estimatedMinutes}
                              </p>
                            )}
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label className='form-control-label'>
                            Labor Cost:
                          </Label>
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
                          <Label className='form-control-label'>
                            Office Note:
                          </Label>
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
                View Order: {workOrders[infoModal.order].orderType} for{' '}
                {workOrders[infoModal.order].customer.firstName}{' '}
                {workOrders[infoModal.order].customer.lastName}
              </ModalHeader>
              <ModalBody>
                <Row>
                  <Col>
                    <Label className='form-control-label'>
                      Creation Method:
                    </Label>
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
                      ) : workOrders[infoModal.order].status ===
                        'Unassigned' ? (
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
                    <Label className='form-control-label'>
                      Notified Customer:
                    </Label>
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
                    <Label className='form-control-label'>
                      Estimated Minutes:
                    </Label>
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
                    <Label className='form-control-label'>
                      Scheduled Date:
                    </Label>
                    {workOrders[infoModal.order].scheduledDate ? (
                      <p>
                        {moment(
                          workOrders[infoModal.order].scheduledDate
                        ).format('MMMM Do, YYYY')}
                      </p>
                    ) : workOrders[infoModal.order].scheduledDate === null ? (
                      <p>Next Scheduled Visit</p>
                    ) : (
                      <p>N/A</p>
                    )}
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Label className='form-control-label'>Customer Name:</Label>
                    {workOrders[infoModal.order].customer ? (
                      <p>
                        {workOrders[infoModal.order].customer.firstName}{' '}
                        {workOrders[infoModal.order].customer.lastName}
                      </p>
                    ) : (
                      <p>N/A</p>
                    )}
                  </Col>
                  <Col>
                    <Label className='form-control-label'>
                      Customer Address:
                    </Label>
                    {workOrders[infoModal.order].customer ? (
                      <p>
                        {workOrders[infoModal.order].customer.serviceAddress},{' '}
                        {workOrders[infoModal.order].customer.serviceCity}{' '}
                        {workOrders[infoModal.order].customer.serviceState},{' '}
                        {workOrders[infoModal.order].customer.serviceZip}
                      </p>
                    ) : (
                      <p>N/A</p>
                    )}
                  </Col>
                </Row>

                <Row>
                  <Col>
                    {workOrders[infoModal.order].status ===
                      'Approval Needed' && (
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

                    <Button
                      color='success'
                      className='btn-icon'
                      block
                      href={`https://www.google.com/maps/dir/?api=1&origin=Your+Location&destination=${
                        workOrders[infoModal.order].customer.serviceLat
                      },${workOrders[infoModal.order].customer.serviceLng}`}
                      target='_blank'
                    >
                      <span className='btn-inner--icon'>
                        <i className='fas fa-directions'></i>
                      </span>
                      <span className='btn-inner--text'>GPS To Customer</span>
                    </Button>

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
          <Card>
            <CardHeader>
              <div className='row align-items-center'>
                <Col lg={{ size: 'auto' }}>
                  <h3 className='mb-0'>Work Orders</h3>
                </Col>
                <Col lg={{ size: 3, offset: 7 }}>
                  <Button
                    color='success'
                    onClick={() =>
                      setAddModal({ ...addModal, isOpen: !addModal.isOpen })
                    }
                  >
                    <span className='btn-inner--icon'>
                      <i className='ni ni-fat-add' />
                    </span>
                    <span className='btn-inner--text'> Add Work Order</span>
                  </Button>
                </Col>
              </div>
            </CardHeader>

            <WorkOrderModal
              addModal={addModal}
              setAddModal={setAddModal}
              createWorkOrder={createWorkOrder}
              getWorkOrders={getWorkOrders}
              formSchema={formSchema}
              customers={customers}
              employees={employees}
            />

            <CardBody>
              <ToolkitProvider
                data={workOrders}
                keyField='_id'
                columns={columns}
                search
                exportCSV={{ fileName: 'PP360 | WorkOrders.csv' }}
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
                            <i className='ni ni-align-left-2'></i> Export CSV
                          </ExportCSVButton>
                        </Col>
                        <Col md={{ size: 'auto', offset: 3 }}>
                          <SearchBar
                            className='form-control-sm'
                            placeholder='Search Work Orders...'
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
            </CardBody>
          </Card>
          <Footer />
        </Container>
      </div>
    </Fragment>
  );
};

WorkOrders.propTypes = {
  getWorkOrders: PropTypes.func.isRequired,
  getEmployees: PropTypes.func.isRequired,
  createWorkOrder: PropTypes.func.isRequired,
  updateWorkOrder: PropTypes.func.isRequired,
  approveWorkOrder: PropTypes.func.isRequired,
  clearCustomers: PropTypes.func.isRequired,
  customers: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  customers: state.customer,
  employees: state.employee
});

export default connect(mapStateToProps, {
  getWorkOrders,
  getCustomers,
  getEmployees,
  createWorkOrder,
  updateWorkOrder,
  approveWorkOrder,
  clearCustomers
})(WorkOrders);
