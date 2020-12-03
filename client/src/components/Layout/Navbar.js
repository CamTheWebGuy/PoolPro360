import React, { Fragment } from 'react';
import { Row, Col, Container, Button, Nav } from 'react-bootstrap';

import '../../../node_modules/jquery/dist/jquery.min.js';
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js';

import logo from '../../img/brand/white.png';
import mlogo from '../../img/brand/blue.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Fragment>
      <nav
        id='navbar-main'
        className='navbar navbar-horizontal navbar-main navbar-expand-lg navbar-dark bg-primary'
      >
        <div className='container'>
          <a className='navbar-brand' href='/'>
            <img src={logo} />
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbar-collapse'
            aria-controls='navbar-collapse'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div
            className='navbar-collapse navbar-custom-collapse collapse'
            id='navbar-collapse'
          >
            <div className='navbar-collapse-header'>
              <div className='row'>
                <div className='col-6 collapse-brand'>
                  <a href='/'>
                    <img src={mlogo} />
                  </a>
                </div>
                <div className='col-6 collapse-close'>
                  <button
                    type='button'
                    className='navbar-toggler'
                    data-toggle='collapse'
                    data-target='#navbar-collapse'
                    aria-controls='navbar-collapse'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                  >
                    <span></span>
                    <span></span>
                  </button>
                </div>
              </div>
            </div>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <a href='/pricing' className='nav-link'>
                  <span className='nav-link-inner--text'>Pricing</span>
                </a>
              </li>
              <li className='nav-item'>
                <Link to='/login' className='nav-link'>
                  <span className='nav-link-inner--text'>Login</span>
                </Link>
              </li>
              <li className='nav-item'>
                <a href='./pages/examples/register.html' className='nav-link'>
                  <span className='nav-link-inner--text'>Sign Up</span>
                </a>
              </li>
            </ul>
            <hr className='d-lg-none' />
            <ul className='navbar-nav align-items-lg-center ml-lg-auto'>
              <li className='nav-item'>
                <a
                  className='nav-link nav-link-icon'
                  href='https://www.facebook.com/creativetim'
                  target='_blank'
                  data-toggle='tooltip'
                  title=''
                  data-original-title='Like us on Facebook'
                >
                  <i className='fab fa-facebook-square'></i>
                  <span className='nav-link-inner--text d-lg-none'>
                    Facebook
                  </span>
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link nav-link-icon'
                  href='https://www.instagram.com/creativetimofficial'
                  target='_blank'
                  data-toggle='tooltip'
                  title=''
                  data-original-title='Follow us on Instagram'
                >
                  <i className='fab fa-instagram'></i>
                  <span className='nav-link-inner--text d-lg-none'>
                    Instagram
                  </span>
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link nav-link-icon'
                  href='https://twitter.com/creativetim'
                  target='_blank'
                  data-toggle='tooltip'
                  title=''
                  data-original-title='Follow us on Twitter'
                >
                  <i className='fab fa-twitter-square'></i>
                  <span className='nav-link-inner--text d-lg-none'>
                    Twitter
                  </span>
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link nav-link-icon'
                  href='https://github.com/creativetimofficial'
                  target='_blank'
                  data-toggle='tooltip'
                  title=''
                  data-original-title='Star us on Github'
                >
                  <i className='fab fa-github'></i>
                  <span className='nav-link-inner--text d-lg-none'>Github</span>
                </a>
              </li>
              <li className='nav-item d-none d-lg-block ml-lg-4'>
                <a
                  href='https://www.creative-tim.com/product/argon-dashboard-pro'
                  target='_blank'
                  className='btn btn-neutral btn-icon'
                >
                  <span className='btn-inner--icon'>
                    <i className='fas fa-user-plus mr-2'></i>
                  </span>
                  <span className='nav-link-inner--text'>Sign Up</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
