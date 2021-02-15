import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Badge,
  Col,
  Row,
  Container,
  Input,
  Form,
  Label,
  FormGroup,
  ListGroupItem,
  ListGroup,
  Card,
  CardBody,
  CardHeader
} from 'reactstrap';

import { Link } from 'react-router-dom';

import Sidebar from '../dashboard/Sidebar';
import Dashnav from '../dashboard/Dashnav';
import Alert from '../Layout/Alert';
import Footer from '../Layout/Footer';

const ViewMyRoute = () => {
  return (
    <Fragment>
      <Sidebar active='routing' />
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
                        <Link to='/'>
                          <i className='fas fa-home' />
                        </Link>
                      </li>
                      <li className='breadcrumb-item'>
                        <Link to='/dashboard'>Dashboard</Link>
                      </li>
                      <li className='breadcrumb-item active'>
                        <Link to='/view-my-route'>View My Route</Link>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Stuff Here */}
        <Container className='mgn-ng-top-60'>
          <Card>
            <CardHeader>
              <h3 className='mb-0'>View My Route </h3>
            </CardHeader>
            <CardBody></CardBody>
          </Card>
        </Container>
      </div>
    </Fragment>
  );
};

export default ViewMyRoute;
