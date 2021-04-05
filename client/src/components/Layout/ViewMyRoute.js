import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Badge,
  Collapse,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  UncontrolledDropdown,
  Media,
  Progress,
  Table,
  Tooltip,
  Container,
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader
} from 'reactstrap';

import { getEmployeeRoute, getEmployeeRouteRB } from '../../actions/employee';
import {
  addServiceLog,
  getChecklist,
  getCustomerServiceNotes,
  sendServiceReport,
  unableService,
  getWorkOrders,
  completeWorkOrder
} from '../../actions/customer';

import { SpinnerCircular } from 'spinners-react';

import { Link } from 'react-router-dom';

import RouteViewerCards from '../Layout/RouteViewerCards';
import RouteViewer from '../Layout/RouteViewer';
import Sidebar from '../dashboard/Sidebar';
import Dashnav from '../dashboard/Dashnav';
import Alert from '../Layout/Alert';
import Footer from '../Layout/Footer';

import { Formik } from 'formik';
import * as Yup from 'yup';

import axios from 'axios';

import moment from 'moment';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {
  Search,
  CSVExport
} from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ImageUploader from 'react-images-upload';

const ViewMyRoute = ({
  auth: { user, isAuthenticated, loading, token },
  addServiceLog,
  getChecklist,
  getCustomerServiceNotes,
  getEmployeeRoute,
  sendServiceReport,
  unableService,
  getWorkOrders,
  completeWorkOrder,
  getEmployeeRouteRB,
  customers: { checklist, serviceNotes, routeList, workOrders }
}) => {
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
              {isAuthenticated && (
                <div className='row'>
                  {!loading && token && user.role !== 'Technician' && (
                    <RouteViewerCards />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Stuff Here */}
        <Container className='mgn-ng-top-60'>
          <RouteViewer />
          <Footer />
        </Container>
      </div>
    </Fragment>
  );
};

ViewMyRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  addServiceLog: PropTypes.func.isRequired,
  getChecklist: PropTypes.func.isRequired,
  getCustomerServiceNotes: PropTypes.func.isRequired,
  getEmployeeRoute: PropTypes.func.isRequired,
  sendServiceReport: PropTypes.func.isRequired,
  unableService: PropTypes.func.isRequired,
  getWorkOrders: PropTypes.func.isRequired,
  completeWorkOrder: PropTypes.func.isRequired,
  getEmployeeRouteRB: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  customers: state.customer
});

export default connect(mapStateToProps, {
  addServiceLog,
  getChecklist,
  getCustomerServiceNotes,
  getEmployeeRoute,
  sendServiceReport,
  unableService,
  getWorkOrders,
  completeWorkOrder,
  getEmployeeRouteRB
})(ViewMyRoute);
