import React, { Fragment, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Formik } from 'formik';

import { getEmployees } from '../../actions/employee';

import Sidebar from '../dashboard/Sidebar';
import Dashnav from '../dashboard/Dashnav';
import Footer from '../Layout/Footer';
import Alert from '../Layout/Alert';

import {
  Button,
  Col,
  Row,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';

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
        <DropdownItem tag={Link} to={`/users/${cell}/view`}>
          View User
        </DropdownItem>
        <DropdownItem tag={Link} to={`/users/${cell}/edit`}>
          Edit User
        </DropdownItem>
        <DropdownItem tag={Link} to={`/customers/${cell}/inactive`}>
          Delete User
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

const Users = ({ getEmployees, employees: { employees, loading } }) => {
  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

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
      dataField: 'email',
      text: 'Email/Username'
    },
    {
      dataField: 'role',
      text: 'Role'
    },
    {
      dataField: 'phone',
      text: 'Phone'
    },
    {
      dataField: '_id',
      text: 'Actions',
      formatter: actionFormatter
    }
  ];

  return (
    <Fragment>
      <Sidebar active='users' />
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
                        <a href='/'>
                          <i className='fas fa-home' />
                        </a>
                      </li>
                      <li className='breadcrumb-item'>
                        <a href='/dashboard'>Dashboard</a>
                      </li>
                      <li className='breadcrumb-item active'>
                        <a href='/users'>Users</a>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Container className='mgn-ng-top-60'>
          <div className='card'>
            <div className='card-header'>
              <div className='row align-items-center'>
                <div className='col-8'>
                  <h3 className='mb-0'>Users </h3>
                </div>
                <div className='col-4 text-right'>
                  <Link className='float-right btn btn-primary' to='/users/add'>
                    <span className='btn-inner--icon'>
                      <i className='fas fa-user-plus'></i>
                    </span>{' '}
                    <span className='btn-inner--text'>Add User</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className='card-body'>
              {loading ? (
                <Fragment>
                  <div className='text-center'>
                    <h4>Locating Users...</h4>
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
                  data={employees}
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
                              placeholder='Search Users'
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
          <Footer />
        </Container>
      </div>
    </Fragment>
  );
};

Users.propTypes = {
  getEmployees: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  employees: state.employee
});

export default connect(mapStateToProps, { getEmployees })(Users);
