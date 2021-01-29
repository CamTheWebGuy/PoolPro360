import React, { Fragment, useEffect } from 'react';

import { Link } from 'react-router-dom';

import {
  Container,
  Row,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  ListGroup,
  ListGroupItem,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  Input,
  FormGroup,
  Badge
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SpinnerCircular } from 'spinners-react';
import {
  getSingleEmployee,
  getEmployeeCustomers
} from '../../actions/employee';

import Sidebar from '../dashboard/Sidebar';
import Dashnav from '../dashboard/Dashnav';
import Alert from '../Layout/Alert';
import Footer from '../Layout/Footer';

const ViewUser = ({
  getSingleEmployee,
  getEmployeeCustomers,
  employee,
  customers: { customers, loading },
  match
}) => {
  useEffect(() => {
    getSingleEmployee(match.params.id);
    getEmployeeCustomers(match.params.id);
  }, [getSingleEmployee]);

  return (
    <Fragment>
      <Sidebar active='users' />
      <div className='main-content' id='panel'>
        <Dashnav />
        <Alert />
        <div
          className='header pb-6 d-flex align-items-center'
          style={{
            minHeight: '500px',
            backgroundImage:
              'url(https://www.lathampool.com/wp-content/uploads/2020/01/bh-header.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top'
          }}
        >
          {/* Mask */}
          <span className='mask bg-gradient-default opacity-8' />
          {/* Header container */}
          <div className='container-fluid d-flex align-items-center'>
            <div className='row'>
              <div className='col-md-12'>
                {!employee[0] ? (
                  <Fragment>
                    <div className='text-center'>
                      <h4>Loading Data...</h4>
                      <SpinnerCircular
                        size={54}
                        thickness={180}
                        speed={100}
                        color='rgba(57, 125, 172, 1)'
                        secondaryColor='rgba(0, 0, 0, 0.44)'
                      />
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <h1 className='display-2 text-white mb-0'>
                      {employee[0].firstName} {employee[0].lastName}
                    </h1>
                    <p className='text-white mt-0 mb-5'>
                      {employee[0].email}
                      <br />
                      <Badge color='success'>
                        <strong>{employee[0].role}</strong>
                      </Badge>{' '}
                      <br />
                    </p>
                  </Fragment>
                )}

                <Link
                  to={`/users/${match.params.id}/edit`}
                  className='btn btn-neutral mb-4'
                >
                  Edit User Information
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Container className='mgn-ng-top-60'>
          <Row>
            <Col md='6'>
              <Card>
                <CardHeader>
                  <h3 className='mb-0'>User Information </h3>
                </CardHeader>
                <CardBody>
                  {!employee || !employee[0] ? (
                    <div className='text-center'>
                      <h4>Loading Data...</h4>
                      <SpinnerCircular
                        size={54}
                        thickness={180}
                        speed={100}
                        color='rgba(57, 125, 172, 1)'
                        secondaryColor='rgba(0, 0, 0, 0.44)'
                      />
                    </div>
                  ) : (
                    <Fragment>
                      <Row>
                        <Col md='6'>
                          <div className='form-control-label'>First name</div>
                          {employee[0].firstName}
                        </Col>
                        <Col md='6'>
                          <div className='form-control-label'>Last name</div>
                          {employee[0].lastName}
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col md='6'>
                          <div className='form-control-label'>Email</div>
                          {employee[0].email}
                        </Col>
                        <Col md='6'>
                          <div className='form-control-label'>Phone</div>
                          {employee[0].phone}
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col md='12'>
                          <div className='form-control-label'>Role</div>
                          {employee[0].role}
                        </Col>
                      </Row>
                    </Fragment>
                  )}
                </CardBody>
              </Card>
            </Col>
            <Col md='6'>
              <Card>
                <CardHeader>
                  <h3 className='mb-0'>Assigned Customers</h3>
                </CardHeader>
                <CardBody>
                  {!customers || !customers.length >= 1 ? (
                    <Fragment>
                      <div className='text-center'>
                        <i className='fas fa-exclamation-circle'></i>
                        <h3>No Customers Assigned</h3>
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      {customers.map(customer => (
                        <ListGroup key={customer._id}>
                          <ListGroupItem>
                            <Link to={`/customers/${customer._id}`}>
                              {customer.firstName} {customer.lastName} <br />
                              <small>
                                {customer.serviceAddress},{' '}
                                {customer.serviceCity}, {customer.serviceState}{' '}
                                {customer.serviceZip}
                              </small>
                            </Link>
                          </ListGroupItem>
                        </ListGroup>
                      ))}
                    </Fragment>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Footer />
        </Container>
      </div>
    </Fragment>
  );
};

ViewUser.propTypes = {
  getSingleEmployee: PropTypes.func.isRequired,
  getEmployeeCustomers: PropTypes.func.isRequired,
  employee: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  employee: state.employee.singleEmployee,
  customers: state.customer
});

export default connect(mapStateToProps, {
  getSingleEmployee,
  getEmployeeCustomers
})(ViewUser);
