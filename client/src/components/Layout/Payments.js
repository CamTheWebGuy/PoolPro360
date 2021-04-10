import React, { Fragment, useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Alert from '../Layout/Alert';
import Sidebar from '../dashboard/Sidebar';
import Dashnav from '../dashboard/Dashnav';
import Footer from '../Layout/Footer';

import { getAccountBalance, payoutSettings } from '../../actions/stripe';

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
  Badge,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardText,
  CardTitle
} from 'reactstrap';

const Payments = ({
  auth: { user, isAuthenticated, accountBalance },
  getAccountBalance,
  payoutSettings
}) => {
  useEffect(() => {
    if (user && isAuthenticated && user.stripe_seller.charges_enabled) {
      getAccountBalance();
    }
  }, [user, isAuthenticated, getAccountBalance]);

  const currencyFormatter = data => {
    return (data.amount / 100).toLocaleString(data.currency, {
      style: 'currency',
      currency: data.currency
    });
  };

  const [payoutLoading, setPayoutLoading] = useState(false);

  const handlePayoutSettings = async () => {
    setPayoutLoading(true);
    await payoutSettings();
    setPayoutLoading(false);
  };

  return (
    <Fragment>
      <Alert />
      <Sidebar active='payments' />
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
                      <li className='breadcrumb-item active'>
                        <Link to='/account-settings'>Payments / Billing</Link>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              <Row>
                <div className='col-xl-3 col-md-6'>
                  <div className='card card-stats'>
                    {/* Card body */}
                    <div className='card-body'>
                      <div className='row'>
                        <div className='col'>
                          <h5 className='card-title text-uppercase text-muted mb-0'>
                            Available Balance:
                          </h5>
                          <span className='h2 font-weight-bold mb-0'>
                            {accountBalance &&
                              accountBalance.pending &&
                              accountBalance.pending.map((bp, i) => (
                                <span key={i}>{currencyFormatter(bp)}</span>
                              ))}
                          </span>
                        </div>
                        <div className='col-auto'>
                          <div className='icon icon-shape bg-gradient-red text-white rounded-circle shadow'>
                            <i className='ni ni-active-40' />
                          </div>
                        </div>
                      </div>
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
                            Pending Balance:
                          </h5>
                          <span className='h2 font-weight-bold mb-0'>
                            $45.97
                          </span>
                        </div>
                        <div className='col-auto'>
                          <div className='icon icon-shape bg-gradient-orange text-white rounded-circle shadow'>
                            <i className='ni ni-chart-pie-35' />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-xl-3 col-md-6'>
                  <Button
                    disabled={payoutLoading}
                    color='success'
                    onClick={handlePayoutSettings}
                  >
                    {payoutLoading ? (
                      <span>Processing...</span>
                    ) : (
                      <span>Manage Settings</span>
                    )}
                  </Button>
                </div>
              </Row>
            </div>
          </div>
        </div>
        <Container className='mgn-ng-top-60'>
          <Footer />
        </Container>
      </div>
    </Fragment>
  );
};

Payments.propTypes = {
  getAccountBalance: PropTypes.func.isRequired,
  payoutSettings: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { getAccountBalance, payoutSettings })(
  Payments
);
