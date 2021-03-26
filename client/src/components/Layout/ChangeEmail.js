import React, { Fragment, useState, useEffect, useRef } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { useHistory } from 'react-router-dom';

import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import Alert from '../Layout/Alert';

import { updateMyEmail } from '../../actions/user';

import {
  Button,
  Input,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';

const ChangeEmail = ({ updateMyEmail, match }) => {
  const formSchema = Yup.object().shape({
    currentEmail: Yup.string()
      .email('Please enter a valid email')
      .required('Please enter your current email'),
    newEmail: Yup.string()
      .email('Please enter a valid email')
      .required('Please enter a new email'),
    confirmEmail: Yup.string()
      .email('Please enter a valid email')
      .oneOf([Yup.ref('newEmail')], 'Emails do not match')
      .required('Please confirm your email')
  });

  const history = useHistory();

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
                  <h1 className='text-white'>Change Email</h1>
                  <p className='text-lead text-white'>
                    Enter Your Current & New Email Below.
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
                    <small>Enter Your Information:</small>
                  </div>

                  <Formik
                    initialValues={{
                      currentEmail: '',
                      newEmail: '',
                      confirmEmail: ''
                    }}
                    validationSchema={formSchema}
                    onSubmit={async data => {
                      await updateMyEmail(data, match.params.token);
                      history.push('/dashboard');
                    }}
                    render={({
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      values,
                      errors,
                      touched
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType='prepend'>
                              <InputGroupText>
                                <i className='ni ni-email-83'></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder='Current Email'
                              type='email'
                              name='currentEmail'
                              value={values.currentEmail}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </InputGroup>
                          {errors.currentEmail && touched.currentEmail && (
                            <p className='color-red'>{errors.currentEmail}</p>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType='prepend'>
                              <InputGroupText>
                                <i className='ni ni-email-83'></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder='New Email'
                              type='email'
                              name='newEmail'
                              value={values.newEmail}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </InputGroup>
                          {errors.newEmail && touched.newEmail && (
                            <p className='color-red'>{errors.newEmail}</p>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType='prepend'>
                              <InputGroupText>
                                <i className='ni ni-email-83'></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder='Confirm New Email'
                              type='email'
                              name='confirmEmail'
                              value={values.confirmEmail}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </InputGroup>
                          {errors.confirmEmail && touched.confirmEmail && (
                            <p className='color-red'>{errors.confirmEmail}</p>
                          )}
                        </FormGroup>
                        <div className='text-center'>
                          <Button type='submit' color='primary'>
                            Save Changes
                          </Button>
                        </div>
                      </Form>
                    )}
                  />
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

ChangeEmail.propTypes = {
  updateMyEmail: PropTypes.func.isRequired
};

export default connect(null, { updateMyEmail })(ChangeEmail);
