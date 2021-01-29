import React, { Fragment, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCustomers, resetCustomerLoading } from '../../actions/customer';

import Sidebar from '../dashboard/Sidebar';
import Dashnav from '../dashboard/Dashnav';
import {
  Button,
  Col,
  Row,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
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
        <DropdownItem tag={Link} to={`/customers/${cell}/edit`}>
          Edit
        </DropdownItem>
        <DropdownItem tag={Link} to={`/customers/${cell}/inactive`}>
          Mark Inactive
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

const columns = [
  {
    dataField: 'firstName',
    text: 'First Name'
  },

  {
    dataField: 'lastName',
    text: 'Last Name'
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
  customers: { customers, loading }
}) => {
  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

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
                <div className='col-lg-6 col-5 text-right'>
                  <a href='#' className='btn btn-sm btn-neutral'>
                    New
                  </a>
                  <a href='#' className='btn btn-sm btn-neutral'>
                    Filters
                  </a>
                </div>
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
                              <i className='ni ni-align-left-2'></i> Export CSV
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
          </Container>
        </Row>
      </div>
    </Fragment>
  );
};

Customers.propTypes = {
  getCustomers: PropTypes.func.isRequired,
  resetCustomerLoading: PropTypes.func.isRequired,
  customers: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  customers: state.customer
});

export default connect(mapStateToProps, { getCustomers, resetCustomerLoading })(
  Customers
);
