import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Route, Switch, Redirect } from 'react-router-dom';

// import { Row, Col, Container, Button } from 'react-bootstrap';

import Chart from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';

import { Container } from 'reactstrap';

import Moment from 'react-moment';
import moment from 'moment';

import userImg from '../../img/theme/team-1.jpg';
import userImg2 from '../../img/theme/team-2.jpg';
import userImg3 from '../../img/theme/team-3.jpg';
import userImg4 from '../../img/theme/team-4.jpg';
import userImg5 from '../../img/theme/team-5.jpg';

import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from '../../variables/chart';

const { generateTimeSlots } = require('@georgenet/timeslotter');

const Dashboard = props => {
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

  return (
    <Fragment>
      <div className='main-content' id='panel'>
        {/* Topnav */}
        <nav className='navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom'>
          <div className='container-fluid'>
            <div
              className='collapse navbar-collapse'
              id='navbarSupportedContent'
            >
              {/* Search form */}
              <form
                className='navbar-search navbar-search-light form-inline mr-sm-3'
                id='navbar-search-main'
              >
                <div className='form-group mb-0'>
                  <div className='input-group input-group-alternative input-group-merge'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>
                        <i className='fas fa-search' />
                      </span>
                    </div>
                    <input
                      className='form-control'
                      placeholder='Search'
                      type='text'
                    />
                  </div>
                </div>
                <button
                  type='button'
                  className='close'
                  data-action='search-close'
                  data-target='#navbar-search-main'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>×</span>
                </button>
              </form>
              {/* Navbar links */}
              <ul className='navbar-nav align-items-center  ml-md-auto '>
                <li className='nav-item d-xl-none'>
                  {/* Sidenav toggler */}
                  <div
                    className='pr-3 sidenav-toggler sidenav-toggler-dark'
                    data-action='sidenav-pin'
                    data-target='#sidenav-main'
                  >
                    <div className='sidenav-toggler-inner'>
                      <i className='sidenav-toggler-line' />
                      <i className='sidenav-toggler-line' />
                      <i className='sidenav-toggler-line' />
                    </div>
                  </div>
                </li>
                <li className='nav-item d-sm-none'>
                  <a
                    className='nav-link'
                    href='#'
                    data-action='search-show'
                    data-target='#navbar-search-main'
                  >
                    <i className='ni ni-zoom-split-in' />
                  </a>
                </li>
                <li className='nav-item dropdown'>
                  <a
                    className='nav-link'
                    href='#'
                    role='button'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    <i className='ni ni-bell-55' />
                  </a>
                  <div className='dropdown-menu dropdown-menu-xl  dropdown-menu-right  py-0 overflow-hidden'>
                    {/* Dropdown header */}
                    <div className='px-3 py-3'>
                      <h6 className='text-sm text-muted m-0'>
                        You have <strong className='text-primary'>13</strong>{' '}
                        notifications.
                      </h6>
                    </div>
                    {/* List group */}
                    <div className='list-group list-group-flush'>
                      <a
                        href='#!'
                        className='list-group-item list-group-item-action'
                      >
                        <div className='row align-items-center'>
                          <div className='col-auto'>
                            {/* Avatar */}
                            <img
                              alt='Image placeholder'
                              src={userImg}
                              className='avatar rounded-circle'
                            />
                          </div>
                          <div className='col ml--2'>
                            <div className='d-flex justify-content-between align-items-center'>
                              <div>
                                <h4 className='mb-0 text-sm'>John Snow</h4>
                              </div>
                              <div className='text-right text-muted'>
                                <small>2 hrs ago</small>
                              </div>
                            </div>
                            <p className='text-sm mb-0'>
                              Let's meet at Starbucks at 11:30. Wdyt?
                            </p>
                          </div>
                        </div>
                      </a>
                      <a
                        href='#!'
                        className='list-group-item list-group-item-action'
                      >
                        <div className='row align-items-center'>
                          <div className='col-auto'>
                            {/* Avatar */}
                            <img
                              alt='Image placeholder'
                              src={userImg2}
                              className='avatar rounded-circle'
                            />
                          </div>
                          <div className='col ml--2'>
                            <div className='d-flex justify-content-between align-items-center'>
                              <div>
                                <h4 className='mb-0 text-sm'>John Snow</h4>
                              </div>
                              <div className='text-right text-muted'>
                                <small>3 hrs ago</small>
                              </div>
                            </div>
                            <p className='text-sm mb-0'>
                              A new issue has been reported for Argon.
                            </p>
                          </div>
                        </div>
                      </a>
                      <a
                        href='#!'
                        className='list-group-item list-group-item-action'
                      >
                        <div className='row align-items-center'>
                          <div className='col-auto'>
                            {/* Avatar */}
                            <img
                              alt='Image placeholder'
                              src={userImg}
                              className='avatar rounded-circle'
                            />
                          </div>
                          <div className='col ml--2'>
                            <div className='d-flex justify-content-between align-items-center'>
                              <div>
                                <h4 className='mb-0 text-sm'>John Snow</h4>
                              </div>
                              <div className='text-right text-muted'>
                                <small>5 hrs ago</small>
                              </div>
                            </div>
                            <p className='text-sm mb-0'>
                              Your posts have been liked a lot.
                            </p>
                          </div>
                        </div>
                      </a>
                      <a
                        href='#!'
                        className='list-group-item list-group-item-action'
                      >
                        <div className='row align-items-center'>
                          <div className='col-auto'>
                            {/* Avatar */}
                            <img
                              alt='Image placeholder'
                              src={userImg3}
                              className='avatar rounded-circle'
                            />
                          </div>
                          <div className='col ml--2'>
                            <div className='d-flex justify-content-between align-items-center'>
                              <div>
                                <h4 className='mb-0 text-sm'>John Snow</h4>
                              </div>
                              <div className='text-right text-muted'>
                                <small>2 hrs ago</small>
                              </div>
                            </div>
                            <p className='text-sm mb-0'>
                              Let's meet at Starbucks at 11:30. Wdyt?
                            </p>
                          </div>
                        </div>
                      </a>
                      <a
                        href='#!'
                        className='list-group-item list-group-item-action'
                      >
                        <div className='row align-items-center'>
                          <div className='col-auto'>
                            {/* Avatar */}
                            <img
                              alt='Image placeholder'
                              src={userImg}
                              className='avatar rounded-circle'
                            />
                          </div>
                          <div className='col ml--2'>
                            <div className='d-flex justify-content-between align-items-center'>
                              <div>
                                <h4 className='mb-0 text-sm'>John Snow</h4>
                              </div>
                              <div className='text-right text-muted'>
                                <small>3 hrs ago</small>
                              </div>
                            </div>
                            <p className='text-sm mb-0'>
                              A new issue has been reported for Argon.
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                    {/* View all */}
                    <a
                      href='#!'
                      className='dropdown-item text-center text-primary font-weight-bold py-3'
                    >
                      View all
                    </a>
                  </div>
                </li>
                <li className='nav-item dropdown'>
                  <a
                    className='nav-link'
                    href='#'
                    role='button'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    <i className='ni ni-ungroup' />
                  </a>
                  <div className='dropdown-menu dropdown-menu-lg dropdown-menu-dark bg-default  dropdown-menu-right '>
                    <div className='row shortcuts px-4'>
                      <a href='#!' className='col-4 shortcut-item'>
                        <span className='shortcut-media avatar rounded-circle bg-gradient-red'>
                          <i className='ni ni-calendar-grid-58' />
                        </span>
                        <small>Calendar</small>
                      </a>
                      <a href='#!' className='col-4 shortcut-item'>
                        <span className='shortcut-media avatar rounded-circle bg-gradient-orange'>
                          <i className='ni ni-email-83' />
                        </span>
                        <small>Email</small>
                      </a>
                      <a href='#!' className='col-4 shortcut-item'>
                        <span className='shortcut-media avatar rounded-circle bg-gradient-info'>
                          <i className='ni ni-credit-card' />
                        </span>
                        <small>Payments</small>
                      </a>
                      <a href='#!' className='col-4 shortcut-item'>
                        <span className='shortcut-media avatar rounded-circle bg-gradient-green'>
                          <i className='ni ni-books' />
                        </span>
                        <small>Reports</small>
                      </a>
                      <a href='#!' className='col-4 shortcut-item'>
                        <span className='shortcut-media avatar rounded-circle bg-gradient-purple'>
                          <i className='ni ni-pin-3' />
                        </span>
                        <small>Maps</small>
                      </a>
                      <a href='#!' className='col-4 shortcut-item'>
                        <span className='shortcut-media avatar rounded-circle bg-gradient-yellow'>
                          <i className='ni ni-basket' />
                        </span>
                        <small>Shop</small>
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
              <ul className='navbar-nav align-items-center  ml-auto ml-md-0 '>
                <li className='nav-item dropdown'>
                  <a
                    className='nav-link pr-0'
                    href='#'
                    role='button'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    <div className='media align-items-center'>
                      <span className='avatar avatar-sm rounded-circle'>
                        <img alt='Image placeholder' src={userImg} />
                      </span>
                      <div className='media-body  ml-2  d-none d-lg-block'>
                        <span className='mb-0 text-sm  font-weight-bold'>
                          John Snows
                        </span>
                      </div>
                    </div>
                  </a>
                  <div className='dropdown-menu  dropdown-menu-right '>
                    <div className='dropdown-header noti-title'>
                      <h6 className='text-overflow m-0'>Welcome!</h6>
                    </div>
                    <a href='#!' className='dropdown-item'>
                      <i className='ni ni-single-02' />
                      <span>My profile</span>
                    </a>
                    <a href='#!' className='dropdown-item'>
                      <i className='ni ni-settings-gear-65' />
                      <span>Settings</span>
                    </a>
                    <a href='#!' className='dropdown-item'>
                      <i className='ni ni-calendar-grid-58' />
                      <span>Activity</span>
                    </a>
                    <a href='#!' className='dropdown-item'>
                      <i className='ni ni-support-16' />
                      <span>Support</span>
                    </a>
                    <div className='dropdown-divider' />
                    <a href='#!' className='dropdown-item'>
                      <i className='ni ni-user-run' />
                      <span>Logout</span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
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
              <div className='card bg-default'>
                <div className='card-header bg-transparent'>
                  <div className='row align-items-center'>
                    <div className='col'>
                      <h6 className='text-light text-uppercase ls-1 mb-1'>
                        Overview
                      </h6>
                      <h5 className='h3 text-white mb-0'>Sales value</h5>
                    </div>
                    <div className='col'>
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
                            <span className='d-none d-md-block'>Month</span>
                            <span className='d-md-none'>M</span>
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
                            <span className='d-none d-md-block'>Week</span>
                            <span className='d-md-none'>W</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='card-body'>
                  {/* Chart */}
                  <div className='chart'>
                    {/* Chart wrapper */}
                    {/* <canvas id='chart-sales-dark' className='chart-canvas' /> */}
                    <Line
                      data={{
                        labels: [
                          'May',
                          'Jun',
                          'Jul',
                          'Aug',
                          'Sep',
                          'Oct',
                          'Nov',
                          'Dec'
                        ],
                        datasets: [
                          {
                            data: [0, 20, 10, 30, 15, 40, 20, 60, 60]
                          }
                        ]
                      }}
                      options={chartExample1.options}
                      id='chart-sales-dark'
                      className='chart-canvas'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-4'>
              <div className='card'>
                <div className='card-header bg-transparent'>
                  <div className='row align-items-center'>
                    <div className='col'>
                      <h6 className='text-uppercase text-muted ls-1 mb-1'>
                        Performance
                      </h6>
                      <h5 className='h3 mb-0'>Total orders</h5>
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
            <div className='col-xl-4'>
              {/* Members list group card */}
              <div className='card'>
                {/* Card header */}
                <div className='card-header'>
                  {/* Title */}
                  <h5 className='h3 mb-0'>Team members</h5>
                </div>
                {/* Card body */}
                <div className='card-body'>
                  {/* List group */}
                  <ul className='list-group list-group-flush list my--3'>
                    <li className='list-group-item px-0'>
                      <div className='row align-items-center'>
                        <div className='col-auto'>
                          {/* Avatar */}
                          <a href='#' className='avatar rounded-circle'>
                            <img alt='Image placeholder' src={userImg} />
                          </a>
                        </div>
                        <div className='col ml--2'>
                          <h4 className='mb-0'>
                            <a href='#!'>John Michael</a>
                          </h4>
                          <span className='text-success'>●</span>
                          <small>Online</small>
                        </div>
                        <div className='col-auto'>
                          <button
                            type='button'
                            className='btn btn-sm btn-primary'
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </li>
                    <li className='list-group-item px-0'>
                      <div className='row align-items-center'>
                        <div className='col-auto'>
                          {/* Avatar */}
                          <a href='#' className='avatar rounded-circle'>
                            <img alt='Image placeholder' src={userImg2} />
                          </a>
                        </div>
                        <div className='col ml--2'>
                          <h4 className='mb-0'>
                            <a href='#!'>Alex Smith</a>
                          </h4>
                          <span className='text-warning'>●</span>
                          <small>In a meeting</small>
                        </div>
                        <div className='col-auto'>
                          <button
                            type='button'
                            className='btn btn-sm btn-primary'
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </li>
                    <li className='list-group-item px-0'>
                      <div className='row align-items-center'>
                        <div className='col-auto'>
                          {/* Avatar */}
                          <a href='#' className='avatar rounded-circle'>
                            <img alt='Image placeholder' src={userImg3} />
                          </a>
                        </div>
                        <div className='col ml--2'>
                          <h4 className='mb-0'>
                            <a href='#!'>Samantha Ivy</a>
                          </h4>
                          <span className='text-danger'>●</span>
                          <small>Offline</small>
                        </div>
                        <div className='col-auto'>
                          <button
                            type='button'
                            className='btn btn-sm btn-primary'
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </li>
                    <li className='list-group-item px-0'>
                      <div className='row align-items-center'>
                        <div className='col-auto'>
                          {/* Avatar */}
                          <a href='#' className='avatar rounded-circle'>
                            <img alt='Image placeholder' src={userImg4} />
                          </a>
                        </div>
                        <div className='col ml--2'>
                          <h4 className='mb-0'>
                            <a href='#!'>John Michael</a>
                          </h4>
                          <span className='text-success'>●</span>
                          <small>Online</small>
                        </div>
                        <div className='col-auto'>
                          <button
                            type='button'
                            className='btn btn-sm btn-primary'
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-xl-4'>
              {/* Checklist */}
              <div className='card'>
                {/* Card header */}
                <div className='card-header'>
                  {/* Title */}
                  <h5 className='h3 mb-0'>To do list</h5>
                </div>
                {/* Card body */}
                <div className='card-body p-0'>
                  {/* List group */}
                  <ul
                    className='list-group list-group-flush'
                    data-toggle='checklist'
                  >
                    <li className='checklist-entry list-group-item flex-column align-items-start py-4 px-4'>
                      <div className='checklist-item checklist-item-success'>
                        <div className='checklist-info'>
                          <h5 className='checklist-title mb-0'>
                            Call with Dave
                          </h5>
                          <small>10:30 AM</small>
                        </div>
                        <div>
                          <div className='custom-control custom-checkbox custom-checkbox-success'>
                            <input
                              className='custom-control-input'
                              id='chk-todo-task-1'
                              type='checkbox'
                              defaultChecked
                            />
                            <label
                              className='custom-control-label'
                              htmlFor='chk-todo-task-1'
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className='checklist-entry list-group-item flex-column align-items-start py-4 px-4'>
                      <div className='checklist-item checklist-item-warning'>
                        <div className='checklist-info'>
                          <h5 className='checklist-title mb-0'>
                            Lunch meeting
                          </h5>
                          <small>10:30 AM</small>
                        </div>
                        <div>
                          <div className='custom-control custom-checkbox custom-checkbox-warning'>
                            <input
                              className='custom-control-input'
                              id='chk-todo-task-2'
                              type='checkbox'
                            />
                            <label
                              className='custom-control-label'
                              htmlFor='chk-todo-task-2'
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className='checklist-entry list-group-item flex-column align-items-start py-4 px-4'>
                      <div className='checklist-item checklist-item-info'>
                        <div className='checklist-info'>
                          <h5 className='checklist-title mb-0'>
                            Argon Dashboard Launch
                          </h5>
                          <small>10:30 AM</small>
                        </div>
                        <div>
                          <div className='custom-control custom-checkbox custom-checkbox-info'>
                            <input
                              className='custom-control-input'
                              id='chk-todo-task-3'
                              type='checkbox'
                            />
                            <label
                              className='custom-control-label'
                              htmlFor='chk-todo-task-3'
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className='checklist-entry list-group-item flex-column align-items-start py-4 px-4'>
                      <div className='checklist-item checklist-item-danger'>
                        <div className='checklist-info'>
                          <h5 className='checklist-title mb-0'>
                            Winter Hackaton
                          </h5>
                          <small>10:30 AM</small>
                        </div>
                        <div>
                          <div className='custom-control custom-checkbox custom-checkbox-danger'>
                            <input
                              className='custom-control-input'
                              id='chk-todo-task-4'
                              type='checkbox'
                              defaultChecked
                            />
                            <label
                              className='custom-control-label'
                              htmlFor='chk-todo-task-4'
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-xl-4'>
              {/* Progress track */}
              <div className='card'>
                {/* Card header */}
                <div className='card-header'>
                  {/* Title */}
                  <h5 className='h3 mb-0'>Progress track</h5>
                </div>
                {/* Card body */}
                <div className='card-body'>
                  {/* List group */}
                  <ul className='list-group list-group-flush list my--3'>
                    <li className='list-group-item px-0'>
                      <div className='row align-items-center'>
                        <div className='col-auto'>
                          {/* Avatar */}
                          <a href='#' className='avatar rounded-circle'>
                            <img
                              alt='Image placeholder'
                              src='../../assets/img/theme/bootstrap.jpg'
                            />
                          </a>
                        </div>
                        <div className='col'>
                          <h5>Argon Design System</h5>
                          <div className='progress progress-xs mb-0'>
                            <div
                              className='progress-bar bg-orange'
                              role='progressbar'
                              aria-valuenow={60}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: '60%' }}
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className='list-group-item px-0'>
                      <div className='row align-items-center'>
                        <div className='col-auto'>
                          {/* Avatar */}
                          <a href='#' className='avatar rounded-circle'>
                            <img
                              alt='Image placeholder'
                              src='../../assets/img/theme/angular.jpg'
                            />
                          </a>
                        </div>
                        <div className='col'>
                          <h5>Angular Now UI Kit PRO</h5>
                          <div className='progress progress-xs mb-0'>
                            <div
                              className='progress-bar bg-green'
                              role='progressbar'
                              aria-valuenow={100}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: '100%' }}
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className='list-group-item px-0'>
                      <div className='row align-items-center'>
                        <div className='col-auto'>
                          {/* Avatar */}
                          <a href='#' className='avatar rounded-circle'>
                            <img
                              alt='Image placeholder'
                              src='../../assets/img/theme/sketch.jpg'
                            />
                          </a>
                        </div>
                        <div className='col'>
                          <h5>Black Dashboard</h5>
                          <div className='progress progress-xs mb-0'>
                            <div
                              className='progress-bar bg-red'
                              role='progressbar'
                              aria-valuenow={72}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: '72%' }}
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className='list-group-item px-0'>
                      <div className='row align-items-center'>
                        <div className='col-auto'>
                          {/* Avatar */}
                          <a href='#' className='avatar rounded-circle'>
                            <img
                              alt='Image placeholder'
                              src='../../assets/img/theme/react.jpg'
                            />
                          </a>
                        </div>
                        <div className='col'>
                          <h5>React Material Dashboard</h5>
                          <div className='progress progress-xs mb-0'>
                            <div
                              className='progress-bar bg-teal'
                              role='progressbar'
                              aria-valuenow={90}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: '90%' }}
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-5'>
              <div className='card'>
                <div className='card-header'>
                  <h5 className='h3 mb-0'>Activity feed</h5>
                </div>
                <div className='card-header d-flex align-items-center'>
                  <div className='d-flex align-items-center'>
                    <a href='#'>
                      <img
                        src='../../assets/img/theme/team-1.jpg'
                        className='avatar'
                      />
                    </a>
                    <div className='mx-3'>
                      <a href='#' className='text-dark font-weight-600 text-sm'>
                        John Snow
                      </a>
                      <small className='d-block text-muted'>3 days ago</small>
                    </div>
                  </div>
                  <div className='text-right ml-auto'>
                    <button
                      type='button'
                      className='btn btn-sm btn-primary btn-icon'
                    >
                      <span className='btn-inner--icon'>
                        <i className='ni ni-fat-add' />
                      </span>
                      <span className='btn-inner--text'>Follow</span>
                    </button>
                  </div>
                </div>
                <div className='card-body'>
                  <p className='mb-4'>
                    Personal profiles are the perfect way for you to grab their
                    attention and persuade recruiters to continue reading your
                    CV because you’re telling them from the off exactly why they
                    should hire you.
                  </p>
                  <img
                    alt='Image placeholder'
                    src='../../assets/img/theme/img-1-1000x600.jpg'
                    className='img-fluid rounded'
                  />
                  <div className='row align-items-center my-3 pb-3 border-bottom'>
                    <div className='col-sm-6'>
                      <div className='icon-actions'>
                        <a href='#' className='like active'>
                          <i className='ni ni-like-2' />
                          <span className='text-muted'>150</span>
                        </a>
                        <a href='#'>
                          <i className='ni ni-chat-round' />
                          <span className='text-muted'>36</span>
                        </a>
                        <a href='#'>
                          <i className='ni ni-curved-next' />
                          <span className='text-muted'>12</span>
                        </a>
                      </div>
                    </div>
                    <div className='col-sm-6 d-none d-sm-block'>
                      <div className='d-flex align-items-center justify-content-sm-end'>
                        <div className='avatar-group'>
                          <a
                            href='#'
                            className='avatar avatar-xs rounded-circle'
                            data-toggle='tooltip'
                            data-original-title='Jessica Rowland'
                          >
                            <img
                              alt='Image placeholder'
                              src='../../assets/img/theme/team-1.jpg'
                              className
                            />
                          </a>
                          <a
                            href='#'
                            className='avatar avatar-xs rounded-circle'
                            data-toggle='tooltip'
                            data-original-title='Audrey Love'
                          >
                            <img
                              alt='Image placeholder'
                              src='../../assets/img/theme/team-2.jpg'
                              className='rounded-circle'
                            />
                          </a>
                          <a
                            href='#'
                            className='avatar avatar-xs rounded-circle'
                            data-toggle='tooltip'
                            data-original-title='Michael Lewis'
                          >
                            <img
                              alt='Image placeholder'
                              src='../../assets/img/theme/team-3.jpg'
                              className='rounded-circle'
                            />
                          </a>
                        </div>
                        <small className='pl-2 font-weight-bold'>
                          and 30+ more
                        </small>
                      </div>
                    </div>
                  </div>
                  {/* Comments */}
                  <div className='mb-1'>
                    <div className='media media-comment'>
                      <img
                        alt='Image placeholder'
                        className='avatar avatar-lg media-comment-avatar rounded-circle'
                        src='../../assets/img/theme/team-1.jpg'
                      />
                      <div className='media-body'>
                        <div className='media-comment-text'>
                          <h6 className='h5 mt-0'>Michael Lewis</h6>
                          <p className='text-sm lh-160'>
                            Cras sit amet nibh libero nulla vel metus
                            scelerisque ante sollicitudin. Cras purus odio
                            vestibulum in vulputate viverra turpis.
                          </p>
                          <div className='icon-actions'>
                            <a href='#' className='like active'>
                              <i className='ni ni-like-2' />
                              <span className='text-muted'>3 likes</span>
                            </a>
                            <a href='#'>
                              <i className='ni ni-curved-next' />
                              <span className='text-muted'>2 shares</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='media media-comment'>
                      <img
                        alt='Image placeholder'
                        className='avatar avatar-lg media-comment-avatar rounded-circle'
                        src='../../assets/img/theme/team-2.jpg'
                      />
                      <div className='media-body'>
                        <div className='media-comment-text'>
                          <h6 className='h5 mt-0'>Jessica Stones</h6>
                          <p className='text-sm lh-160'>
                            Cras sit amet nibh libero, in gravida nulla. Nulla
                            vel metus scelerisque ante sollicitudin. Cras purus
                            odio, vestibulum in vulputate at, tempus viverra
                            turpis.
                          </p>
                          <div className='icon-actions'>
                            <a href='#' className='like active'>
                              <i className='ni ni-like-2' />
                              <span className='text-muted'>10 likes</span>
                            </a>
                            <a href='#'>
                              <i className='ni ni-curved-next' />
                              <span className='text-muted'>1 share</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className='media align-items-center'>
                      <img
                        alt='Image placeholder'
                        className='avatar avatar-lg rounded-circle mr-4'
                        src='../../assets/img/theme/team-3.jpg'
                      />
                      <div className='media-body'>
                        <form>
                          <textarea
                            className='form-control'
                            placeholder='Write your comment'
                            rows={1}
                            defaultValue={''}
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-7'>
              <div className='row'>
                <div className='col'>
                  <div className='card'>
                    {/* Card header */}
                    <div className='card-header border-0'>
                      <h3 className='mb-0'>Light table</h3>
                    </div>
                    <div className='table-responsive'>
                      <table className='table align-items-center table-flush'>
                        <thead className='thead-light'>
                          <tr>
                            <th scope='col' className='sort' data-sort='name'>
                              Project
                            </th>
                            <th scope='col' className='sort' data-sort='budget'>
                              Budget
                            </th>
                            <th scope='col' className='sort' data-sort='status'>
                              Status
                            </th>
                            <th scope='col'>Users</th>
                            <th
                              scope='col'
                              className='sort'
                              data-sort='completion'
                            >
                              Completion
                            </th>
                            <th scope='col' />
                          </tr>
                        </thead>
                        <tbody className='list'>
                          <tr>
                            <th scope='row'>
                              <div className='media align-items-center'>
                                <a
                                  href='#'
                                  className='avatar rounded-circle mr-3'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/bootstrap.jpg'
                                  />
                                </a>
                                <div className='media-body'>
                                  <span className='name mb-0 text-sm'>
                                    Argon Design System
                                  </span>
                                </div>
                              </div>
                            </th>
                            <td className='budget'>$2500 USD</td>
                            <td>
                              <span className='badge badge-dot mr-4'>
                                <i className='bg-warning' />
                                <span className='status'>pending</span>
                              </span>
                            </td>
                            <td>
                              <div className='avatar-group'>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Ryan Tompson'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-1.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Romina Hadid'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-2.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Alexander Smith'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-3.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Jessica Doe'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-4.jpg'
                                  />
                                </a>
                              </div>
                            </td>
                            <td>
                              <div className='d-flex align-items-center'>
                                <span className='completion mr-2'>60%</span>
                                <div>
                                  <div className='progress'>
                                    <div
                                      className='progress-bar bg-warning'
                                      role='progressbar'
                                      aria-valuenow={60}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                      style={{ width: '60%' }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='text-right'>
                              <div className='dropdown'>
                                <a
                                  className='btn btn-sm btn-icon-only text-light'
                                  href='#'
                                  role='button'
                                  data-toggle='dropdown'
                                  aria-haspopup='true'
                                  aria-expanded='false'
                                >
                                  <i className='fas fa-ellipsis-v' />
                                </a>
                                <div className='dropdown-menu dropdown-menu-right dropdown-menu-arrow'>
                                  <a className='dropdown-item' href='#'>
                                    Action
                                  </a>
                                  <a className='dropdown-item' href='#'>
                                    Another action
                                  </a>
                                  <a className='dropdown-item' href='#'>
                                    Something else here
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope='row'>
                              <div className='media align-items-center'>
                                <a
                                  href='#'
                                  className='avatar rounded-circle mr-3'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/angular.jpg'
                                  />
                                </a>
                                <div className='media-body'>
                                  <span className='name mb-0 text-sm'>
                                    Angular Now UI Kit PRO
                                  </span>
                                </div>
                              </div>
                            </th>
                            <td className='budget'>$1800 USD</td>
                            <td>
                              <span className='badge badge-dot mr-4'>
                                <i className='bg-success' />
                                <span className='status'>completed</span>
                              </span>
                            </td>
                            <td>
                              <div className='avatar-group'>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Ryan Tompson'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-1.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Romina Hadid'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-2.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Alexander Smith'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-3.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Jessica Doe'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-4.jpg'
                                  />
                                </a>
                              </div>
                            </td>
                            <td>
                              <div className='d-flex align-items-center'>
                                <span className='completion mr-2'>100%</span>
                                <div>
                                  <div className='progress'>
                                    <div
                                      className='progress-bar bg-success'
                                      role='progressbar'
                                      aria-valuenow={100}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                      style={{ width: '100%' }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='text-right'>
                              <div className='dropdown'>
                                <a
                                  className='btn btn-sm btn-icon-only text-light'
                                  href='#'
                                  role='button'
                                  data-toggle='dropdown'
                                  aria-haspopup='true'
                                  aria-expanded='false'
                                >
                                  <i className='fas fa-ellipsis-v' />
                                </a>
                                <div className='dropdown-menu dropdown-menu-right dropdown-menu-arrow'>
                                  <a className='dropdown-item' href='#'>
                                    Action
                                  </a>
                                  <a className='dropdown-item' href='#'>
                                    Another action
                                  </a>
                                  <a className='dropdown-item' href='#'>
                                    Something else here
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope='row'>
                              <div className='media align-items-center'>
                                <a
                                  href='#'
                                  className='avatar rounded-circle mr-3'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/sketch.jpg'
                                  />
                                </a>
                                <div className='media-body'>
                                  <span className='name mb-0 text-sm'>
                                    Black Dashboard
                                  </span>
                                </div>
                              </div>
                            </th>
                            <td className='budget'>$3150 USD</td>
                            <td>
                              <span className='badge badge-dot mr-4'>
                                <i className='bg-danger' />
                                <span className='status'>delayed</span>
                              </span>
                            </td>
                            <td>
                              <div className='avatar-group'>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Ryan Tompson'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-1.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Romina Hadid'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-2.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Alexander Smith'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-3.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Jessica Doe'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-4.jpg'
                                  />
                                </a>
                              </div>
                            </td>
                            <td>
                              <div className='d-flex align-items-center'>
                                <span className='completion mr-2'>72%</span>
                                <div>
                                  <div className='progress'>
                                    <div
                                      className='progress-bar bg-danger'
                                      role='progressbar'
                                      aria-valuenow={72}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                      style={{ width: '72%' }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='text-right'>
                              <div className='dropdown'>
                                <a
                                  className='btn btn-sm btn-icon-only text-light'
                                  href='#'
                                  role='button'
                                  data-toggle='dropdown'
                                  aria-haspopup='true'
                                  aria-expanded='false'
                                >
                                  <i className='fas fa-ellipsis-v' />
                                </a>
                                <div className='dropdown-menu dropdown-menu-right dropdown-menu-arrow'>
                                  <a className='dropdown-item' href='#'>
                                    Action
                                  </a>
                                  <a className='dropdown-item' href='#'>
                                    Another action
                                  </a>
                                  <a className='dropdown-item' href='#'>
                                    Something else here
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope='row'>
                              <div className='media align-items-center'>
                                <a
                                  href='#'
                                  className='avatar rounded-circle mr-3'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/react.jpg'
                                  />
                                </a>
                                <div className='media-body'>
                                  <span className='name mb-0 text-sm'>
                                    React Material Dashboard
                                  </span>
                                </div>
                              </div>
                            </th>
                            <td className='budget'>$4400 USD</td>
                            <td>
                              <span className='badge badge-dot mr-4'>
                                <i className='bg-info' />
                                <span className='status'>on schedule</span>
                              </span>
                            </td>
                            <td>
                              <div className='avatar-group'>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Ryan Tompson'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-1.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Romina Hadid'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-2.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Alexander Smith'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-3.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Jessica Doe'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-4.jpg'
                                  />
                                </a>
                              </div>
                            </td>
                            <td>
                              <div className='d-flex align-items-center'>
                                <span className='completion mr-2'>90%</span>
                                <div>
                                  <div className='progress'>
                                    <div
                                      className='progress-bar bg-info'
                                      role='progressbar'
                                      aria-valuenow={90}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                      style={{ width: '90%' }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='text-right'>
                              <div className='dropdown'>
                                <a
                                  className='btn btn-sm btn-icon-only text-light'
                                  href='#'
                                  role='button'
                                  data-toggle='dropdown'
                                  aria-haspopup='true'
                                  aria-expanded='false'
                                >
                                  <i className='fas fa-ellipsis-v' />
                                </a>
                                <div className='dropdown-menu dropdown-menu-right dropdown-menu-arrow'>
                                  <a className='dropdown-item' href='#'>
                                    Action
                                  </a>
                                  <a className='dropdown-item' href='#'>
                                    Another action
                                  </a>
                                  <a className='dropdown-item' href='#'>
                                    Something else here
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope='row'>
                              <div className='media align-items-center'>
                                <a
                                  href='#'
                                  className='avatar rounded-circle mr-3'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/vue.jpg'
                                  />
                                </a>
                                <div className='media-body'>
                                  <span className='name mb-0 text-sm'>
                                    Vue Paper UI Kit PRO
                                  </span>
                                </div>
                              </div>
                            </th>
                            <td className='budget'>$2200 USD</td>
                            <td>
                              <span className='badge badge-dot mr-4'>
                                <i className='bg-success' />
                                <span className='status'>completed</span>
                              </span>
                            </td>
                            <td>
                              <div className='avatar-group'>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Ryan Tompson'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-1.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Romina Hadid'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-2.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Alexander Smith'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-3.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Jessica Doe'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-4.jpg'
                                  />
                                </a>
                              </div>
                            </td>
                            <td>
                              <div className='d-flex align-items-center'>
                                <span className='completion mr-2'>100%</span>
                                <div>
                                  <div className='progress'>
                                    <div
                                      className='progress-bar bg-success'
                                      role='progressbar'
                                      aria-valuenow={100}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                      style={{ width: '100%' }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='text-right'>
                              <div className='dropdown'>
                                <a
                                  className='btn btn-sm btn-icon-only text-light'
                                  href='#'
                                  role='button'
                                  data-toggle='dropdown'
                                  aria-haspopup='true'
                                  aria-expanded='false'
                                >
                                  <i className='fas fa-ellipsis-v' />
                                </a>
                                <div className='dropdown-menu dropdown-menu-right dropdown-menu-arrow'>
                                  <a className='dropdown-item' href='#'>
                                    Action
                                  </a>
                                  <a className='dropdown-item' href='#'>
                                    Another action
                                  </a>
                                  <a className='dropdown-item' href='#'>
                                    Something else here
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope='row'>
                              <div className='media align-items-center'>
                                <a
                                  href='#'
                                  className='avatar rounded-circle mr-3'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/bootstrap.jpg'
                                  />
                                </a>
                                <div className='media-body'>
                                  <span className='name mb-0 text-sm'>
                                    Argon Design System
                                  </span>
                                </div>
                              </div>
                            </th>
                            <td className='budget'>$2500 USD</td>
                            <td>
                              <span className='badge badge-dot mr-4'>
                                <i className='bg-warning' />
                                <span className='status'>pending</span>
                              </span>
                            </td>
                            <td>
                              <div className='avatar-group'>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Ryan Tompson'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-1.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Romina Hadid'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-2.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Alexander Smith'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-3.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Jessica Doe'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-4.jpg'
                                  />
                                </a>
                              </div>
                            </td>
                            <td>
                              <div className='d-flex align-items-center'>
                                <span className='completion mr-2'>60%</span>
                                <div>
                                  <div className='progress'>
                                    <div
                                      className='progress-bar bg-warning'
                                      role='progressbar'
                                      aria-valuenow={60}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                      style={{ width: '60%' }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='text-right'>
                              <div className='dropdown'>
                                <a
                                  className='btn btn-sm btn-icon-only text-light'
                                  href='#'
                                  role='button'
                                  data-toggle='dropdown'
                                  aria-haspopup='true'
                                  aria-expanded='false'
                                >
                                  <i className='fas fa-ellipsis-v' />
                                </a>
                                <div className='dropdown-menu dropdown-menu-right dropdown-menu-arrow'>
                                  <a className='dropdown-item' href='#'>
                                    Action
                                  </a>
                                  <a className='dropdown-item' href='#'>
                                    Another action
                                  </a>
                                  <a className='dropdown-item' href='#'>
                                    Something else here
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope='row'>
                              <div className='media align-items-center'>
                                <a
                                  href='#'
                                  className='avatar rounded-circle mr-3'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/angular.jpg'
                                  />
                                </a>
                                <div className='media-body'>
                                  <span className='name mb-0 text-sm'>
                                    Angular Now UI Kit PRO
                                  </span>
                                </div>
                              </div>
                            </th>
                            <td className='budget'>$1800 USD</td>
                            <td>
                              <span className='badge badge-dot mr-4'>
                                <i className='bg-success' />
                                <span className='status'>completed</span>
                              </span>
                            </td>
                            <td>
                              <div className='avatar-group'>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Ryan Tompson'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-1.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Romina Hadid'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-2.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Alexander Smith'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-3.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Jessica Doe'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-4.jpg'
                                  />
                                </a>
                              </div>
                            </td>
                            <td>
                              <div className='d-flex align-items-center'>
                                <span className='completion mr-2'>100%</span>
                                <div>
                                  <div className='progress'>
                                    <div
                                      className='progress-bar bg-success'
                                      role='progressbar'
                                      aria-valuenow={100}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                      style={{ width: '100%' }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='text-right'>
                              <div className='dropdown'>
                                <a
                                  className='btn btn-sm btn-icon-only text-light'
                                  href='#'
                                  role='button'
                                  data-toggle='dropdown'
                                  aria-haspopup='true'
                                  aria-expanded='false'
                                >
                                  <i className='fas fa-ellipsis-v' />
                                </a>
                                <div className='dropdown-menu dropdown-menu-right dropdown-menu-arrow'>
                                  <a className='dropdown-item' href='#'>
                                    Action
                                  </a>
                                  <a className='dropdown-item' href='#'>
                                    Another action
                                  </a>
                                  <a className='dropdown-item' href='#'>
                                    Something else here
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope='row'>
                              <div className='media align-items-center'>
                                <a
                                  href='#'
                                  className='avatar rounded-circle mr-3'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/sketch.jpg'
                                  />
                                </a>
                                <div className='media-body'>
                                  <span className='name mb-0 text-sm'>
                                    Black Dashboard
                                  </span>
                                </div>
                              </div>
                            </th>
                            <td className='budget'>$3150 USD</td>
                            <td>
                              <span className='badge badge-dot mr-4'>
                                <i className='bg-danger' />
                                <span className='status'>delayed</span>
                              </span>
                            </td>
                            <td>
                              <div className='avatar-group'>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Ryan Tompson'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-1.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Romina Hadid'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-2.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Alexander Smith'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-3.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Jessica Doe'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-4.jpg'
                                  />
                                </a>
                              </div>
                            </td>
                            <td>
                              <div className='d-flex align-items-center'>
                                <span className='completion mr-2'>72%</span>
                                <div>
                                  <div className='progress'>
                                    <div
                                      className='progress-bar bg-danger'
                                      role='progressbar'
                                      aria-valuenow={72}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                      style={{ width: '72%' }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='text-right'>
                              <div className='dropdown'>
                                <a
                                  className='btn btn-sm btn-icon-only text-light'
                                  href='#'
                                  role='button'
                                  data-toggle='dropdown'
                                  aria-haspopup='true'
                                  aria-expanded='false'
                                >
                                  <i className='fas fa-ellipsis-v' />
                                </a>
                                <div className='dropdown-menu dropdown-menu-right dropdown-menu-arrow'>
                                  <a className='dropdown-item' href='#'>
                                    Action
                                  </a>
                                  <a className='dropdown-item' href='#'>
                                    Another action
                                  </a>
                                  <a className='dropdown-item' href='#'>
                                    Something else here
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope='row'>
                              <div className='media align-items-center'>
                                <a
                                  href='#'
                                  className='avatar rounded-circle mr-3'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/angular.jpg'
                                  />
                                </a>
                                <div className='media-body'>
                                  <span className='name mb-0 text-sm'>
                                    Angular Now UI Kit PRO
                                  </span>
                                </div>
                              </div>
                            </th>
                            <td className='budget'>$1800 USD</td>
                            <td>
                              <span className='badge badge-dot mr-4'>
                                <i className='bg-success' />
                                <span className='status'>completed</span>
                              </span>
                            </td>
                            <td>
                              <div className='avatar-group'>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Ryan Tompson'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-1.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Romina Hadid'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-2.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Alexander Smith'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-3.jpg'
                                  />
                                </a>
                                <a
                                  href='#'
                                  className='avatar avatar-sm rounded-circle'
                                  data-toggle='tooltip'
                                  data-original-title='Jessica Doe'
                                >
                                  <img
                                    alt='Image placeholder'
                                    src='../../assets/img/theme/team-4.jpg'
                                  />
                                </a>
                              </div>
                            </td>
                            <td>
                              <div className='d-flex align-items-center'>
                                <span className='completion mr-2'>100%</span>
                                <div>
                                  <div className='progress'>
                                    <div
                                      className='progress-bar bg-success'
                                      role='progressbar'
                                      aria-valuenow={100}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                      style={{ width: '100%' }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='text-right'>
                              <div className='dropdown'>
                                <a
                                  className='btn btn-sm btn-icon-only text-light'
                                  href='#'
                                  role='button'
                                  data-toggle='dropdown'
                                  aria-haspopup='true'
                                  aria-expanded='false'
                                >
                                  <i className='fas fa-ellipsis-v' />
                                </a>
                                <div className='dropdown-menu dropdown-menu-right dropdown-menu-arrow'>
                                  <a className='dropdown-item' href='#'>
                                    Action
                                  </a>
                                  <a className='dropdown-item' href='#'>
                                    Another action
                                  </a>
                                  <a className='dropdown-item' href='#'>
                                    Something else here
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className='card-deck'>
                <div className='card bg-gradient-default'>
                  <div className='card-body'>
                    <div className='mb-2'>
                      <sup className='text-white'>$</sup>{' '}
                      <span className='h2 text-white'>3,300</span>
                      <div className='text-light mt-2 text-sm'>
                        Your current balance
                      </div>
                      <div>
                        <span className='text-success font-weight-600'>
                          + 15%
                        </span>{' '}
                        <span className='text-light'>($250)</span>
                      </div>
                    </div>
                    <button className='btn btn-sm btn-block btn-neutral'>
                      Add credit
                    </button>
                  </div>
                  <div className='card-body'>
                    <div className='row'>
                      <div className='col'>
                        <small className='text-light'>Orders: 60%</small>
                        <div className='progress progress-xs my-2'>
                          <div
                            className='progress-bar bg-success'
                            style={{ width: '60%' }}
                          />
                        </div>
                      </div>
                      <div className='col'>
                        <small className='text-light'>Sales: 40%</small>
                        <div className='progress progress-xs my-2'>
                          <div
                            className='progress-bar bg-warning'
                            style={{ width: '40%' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Username card */}
                <div className='card bg-gradient-danger'>
                  {/* Card body */}
                  <div className='card-body'>
                    <div className='row justify-content-between align-items-center'>
                      <div className='col'>
                        <img
                          src='../../assets/img/icons/cards/bitcoin.png'
                          alt='Image placeholder'
                        />
                      </div>
                      <div className='col-auto'>
                        <span className='badge badge-lg badge-success'>
                          Active
                        </span>
                      </div>
                    </div>
                    <div className='my-4'>
                      <span className='h6 surtitle text-light'>Username</span>
                      <div className='h1 text-white'>@johnsnow</div>
                    </div>
                    <div className='row'>
                      <div className='col'>
                        <span className='h6 surtitle text-light'>Name</span>
                        <span className='d-block h3 text-white'>John Snow</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-8'>
              <div className='card'>
                <div className='card-header border-0'>
                  <div className='row align-items-center'>
                    <div className='col'>
                      <h3 className='mb-0'>Page visits</h3>
                    </div>
                    <div className='col text-right'>
                      <a href='#!' className='btn btn-sm btn-primary'>
                        See all
                      </a>
                    </div>
                  </div>
                </div>
                <div className='table-responsive'>
                  {/* Projects table */}
                  <table className='table align-items-center table-flush'>
                    <thead className='thead-light'>
                      <tr>
                        <th scope='col'>Page name</th>
                        <th scope='col'>Visitors</th>
                        <th scope='col'>Unique users</th>
                        <th scope='col'>Bounce rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope='row'>/argon/</th>
                        <td>4,569</td>
                        <td>340</td>
                        <td>
                          <i className='fas fa-arrow-up text-success mr-3' />{' '}
                          46,53%
                        </td>
                      </tr>
                      <tr>
                        <th scope='row'>/argon/index.html</th>
                        <td>3,985</td>
                        <td>319</td>
                        <td>
                          <i className='fas fa-arrow-down text-warning mr-3' />{' '}
                          46,53%
                        </td>
                      </tr>
                      <tr>
                        <th scope='row'>/argon/charts.html</th>
                        <td>3,513</td>
                        <td>294</td>
                        <td>
                          <i className='fas fa-arrow-down text-warning mr-3' />{' '}
                          36,49%
                        </td>
                      </tr>
                      <tr>
                        <th scope='row'>/argon/tables.html</th>
                        <td>2,050</td>
                        <td>147</td>
                        <td>
                          <i className='fas fa-arrow-up text-success mr-3' />{' '}
                          50,87%
                        </td>
                      </tr>
                      <tr>
                        <th scope='row'>/argon/profile.html</th>
                        <td>1,795</td>
                        <td>190</td>
                        <td>
                          <i className='fas fa-arrow-down text-danger mr-3' />{' '}
                          46,53%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className='col-xl-4'>
              <div className='card'>
                <div className='card-header border-0'>
                  <div className='row align-items-center'>
                    <div className='col'>
                      <h3 className='mb-0'>Social traffic</h3>
                    </div>
                    <div className='col text-right'>
                      <a href='#!' className='btn btn-sm btn-primary'>
                        See all
                      </a>
                    </div>
                  </div>
                </div>
                <div className='table-responsive'>
                  {/* Projects table */}
                  <table className='table align-items-center table-flush'>
                    <thead className='thead-light'>
                      <tr>
                        <th scope='col'>Referral</th>
                        <th scope='col'>Visitors</th>
                        <th scope='col' />
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope='row'>Facebook</th>
                        <td>1,480</td>
                        <td>
                          <div className='d-flex align-items-center'>
                            <span className='mr-2'>60%</span>
                            <div>
                              <div className='progress'>
                                <div
                                  className='progress-bar bg-gradient-danger'
                                  role='progressbar'
                                  aria-valuenow={60}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                  style={{ width: '60%' }}
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope='row'>Facebook</th>
                        <td>5,480</td>
                        <td>
                          <div className='d-flex align-items-center'>
                            <span className='mr-2'>70%</span>
                            <div>
                              <div className='progress'>
                                <div
                                  className='progress-bar bg-gradient-success'
                                  role='progressbar'
                                  aria-valuenow={70}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                  style={{ width: '70%' }}
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope='row'>Google</th>
                        <td>4,807</td>
                        <td>
                          <div className='d-flex align-items-center'>
                            <span className='mr-2'>80%</span>
                            <div>
                              <div className='progress'>
                                <div
                                  className='progress-bar bg-gradient-primary'
                                  role='progressbar'
                                  aria-valuenow={80}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                  style={{ width: '80%' }}
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope='row'>Instagram</th>
                        <td>3,678</td>
                        <td>
                          <div className='d-flex align-items-center'>
                            <span className='mr-2'>75%</span>
                            <div>
                              <div className='progress'>
                                <div
                                  className='progress-bar bg-gradient-info'
                                  role='progressbar'
                                  aria-valuenow={75}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                  style={{ width: '75%' }}
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope='row'>twitter</th>
                        <td>2,645</td>
                        <td>
                          <div className='d-flex align-items-center'>
                            <span className='mr-2'>30%</span>
                            <div>
                              <div className='progress'>
                                <div
                                  className='progress-bar bg-gradient-warning'
                                  role='progressbar'
                                  aria-valuenow={30}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                  style={{ width: '30%' }}
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Dashboard;
