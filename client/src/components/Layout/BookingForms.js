import React, { Fragment, useEffect, useState } from 'react';

import Dashnav from '../dashboard/Dashnav';
import Sidebar from '../dashboard/Sidebar';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {
  Search,
  CSVExport
} from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';

import {
  Button,
  Container,
  Col,
  Row,
  CardBody,
  Card,
  CardTitle,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap';

const pagination = paginationFactory({
  page: 1,
  alwaysShowAllBtns: true,
  showTotal: false,
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
    id: 1,
    name: 'Weekly Pool Maintenance (Riverside)',
    url: 'https://example.com/booking/a123dfj38rnxiofn',
    type: 'Residential',
    created: 'Aug 01, 2020',
    responses: '4'
  },
  {
    id: 2,
    name: 'Weekly Pool Maintenance (Bakersfield)',
    url: 'https://example.com/booking/ahvrhi3r7347fhjd',
    created: 'Aug 01, 2020',
    responses: '12'
  }
];

const urlFormatter = cell => {
  return (
    <input
      type='text'
      className='form-control'
      aria-label='Form Url'
      value={cell}
    />
  );
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
        <DropdownItem
          href={`/booking-forms/${cell}`}
          onClick={e => e.preventDefault()}
        >
          View
        </DropdownItem>
        <DropdownItem
          href={`/booking-forms/edit/${cell}`}
          onClick={e => e.preventDefault()}
        >
          Edit
        </DropdownItem>
        <DropdownItem
          href={`/booking-forms/delete/${cell}`}
          onClick={e => e.preventDefault()}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

const columns = [
  {
    dataField: 'name',
    text: 'Form Name'
  },
  {
    dataField: 'url',
    text: 'Form URL',
    formatter: urlFormatter
  },
  {
    dataField: 'created',
    text: 'Created On'
  },
  {
    dataField: 'responses',
    text: 'Responses'
  },
  {
    dataField: 'id',
    text: 'Actions',
    formatter: actionFormatter
  }
];

const BookingForms = () => {
  return (
    <Fragment>
      <Sidebar active='bookingforms' />
      <div className='main-content' id='panel'>
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
                        <a href='/booking-forms'>Booking Forms</a>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Container fluid>
          <Row>
            <Col>
              <Card className='mgn-top-50'>
                <CardBody>
                  <CardTitle>
                    <div className='card-header bg-transparent'>
                      <div className='row align-items-center'>
                        <div className='col'>
                          <h6 className='text-uppercase text-muted ls-1 mb-1'>
                            Overview
                          </h6>
                          <h5 className='h3 mb-0'>Booking Forms</h5>
                        </div>
                        <span className='float-right'>
                          <Button color='primary' href='/booking-forms/add'>
                            <span class='btn-inner--icon'>
                              <i class='ni ni-fat-add'></i>
                            </span>
                            <span class='btn-inner--text'> Add New Form</span>
                          </Button>
                        </span>
                      </div>
                    </div>
                  </CardTitle>

                  <div
                    className='py-4 table-responsive'
                    style={{ padding: '25px' }}
                  >
                    <div id='datatable-basic_filter' className='px-4 pb-1'>
                      <BootstrapTable
                        data={dataTable}
                        keyField='property'
                        columns={columns}
                        bootstrap4={true}
                        pagination={pagination}
                        bordered={false}
                        wrapperClasses='table-responsive'
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default BookingForms;
