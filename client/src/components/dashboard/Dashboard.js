import React, { Fragment, useEffect, useState } from 'react';

import Dashnav from '../dashboard/Dashnav';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {
  Search,
  CSVExport
} from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';

import { Scrollbars } from 'react-custom-scrollbars';

import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
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
  UncontrolledTooltip
} from 'reactstrap';

import Chart from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

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
import { type } from 'jquery';

const { generateTimeSlots } = require('@georgenet/timeslotter');

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

const Dashboard = props => {
  useEffect(() => {
    let options = {
      valueNames: ['date', 'service', 'rate', 'status'],
      listClass: 'list'
    };

    let newList = new List('list-container', options);
  }, []);

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
                <div className='col-lg-6 col-5 text-right'>
                  <a href='#' className='btn btn-sm btn-neutral'>
                    New
                  </a>
                  <a href='#' className='btn btn-sm btn-neutral'>
                    Filters
                  </a>
                </div>
              </div>
              {/* Card stats */}
              <div className='row'>
                <div className='col-xl-3 col-md-6'>
                  <div className='card card-stats'>
                    {/* Card body */}
                    <div className='card-body'>
                      <div className='row'>
                        <div className='col'>
                          <h5 className='card-title text-uppercase text-muted mb-0'>
                            Total Online Bookings
                          </h5>
                          <span className='h2 font-weight-bold mb-0'>116</span>
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
                        <span className='text-nowrap'>Since last month</span>
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
                          <span className='h2 font-weight-bold mb-0'>12</span>
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
                        <span className='text-nowrap'>Since last month</span>
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
                          <span className='h2 font-weight-bold mb-0'>23</span>
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
                        <span className='text-nowrap'>Since last month</span>
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
                          <span className='h2 font-weight-bold mb-0'>2</span>
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
                        <span className='text-nowrap'>Since last month</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Page content */}
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
                            <DropdownMenu className='dropdown-menu-arrow' right>
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
                            <DropdownMenu className='dropdown-menu-arrow' right>
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
                            <DropdownMenu className='dropdown-menu-arrow' right>
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
                  <Button color='primary' className='float-right mgn-ng-top-28'>
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
      </div>
    </Fragment>
  );
};

export default Dashboard;
