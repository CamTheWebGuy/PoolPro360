import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../../actions/auth';

import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import Alert from '../Layout/Alert';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    console.log('FIRED');
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Navbar />
      <Alert />

      <div className='main-content' style={{ background: '#172b4d' }}>
        <div className='header bg-gradient-primary py-7 py-lg-8 pt-lg-9'>
          <div className='container'>
            <div className='header-body text-center mb-7'>
              <div className='row justify-content-center'>
                <div className='col-xl-5 col-lg-6 col-md-8 px-5'>
                  <h1 className='text-white'>Welcome Back!</h1>
                  <p className='text-lead text-white'>
                    Sign into your PoolPro360 account below.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='separator separator-bottom separator-skew zindex-100'>
            <svg
              x='0'
              y='0'
              viewBox='0 0 2560 100'
              preserveAspectRatio='none'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
            >
              <polygon
                className='fill-default'
                points='2560 0 2560 100 0 100'
              ></polygon>
            </svg>
          </div>
        </div>

        <div className='container mt--8 pb-5'>
          <div className='row justify-content-center'>
            <div className='col-lg-5 col-md-7'>
              <div className='card bg-secondary border-0 mb-0'>
                <div className='card-body px-lg-5 py-lg-5'>
                  <div className='text-center text-muted mb-4'>
                    <small>Sign in with credentials:</small>
                  </div>
                  <form role='form' onSubmit={onSubmit}>
                    <div className='form-group mb-3'>
                      <div className='input-group input-group-merge input-group-alternative'>
                        <div className='input-group-prepend'>
                          <span className='input-group-text'>
                            <i className='ni ni-email-83'></i>
                          </span>
                        </div>
                        <input
                          className='form-control'
                          placeholder='Email'
                          type='email'
                          onChange={e => onChange(e)}
                          name='email'
                          value={email}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <div className='input-group input-group-merge input-group-alternative'>
                        <div className='input-group-prepend'>
                          <span className='input-group-text'>
                            <i className='ni ni-lock-circle-open'></i>
                          </span>
                        </div>
                        <input
                          className='form-control'
                          placeholder='Password'
                          type='password'
                          onChange={e => onChange(e)}
                          name='password'
                          value={password}
                        />
                      </div>
                    </div>
                    <div className='custom-control custom-control-alternative custom-checkbox'>
                      <input
                        className='custom-control-input'
                        id=' customCheckLogin'
                        type='checkbox'
                      />
                      <label
                        className='custom-control-label'
                        htmlFor=' customCheckLogin'
                      >
                        <span className='text-muted'>Remember me</span>
                      </label>
                    </div>
                    <div className='text-center'>
                      <button
                        type='button'
                        type='submit'
                        className='btn btn-primary my-4'
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className='row mt-3'>
                <div className='col-6'>
                  <a href='#' className='text-light'>
                    <small>Forgot password?</small>
                  </a>
                </div>
                <div className='col-6 text-right'>
                  <a href='#' className='text-light'>
                    <small>Create new account</small>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer cssClass='footer-dark' />
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
