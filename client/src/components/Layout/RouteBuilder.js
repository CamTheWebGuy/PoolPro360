import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import Sidebar from '../dashboard/Sidebar';
import Dashnav from '../dashboard/Dashnav';
import Alert from '../Layout/Alert';
import Footer from '../Layout/Footer';

import { Link } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';

import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  DirectionsService,
  Polyline
} from '@react-google-maps/api';

import MapDirectionsRenderer from './MapDirectionsRenderer';

import {
  getEmployees,
  getEmployeeCustomers,
  getEmployeeRoute
} from '../../actions/employee';

import {
  setSchedule,
  unschedule,
  updateRouteOrder,
  getCustomersRB,
  optimizeRoute,
  clearCustomers,
  updateFrequency,
  updateTech
} from '../../actions/customer';

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

const containerStyle = {
  width: '100%',
  height: '400px'
};

const RouteBuilder = ({
  clearCustomers,
  updateFrequency,
  getEmployees,
  getEmployeeCustomers,
  setSchedule,
  unschedule,
  getEmployeeRoute,
  updateRouteOrder,
  getCustomersRB,
  optimizeRoute,
  updateTech,
  mapRedux: { legs },
  employees: { employees },
  customers: { customers, loading, routeList, allCustomers }
}) => {
  useEffect(() => {
    clearCustomers();
    getEmployees();
    getCustomersRB();
  }, [clearCustomers, getEmployees, getCustomersRB]);

  const [selectedTech, setSelectedTech] = useState(null);
  const [dateSelected, setDateSelected] = useState('Monday');
  const [customerRouteList, updateCustomerRouteList] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [map, setMap] = useState(null);
  const [routedCustomers, updateRoutedCustomers] = useState(null);

  const onTechChange = async e => {
    setIsProcessing(true);
    setSelectedTech(e.target.value);
    await getEmployeeCustomers(e.target.value);
    await getEmployeeRoute(e.target.value, dateSelected);
    setIsProcessing(false);
  };

  const onChangeDay = async e => {
    setIsProcessing(true);
    setDateSelected(e.target.value);
    await getEmployeeRoute(selectedTech, e.target.value);
    setIsProcessing(false);
  };

  const addToRoute = async e => {
    setIsProcessing(true);
    await setSchedule(e, selectedTech, dateSelected);
    await getEmployeeCustomers(selectedTech);
    await getEmployeeRoute(selectedTech, dateSelected);
    setIsProcessing(false);
  };

  const removeFromRoute = async e => {
    setIsProcessing(true);
    await unschedule(e);
    await getEmployeeCustomers(selectedTech);
    await getEmployeeRoute(selectedTech, dateSelected);
    setIsProcessing(false);
  };

  const [mapCenterPoint, setMapCenterPoint] = useState(null);

  useEffect(() => {
    if (!loading && customers[0]) {
      getEmployeeRoute(selectedTech, dateSelected);
      setMapCenterPoint({
        lat: parseFloat(customers[0].serviceLat),
        lng: parseFloat(customers[0].serviceLng)
      });
      // const list = customers.filter(customer => customer.isScheduled === true);
      // updateRoutedCustomers(list);
      // console.log(list);
    }
  }, [customers]);

  const [mapCenterPointNC, setMapCenterPointNC] = useState(null);

  useEffect(() => {
    if (allCustomers[0]) {
      setMapCenterPointNC({
        lat: parseFloat(allCustomers[0].serviceLat),
        lng: parseFloat(allCustomers[0].serviceLng)
      });
    }
  }, [allCustomers]);

  useEffect(() => {
    if (!loading) {
      updateCustomerRouteList(Array.from(routeList, x => x.customer));
      updateRoutedCustomers(Array.from(routeList, x => x.customer));
      // updateRoutedCustomers(routeList);
    }
  }, [routeList]);

  const handleOnDragEnd = async result => {
    const items = Array.from(customerRouteList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateCustomerRouteList(items);
    setIsProcessing(true);
    await updateRouteOrder(selectedTech, dateSelected, items);
    await getEmployeeRoute(selectedTech, dateSelected);
    setIsProcessing(false);
  };

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const [infoIsOpen, setInfoIsOpen] = useState({
    isOpen: false,
    active: null
  });

  const onToggleOpen = customer => {
    setInfoIsOpen({
      isOpen: !infoIsOpen.isOpen,
      active: customer
    });
  };

  let totalDistance = 0;
  let totalDuration = 0;
  let METERS_TO_MILES = 0.000621371192;

  const calculateTotalDistance = () => {
    for (var i = 0; i < legs.length; ++i) {
      totalDistance += legs[i].distance.value;
      totalDuration += legs[i].duration.value;
    }

    totalDistance = Math.round(totalDistance * METERS_TO_MILES * 10) / 10;
    totalDuration = Math.round(totalDuration / 60);

    // setTotals({
    //   totalDistance,
    //   totalDuration
    // });
  };

  calculateTotalDistance();

  const [frequency, setFrequency] = useState({
    customer: null,
    freq: null
  });

  const onFreqChange = async (customerId, freq) => {
    setFrequency({
      customer: customerId,
      freq: freq
    });
    updateFrequency(customerId, freq);
  };

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
                      <li className='breadcrumb-item'>
                        <Link to='/routing'>Routing</Link>
                      </li>
                      <li className='breadcrumb-item active'>
                        <Link to='/routing/builder'>Route Builder</Link>
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
              <h3 className='mb-0'>Route Builder </h3>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md='4'>
                  {totalDistance && (
                    <h5>Total Distance: {totalDistance} miles</h5>
                  )}
                  {totalDuration && (
                    <h5>Total Duration: {totalDuration} minutes</h5>
                  )}
                </Col>
                {/* <Col>
                  {' '}
                  <p>
                    Routing Type:{' '}
                    {routeList.isOptimized ? (
                      <span>Optimized</span>
                    ) : (
                      <span>Manual</span>
                    )}
                  </p>
                </Col> */}
                <Col md={{ size: 4, offset: 4 }}>
                  <Button
                    color='primary'
                    onClick={async () => {
                      // console.log(routedCustomers);
                      setIsProcessing(true);
                      await optimizeRoute(
                        routedCustomers,
                        selectedTech,
                        dateSelected
                      );
                      await getEmployeeRoute(selectedTech, dateSelected);
                      setIsProcessing(false);
                    }}
                  >
                    {isProcessing ? (
                      <span>
                        {' '}
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
                      <span>Optimize Route</span>
                    )}
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  {customers.length === 0 &&
                    mapCenterPointNC !== null &&
                    selectedTech && (
                      <LoadScript googleMapsApiKey='AIzaSyBPTZtirCX7Ar2bIandK2EZzj10V2bBUag'>
                        <GoogleMap
                          mapContainerStyle={containerStyle}
                          center={mapCenterPointNC}
                          zoom={10}
                          onLoad={onLoad}
                          onUnmount={onUnmount}
                        >
                          {allCustomers.map(customer => (
                            <Fragment key={customer._id}>
                              {customer.technician !== selectedTech && (
                                <Marker
                                  icon={'https://i.imgur.com/SErFNu4.png'}
                                  position={{
                                    lat: parseFloat(customer.serviceLat),
                                    lng: parseFloat(customer.serviceLng)
                                  }}
                                  onClick={() => {
                                    onToggleOpen(customer._id);
                                  }}
                                >
                                  {infoIsOpen.isOpen &&
                                    infoIsOpen.active === customer._id && (
                                      <InfoWindow onCloseClick={onToggleOpen}>
                                        <div>
                                          <strong>
                                            <h4 className='mb-0'>
                                              {customer.firstName}{' '}
                                              {customer.lastName}
                                            </h4>
                                          </strong>{' '}
                                          {customer.serviceAddress}
                                          <br />
                                          {customer.isScheduled ? (
                                            <Badge
                                              className='mgn-btm-10'
                                              color='success'
                                            >
                                              Scheduled
                                            </Badge>
                                          ) : (
                                            <Badge
                                              className='mgn-btm-10'
                                              color='danger'
                                            >
                                              Not Scheduled
                                            </Badge>
                                          )}
                                          <br />
                                          {customer.technician === null ? (
                                            <span>
                                              Not Assigned to Tech
                                              <br />
                                              <Button
                                                size='sm'
                                                color='success'
                                                onClick={async () => {
                                                  setIsProcessing(true);
                                                  await updateTech(
                                                    customer._id,
                                                    selectedTech
                                                  );
                                                  await getEmployeeCustomers(
                                                    selectedTech
                                                  );
                                                  await getCustomersRB();
                                                  setIsProcessing(false);
                                                }}
                                              >
                                                Assign to Selected Tech
                                              </Button>
                                            </span>
                                          ) : (
                                            <span>
                                              Assigned to{' '}
                                              {customer.technicianName}
                                              <br />
                                              <Button
                                                size='sm'
                                                color='success'
                                                onClick={async () => {
                                                  setIsProcessing(true);
                                                  await updateTech(
                                                    customer._id,
                                                    selectedTech
                                                  );
                                                  await getEmployeeCustomers(
                                                    selectedTech
                                                  );
                                                  await getCustomersRB();
                                                  setIsProcessing(false);
                                                }}
                                              >
                                                Assign to Selected Tech
                                              </Button>
                                            </span>
                                          )}
                                        </div>
                                      </InfoWindow>
                                    )}
                                </Marker>
                              )}
                            </Fragment>
                          ))}
                        </GoogleMap>
                      </LoadScript>
                    )}

                  {customers.length >= 1 &&
                    routedCustomers !== null &&
                    mapCenterPoint !== null && (
                      <LoadScript googleMapsApiKey='AIzaSyBPTZtirCX7Ar2bIandK2EZzj10V2bBUag'>
                        <GoogleMap
                          mapContainerStyle={containerStyle}
                          center={mapCenterPoint}
                          zoom={10}
                          onLoad={onLoad}
                          onUnmount={onUnmount}
                        >
                          {routedCustomers.length >= 2 &&
                            isProcessing === false && (
                              <MapDirectionsRenderer
                                travelMode='DRIVING'
                                places={routedCustomers}
                              />
                            )}

                          {routedCustomers.length === 1 && (
                            <Fragment>
                              {routedCustomers.map(customer => (
                                <Marker
                                  key={customer._id}
                                  icon={'https://i.imgur.com/kAyfMFn.png'}
                                  position={{
                                    lat: parseFloat(customer.serviceLat),
                                    lng: parseFloat(customer.serviceLng)
                                  }}
                                ></Marker>
                              ))}
                            </Fragment>
                          )}

                          {allCustomers.map(customer => (
                            <Fragment key={customer._id}>
                              {customer.technician !== selectedTech && (
                                <Marker
                                  icon={'https://i.imgur.com/SErFNu4.png'}
                                  position={{
                                    lat: parseFloat(customer.serviceLat),
                                    lng: parseFloat(customer.serviceLng)
                                  }}
                                  onClick={() => {
                                    onToggleOpen(customer._id);
                                  }}
                                >
                                  {infoIsOpen.isOpen &&
                                    infoIsOpen.active === customer._id && (
                                      <InfoWindow onCloseClick={onToggleOpen}>
                                        <div>
                                          <strong>
                                            <h4 className='mb-0'>
                                              {customer.firstName}{' '}
                                              {customer.lastName}
                                            </h4>
                                          </strong>{' '}
                                          {customer.serviceAddress}
                                          <br />
                                          {customer.isScheduled ? (
                                            <Badge
                                              className='mgn-btm-10'
                                              color='success'
                                            >
                                              Scheduled
                                            </Badge>
                                          ) : (
                                            <Badge
                                              className='mgn-btm-10'
                                              color='danger'
                                            >
                                              Not Scheduled
                                            </Badge>
                                          )}
                                          <br />
                                          {customer.technician === null ? (
                                            <span>
                                              Not Assigned to Tech
                                              <br />
                                              <Button
                                                size='sm'
                                                color='success'
                                                onClick={async () => {
                                                  setIsProcessing(true);
                                                  await updateTech(
                                                    customer._id,
                                                    selectedTech
                                                  );
                                                  await getEmployeeCustomers(
                                                    selectedTech
                                                  );
                                                  await getCustomersRB();
                                                  setIsProcessing(false);
                                                }}
                                              >
                                                Assign to Selected Tech
                                              </Button>
                                            </span>
                                          ) : (
                                            <span>
                                              Assigned to{' '}
                                              {customer.technicianName}
                                              <br />
                                              <Button
                                                size='sm'
                                                color='success'
                                                onClick={async () => {
                                                  setIsProcessing(true);
                                                  await updateTech(
                                                    customer._id,
                                                    selectedTech
                                                  );
                                                  await getEmployeeCustomers(
                                                    selectedTech
                                                  );
                                                  await getCustomersRB();
                                                  setIsProcessing(false);
                                                }}
                                              >
                                                Assign to Selected Tech
                                              </Button>
                                            </span>
                                          )}
                                        </div>
                                      </InfoWindow>
                                    )}
                                </Marker>
                              )}
                            </Fragment>
                          ))}

                          {customers.map(customer => (
                            <Fragment key={customer._id}>
                              {customer.isScheduled === false && (
                                <Marker
                                  icon={'https://i.imgur.com/DOITJn6.png'}
                                  position={{
                                    lat: parseFloat(customer.serviceLat),
                                    lng: parseFloat(customer.serviceLng)
                                  }}
                                  onClick={() => {
                                    onToggleOpen(customer._id);
                                  }}
                                >
                                  {infoIsOpen.isOpen &&
                                    infoIsOpen.active === customer._id && (
                                      <InfoWindow onCloseClick={onToggleOpen}>
                                        <div>
                                          <strong>
                                            <h4 className='mb-0'>
                                              {customer.firstName}{' '}
                                              {customer.lastName}
                                            </h4>
                                          </strong>{' '}
                                          {customer.serviceAddress}
                                          <br />
                                          <Badge color='danger'>
                                            Not Scheduled
                                          </Badge>
                                          <br />
                                          <br />
                                          Assigned to {customer.technicianName}
                                          <br />
                                          <Button
                                            size='sm'
                                            color='success'
                                            onClick={() =>
                                              addToRoute(customer._id)
                                            }
                                          >
                                            Add To Route
                                          </Button>
                                        </div>
                                      </InfoWindow>
                                    )}
                                </Marker>
                              )}
                            </Fragment>
                          ))}
                        </GoogleMap>
                      </LoadScript>
                    )}
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg='4'>
                  <Form>
                    <FormGroup>
                      <Label className='form-control-label'>Technician:</Label>
                      <Input
                        type='select'
                        name='technician'
                        onChange={onTechChange}
                      >
                        <option>Choose One</option>
                        {employees.map(e => (
                          <option key={e._id} value={e._id}>
                            {e.firstName} {e.lastName}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Form>
                  <h4>Unscheuled Customers:</h4>
                  <ListGroup className='mgn-btm-10'>
                    {customers.map(c => (
                      <Fragment key={c._id}>
                        {c.isScheduled === false && (
                          <ListGroupItem>
                            <strong>
                              {c.firstName} {c.lastName}
                            </strong>{' '}
                            <br />
                            <small>
                              <em>{c.serviceAddress}</em>
                            </small>
                            <br />
                            <Badge color='warning' className='mgn-btm-10'>
                              Unscheduled
                            </Badge>
                            <br />
                            <Button
                              size='sm'
                              color='success'
                              onClick={() => addToRoute(c._id)}
                            >
                              Add To Route
                            </Button>
                          </ListGroupItem>
                        )}
                      </Fragment>
                    ))}
                  </ListGroup>
                  <hr />
                  <h4>Other Scheduled Customers:</h4>
                  <ListGroup>
                    {customers.map(c => (
                      <Fragment key={c._id}>
                        {c.isScheduled === true &&
                          c.scheduledDay !== dateSelected && (
                            <ListGroupItem>
                              {c.firstName} {c.lastName}{' '}
                              <Badge color='primary' className='mgn-btm-10'>
                                Scheduled - {c.scheduledDay} @ 2:40pm - 4:40pm
                              </Badge>
                              <Button
                                size='sm'
                                color='success'
                                onClick={async () => {
                                  await removeFromRoute(c._id);
                                  addToRoute(c._id);
                                }}
                              >
                                Switch to {dateSelected}
                              </Button>
                            </ListGroupItem>
                          )}
                      </Fragment>
                    ))}
                  </ListGroup>
                </Col>
                <Col lg='8'>
                  <Form>
                    <FormGroup>
                      <Label className='form-control-label'>
                        Day to Schedule:
                      </Label>
                      <Input type='select' name='day' onChange={onChangeDay}>
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                        <option>Saturday</option>
                        <option>Sunday</option>
                      </Input>
                    </FormGroup>
                  </Form>
                  <div className='route-builder-box'>
                    <h3>{dateSelected}'s Route</h3>
                    {!isProcessing ? (
                      <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId='items'>
                          {provided => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              <ListGroup>
                                {!loading &&
                                  !isProcessing &&
                                  customerRouteList !== null &&
                                  customerRouteList.map((c, index) => (
                                    <Draggable
                                      key={c._id}
                                      draggableId={c._id}
                                      index={index}
                                    >
                                      {provided => (
                                        <div
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          ref={provided.innerRef}
                                        >
                                          {c.isScheduled === true &&
                                            c.scheduledDay === dateSelected && (
                                              <ListGroupItem>
                                                <strong>
                                                  {c.firstName} {c.lastName}{' '}
                                                </strong>
                                                <br />
                                                <small>
                                                  <em>{c.serviceAddress}</em>
                                                </small>
                                                <br />
                                                <br />
                                                <Row>
                                                  <Col sm='3'>
                                                    <Label className='form-control-label'>
                                                      Frequency:
                                                    </Label>
                                                  </Col>
                                                  <Col sm='9'>
                                                    <Input
                                                      type='select'
                                                      defaultValue={c.frequency}
                                                      name='frequency'
                                                      onChange={e =>
                                                        onFreqChange(
                                                          c._id,
                                                          e.target.value
                                                        )
                                                      }
                                                    >
                                                      <option>Weekly</option>
                                                      <option>
                                                        Bi-Weekly (Every 2
                                                        Weeks)
                                                      </option>
                                                      <option>
                                                        Tri-Weekly (Every 3
                                                        Weeks)
                                                      </option>
                                                      <option>
                                                        Monthly (Every 4 Weeks)
                                                      </option>
                                                    </Input>
                                                  </Col>
                                                </Row>

                                                <br />
                                                <Button
                                                  size='sm'
                                                  color='danger'
                                                  onClick={() =>
                                                    removeFromRoute(c._id)
                                                  }
                                                >
                                                  Remove From {dateSelected}'s
                                                  Schedule
                                                </Button>
                                              </ListGroupItem>
                                            )}
                                        </div>
                                      )}
                                    </Draggable>
                                  ))}
                                {provided.placeholder}
                              </ListGroup>
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    ) : (
                      <span>
                        <SpinnerCircular
                          size={54}
                          thickness={180}
                          speed={100}
                          color='rgba(57, 125, 172, 1)'
                          secondaryColor='rgba(0, 0, 0, 0.44)'
                        />
                        <h3>Processing...</h3>
                      </span>
                    )}
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Footer />
        </Container>
      </div>
    </Fragment>
  );
};

RouteBuilder.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  getEmployeeCustomers: PropTypes.func.isRequired,
  unschedule: PropTypes.func.isRequired,
  setSchedule: PropTypes.func.isRequired,
  getEmployeeRoute: PropTypes.func.isRequired,
  updateRouteOrder: PropTypes.func.isRequired,
  getCustomersRB: PropTypes.func.isRequired,
  optimizeRoute: PropTypes.func.isRequired,
  clearCustomers: PropTypes.func.isRequired,
  updateFrequency: PropTypes.func.isRequired,
  updateTech: PropTypes.func.isRequired,
  employees: PropTypes.object.isRequired,
  mapRedux: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  employees: state.employee,
  customers: state.customer,
  mapRedux: state.map
});

export default connect(mapStateToProps, {
  getEmployees,
  getEmployeeCustomers,
  setSchedule,
  unschedule,
  getEmployeeRoute,
  updateRouteOrder,
  getCustomersRB,
  optimizeRoute,
  clearCustomers,
  updateFrequency,
  updateTech
})(RouteBuilder);
