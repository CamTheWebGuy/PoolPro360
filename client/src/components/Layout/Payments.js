import React, { Fragment, useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Formik } from 'formik';

import Alert from '../Layout/Alert';
import Sidebar from '../dashboard/Sidebar';
import Dashnav from '../dashboard/Dashnav';
import Footer from '../Layout/Footer';

import DatePicker from 'reactstrap-date-picker';

import { getAccountBalance, payoutSettings } from '../../actions/stripe';

import {
  getCustomers,
  resetCustomerLoading,
  updateBilling,
  updateRate
} from '../../actions/customer';

import {
  addPaymentMethod,
  updateBillingRate,
  pauseSubscription,
  addSubscription
} from '../../actions/stripe';

import { SpinnerCircular } from 'spinners-react';
import CreditCardInput from 'react-credit-card-input';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {
  Search,
  CSVExport
} from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';

import {
  Container,
  Row,
  Button,
  Card,
  Collapse,
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
  InputGroup,
  InputGroupAddon,
  InputGroupText,
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

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

const Payments = ({
  auth: { user, isAuthenticated, accountBalance },
  getAccountBalance,
  payoutSettings,
  getCustomers,
  updateBilling,
  addPaymentMethod,
  updateBillingRate,
  pauseSubscription,
  updateRate,
  addSubscription,
  customers: { customers, loading }
}) => {
  useEffect(() => {
    if (
      user &&
      isAuthenticated &&
      user.stripe_seller &&
      user.stripe_seller.charges_enabled
    ) {
      getAccountBalance();
    }
  }, [user, isAuthenticated, getAccountBalance]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

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

  const [detailsModal, setDetailsModal] = useState({
    isOpen: false,
    active: '',
    index: null
  });

  const [showPauseBilling, setShowPauseBilling] = useState(false);
  const [showSwitchManual, setShowSwitchManual] = useState(false);
  const [showPauseCancel, setShowPauseCancel] = useState(false);
  const [date, setDate] = useState(null);
  const [billingStart, setBillingStart] = useState(null);
  const [showEnableBilling, setShowEnableBilling] = useState(false);
  const [autobillingLoading, setAutobillingLoading] = useState(false);

  const [changeCard, setChangeCard] = useState(false);
  const [cardState, setCardState] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
    isLoading: false
  });

  const handleCardFocus = e => {
    setCardState({ ...cardState, focus: e.target.name });
  };

  const handleCardInput = e => {
    const { name, value } = e.target;

    setCardState({ ...cardState, [name]: value });
  };

  const pagination = paginationFactory({
    page: 1,
    alwaysShowAllBtns: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPageRenderer: ({
      options,
      currSizePerPage,
      onSizePerPageChange
    }) => (
      <div className='dataTables_length' id='datatable-basic_length'>
        <select
          name='datatable-basic_length'
          aria-controls='datatable-basic'
          className='form-control form-control-sm'
          style={{ width: '30%' }}
          onChange={e => onSizePerPageChange(e.target.value)}
        >
          <option value='10'>10</option>
          <option value='25'>25</option>
          <option value='50'>50</option>
          <option value='100'>100</option>
        </select>
      </div>
    )
  });

  const actionFormatter = cell => {
    return (
      <UncontrolledDropdown>
        <DropdownToggle
          className='btn-icon-only text-light'
          color=''
          role='button'
          size='sm'
        >
          <i className='fas fa-ellipsis-v' />
        </DropdownToggle>
        <DropdownMenu className='dropdown-menu-arrow' right>
          <DropdownItem
            onClick={e =>
              setDetailsModal({
                ...detailsModal,
                isOpen: !detailsModal.isOpen,
                active: cell,
                index: customers.findIndex(c => c._id === cell)
              })
            }
          >
            Manage Customer Billing
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  const nameFormatter = cell => {
    if (cell === undefined) {
      return <span></span>;
    } else {
      return (
        <span>
          {cell.first} {cell.last}
        </span>
      );
    }
  };

  const rateFormatter = cell => {
    if (cell === undefined) {
      return <span>N/A</span>;
    } else {
      return <span>${cell}.00</span>;
    }
  };

  const cardFormatter = cell => {
    if (cell === undefined) {
      return <Badge color='danger'>No Card On File</Badge>;
    } else {
      return <span>{cell}</span>;
    }
  };

  const statusFormatter = cell => {
    if (cell === undefined || cell === 'None') {
      return <Badge color='danger'>N/A</Badge>;
    } else if (cell === 'Paused') {
      return <Badge color='warning'>Paused</Badge>;
    } else if (cell === 'Canceled') {
      return <Badge color='danger'>Canceled</Badge>;
    } else {
      return <Badge color='success'>{cell}</Badge>;
    }
  };

  const billingFormatter = cell => {
    if (cell === 'Autobilling') {
      return <Badge color='success'>Autobilling</Badge>;
    } else {
      return <Badge color='info'>Manual Billing</Badge>;
    }
  };

  const columns = [
    {
      dataField: 'name',
      text: 'Name',
      formatter: nameFormatter,
      sort: true
    },
    {
      dataField: 'serviceAddress',
      text: 'Property',
      sort: true,
      hidden: true
    },
    {
      dataField: 'serviceRate',
      text: 'Service Rate',
      formatter: rateFormatter,
      sort: true
    },
    {
      dataField: 'billingFrequency',
      text: 'Frequency',
      sort: true
    },
    {
      dataField: 'stripeSubscriptionStatus',
      text: 'Sub. Status',
      formatter: statusFormatter,
      sort: true
    },
    {
      dataField: 'billingType',
      text: 'Billing Type',
      formatter: billingFormatter,
      sort: true
    },
    {
      dataField: '_id',
      text: 'Actions',
      formatter: actionFormatter
    }
  ];

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
                            Pending Payout:
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
                {/* <div className='col-xl-3 col-md-6'>
                  <div className='card card-stats'>
                
                    <div className='card-body'>
                      <div className='row'>
                        <div className='col'>
                          <h5 className='card-title text-uppercase text-muted mb-0'>
                            Paid Out:
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
                </div> */}

                <div className='col-xl-3 col-md-6'>
                  <Button
                    disabled={payoutLoading}
                    color='success'
                    onClick={handlePayoutSettings}
                  >
                    {payoutLoading ? (
                      <span>Processing...</span>
                    ) : (
                      <span>Payouts / Settings</span>
                    )}
                  </Button>
                </div>
              </Row>
            </div>
          </div>
        </div>

        <Modal
          isOpen={detailsModal.isOpen}
          toggle={e => {
            setDetailsModal({ ...detailsModal, isOpen: !detailsModal.isOpen });
          }}
        >
          <ModalHeader
            toggle={e => {
              setDetailsModal({
                ...detailsModal,
                isOpen: !detailsModal.isOpen
              });
            }}
          >
            Manage Service Details:
          </ModalHeader>
          <ModalBody>
            <Formik
              onSubmit={async data => {
                setDetailsModal({ ...detailsModal, isBillingLoading: true });
                if (
                  customers[detailsModal.index].paymentMethod &&
                  customers[detailsModal.index].paymentMethod !== 'N/A'
                ) {
                  await updateBillingRate(data, detailsModal.active);
                } else {
                  // Update the rate in the database only.
                  updateRate(detailsModal.active, data.rate);
                }
                setDetailsModal({ ...detailsModal, isBillingLoading: false });
              }}
              initialValues={{
                billingFrequency:
                  detailsModal.isOpen &&
                  customers[detailsModal.index].billingFrequency,
                rate:
                  detailsModal.isOpen &&
                  customers[detailsModal.index].serviceRate
              }}
              render={({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                touched
              }) => (
                <Fragment>
                  <Row>
                    <Col md='6'>
                      <FormGroup>
                        <Label className='form-control-label'>
                          Customer Name:
                        </Label>
                        <p>
                          {customers[detailsModal.index].firstName}{' '}
                          {customers[detailsModal.index].lastName}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <FormGroup>
                        <Label className='form-control-label'>Property:</Label>
                        <p>
                          {customers[detailsModal.index].serviceAddress},{' '}
                          {customers[detailsModal.index].serviceCity},{' '}
                          {customers[detailsModal.index].serviceState},{' '}
                          {customers[detailsModal.index].serviceZip}
                        </p>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md='12'>
                      <FormGroup>
                        <Label className='form-control-label'>
                          Billing Frequency:
                        </Label>
                        <Input
                          type='select'
                          name='billingFrequency'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.billingFrequency}
                        >
                          <option>Monthly</option>
                          <option>Weekly</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md='12'>
                      <FormGroup>
                        <Label className='form-control-label'>
                          Service Rate:
                        </Label>
                        <InputGroup>
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText>$</InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type='text'
                            name='rate'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.rate}
                          />
                          <InputGroupAddon addonType='append'>
                            <InputGroupText>.00</InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md='12'>
                      <Button
                        onClick={handleSubmit}
                        color='success'
                        disabled={detailsModal.isBillingLoading}
                        className='btn-icon'
                        block
                      >
                        {detailsModal.isBillingLoading ? (
                          <Fragment>
                            <SpinnerCircular
                              size={24}
                              thickness={180}
                              speed={100}
                              color='rgba(57, 125, 172, 1)'
                              secondaryColor='rgba(0, 0, 0, 0.44)'
                            />{' '}
                            Processing...
                          </Fragment>
                        ) : (
                          <Fragment>
                            <span class='btn-inner--icon'>
                              <i class='fas fa-save'></i>
                            </span>
                            <span class='btn-inner--text'>
                              Save Billing Changes
                            </span>
                          </Fragment>
                        )}
                      </Button>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col md='4'>
                      <FormGroup>
                        <Label className='form-control-label'>
                          Card On File:
                        </Label>
                        <br />
                        <Badge
                          color={
                            customers[detailsModal.index].paymentLast4
                              ? 'success'
                              : 'danger'
                          }
                        >
                          {customers[detailsModal.index].paymentLast4 ? (
                            <span>Yes</span>
                          ) : (
                            <span>No</span>
                          )}
                        </Badge>
                      </FormGroup>
                    </Col>

                    <Col md='4'>
                      <FormGroup>
                        <Label className='form-control-label'>
                          Last 4 Digits:
                        </Label>

                        <p>
                          {customers[detailsModal.index].paymentLast4
                            ? customers[detailsModal.index].paymentLast4
                            : 'N/A'}
                        </p>
                      </FormGroup>
                    </Col>

                    <Col md='4'>
                      <FormGroup>
                        <Label className='form-control-label'>EXP Date:</Label>

                        <p>
                          {customers[detailsModal.index].paymentExpDate
                            ? customers[detailsModal.index].paymentExpDate
                            : 'N/A'}
                        </p>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md='12'>
                      <FormGroup>
                        <Button
                          color='info'
                          className='btn-icon'
                          block
                          onClick={() => setChangeCard(!changeCard)}
                        >
                          <span class='btn-inner--icon'>
                            <i class='ni ni-credit-card'></i>
                          </span>
                          {customers[detailsModal.index].paymentLast4 ? (
                            <span class='btn-inner--text'>
                              Change Card On File
                            </span>
                          ) : (
                            <span class='btn-inner--text'>
                              Add Card On File
                            </span>
                          )}
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Collapse isOpen={changeCard}>
                      <Card>
                        <CardBody>
                          <Row>
                            <Col lg='12'>
                              <FormGroup>
                                <Cards
                                  cvc={cardState.cvc}
                                  expiry={cardState.expiry.replace(' / ', '')}
                                  focused={cardState.focus}
                                  name={cardState.name}
                                  number={cardState.number}
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>
                            <Col lg='12'>
                              <FormGroup>
                                <Label className='form-control-label'>
                                  Card Number
                                </Label>

                                <CreditCardInput
                                  cardNumberInputProps={{
                                    value: cardState.number,
                                    onChange: handleCardInput,
                                    onFocus: handleCardFocus,
                                    name: 'number'
                                  }}
                                  cardExpiryInputProps={{
                                    value: cardState.expiry,
                                    onChange: handleCardInput,
                                    onFocus: handleCardFocus,
                                    name: 'expiry'
                                  }}
                                  cardCVCInputProps={{
                                    value: cardState.cvc,
                                    onChange: handleCardInput,
                                    onFocus: handleCardFocus,
                                    name: 'cvc'
                                  }}
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>
                            <Col lg='12'>
                              <FormGroup>
                                <Label className='form-control-label'>
                                  Name On Card
                                </Label>
                                <Input
                                  type='text'
                                  name='name'
                                  placeholder='Name On Card'
                                  onChange={handleCardInput}
                                  onFocus={handleCardFocus}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Button
                              color='success'
                              className='btn-icon'
                              block
                              disabled={cardState.isLoading}
                              onClick={async e => {
                                setCardState({ ...cardState, isLoading: true });
                                await addPaymentMethod(
                                  cardState,
                                  detailsModal.active,
                                  null
                                );
                                await getCustomers();
                                setChangeCard(false);

                                setCardState({
                                  cvc: '',
                                  expiry: '',
                                  focus: '',
                                  name: '',
                                  number: '',
                                  isLoading: false
                                });
                              }}
                            >
                              {cardState.isLoading ? (
                                <Fragment>
                                  <SpinnerCircular
                                    size={24}
                                    thickness={180}
                                    speed={100}
                                    color='rgba(57, 125, 172, 1)'
                                    secondaryColor='rgba(0, 0, 0, 0.44)'
                                  />{' '}
                                  Processing...
                                </Fragment>
                              ) : (
                                <Fragment>
                                  <span class='btn-inner--icon'>
                                    <i class='fas fa-save'></i>
                                  </span>
                                  <span class='btn-inner--text'>
                                    Save Card To File
                                  </span>
                                </Fragment>
                              )}
                            </Button>
                          </Row>
                        </CardBody>
                      </Card>
                    </Collapse>
                  </Row>

                  <Row>
                    <Col md='12'>
                      {customers[detailsModal.index].paymentMethod &&
                        customers[detailsModal.index].stripeSubscriptionId &&
                        customers[detailsModal.index]
                          .stripeSubscriptionStatus !== 'None' &&
                        customers[detailsModal.index]
                          .stripeSubscriptionStatus !== 'Canceled' && (
                          <FormGroup>
                            <Button
                              color='warning'
                              className='btn-icon'
                              block
                              onClick={() => {
                                setShowPauseCancel(!showPauseCancel);
                              }}
                            >
                              <span class='btn-inner--icon'>
                                <i class='fas fa-pause'></i>
                              </span>
                              <span class='btn-inner--text'>
                                Pause/Cancel Autobilling
                              </span>
                            </Button>
                          </FormGroup>
                        )}

                      <Collapse isOpen={showPauseCancel}>
                        <Card>
                          <CardBody>
                            {!showPauseBilling && !showSwitchManual && (
                              <Fragment>
                                <Row>
                                  <Col sm='6'>
                                    <Card body>
                                      <CardTitle>Pause Autobilling</CardTitle>
                                      <CardText>
                                        Temporarily pause autobilling. (This
                                        will also pause service visits)
                                      </CardText>
                                      <Button
                                        color='primary'
                                        onClick={() =>
                                          setShowPauseBilling(true)
                                        }
                                      >
                                        Pause Autobilling
                                      </Button>
                                    </Card>
                                  </Col>
                                  <Col sm='6'>
                                    <Card body>
                                      <CardTitle>Cancel Autobilling</CardTitle>
                                      <CardText>
                                        Cancel AutoBilling. (This will set the
                                        customer to manual billing mode.)
                                      </CardText>
                                      <Button
                                        color='danger'
                                        onClick={() =>
                                          setShowSwitchManual(true)
                                        }
                                      >
                                        Switch To Manual
                                      </Button>
                                    </Card>
                                  </Col>
                                </Row>
                              </Fragment>
                            )}

                            {showPauseBilling && (
                              <Fragment>
                                <Row>
                                  <Col sm='12'>
                                    <h4 className='text-center'>
                                      Pause Autobilling:
                                    </h4>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col sm='12'>
                                    <Label className='form-control-label'>
                                      Pause Billing & Service Until:{' '}
                                    </Label>
                                    <p>
                                      <small>
                                        This customer will NOT be billed or
                                        shown in the route list until after the
                                        date selected below.
                                      </small>
                                    </p>
                                    <DatePicker
                                      value={date}
                                      onChange={value => {
                                        setDate(value);
                                      }}
                                    />
                                    <br />
                                    <Button
                                      color='success'
                                      block
                                      onClick={() => {
                                        if (date) {
                                          pauseSubscription(
                                            date,
                                            detailsModal.active
                                          );
                                        } else {
                                          return window.alert(
                                            'Please Provide a Date'
                                          );
                                        }
                                      }}
                                    >
                                      Confirm Pause Service & Billing
                                    </Button>
                                    <Button
                                      color='primary'
                                      onClick={() => setShowPauseBilling(false)}
                                      block
                                    >
                                      Go Back
                                    </Button>
                                  </Col>
                                </Row>
                              </Fragment>
                            )}

                            {showSwitchManual && (
                              <Fragment>
                                <Row>
                                  <Col sm='12'>
                                    <h4 className='text-center'>
                                      Cancel Autobilling:
                                    </h4>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col sm='12'>
                                    <Label className='form-control-label'>
                                      Switch To Manual Billing:{' '}
                                    </Label>
                                    <p>
                                      <small>
                                        This customer will be switched to manual
                                        billing. PoolPro360 will no longer
                                        handle any of the billing of this
                                        customer for you.
                                      </small>
                                    </p>

                                    <Button color='success' block>
                                      Confirm Switch to Manual Billing
                                    </Button>
                                    <Button
                                      color='primary'
                                      onClick={() => setShowSwitchManual(false)}
                                      block
                                    >
                                      Go Back
                                    </Button>
                                  </Col>
                                </Row>
                              </Fragment>
                            )}
                          </CardBody>
                        </Card>
                      </Collapse>

                      {customers[detailsModal.index]
                        .stripeSubscriptionStatus === 'None' && (
                        <FormGroup>
                          <Button
                            color='primary'
                            className='btn-icon'
                            onClick={() => {
                              if (
                                !customers[detailsModal.index].paymentMethod ||
                                customers[detailsModal.index].paymentMethod ===
                                  'N/A'
                              ) {
                                window.alert(
                                  'Must have a Payment Method on File to Enable AutoBilling'
                                );
                              } else {
                                setShowEnableBilling(!showEnableBilling);
                              }
                            }}
                            block
                          >
                            <span class='btn-inner--icon'>
                              <i class='fas fa-file-invoice'></i>
                            </span>
                            <span class='btn-inner--text'>
                              Enable AutoBilling
                            </span>
                          </Button>
                        </FormGroup>
                      )}

                      <Collapse isOpen={showEnableBilling}>
                        <Card>
                          <CardBody>
                            <h4 className='text-center'>Enable Autobilling:</h4>
                            <Label className='form-control-label'>
                              Collect first payment on:
                            </Label>
                            <DatePicker
                              value={billingStart}
                              onChange={value => {
                                setBillingStart(value);
                              }}
                            />
                            <br />
                            <Button
                              color='success'
                              disabled={autobillingLoading}
                              onClick={async () => {
                                setAutobillingLoading(true);
                                await addSubscription(
                                  billingStart,
                                  detailsModal.active
                                );

                                await getCustomers();
                                setShowEnableBilling(false);
                                setDetailsModal({
                                  ...detailsModal,
                                  isOpen: false
                                });
                                setAutobillingLoading(false);
                              }}
                              block
                            >
                              {autobillingLoading ? (
                                <span>
                                  <SpinnerCircular
                                    size={24}
                                    thickness={180}
                                    speed={100}
                                    color='rgba(57, 125, 172, 1)'
                                    secondaryColor='rgba(0, 0, 0, 0.44)'
                                  />{' '}
                                  Processing...
                                </span>
                              ) : (
                                <span>Turn On AutoBilling</span>
                              )}
                            </Button>
                          </CardBody>
                        </Card>
                      </Collapse>
                    </Col>
                  </Row>
                </Fragment>
              )}
            />
          </ModalBody>
        </Modal>

        <Container className='mgn-ng-top-60'>
          <Card>
            <CardHeader>
              <h3 className='mb-0'>My Customers</h3>
            </CardHeader>
            <CardBody>
              {loading ? (
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
                <ToolkitProvider
                  data={customers}
                  keyField='_id'
                  columns={columns}
                  search
                  exportCSV={{ fileName: 'PP360 | Customers.csv' }}
                >
                  {props => (
                    <div
                      className='py-4 table-responsive'
                      style={{ padding: '25px' }}
                    >
                      <div id='datatable-basic_filter' className='px-4 pb-1'>
                        <Row>
                          <Col md='6'>
                            <ExportCSVButton
                              className='buttons-copy buttons-html5 btn-sm'
                              {...props.csvProps}
                            >
                              <i className='ni ni-align-left-2'></i> Export CSV
                            </ExportCSVButton>
                          </Col>
                          <Col md={{ size: 'auto', offset: 3 }}>
                            <SearchBar
                              className='form-control-sm'
                              placeholder='Search Customers'
                              {...props.searchProps}
                            />
                          </Col>
                        </Row>
                      </div>

                      <BootstrapTable
                        {...props.baseProps}
                        bootstrap4={true}
                        pagination={pagination}
                        bordered={false}
                        wrapperClasses='table-responsive mh-330'
                      />
                    </div>
                  )}
                </ToolkitProvider>
              )}
            </CardBody>
          </Card>

          <Footer />
        </Container>
      </div>
    </Fragment>
  );
};

Payments.propTypes = {
  getCustomers: PropTypes.func.isRequired,
  resetCustomerLoading: PropTypes.func.isRequired,
  getAccountBalance: PropTypes.func.isRequired,
  payoutSettings: PropTypes.func.isRequired,
  updateBilling: PropTypes.func.isRequired,
  addPaymentMethod: PropTypes.func.isRequired,
  updateBillingRate: PropTypes.func.isRequired,
  pauseSubscription: PropTypes.func.isRequired,
  updateRate: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  customers: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  customers: state.customer
});

export default connect(mapStateToProps, {
  getCustomers,
  resetCustomerLoading,
  getAccountBalance,
  payoutSettings,
  updateBilling,
  addPaymentMethod,
  updateBillingRate,
  pauseSubscription,
  updateRate,
  addSubscription
})(Payments);
