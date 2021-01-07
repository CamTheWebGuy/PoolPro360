import React, { useState, useEffect, Fragment } from 'react';

import { Link } from 'react-router-dom';

import {
  Container,
  Row,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
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

import axios from 'axios';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSingleCustomer } from '../../actions/customer';

import { SpinnerCircular } from 'spinners-react';

import Sidebar from '../dashboard/Sidebar';
import Dashnav from '../dashboard/Dashnav';
import Footer from '../Layout/Footer';

const DeleteCustomerImage = ({
  getSingleCustomer,
  customer: { customer, singleLoading },
  match
}) => {
  useEffect(() => {
    getSingleCustomer(match.params.id);
  }, [getSingleCustomer, match.params.id]);

  const [loadingDeleteImage, setLoadingDeleteImage] = useState(false);
  return (
    <Fragment>
      <Sidebar active='customers' />
      <div className='main-content' id='panel'>
        <Dashnav />
        <div className='header bg-primary pb-6'>
          <div className='container-fluid'>
            <div className='header-body'>
              <div className='row align-items-center py-4'>
                <div className='col-lg-12 col-12'>
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
                      <li className='breadcrumb-item'>
                        <Link to='/customers'>Customers</Link>
                      </li>
                      <li className='breadcrumb-item'>
                        <Link to={`/customers/${match.params.id}`}>
                          {match.params.id}
                        </Link>
                      </li>
                      <li className='breadcrumb-item active'>
                        <Link to={`/customers/${match.params.id}/deleteImage`}>
                          Delete Customer Image
                        </Link>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Container className='mgn-ng-top-60'>
          <Card>
            <CardHeader>
              {' '}
              <div className='row align-items-center'>
                <div className='col-8'>
                  <h3 className='mb-0'>Delete Customer Image(s)</h3>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              {!customer || singleLoading ? (
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
                <Row>
                  {/* <img
                  src='https://di2ponv0v5otw.cloudfront.net/posts/2019/10/22/5daf2816edb3b7766f83f1af/s_5daf2819edb3b7766f83f1b7.jpg'
                  alt=''
                /> */}
                  {customer[0].images.map(image => (
                    <Fragment key={image._id}>
                      <Col lg='auto' className='mgn-btm-50'>
                        {' '}
                        <img
                          src={image.url}
                          className='max-width-250 max-height-127 mgn-btm-10'
                        />
                        <div className='text-center'>
                          <Button
                            color='danger'
                            onClick={async e => {
                              setLoadingDeleteImage(true);
                              const config = {
                                headers: {
                                  'Content-Type': 'application/json'
                                }
                              };
                              const s3Object = image.url.split('poolpro360/');

                              const s3ObjectId = s3Object[1];

                              const body = JSON.stringify({
                                objectId: image._id,
                                s3Object: s3ObjectId
                              });
                              await axios.post(
                                `/api/customers/${match.params.id}/deleteImage`,
                                body,
                                config
                              );
                              setLoadingDeleteImage(false);
                              await getSingleCustomer(match.params.id);
                            }}
                          >
                            {loadingDeleteImage ? (
                              <span>Processing...</span>
                            ) : (
                              <span>Delete Image</span>
                            )}
                          </Button>
                        </div>
                      </Col>
                    </Fragment>
                  ))}
                </Row>
              )}
            </CardBody>
          </Card>

          <Footer />
        </Container>
      </div>
    </Fragment>
  );
};

DeleteCustomerImage.propTypes = {
  getSingleCustomer: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  customer: state.customer.singleCustomer
});

export default connect(mapStateToProps, { getSingleCustomer })(
  DeleteCustomerImage
);
