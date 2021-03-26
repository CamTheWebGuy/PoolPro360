import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Badge,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Container,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Label,
  Button,
  Collapse,
  ListGroup,
  ListGroupItem
} from 'reactstrap';

import Moment from 'react-moment';
import moment from 'moment';

import { Link } from 'react-router-dom';

import BootstrapTable from 'react-bootstrap-table-next';

import ToolkitProvider, {
  Search,
  CSVExport
} from 'react-bootstrap-table2-toolkit';

import { getServiceLogs } from '../../actions/customer';

import paginationFactory from 'react-bootstrap-table2-paginator';

import Sidebar from '../dashboard/Sidebar';
import Dashnav from '../dashboard/Dashnav';
import Alert from '../Layout/Alert';
import Footer from '../Layout/Footer';
import { setIn } from 'formik';

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

const dataTable = [
  {
    _id: 1,
    property: '3810 Cronin Skyway',
    date: 'Aug 1, 2021',
    status: 'Serviced'
  },
  {
    _id: 2,
    property: '991 Delphine Stream',
    date: 'Aug 3, 2021',
    status: 'Serviced'
  },
  {
    _id: 3,
    property: '76767 Oklahoma Lane',
    date: 'Aug 1, 2021',
    status: 'Serviced'
  },
  {
    _id: 4,
    property: '7652 Dogwood Ave',
    date: 'Aug 7, 2021',
    status: 'Serviced'
  },
  {
    _id: 5,
    property: '658 Adams St',
    date: 'Aug 2, 2021',
    status: 'Unable To Service'
  }
];

const statusFormatter = cell => {
  if (cell === 'Service Stop Completed') {
    return <Badge color='success'>Serviced</Badge>;
  } else if (cell.includes('Unable to Service')) {
    return <Badge color='danger'>Unable to Service</Badge>;
  } else {
    return <Badge color='warning'>N/A</Badge>;
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

const statusFilter = cell => {
  if (cell === 'Service Stop Completed') {
    return 'Serviced';
  } else if (cell.includes('Unable to Service')) {
    return 'Unable to Service';
  } else {
    return 'N/A';
  }
};

const dateFormatter = cell => {
  return moment(cell).format('MMM Do YY, h:mm a');
};

const logFormatter = cell => {
  const string = `${
    cell.totalChlorine && cell.totalChlorine !== undefined
      ? 'Total Chlorine: ' + cell.totalChlorine + ' | '
      : 'Total Chlorine: N/A | '
  } ${
    cell.freeChlorine && cell.freeChlorine !== undefined
      ? 'Free Chlorine: ' + cell.freeChlorine + ' | '
      : 'Free Chlorine: N/A | '
  } ${
    cell.pHlevel && cell.pHlevel !== undefined
      ? 'PH Level: ' + cell.pHlevel + ' | '
      : 'PH Level: N/A | '
  } ${
    cell.alkalinity && cell.alkalinity !== undefined
      ? 'Alkalinity Level: ' + cell.alkalinity + ' | '
      : 'Alkalinity Level: N/A | '
  } ${
    cell.conditionerLevel && cell.conditionerLevel !== undefined
      ? 'Conditioner Level: ' + cell.conditionerLevel + ' | '
      : 'Conditioner Level: N/A | '
  } ${
    cell.phosphateLevel && cell.phosphateLevel !== undefined
      ? 'Phosphate Level: ' + cell.phosphateLevel + ' | '
      : 'Phosphate Level: N/A | '
  } ${
    cell.saltLevel && cell.saltLevel !== undefined
      ? 'Salt Level: ' + cell.saltLevel + ' | '
      : 'Salt Level: N/A | '
  }`;

  return string;
};

const chemFormatter = cell => {
  const string = `${
    cell.chlorineTablets && cell.chlorineTablets !== undefined
      ? 'Chlorine Tablets: ' + cell.chlorineTablets + ' | '
      : 'Chlorine Tablets: N/A | '
  } ${
    cell.liquidChlorine && cell.liquidChlorine !== undefined
      ? 'Liquid Chlorine: ' + cell.liquidChlorine + ' | '
      : 'Liquid Chlorine: N/A | '
  } ${
    cell.liquidAcid && cell.liquidAcid !== undefined
      ? 'Liquid Acid: ' + cell.liquidAcid + ' | '
      : 'Liquid Acid: N/A | '
  } ${
    cell.triChlor && cell.triChlor !== undefined
      ? 'TriChlor Shock: ' + cell.triChlor + ' | '
      : 'TriChlor Shock: N/A | '
  } ${
    cell.diChlor && cell.diChlor !== undefined
      ? 'DiChlor Shock: ' + cell.diChlor + ' | '
      : 'DiChlor Shock: N/A | '
  } ${
    cell.potassiumMono && cell.potassiumMono !== undefined
      ? 'CalHypo Shock: ' + cell.potassiumMono + ' | '
      : 'CalHypo Shock: N/A | '
  } ${
    cell.saltLevel && cell.saltLevel !== undefined
      ? 'Potassium Monopersulfate: ' + cell.saltLevel + ' | '
      : 'Potassium Monopersulfate: N/A | '
  } ${
    cell.ammonia && cell.ammonia !== undefined
      ? 'Ammonia Based Algacide: ' + cell.ammonia + ' | '
      : 'Ammonia Based Algacide: N/A | '
  } ${
    cell.copperBased && cell.copperBased !== undefined
      ? 'Copper Based Algacide: ' + cell.copperBased + ' | '
      : 'Copper Based Algacide: N/A | '
  } ${
    cell.polyQuat && cell.polyQuat !== undefined
      ? 'PolyQuat Based Algacide: ' + cell.polyQuat + ' | '
      : 'PolyQuat Based Algacide: N/A | '
  } ${
    cell.sodaAsh && cell.sodaAsh !== undefined
      ? 'Soda Ash: ' + cell.sodaAsh + ' | '
      : 'Soda Ash: N/A | '
  } ${
    cell.CalciumChloride && cell.CalciumChloride !== undefined
      ? 'Calcium Chloride: ' + cell.CalciumChloride + ' | '
      : 'Calcium Chloride: N/A | '
  } ${
    cell.conditioner && cell.conditioner !== undefined
      ? 'Conditioner: ' + cell.conditioner + ' | '
      : 'Conditioner: N/A | '
  } ${
    cell.diatomaceous && cell.diatomaceous !== undefined
      ? 'Diatomaceous Earth: ' + cell.diatomaceous + ' | '
      : 'Diatomaceous Earth: N/A | '
  } ${
    cell.diatomaceousAlt && cell.diatomaceousAlt !== undefined
      ? 'Diatomaceous Earth Alternative: ' + cell.diatomaceousAlt + ' | '
      : 'Diatomaceous Earth Alternative: N/A | '
  } ${
    cell.sodiumBro && cell.sodiumBro !== undefined
      ? 'Sodium Bromide: ' + cell.sodiumBro + ' | '
      : 'Sodium Bromide: N/A | '
  } ${
    cell.dryAcid && cell.dryAcid !== undefined
      ? 'Dry Acid: ' + cell.dryAcid + ' | '
      : 'Dry Acid: N/A | '
  } ${
    cell.clarifier && cell.clarifier !== undefined
      ? 'Clarifier: ' + cell.clarifier + ' | '
      : 'Clarifier: N/A | '
  } ${
    cell.phosphateRemover && cell.phosphateRemover !== undefined
      ? 'Phosphate Remover: ' + cell.phosphateRemover + ' | '
      : 'Phosphate Remover: N/A | '
  } ${
    cell.salt && cell.salt !== undefined
      ? 'Salt: ' + cell.salt + ' | '
      : 'Salt: N/A | '
  } ${
    cell.enzymes && cell.enzymes !== undefined
      ? 'Pool Enzymes: ' + cell.enzymes + ' | '
      : 'Pool Enzymes: N/A | '
  } ${
    cell.metalSequester && cell.metalSequester !== undefined
      ? 'Metal Sequestering Agent: ' + cell.metalSequester + ' | '
      : 'Metal Sequestering Agent: N/A | '
  } ${
    cell.bromineGran && cell.bromineGran !== undefined
      ? 'Bromine Granular: ' + cell.bromineGran + ' | '
      : 'Bromine Granular: N/A | '
  } ${
    cell.bromineTab && cell.bromineTab !== undefined
      ? 'Bromine Tablets: ' + cell.bromineTab + ' | '
      : 'Bromine Tablets: N/A | '
  } ${
    cell.poolFlocc && cell.poolFlocc !== undefined
      ? 'Pool Flocculant: ' + cell.poolFlocc + ' | '
      : 'Pool Flocculant: N/A | '
  } ${
    cell.borate && cell.borate !== undefined
      ? 'Borate: ' + cell.borate + ' | '
      : 'Borate: N/A | '
  }`;

  return string;
};

// Can do hidden field to enable search for things not shown

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

const ViewLogs = ({
  getServiceLogs,
  customers: { serviceLogs },
  auth: { user, isAuthenticated, loading }
}) => {
  useEffect(() => {
    if (isAuthenticated && user) {
      getServiceLogs(user._id);
    }
  }, [getServiceLogs, user]);

  const [infoModal, setInfoModal] = useState({
    isOpen: false,
    active: '',
    activity: null,
    isReadingsOpen: false,
    isChemsOpen: false
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
                isOpen: true,
                active: `${cell}`,
                activity: serviceLogs.findIndex(x => x._id === cell)
              });
            }}
          >
            View
          </DropdownItem>

          {/* <DropdownItem tag={Link} to={`/customers/${cell}/edit`}>
            Edit
          </DropdownItem> */}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  const columns = [
    {
      dataField: 'customer.name',
      text: 'Name',

      formatter: nameFormatter,
      filterValue: filterFunction,
      csvFormatter: cell => {
        const string = `${cell.first} ${cell.last}`;
        return string;
      }
    },
    {
      dataField: 'customer.serviceAddress',
      text: 'Property',
      sort: true
    },
    {
      dataField: 'dateAdded',
      text: 'Date Created',
      sort: true,
      formatter: dateFormatter
    },
    {
      dataField: 'comments',
      text: 'Status',
      formatter: statusFormatter,
      filterValue: statusFilter
    },
    {
      dataField: 'serviceLog',
      text: 'Readings',
      hidden: true,
      csvFormatter: logFormatter
    },
    {
      dataField: 'serviceLog',
      text: 'Chemicals Used',
      hidden: true,
      csvFormatter: chemFormatter
    },
    {
      dataField: '_id',
      text: 'Actions',
      formatter: actionFormatter
    }
  ];

  return (
    <Fragment>
      <Sidebar active='view-logs' />
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
                      <li className='breadcrumb-item active'>
                        <Link to='/view-logs'>View Logs</Link>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Stuff Here */}
        <Container className='mgn-ng-top-60'>
          {infoModal.active && (
            <Modal
              isOpen={infoModal.isOpen}
              toggle={() => {
                setInfoModal({ ...infoModal, isOpen: false });
              }}
            >
              <ModalHeader
                toggle={() => {
                  setInfoModal({ ...infoModal, isOpen: false });
                }}
              >
                View Log: {serviceLogs[infoModal.activity].customer.name.first}{' '}
                {serviceLogs[infoModal.activity].customer.name.last} |{' '}
                {moment(serviceLogs[infoModal.activity].dateAdded).format(
                  'MMMM Do YYYY'
                )}
              </ModalHeader>
              <ModalBody>
                <Row>
                  <Col>
                    <Label className='form-control-label'>Customer Name:</Label>
                    <p>
                      {serviceLogs[infoModal.activity].customer.name.first}{' '}
                      {serviceLogs[infoModal.activity].customer.name.last}
                    </p>
                  </Col>
                  <Col>
                    <Label className='form-control-label'>
                      Customer Address:
                    </Label>
                    <p>
                      {serviceLogs[infoModal.activity].customer.serviceAddress},{' '}
                      {serviceLogs[infoModal.activity].customer.serviceCity}{' '}
                      {serviceLogs[infoModal.activity].customer.serviceState},{' '}
                      {serviceLogs[infoModal.activity].customer.serviceZip}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label className='form-control-label'>Logged on:</Label>
                    <p>
                      {moment(serviceLogs[infoModal.activity].dateAdded).format(
                        'MMMM Do YYYY h:mm a'
                      )}
                    </p>
                  </Col>
                  <Col>
                    <Label className='form-control-label'>Status:</Label>
                    <br />
                    {serviceLogs[infoModal.activity].comments ===
                      'Service Stop Completed' && (
                      <Badge color='success'>Serviced</Badge>
                    )}
                    {serviceLogs[infoModal.activity].comments.includes(
                      'Unable to Service '
                    ) && <Badge color='danger'>Unable To Service</Badge>}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label className='form-control-label'>Comments:</Label>
                    {serviceLogs[infoModal.activity].comments ? (
                      <p>{serviceLogs[infoModal.activity].comments}</p>
                    ) : (
                      <p>N/A</p>
                    )}
                  </Col>
                  <Col>
                    <Label className='form-control-label'>
                      Note To Customer:
                    </Label>

                    {serviceLogs[infoModal.activity].noteToCustomer ? (
                      <p>{serviceLogs[infoModal.activity].noteToCustomer}</p>
                    ) : (
                      <p>N/A</p>
                    )}
                  </Col>
                </Row>
                {serviceLogs[infoModal.activity].serviceLog.checkList.length >=
                  1 && (
                  <Row>
                    <Col>
                      <Label className='form-control-label'>
                        Service Checklist:
                      </Label>
                      <ListGroup>
                        {serviceLogs[
                          infoModal.activity
                        ].serviceLog.checkList.map(item => (
                          <ListGroupItem key={item}>
                            <i className='fas fa-check-circle'></i> {item}
                          </ListGroupItem>
                        ))}
                      </ListGroup>
                    </Col>
                  </Row>
                )}
                <br />
                <Row>
                  <hr />
                  <Col>
                    <Button
                      color='success'
                      block
                      onClick={() => {
                        setInfoModal({
                          ...infoModal,
                          isReadingsOpen: !infoModal.isReadingsOpen
                        });
                      }}
                    >
                      View Chemical Readings
                    </Button>
                    <br />
                    <Collapse isOpen={infoModal.isReadingsOpen}>
                      <Card>
                        <CardBody>
                          <Row>
                            {serviceLogs[infoModal.activity].serviceLog
                              .totalChlorine && (
                              <Col>
                                <Label className='form-control-label'>
                                  Total Chlorine:
                                </Label>
                                <br />
                                <p>
                                  {
                                    serviceLogs[infoModal.activity].serviceLog
                                      .totalChlorine
                                  }
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .freeChlorine && (
                              <Col>
                                <Label className='form-control-label'>
                                  Free Chlorine:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .freeChlorine
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .pHlevel && (
                              <Col>
                                <Label className='form-control-label'>
                                  PH Level:
                                </Label>
                                <br />
                                <p>
                                  {
                                    serviceLogs[infoModal.activity].serviceLog
                                      .pHlevel
                                  }
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .alkalinity && (
                              <Col>
                                <Label className='form-control-label'>
                                  Alkalinity Level:
                                </Label>
                                <br />
                                <p>
                                  {
                                    serviceLogs[infoModal.activity].serviceLog
                                      .alkalinity
                                  }
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .conditionerLevel && (
                              <Col>
                                <Label className='form-control-label'>
                                  Conditioner Level:
                                </Label>
                                <br />
                                <p>
                                  {
                                    serviceLogs[infoModal.activity].serviceLog
                                      .conditionerLevel
                                  }
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .hardness && (
                              <Col>
                                <Label className='form-control-label'>
                                  Hardness:
                                </Label>
                                <br />
                                <p>
                                  {
                                    serviceLogs[infoModal.activity].serviceLog
                                      .hardness
                                  }
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .phosphateLevel && (
                              <Col>
                                <Label className='form-control-label'>
                                  Phosphate Level:
                                </Label>
                                <br />
                                <p>
                                  {
                                    serviceLogs[infoModal.activity].serviceLog
                                      .phosphateLevel
                                  }
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .saltLevel && (
                              <Col>
                                <Label className='form-control-label'>
                                  Salt Level:
                                </Label>
                                <br />
                                <p>
                                  {
                                    serviceLogs[infoModal.activity].serviceLog
                                      .saltLevel
                                  }
                                </p>
                              </Col>
                            )}
                          </Row>
                        </CardBody>
                      </Card>
                    </Collapse>
                    <Button
                      color='primary'
                      block
                      onClick={() => {
                        setInfoModal({
                          ...infoModal,
                          isChemsOpen: !infoModal.isChemsOpen
                        });
                      }}
                    >
                      View Chemicals Added
                    </Button>
                    <br />
                    <Collapse isOpen={infoModal.isChemsOpen}>
                      <Card>
                        <CardBody>
                          <Row>
                            {serviceLogs[infoModal.activity].serviceLog
                              .chlorineTablets && (
                              <Col>
                                <Label className='form-control-label'>
                                  Chlorine Tablets:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .chlorineTablets
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .liquidChlorine && (
                              <Col>
                                <Label className='form-control-label'>
                                  Liquid Chlorine:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .liquidChlorine
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .liquidAcid && (
                              <Col>
                                <Label className='form-control-label'>
                                  Liquid Acid:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .liquidAcid
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .triChlor && (
                              <Col>
                                <Label className='form-control-label'>
                                  TriChlor Shock:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .triChlor
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .diChlor && (
                              <Col>
                                <Label className='form-control-label'>
                                  DiChlor Shock:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .diChlor
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .calHypo && (
                              <Col>
                                <Label className='form-control-label'>
                                  CalHypo Shock:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .calHypo
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .potassiumMono && (
                              <Col>
                                <Label className='form-control-label'>
                                  Potassium Monopersulfate:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .potassiumMono
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .ammonia && (
                              <Col>
                                <Label className='form-control-label'>
                                  Ammonia Based Liquid Algacide:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .ammonia
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .copperBased && (
                              <Col>
                                <Label className='form-control-label'>
                                  Copper Based Liquid Algacide:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .copperBased
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .polyQuat && (
                              <Col>
                                <Label className='form-control-label'>
                                  PolyQuat Based Liquid Algacide:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .polyQuat
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .copperBlend && (
                              <Col>
                                <Label className='form-control-label'>
                                  Copper/PolyQuat Blend Algacide:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .copperBlend
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .sodaAsh && (
                              <Col>
                                <Label className='form-control-label'>
                                  Soda Ash (Sodium Carbonate):
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .sodaAsh
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .CalciumChloride && (
                              <Col>
                                <Label className='form-control-label'>
                                  Calcium Chloride (Hardness+):
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .CalciumChloride
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .conditioner && (
                              <Col>
                                <Label className='form-control-label'>
                                  Conditioner (Cyanuric Acid):
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .conditioner
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .sodiumBicar && (
                              <Col>
                                <Label className='form-control-label'>
                                  Sodium Bicarbonate (baking soda):
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .sodiumBicar
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .diatomaceous && (
                              <Col>
                                <Label className='form-control-label'>
                                  Diatomaceous Earth:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .diatomaceous
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .diatomaceousAlt && (
                              <Col>
                                <Label className='form-control-label'>
                                  Diatomaceous Earth Alternative:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .diatomaceousAlt
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .sodiumBro && (
                              <Col>
                                <Label className='form-control-label'>
                                  Sodium Bromide:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .sodiumBro
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .dryAcid && (
                              <Col>
                                <Label className='form-control-label'>
                                  Dry Acid:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .dryAcid
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .Clarifier && (
                              <Col>
                                <Label className='form-control-label'>
                                  Clarifier:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .Clarifier
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .phosphateRemover && (
                              <Col>
                                <Label className='form-control-label'>
                                  Phosphate Remover:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .phosphateRemover
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .salt && (
                              <Col>
                                <Label className='form-control-label'>
                                  Salt:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .salt
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .enzymes && (
                              <Col>
                                <Label className='form-control-label'>
                                  Pool Enzymes:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .enzymes
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .metalSequester && (
                              <Col>
                                <Label className='form-control-label'>
                                  Metal Sequestering Agent:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .metalSequester
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .bromineGran && (
                              <Col>
                                <Label className='form-control-label'>
                                  Bromine Granular:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .bromineGran
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .bromineTab && (
                              <Col>
                                <Label className='form-control-label'>
                                  Bromine Tablets:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .bromineTab
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .poolFlocc && (
                              <Col>
                                <Label className='form-control-label'>
                                  Pool Flocculant:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .poolFlocc
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}

                            {serviceLogs[infoModal.activity].serviceLog
                              .borate && (
                              <Col>
                                <Label className='form-control-label'>
                                  Pool Flocculant:
                                </Label>
                                <br />
                                <p>
                                  <strong>
                                    {
                                      serviceLogs[infoModal.activity].serviceLog
                                        .Borate
                                    }
                                  </strong>
                                </p>
                              </Col>
                            )}
                          </Row>
                        </CardBody>
                      </Card>
                    </Collapse>
                  </Col>
                </Row>
              </ModalBody>
            </Modal>
          )}

          <Card>
            <CardHeader>
              <h3 className='mb-0'>View My Service Logs </h3>
            </CardHeader>
            <CardBody>
              <ToolkitProvider
                data={serviceLogs}
                keyField='_id'
                columns={columns}
                search
                exportCSV={{ fileName: 'PP360 | ServiceLogs.csv' }}
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
                            placeholder='Search Logs'
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

ViewLogs.propTypes = {
  getServiceLogs: PropTypes.func.isRequired,
  customers: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  customers: state.customer,
  auth: state.auth
});

export default connect(mapStateToProps, { getServiceLogs })(ViewLogs);
