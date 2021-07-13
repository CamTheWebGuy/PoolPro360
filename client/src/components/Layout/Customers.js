import React, { useState, Fragment, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { parse } from 'papaparse';

import {
  getCustomers,
  resetCustomerLoading,
  addCustomer
} from '../../actions/customer';

import Sidebar from '../dashboard/Sidebar';
import Dashnav from '../dashboard/Dashnav';
import {
  Button,
  Badge,
  Col,
  Row,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';

import { SpinnerCircular } from 'spinners-react';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {
  Search,
  CSVExport
} from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

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

const Customers = ({
  getCustomers,
  resetCustomerLoading,
  addCustomer,
  customers: { customers, loading }
}) => {
  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  const [importModal, setImportModal] = useState(false);

  const toggleImportModal = () => {
    setImportModal(!importModal);
  };

  const [highlighted, setHighlighted] = useState(false);
  const [importLoading, setImportLoading] = useState(false);

  return (
    <Fragment>
      <Sidebar active='customers' />
      <div className='main-content of-hidden' id='panel'>
        <Dashnav />
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
                      <li className='breadcrumb-item active'>
                        <a href='/dashboard'>Customers</a>
                      </li>
                    </ol>
                  </nav>
                </div>
                {/* <div className='col-lg-6 col-5 text-right'>
                  <a href='#' className='btn btn-sm btn-neutral'>
                    New
                  </a>
                  <a href='#' className='btn btn-sm btn-neutral'>
                    Filters
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <Row className='mgn-ng-top-60'>
          <Container fluid>
            <div className='card'>
              <div className='card-header'>
                <h3 className='mb-0'>Customers</h3>{' '}
                <Link
                  color='primary'
                  className='float-right mgn-ng-top-28 btn btn-primary'
                  to='/customers/add'
                >
                  <span className='btn-inner--icon'>
                    <i className='ni ni-fat-add' />
                  </span>
                  <span className='btn-inner--text'> Add Customer</span>
                </Link>
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
                      <div id='datatable-basic_filter' className='px-4 pb-1'>
                        <Row>
                          <Col md='6'>
                            <ExportCSVButton
                              className='buttons-copy buttons-html5 btn-sm'
                              {...props.csvProps}
                            >
                              <i className='ni ni-align-left-2'></i> Export CSV
                            </ExportCSVButton>
                            <Button
                              size='sm'
                              color='secondary'
                              onClick={toggleImportModal}
                            >
                              Import Customers from Skimmer
                            </Button>
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

                      <Modal isOpen={importModal} toggle={toggleImportModal}>
                        <ModalHeader toggle={toggleImportModal}>
                          Import Customers from Skimmer
                        </ModalHeader>
                        <ModalBody>
                          <Fragment>
                            <p>
                              You must convert xlsx file to a csv file before
                              you can import the customers list.
                              <br />
                              <br />
                              For instructions, see:{' '}
                              <a href='https://google.com'>
                                https://poolpro360.com/video-guides/import-customers-skimmer
                              </a>
                            </p>
                            <div
                              className={`text-center p-6 my-2 mx-auto mx-w-md border-2 ${
                                highlighted
                                  ? 'border-green-600 bg-green-100'
                                  : ''
                              }`}
                              onDragOver={e => {
                                e.preventDefault();
                              }}
                              onDragEnter={() => {
                                setHighlighted(true);
                              }}
                              onDragLeave={() => {
                                setHighlighted(false);
                              }}
                              onDrop={e => {
                                e.preventDefault();
                                setHighlighted(false);

                                Array.from(e.dataTransfer.files)
                                  .filter(
                                    file =>
                                      file.type === 'text/csv' ||
                                      file.type === 'application/vnd.ms-excel'
                                  )
                                  .forEach(async file => {
                                    const text = await file.text();

                                    const result = await parse(text, {
                                      header: true
                                    });

                                    setImportLoading(true);

                                    await result.data.map(async c => {
                                      let newCustomer = {
                                        firstName: c.FirstName,
                                        lastName: c.LastName,
                                        email: c.Email1,
                                        altEmail: c.Email2,
                                        mobilePhone: c.MobilePhone1,
                                        altPhone: c.MobilePhone2,
                                        serviceAddress: c.LocationAddress,
                                        serviceCity: c.LocationCity,
                                        serviceState: c.LocationState,
                                        serviceZip: c.LocationZip,
                                        email: c.Email1,
                                        altEmail: c.Email2,
                                        gateCode: c.GateCode,
                                        serviceRate: c.Rate,
                                        billingSame: true,
                                        billingAddress: c.BillingAddress,
                                        billingCity: c.BillingCity,
                                        billingState: c.BillingState,
                                        billingZip: c.BillingZip,
                                        dogName: c.DogsName,
                                        poolType: 'Residential',
                                        billingFrequency: 'Monthly',
                                        technician: 'N/A'
                                      };

                                      await addCustomer(newCustomer);
                                    });

                                    await getCustomers();
                                    setImportLoading(false);
                                    toggleImportModal(false);
                                  });
                              }}
                            >
                              {importLoading ? (
                                <span>
                                  Processing... Please do not close this window.
                                </span>
                              ) : (
                                <span>DROP CSV HERE</span>
                              )}
                            </div>
                          </Fragment>
                        </ModalBody>
                      </Modal>

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
          </Container>
        </Row>
      </div>
    </Fragment>
  );
};

Customers.propTypes = {
  getCustomers: PropTypes.func.isRequired,
  resetCustomerLoading: PropTypes.func.isRequired,
  addCustomer: PropTypes.func.isRequired,
  customers: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  customers: state.customer
});

export default connect(mapStateToProps, {
  getCustomers,
  addCustomer,
  resetCustomerLoading
})(Customers);
