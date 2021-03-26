import React, { Fragment, useState, useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';

import userImg from '../../img/theme/team-1.jpg';
import userImg2 from '../../img/theme/team-2.jpg';
import userImg3 from '../../img/theme/team-3.jpg';

import $ from 'jquery';

const Dashnav = ({ logout, auth: { user, isAuthenticated, loading } }) => {
  useEffect(() => {
    if (window.innerWidth < 1200) {
      $('.main-content').click(function(event) {
        document.body.classList.remove('g-sidenav-pinned');
        document.body.classList.remove('g-sidenav-show');
      });
      $('.nav-ctrl').click(function(event) {
        document.body.classList.remove('g-sidenav-pinned');
        document.body.classList.remove('g-sidenav-show');
      });
    }
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navHandler = e => {
    setSidebarOpen(!sidebarOpen);
    e.stopPropagation();
    if (sidebarOpen) {
      document.body.classList.add('g-sidenav-pinned');
      document.body.classList.add('g-sidenav-show');
    } else {
      document.body.classList.remove('g-sidenav-pinned');
      document.body.classList.remove('g-sidenav-show');
    }
  };

  return (
    <Fragment>
      <nav className='navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom'>
        <div className='container-fluid'>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
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
                    placeholder='Search Customers...'
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
                <span aria-hidden={true}>×</span>
              </button>
            </form>
            {/* Navbar links */}
            <ul className='navbar-nav align-items-center  ml-md-auto '>
              <li className='nav-item d-xl-none' onClick={e => navHandler(e)}>
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
                  aria-haspopup={true}
                  aria-expanded={false}
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
                  aria-haspopup={true}
                  aria-expanded={false}
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
                  aria-haspopup={true}
                  aria-expanded={false}
                >
                  <div className='media align-items-center'>
                    <span className='avatar avatar-sm rounded-circle'>
                      <img alt='Image placeholder' src={userImg} />
                    </span>
                    <div className='media-body  ml-2  d-none d-lg-block'>
                      <span className='mb-0 text-sm  font-weight-bold'>
                        {!loading && isAuthenticated && user ? (
                          <Fragment>
                            {user.firstName} {user.lastName}
                          </Fragment>
                        ) : (
                          <span>Account</span>
                        )}
                      </span>
                    </div>
                  </div>
                </a>
                <div className='dropdown-menu  dropdown-menu-right '>
                  <div className='dropdown-header noti-title'>
                    <h6 className='text-overflow m-0'>Welcome!</h6>
                  </div>

                  <Link to='/account-settings' className='dropdown-item'>
                    <i className='ni ni-settings-gear-65' />
                    <span>Settings</span>
                  </Link>

                  <a href='#!' className='dropdown-item'>
                    <i className='ni ni-support-16' />
                    <span>Support</span>
                  </a>
                  <div className='dropdown-divider' />
                  <Link to='#!' className='dropdown-item' onClick={logout}>
                    <i className='ni ni-user-run' />
                    <span>Logout</span>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

Dashnav.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Dashnav);
