import React, { Fragment, useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { Scrollbars } from 'react-custom-scrollbars';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import logo from '../../img/brand/logo.png';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

import $ from 'jquery';

$(document).ready(function() {
  $('.nav-link').on('click', function() {
    $('.collapse').removeClass('show');
    $('.nav-link').attr('aria-expanded', 'false');
  });
});

const Sidebar = ({ active, auth: { user, isAuthenticated, loading } }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  if (sidebarOpen) {
    if (window.innerWidth > 1199) {
      document.body.classList.add('g-sidenav-pinned');
      document.body.classList.add('g-sidenav-show');
    }
  } else {
    document.body.classList.remove('g-sidenav-pinned');
    document.body.classList.remove('g-sidenav-show');
  }

  useEffect(() => {
    if (active === 'routing') {
      setIsOpen(true);
    }
  }, []);

  return (
    <Fragment>
      {/* Sidenav */}
      <nav
        className='sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white'
        id='sidenav-main'
      >
        <Scrollbars
          autoHide
          // Hide delay in ms
          autoHideTimeout={1000}
          // Duration for hide animation in ms.
          autoHideDuration={200}
        >
          <div className='scrollbar-inner'>
            {/* Brand */}
            <div className='sidenav-header  d-flex  align-items-center'>
              <a
                className='navbar-brand'
                href='../../pages/dashboards/dashboard.html'
              >
                <img src={logo} className='navbar-brand-img' alt='...' />
              </a>
              <div className=' ml-auto '>
                {/* Sidenav toggler */}
                <div
                  className={`sidenav-toggler d-none d-xl-block-bak ${
                    sidebarOpen ? 'active' : ''
                  }`}
                  data-action='sidenav-unpin'
                  data-target='#sidenav-main'
                  onClick={e => {
                    setSidebarOpen(!sidebarOpen);
                  }}
                >
                  <div className='sidenav-toggler-inner'>
                    <i className='sidenav-toggler-line' />
                    <i className='sidenav-toggler-line' />
                    <i className='sidenav-toggler-line' />
                  </div>
                </div>
              </div>
            </div>
            <div className='navbar-inner'>
              {/* Collapse */}
              <div
                className='collapse navbar-collapse'
                id='sidenav-collapse-main'
              >
                {/* Nav items */}
                <ul className='navbar-nav'>
                  <li className='nav-item nav-ctrl'>
                    <Link
                      className={`nav-link ${
                        active === 'dashboard' ? 'active' : ''
                      }`}
                      to='/dashboard'
                      aria-controls='navbar-dashboards'
                    >
                      <i className='ni ni-shop text-primary' />
                      <span className='nav-link-text'>Dashboard</span>
                    </Link>
                  </li>
                  {isAuthenticated && !loading && user.role !== 'Technician' && (
                    <Fragment>
                      <li className='nav-item nav-ctrl'>
                        <Link
                          className={`nav-link ${
                            active === 'workorders' ? 'active' : ''
                          }`}
                          to='/work-orders'
                        >
                          <i className='ni ni-delivery-fast text-orange' />
                          <span className='nav-link-text'>Work Orders</span>
                        </Link>
                      </li>
                      <li className='nav-item nav-ctrl'>
                        <Link
                          className={`nav-link ${
                            active === 'customers' ? 'active' : ''
                          }`}
                          to='/customers'
                        >
                          <i className='ni ni-bullet-list-67 text-info' />
                          <span className='nav-link-text'>Customers</span>
                        </Link>
                      </li>
                      <li className='nav-item nav-ctrl'>
                        <Link
                          className={`nav-link ${
                            active === 'bookingforms' ? 'active' : ''
                          }`}
                          to='/booking-forms'
                        >
                          <i className='ni ni-single-copy-04 text-pink' />
                          <span className='nav-link-text'>Booking Forms</span>
                        </Link>{' '}
                      </li>
                      <li className='nav-item nav-ctrl'>
                        <Link
                          className={`nav-link ${
                            active === 'users' ? 'active' : ''
                          }`}
                          to='/users'
                        >
                          <i className='ni ni-circle-08 text-default' />
                          <span className='nav-link-text'>Users</span>
                        </Link>
                      </li>
                    </Fragment>
                  )}

                  {/* <li className='nav-item nav-ctrl'>
                    <Link
                      className={`nav-link ${
                        props.active === 'routing' ? 'active' : ''
                      }`}
                      to='/routing'
                    >
                      <i className='ni ni-square-pin text-primary' />
                      <span className='nav-link-text'>Routing</span>
                    </Link>
                  </li> */}
                  {isAuthenticated && !loading && user.role !== 'Technician' && (
                    <li className='nav-item'>
                      <div
                        className={`nav-link ${
                          active === 'routing' ? 'active' : ''
                        }`}
                        onClick={toggle}
                      >
                        <i className='ni ni-square-pin text-primary' />
                        <span className='nav-link-text'>Routing</span>
                        {isOpen ? (
                          <div className='mgn-left-50p'>
                            <i className='fas fa-chevron-up'></i>
                          </div>
                        ) : (
                          <div className='mgn-left-50p'>
                            <i className='fas fa-chevron-down'></i>
                          </div>
                        )}
                      </div>
                      <Collapse isOpen={isOpen}>
                        <ul className='nav nav-sm flex-column'>
                          <li className='nav-item nav-ctrl'>
                            <Link to='/routing/builder' className='nav-link'>
                              <span className='sidenav-normal'>
                                {' '}
                                <i className='fas fa-drafting-compass text-yellow mgn-right-5'></i>
                                {'  '}
                                Route Builder{' '}
                              </span>
                            </Link>
                          </li>
                          <li className='nav-item nav-ctrl'>
                            <Link to='/routing' className='nav-link'>
                              <span className='sidenav-normal'>
                                {' '}
                                <i className='fas fa-map-signs text-purple mgn-right-5'></i>{' '}
                                View Route{' '}
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </Collapse>
                    </li>
                  )}

                  {isAuthenticated && !loading && user.role === 'Technician' && (
                    <Fragment>
                      <li className='nav-item nav-ctrl'>
                        <Link
                          className={`nav-link ${
                            active === 'view-logs' ? 'active' : ''
                          }`}
                          to='/view-logs'
                        >
                          <i className='fas fa-clipboard-list text-green mgn-right-5'></i>{' '}
                          <span className='nav-link-text'>Service Logs</span>
                        </Link>
                      </li>

                      <li className='nav-item nav-ctrl'>
                        <Link
                          className={`nav-link ${
                            active === 'routing' ? 'active' : ''
                          }`}
                          to='/view-my-route'
                        >
                          <i className='fas fa-map-signs text-purple mgn-right-5'></i>{' '}
                          <span className='nav-link-text'>View Route</span>
                        </Link>
                      </li>
                    </Fragment>
                  )}
                  {isAuthenticated && !loading && user.role !== 'Technician' && (
                    <li className='nav-item nav-ctrl'>
                      <Link
                        className={`nav-link ${
                          active === 'payments' ? 'active' : ''
                        }`}
                        to='/payments'
                      >
                        <i className='ni ni-money-coins text-green' />
                        <span className='nav-link-text'>Payments/Billing</span>
                      </Link>
                    </li>
                  )}

                  <li className='nav-item nav-ctrl'>
                    <Link
                      className={`nav-link ${
                        active === 'settings' ? 'active' : ''
                      }`}
                      to='/account-settings'
                    >
                      <i className='ni ni-settings text-red' />
                      <span className='nav-link-text'>Settings</span>
                    </Link>
                  </li>
                </ul>
                {/* Divider */}
                <hr className='my-3' />
                {/* Heading */}
                <h6 className='navbar-heading p-0 text-muted'>
                  <span className='docs-normal'>Support</span>
                  <span className='docs-mini'>S</span>
                </h6>
                {/* Navigation */}
                <ul className='navbar-nav mb-md-3'>
                  <li className='nav-item nav-ctrl'>
                    <Link
                      className='nav-link'
                      to='https://demos.creative-tim.com/argon-dashboard-pro/docs/getting-started/overview.html'
                      target='_blank'
                    >
                      <i className='ni ni-spaceship' />
                      <span className='nav-link-text'>Video Guides</span>
                    </Link>
                  </li>
                  <li className='nav-item nav-ctrl'>
                    <Link
                      className='nav-link'
                      to='https://demos.creative-tim.com/argon-dashboard-pro/docs/foundation/colors.html'
                      target='_blank'
                    >
                      <i className='ni ni-chat-round' />
                      <span className='nav-link-text'>Contact Support</span>
                    </Link>
                  </li>{' '}
                </ul>
              </div>
            </div>
          </div>
        </Scrollbars>{' '}
      </nav>
    </Fragment>
  );
};

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Sidebar);
