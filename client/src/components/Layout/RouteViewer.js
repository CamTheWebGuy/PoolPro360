import React, { Fragment, useState, useEffect } from 'react';

import moment from 'moment';
import { Formik } from 'formik';
import ImageUploader from 'react-images-upload';
import { SpinnerCircular } from 'spinners-react';
import axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

const RouteViewer = ({
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
  useEffect(() => {
    if (user) {
      getEmployeeRoute(user._id, moment(new Date()).format('dddd'));
    }
  }, [user]);

  useEffect(() => {
    if (user && user.role !== 'Technician') {
      getWorkOrders();
    }
  }, [user, getWorkOrders]);

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

  const typeFormatter = cell => {
    if (cell === 'Residential') {
      return (
        <span>
          <i className='ni ni-shop text-primary'></i> {cell}
        </span>
      );
    } else if (cell === 'Commercial') {
      return (
        <span>
          <i className='ni ni-building text-red'></i> {cell}
        </span>
      );
    } else {
      return { cell };
    }
  };

  const columns = [
    {
      dataField: 'property',
      text: 'Property'
    },
    {
      dataField: 'package',
      text: 'Package'
    },
    {
      dataField: 'type',
      text: 'Type',
      formatter: typeFormatter
    },
    {
      dataField: 'technician',
      text: 'Technician'
    },
    {
      dataField: 'gatecode',
      text: 'Gate/Lock Code'
    }
  ];

  const [isProcessing, setIsProcessing] = useState(false);
  const [showChems, setShowChems] = useState(false);
  const [showRepair, setShowRepair] = useState(false);
  const [notesView, setNotesView] = useState(false);
  const [shockOpen, setShockOpen] = useState(false);
  const [algacidesOpen, setAlgacidesOpen] = useState(false);
  const [otherChemsOpen, setOtherChemsOpen] = useState(false);
  const [logModal, setLogModal] = useState({
    isOpen: false,
    active: '',
    activeName: '',
    isServiceInfoOpen: false,
    customerLock: '',
    customerNotes: null,
    customerChecklist: null,
    checkedItems: [],
    checkedNames: [],
    inProgress: false,
    equipment: null,
    type: 'Service',
    workOrders: null,
    isWorkOrderLoading: false
  });

  const [routeDay, setRouteDay] = useState('Today');
  const [showEquipmentList, setShowEquipmentList] = useState(false);
  const [showUnableService, setShowUnableService] = useState(false);

  const [unableServiceMessage, setUnableServiceMessage] = useState('');
  const [unableProcessing, setUnableProcessing] = useState(false);

  const submitUnableService = async () => {
    setUnableProcessing(true);
    await unableService(logModal.active, unableServiceMessage);
    if (routeDay === 'Today') {
      await getEmployeeRoute(user._id, moment(new Date()).format('dddd'));
    } else {
      await getEmployeeRoute(user._id, routeDay);
    }

    setLogModal({
      isOpen: false,
      active: '',
      activeName: '',
      isServiceInfoOpen: false,
      customerLock: '',
      customerNotes: null,
      customerChecklist: null,
      checkedItems: [],
      checkedNames: [],
      inProgress: false,
      equipment: null,
      type: 'Service',
      workOrders: null,
      isWorkOrderLoading: false
    });
    setShowUnableService(false);
    setUnableProcessing(false);
  };

  const onUnableChange = e => {
    setUnableServiceMessage(e.target.value);
  };

  useEffect(async () => {
    if (user) {
      if (
        routeDay === 'Today' ||
        routeDay === moment(Date.now()).format('dddd')
      ) {
        return await getEmployeeRoute(
          user._id,
          moment(new Date()).format('dddd')
        );
      }

      await getEmployeeRouteRB(user._id, routeDay);
    }
  }, [routeDay]);

  const [logPictureState, setLogPictureState] = useState({ pictures: [] });
  const [repairPictureState, setRepairPictureState] = useState({
    pictures: []
  });

  // console.log(logPictureState);

  const uploadImages = async activity => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      let uploadPromises = logPictureState.pictures.map(image => {
        let data = new FormData();
        data.append('image', image, image.name);
        return axios.patch(
          `/api/customers/recentActivity/edit/${activity._id}`,
          data,
          config
        );
      });

      await axios.all(uploadPromises);
    } catch (err) {
      console.log(err);
    }
  };

  const onDrop = picture => {
    setLogPictureState({
      pictures: picture
    });
  };

  const onDropRepair = picture => {
    setRepairPictureState({ pictures: picture });
  };

  useEffect(() => {
    setLogModal({
      ...logModal,
      customerChecklist: checklist
    });
  }, [checklist]);

  useEffect(() => {
    setLogModal({
      ...logModal,
      customerNotes: serviceNotes
    });
  }, [serviceNotes]);

  return (
    <Row>
      <Col md='4'>
        <Card className='shadow'>
          <CardHeader>
            <h3>Control Center</h3>
          </CardHeader>
          <CardBody>
            <Label className='form-control-label'>View Route For:</Label>
            <Input type='select' onChange={e => setRouteDay(e.target.value)}>
              <option>Today</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </Input>
          </CardBody>
        </Card>
      </Col>

      <Modal
        isOpen={logModal.isServiceInfoOpen}
        toggle={() => {
          setLogModal({
            ...logModal,
            isServiceInfoOpen: false
          });
        }}
      >
        <ModalHeader
          toggle={() => {
            setLogModal({
              ...logModal,
              isServiceInfoOpen: false
            });
          }}
        >
          Service Information For: {logModal.activeName}
        </ModalHeader>
        {showEquipmentList ? (
          <ModalBody>
            <Row>
              <Col>
                <Label className='form-control-label'>Pool Cleaner:</Label>
                <br />
                {logModal.equipment.cleanerMake}{' '}
                {logModal.equipment.cleanerModel}
              </Col>
              <Col>
                <Label className='form-control-label'>Filter:</Label>
                <br />
                {logModal.equipment.filterMake} {logModal.equipment.filterModel}
              </Col>
            </Row>
            <br />

            <Row>
              <Col>
                <Label className='form-control-label'>Heater:</Label>
                <br />
                {logModal.equipment.heaterMake} {logModal.equipment.heaterModel}
              </Col>
              <Col>
                <Label className='form-control-label'>Pump:</Label>
                <br />
                {logModal.equipment.pumpMake} {logModal.equipment.pumpModel}
              </Col>
            </Row>

            <br />

            <Row>
              <Col>
                <Label className='form-control-label'>Pool Gallons:</Label>
                <br />
                {logModal.equipment.poolGallons}{' '}
              </Col>
              <Col>
                <Label className='form-control-label'>Pool Type:</Label>
                <br />
                {logModal.equipment.poolType}{' '}
              </Col>
            </Row>
            <br />
            <hr />

            {logModal.equipment.other.length >= 1 && <h4>Other Equipment</h4>}
            <br />

            {logModal.equipment.other.map(item => (
              <Fragment>
                <Row>
                  <Col>
                    <Label className='form-control-label'>Category:</Label>
                    <br />
                    {item.category}
                  </Col>
                  <Col>
                    <Label className='form-control-label'>Make:</Label>
                    <br />
                    {item.make}
                  </Col>
                  <Col>
                    <Label className='form-control-label'>Model:</Label>
                    <br />
                    {item.model}
                  </Col>
                </Row>
                <br />
              </Fragment>
            ))}

            <br />
            <Row>
              <Button
                className='btn-icon'
                onClick={() => setShowEquipmentList(!showEquipmentList)}
                color='default'
                block
              >
                <span className='btn-inner--icon'>
                  <i className='fas fa-chevron-left'></i>
                </span>
                <span className='btn-inner--text'>Go Back</span>
              </Button>
            </Row>
          </ModalBody>
        ) : (
          <ModalBody>
            <div className='form-control-label'>Gate/Lock Code:</div>
            <p>{logModal.gatecode ? logModal.gatecode : <span>N/A</span>}</p>

            {logModal.type === 'Work Order' && (
              <Fragment>
                <div className='form-control-label'>Job Type:</div>
                <Badge color='warning'>Work Order</Badge>
                <br />
                <br />
                <ListGroup>
                  <ListGroupItem>
                    <Row>
                      <Col>
                        <h4 className='form-control-label'>Order Type:</h4>
                        <small>{routeList[logModal.index].orderType}</small>
                      </Col>
                      <Col>
                        <h4 className='form-control-label'>Status:</h4>
                        <Badge color='info'>
                          {routeList[logModal.index].status}
                        </Badge>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col>
                        <h4 className='form-control-label'>Description:</h4>
                        <small>
                          {routeList[logModal.index].description ? (
                            routeList[logModal.index].description
                          ) : (
                            <span>N/A</span>
                          )}
                        </small>
                      </Col>
                      <Col>
                        <h4 className='form-control-label'>Scheduled Date:</h4>
                        <small>
                          {moment(
                            routeList[logModal.index].scheduledDate
                          ).format('MMMM Do, YYYY')}
                        </small>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col>
                        <Button
                          color='success'
                          className='btn-icon'
                          block
                          onClick={async () => {
                            setLogModal({
                              ...logModal,
                              isWorkOrderLoading: true
                            });
                            await completeWorkOrder(
                              routeList[logModal.index]._id
                            );
                            if (routeDay === 'Today') {
                              await getEmployeeRoute(
                                user._id,
                                moment(new Date()).format('dddd')
                              );
                            } else {
                              await getEmployeeRoute(user._id, routeDay);
                            }

                            if (user && user.role !== 'Technician') {
                              await getWorkOrders();
                            }

                            setLogModal({
                              ...logModal,
                              isWorkOrderLoading: false,
                              isServiceInfoOpen: false
                            });
                          }}
                        >
                          {logModal.isWorkOrderLoading ? (
                            <span className='btn-inner--text'>
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
                            <Fragment>
                              <span className='btn-inner--icon'>
                                <i className='fas fa-tint'></i>
                              </span>
                              <span className='btn-inner--text'>
                                Complete Work Order
                              </span>
                            </Fragment>
                          )}
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Fragment>
            )}

            <br />

            {logModal.customerChecklist &&
              logModal.customerNotes &&
              logModal.type !== 'Work Order' &&
              logModal.serviceDay === moment(Date.now()).format('dddd') && (
                <Fragment>
                  <h4 className='form-control-label'>Service Notes:</h4>
                  <ListGroup>
                    <Fragment>
                      {logModal.customerNotes.length < 1 && (
                        <h4>No Service Notes...</h4>
                      )}
                    </Fragment>
                    {logModal.customerNotes &&
                      logModal.customerNotes.map(note => (
                        <Fragment key={note._id}>
                          {note.showDuringVisit && (
                            <ListGroupItem>{note.content}</ListGroupItem>
                          )}
                        </Fragment>
                      ))}
                  </ListGroup>
                  <br />
                  <h4 className='form-control-label'>Service Checklist:</h4>
                  <ListGroup>
                    <Fragment>
                      {logModal.customerChecklist.length < 1 && (
                        <h4>No Service Checklist...</h4>
                      )}
                    </Fragment>
                    {logModal.customerChecklist.map(list => (
                      <Fragment key={list._id}>
                        {logModal.checkedItems &&
                        logModal.checkedItems.find(e => e === list._id) ? (
                          <ListGroupItem
                            className='bg-green-wf'
                            onClick={() => {
                              if (
                                logModal.checkedItems.length === 0 ||
                                logModal.checkedItems == undefined
                              ) {
                                setLogModal({
                                  ...logModal,
                                  checkedItems: [list._id],
                                  checkedNames: [list.item]
                                });
                              } else if (
                                logModal.checkedItems.length >= 1 &&
                                logModal.checkedItems.find(e => e === list._id)
                              ) {
                                const updated = logModal.checkedItems.filter(
                                  id => id !== list._id
                                );
                                const names = logModal.checkedNames.filter(
                                  name => name !== list.item
                                );

                                setLogModal({
                                  ...logModal,
                                  checkedItems: updated,
                                  checkedNames: names
                                });
                              } else if (
                                logModal.checkedItems.length >= 1 &&
                                logModal.checkedItems.find(e => e === list._id)
                              ) {
                                const updated = [...logModal.checkedItems];
                                const names = [...logModal.checkedNames];

                                updated.push(list._id);
                                names.push(list.item);
                                setLogModal({
                                  ...logModal,
                                  checkedItems: updated,
                                  checkedNames: names
                                });
                              }
                            }}
                          >
                            <i className='fas fa-times-circle'></i>{' '}
                            <strong>{list.item}</strong>
                          </ListGroupItem>
                        ) : (
                          <ListGroupItem
                            className='bg-red'
                            onClick={() => {
                              if (
                                logModal.checkedItems === undefined ||
                                logModal.checkedItems.length === 0
                              ) {
                                setLogModal({
                                  ...logModal,
                                  checkedItems: [list._id],
                                  checkedNames: [list.item]
                                });
                              } else if (logModal.checkedItems.length >= 1) {
                                const updated = [...logModal.checkedItems];
                                const names = [...logModal.checkedNames];

                                updated.push(list._id);
                                names.push(list.item);
                                setLogModal({
                                  ...logModal,
                                  checkedItems: updated,
                                  checkedNames: names
                                });
                              }
                            }}
                          >
                            <i className='fas fa-times-circle'></i>{' '}
                            <strong>{list.item}</strong>
                          </ListGroupItem>
                        )}
                      </Fragment>
                    ))}
                  </ListGroup>
                </Fragment>
              )}

            <br />

            <div className='text-center'>
              <Button
                className='btn-icon mgn-btm-10'
                color='info'
                block
                onClick={() => setShowEquipmentList(!showEquipmentList)}
              >
                <span className='btn-inner--icon'>
                  <i className='fas fa-swimming-pool'></i>
                </span>
                <span className='btn-inner--text'>View Equipment</span>
              </Button>
              <hr />

              {logModal.type !== 'Work Order' &&
                logModal.serviceDay === moment(Date.now()).format('dddd') && (
                  <Fragment>
                    <Button
                      className='btn-icon mgn-btm-10'
                      color='warning'
                      block
                      onClick={() => setShowUnableService(!showUnableService)}
                    >
                      <span className='btn-inner--icon'>
                        <i className='fas fa-times'></i>
                      </span>
                      <span className='btn-inner--text'>Unable to Service</span>
                    </Button>
                    {showUnableService && (
                      <Fragment>
                        <Label className='form-control-label'>
                          Reason Unable To Service (May Be Sent to Customer):
                        </Label>
                        <Input
                          type='textarea'
                          onChange={e => onUnableChange(e)}
                        />
                        <br />
                        <Button
                          className='btn-icon'
                          color='default'
                          block
                          onClick={submitUnableService}
                        >
                          <span className='btn-inner--icon'>
                            <i className='fas fa-exclamation-circle'></i>
                          </span>
                          {unableProcessing ? (
                            <span className='btn-inner--text'>
                              <SpinnerCircular
                                size={24}
                                thickness={180}
                                speed={100}
                                color='rgba(57, 125, 172, 1)'
                                secondaryColor='rgba(0, 0, 0, 0.44)'
                              />
                              Processing...
                            </span>
                          ) : (
                            <span className='btn-inner--text'>
                              Mark Unable To Service
                            </span>
                          )}
                        </Button>
                        <br />
                      </Fragment>
                    )}

                    {logModal.customerChecklist &&
                    logModal.customerChecklist.length >= 1 ? (
                      <Fragment>
                        {logModal.checkedItems === undefined ||
                        logModal.checkedItems.length === 0 ? (
                          <Fragment>
                            <Button
                              className='btn-icon mgn-btm-10'
                              color='primary'
                              block
                              disabled
                              onClick={() => {
                                setLogModal({
                                  ...logModal,
                                  isServiceInfoOpen: false,
                                  isOpen: true
                                });
                              }}
                            >
                              <span className='btn-inner--icon'>
                                <i className='ni ni-check-bold'></i>
                              </span>
                              <span className='btn-inner--text'>
                                Log Service
                              </span>
                            </Button>
                            {logModal.customerChecklist &&
                              logModal.customerChecklist.length >= 1 && (
                                <p>
                                  Must have completed at least one item from
                                  service checklist.
                                </p>
                              )}
                          </Fragment>
                        ) : (
                          <Button
                            className='btn-icon mgn-btm-10'
                            color='primary'
                            block
                            onClick={() => {
                              setLogModal({
                                ...logModal,
                                isServiceInfoOpen: false,
                                isOpen: true
                              });
                            }}
                          >
                            <span className='btn-inner--icon'>
                              <i className='ni ni-check-bold'></i>
                            </span>
                            <span className='btn-inner--text'>Log Service</span>
                          </Button>
                        )}
                      </Fragment>
                    ) : (
                      <Button
                        className='btn-icon mgn-btm-10'
                        color='primary'
                        block
                        onClick={() => {
                          setLogModal({
                            ...logModal,
                            isServiceInfoOpen: false,
                            isOpen: true
                          });
                        }}
                      >
                        <span className='btn-inner--icon'>
                          <i className='ni ni-check-bold'></i>
                        </span>
                        <span className='btn-inner--text'>Log Service</span>
                      </Button>
                    )}
                  </Fragment>
                )}
            </div>
          </ModalBody>
        )}
      </Modal>

      <Modal
        isOpen={logModal.isOpen}
        toggle={() => {
          setLogModal({
            ...logModal,
            isOpen: false,
            active: null,
            activeName: null
          });

          setShowChems(false);
          setNotesView(false);
        }}
      >
        <ModalHeader
          toggle={() => {
            setLogModal({
              ...logModal,
              isOpen: false,
              active: null,
              activeName: null
            });
            setShowChems(false);
            setNotesView(false);
          }}
        >
          Log Service for: {logModal.activeName}
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              totalChlorine: '',
              freeChlorine: '',
              pHlevel: '',
              alkalinity: '',
              conditionerLevel: '',
              hardness: '',
              phosphateLevel: '',
              saltLevel: '',
              chlorineTablets: '',
              liquidChlorine: '',
              liquidAcid: '',
              triChlor: '',
              diChlor: '',
              calHypo: '',
              potassiumMono: '',
              ammonia: '',
              copperBased: '',
              polyQuat: '',
              copperBlend: '',
              sodaAsh: '',
              CalciumChloride: '',
              conditioner: '',
              sodiumBicar: '',
              diatomaceous: '',
              diatomaceousAlt: '',
              sodiumBro: '',
              dryAcid: '',
              clarifier: '',
              phosphateRemover: '',
              salt: '',
              enzymes: '',
              metalSequester: '',
              bromineGran: '',
              bromineTab: '',
              poolFlocc: '',
              borate: '',
              privateNote: '',
              publicNote: '',
              repairOrder: false,
              repairType: 'Repair Request (Submit a Order for Future Repair)',
              repairNotify: false,
              repairDescription: '',
              repairOfficeNote: ''
            }}
            onSubmit={async data => {
              setIsProcessing(true);

              const log = await addServiceLog(
                logModal.active,
                logModal.checkedNames,
                logPictureState.pictures,

                data
              );
              await uploadImages(log);

              await sendServiceReport(logModal.active, log._id);

              await getEmployeeRoute(
                user._id,
                moment(new Date()).format('dddd')
              );
              setLogModal({
                ...logModal,
                isOpen: false,
                active: null,
                activeName: null,
                isServiceInfoOpen: false
              });

              setShowChems(false);
              setShowRepair(false);
              setNotesView(false);
              setShockOpen(false);
              setAlgacidesOpen(false);
              setOtherChemsOpen(false);

              setIsProcessing(false);
            }}
            render={({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              setFieldValue,
              errors,
              touched
            }) => (
              <Fragment>
                <Form>
                  {!showChems && !notesView ? (
                    <Fragment>
                      <div className='text-center'>
                        <h4>Readings:</h4>
                      </div>
                      <FormGroup>
                        <Label className='form-control-label'>
                          Total Chlorine
                        </Label>
                        <Input
                          type='select'
                          name='totalChlorine'
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option>0</option>
                          <option>0.5</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                          <option>30</option>
                        </Input>
                      </FormGroup>

                      <FormGroup>
                        <Label className='form-control-label'>
                          Free Chlorine
                        </Label>
                        <Input
                          type='select'
                          name='freeChlorine'
                          value={values.freeChlorine}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option>0</option>
                          <option>0.5</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                          <option>30</option>
                        </Input>
                      </FormGroup>

                      <FormGroup>
                        <Label className='form-control-label'>PH Level</Label>
                        <Input
                          type='select'
                          name='pHlevel'
                          value={values.pHlevel}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option>6.2</option>
                          <option>6.8</option>
                          <option>7.0</option>
                          <option>7.4</option>
                          <option>7.6</option>
                          <option>7.8</option>
                          <option>8.0</option>
                          <option>8.4+</option>
                        </Input>
                      </FormGroup>

                      <FormGroup>
                        <Label className='form-control-label'>
                          Alkalinity Level
                        </Label>
                        <Input
                          type='select'
                          name='alkalinity'
                          value={values.alkalinity}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option>0</option>
                          <option>10</option>
                          <option>20</option>
                          <option>30</option>
                          <option>40</option>
                          <option>50</option>
                          <option>60</option>
                          <option>70</option>
                          <option>80</option>
                          <option>90</option>
                          <option>100</option>
                          <option>110</option>
                          <option>120</option>
                          <option>130</option>
                          <option>140</option>
                          <option>150</option>
                          <option>160</option>
                          <option>170</option>
                          <option>180</option>
                          <option>190</option>
                          <option>200</option>
                          <option>210</option>
                          <option>220</option>
                          <option>230</option>
                          <option>240</option>
                          <option>250</option>
                          <option>300</option>
                          <option>350</option>
                          <option>400</option>
                          <option>500</option>
                          <option>600</option>
                          <option>700</option>
                          <option>800</option>
                          <option>900</option>
                          <option>1000</option>
                        </Input>
                      </FormGroup>

                      <FormGroup>
                        <Label className='form-control-label'>
                          Conditioner Level
                        </Label>
                        <Input
                          type='select'
                          name='conditionerLevel'
                          value={values.conditionerLevel}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option>N/A</option>
                          <option>0</option>
                          <option>30</option>
                          <option>40</option>
                          <option>50</option>
                          <option>60</option>
                          <option>70</option>
                          <option>80</option>
                          <option>90</option>
                          <option>100</option>
                          <option>110</option>
                          <option>120</option>
                          <option>130</option>
                          <option>140</option>
                          <option>150</option>
                          <option>175</option>
                          <option>200</option>
                          <option>225+</option>
                        </Input>
                      </FormGroup>

                      <FormGroup>
                        <Label className='form-control-label'>
                          Hardness Level
                        </Label>
                        <Input
                          type='select'
                          name='hardness'
                          value={values.hardness}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option>N/A</option>
                          <option>0</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                          <option>25</option>
                          <option>30</option>
                          <option>40</option>
                          <option>50</option>
                          <option>60</option>
                          <option>70</option>
                          <option>180</option>
                          <option>90</option>
                          <option>100</option>
                          <option>110</option>
                          <option>125</option>
                          <option>150</option>
                          <option>175</option>
                          <option>200</option>
                          <option>250</option>
                          <option>300</option>
                          <option>350</option>
                          <option>400</option>
                          <option>500</option>
                          <option>600</option>
                          <option>700</option>
                          <option>800</option>
                          <option>900</option>
                          <option>1000</option>
                        </Input>
                      </FormGroup>

                      <FormGroup>
                        <Label className='form-control-label'>
                          Phosphate Level
                        </Label>
                        <Input
                          type='select'
                          name='phosphateLevel'
                          value={values.phosphateLevel}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option>N/A</option>
                          <option>0</option>
                          <option>125</option>
                          <option>250</option>
                          <option>500</option>
                          <option>700</option>
                          <option>1000+</option>
                        </Input>
                      </FormGroup>

                      <FormGroup>
                        <Label className='form-control-label'>Salt Level</Label>
                        <Input
                          type='select'
                          name='saltLevel'
                          value={values.saltLevel}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option>N/A</option>
                          <option>0</option>
                          <option>100</option>
                          <option>150</option>
                          <option>200</option>
                          <option>250</option>
                          <option>300</option>
                          <option>350</option>
                          <option>400</option>
                          <option>450</option>
                          <option>500</option>
                          <option>550</option>
                          <option>600</option>
                          <option>650</option>
                          <option>700</option>
                          <option>750</option>
                          <option>800</option>
                          <option>850</option>
                          <option>900</option>
                          <option>1000</option>
                          <option>1100</option>
                          <option>1150</option>
                          <option>1200</option>
                          <option>1250</option>
                          <option>1300</option>
                          <option>1350</option>
                          <option>1400</option>
                          <option>1450</option>
                          <option>1500</option>
                          <option>1550</option>
                          <option>1600</option>
                          <option>1650</option>
                          <option>1700</option>
                          <option>1750</option>
                          <option>1800</option>
                          <option>1850</option>
                          <option>1900</option>
                          <option>1950</option>
                          <option>2000</option>
                          <option>2050</option>
                          <option>2100</option>
                          <option>2150</option>
                          <option>2200</option>
                          <option>2250</option>
                          <option>2300</option>
                          <option>2350</option>
                          <option>2400</option>
                          <option>2450</option>
                          <option>2500</option>
                          <option>2550</option>
                          <option>2600</option>
                          <option>2650</option>
                          <option>2700</option>
                          <option>2750</option>
                          <option>2800</option>
                          <option>2850</option>
                          <option>2900</option>
                          <option>2950</option>
                          <option>3000</option>
                          <option>3050</option>
                          <option>3100</option>
                          <option>3150</option>
                          <option>3200</option>
                          <option>3250</option>
                          <option>3300</option>
                          <option>3350</option>
                          <option>3400</option>
                          <option>3450</option>
                          <option>3500</option>
                          <option>3550</option>
                          <option>3600</option>
                          <option>3650</option>
                          <option>3700</option>
                          <option>3750</option>
                          <option>3800</option>
                          <option>3850</option>
                          <option>3900</option>
                          <option>3950</option>
                          <option>4000</option>
                          <option>4050</option>
                          <option>4100</option>
                          <option>4200</option>
                          <option>4300</option>
                          <option>4350</option>
                          <option>4400</option>
                          <option>4450</option>
                          <option>4500</option>
                          <option>4550</option>
                          <option>4600</option>
                          <option>4600</option>
                          <option>4700</option>
                          <option>4750</option>
                          <option>4800</option>
                          <option>4850</option>
                          <option>4900</option>
                          <option>4950</option>
                          <option>5000</option>
                          <option>5050</option>
                          <option>5100</option>
                          <option>5150</option>
                          <option>5200</option>
                          <option>5250</option>
                          <option>5300</option>
                          <option>5350</option>
                          <option>5400</option>
                          <option>5450</option>
                          <option>5500</option>
                          <option>5550</option>
                          <option>5600</option>
                          <option>5650</option>
                          <option>5700</option>
                          <option>5750</option>
                          <option>5800</option>
                          <option>5850</option>
                          <option>5900</option>
                          <option>5950</option>
                          <option>6000</option>
                        </Input>
                      </FormGroup>
                    </Fragment>
                  ) : (
                    showChems &&
                    !notesView && (
                      <Fragment>
                        <div className='text-center'>
                          <h4>Chemical Usage:</h4>
                        </div>
                        <FormGroup>
                          <Label className='form-control-label'>
                            Chlorine Tablets
                          </Label>
                          <Input
                            type='select'
                            name='chlorineTablets'
                            value={values.chlorineTablets}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option>No Tabs Used</option>
                            <option className='option-heading' disabled>
                              3 Inch Tabs
                            </option>
                            <option>1 Tab</option>
                            <option>2 Tabs</option>
                            <option>3 Tabs</option>
                            <option>4 Tabs</option>
                            <option>5 Tabs</option>
                            <option>6 Tabs</option>
                            <option>7 Tabs</option>
                            <option>8 Tabs</option>
                            <option>9 Tabs</option>
                            <option>10 Tabs</option>
                            <option>15 Tabs</option>
                            <option className='option-heading' disabled>
                              1 Inch Tabs
                            </option>
                            <option>1 Tab</option>
                            <option>2 Tabs</option>
                            <option>3 Tabs</option>
                            <option>4 Tabs</option>
                            <option>5 Tabs</option>
                            <option>6 Tabs</option>
                            <option>7 Tabs</option>
                            <option>8 Tabs</option>
                            <option>9 Tabs</option>
                            <option>10 Tabs</option>
                            <option>15 Tabs</option>
                          </Input>
                        </FormGroup>

                        <FormGroup>
                          <Label className='form-control-label'>
                            Liquid Chlorine
                          </Label>
                          <Input
                            type='select'
                            name='liquidChlorine'
                            value={values.liquidChlorine}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option>No Liquid Chlorine Used</option>
                            <option>1/8 Gallon</option>
                            <option>1/4 Gallon</option>
                            <option>1/3 Gallon</option>
                            <option>1/2 Gallon</option>
                            <option>2/3 Gallon</option>
                            <option>3/4 Gallon</option>
                            <option>1 Gallon</option>
                            <option>1.5 Gallons</option>
                            <option>2 Gallons</option>
                            <option>2.5 Gallons</option>
                            <option>3 Gallons</option>
                            <option>3.5 Gallons</option>
                            <option>4 Gallon</option>
                            <option>5 Gallons</option>
                            <option>6 Gallons</option>
                            <option>7 Gallons</option>
                            <option>8 Gallons</option>
                            <option>9 Gallons</option>
                            <option>10 Gallon</option>
                            <option>11 Gallons</option>
                            <option>12 Gallons</option>
                            <option>13 Gallons</option>
                            <option>14 Gallons</option>
                            <option>15 Gallons</option>
                            <option>16 Gallon</option>
                            <option>17 Gallons</option>
                            <option>18 Gallons</option>
                            <option>19 Gallons</option>
                            <option>20 Gallons</option>
                            <option className='option-heading' disabled>
                              Smaller Doses
                            </option>
                            <option>1/8 Cup</option>
                            <option>1/4 Cup</option>
                            <option>1/3 Cup</option>
                            <option>1/2 Cup</option>
                            <option>2/3 Cup</option>
                            <option>3/4 Cup</option>
                            <option>1 Cup</option>
                            <option>1.5 Cups</option>
                            <option>2 Cups</option>
                            <option>2.5 Cups</option>
                            <option>3 Cups</option>
                            <option>3.5 Cups</option>
                            <option>4 Cups</option>
                            <option>4.5 Cups</option>
                            <option>5 Cups</option>
                            <option>6 Cups</option>
                            <option>7 Cups</option>
                            <option>8 Cups</option>
                            <option>9 Cups</option>
                            <option>10 Cups</option>
                          </Input>
                        </FormGroup>

                        <FormGroup>
                          <Label className='form-control-label'>
                            Liquid Acid
                          </Label>
                          <Input
                            type='select'
                            name='liquidAcid'
                            value={values.liquidAcid}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option>No Liquid Acid Used</option>
                            <option>1/8 Gallon</option>
                            <option>1/4 Gallon</option>
                            <option>1/3 Gallon</option>
                            <option>1/2 Gallon</option>
                            <option>2/3 Gallon</option>
                            <option>3/4 Gallon</option>
                            <option>1 Gallon</option>
                            <option>1.5 Gallons</option>
                            <option>2 Gallons</option>
                            <option>2.5 Gallons</option>
                            <option>3 Gallons</option>
                            <option>3.5 Gallons</option>
                            <option>4 Gallon</option>
                            <option>5 Gallons</option>
                            <option>6 Gallons</option>
                            <option>7 Gallons</option>
                            <option>8 Gallons</option>
                            <option>9 Gallons</option>
                            <option>10 Gallon</option>
                            <option>11 Gallons</option>
                            <option>12 Gallons</option>
                            <option>13 Gallons</option>
                            <option>14 Gallons</option>
                            <option>15 Gallons</option>
                            <option>16 Gallon</option>
                            <option>17 Gallons</option>
                            <option>18 Gallons</option>
                            <option>19 Gallons</option>
                            <option>20 Gallons</option>
                            <option className='option-heading' disabled>
                              Smaller Doses
                            </option>
                            <option>1/8 Cup</option>
                            <option>1/4 Cup</option>
                            <option>1/3 Cup</option>
                            <option>1/2 Cup</option>
                            <option>2/3 Cup</option>
                            <option>3/4 Cup</option>
                            <option>1 Cup</option>
                            <option>1.5 Cups</option>
                            <option>2 Cups</option>
                            <option>2.5 Cups</option>
                            <option>3 Cups</option>
                            <option>3.5 Cups</option>
                            <option>4 Cups</option>
                            <option>4.5 Cups</option>
                            <option>5 Cups</option>
                            <option>6 Cups</option>
                            <option>7 Cups</option>
                            <option>8 Cups</option>
                            <option>9 Cups</option>
                            <option>10 Cups</option>
                            <option className='option-heading' disabled>
                              In Ounces
                            </option>
                            <option>2 Ounces</option>
                            <option>4 Ounces</option>
                            <option>6 Ounces</option>
                            <option>8 Ounces</option>
                            <option>10 Ounces</option>
                            <option>12 Ounces</option>
                            <option>14 Ounces</option>
                            <option>16 Ounces</option>
                          </Input>
                        </FormGroup>

                        <FormGroup>
                          <Button
                            className='btn-icon'
                            color='info'
                            onClick={() => {
                              if (shockOpen) {
                                setFieldValue('triChlor', '');
                                setFieldValue('diChlor', '');
                                setFieldValue('calHypo', '');
                                setFieldValue('potassiumMono', '');
                              }
                              setShockOpen(!shockOpen);
                            }}
                            block
                          >
                            {shockOpen ? (
                              <Fragment>
                                <span className='btn-inner--icon'>
                                  <i className='fas fa-minus'></i>
                                </span>
                                <span className='btn-inner--text'>Shock</span>
                              </Fragment>
                            ) : (
                              <Fragment>
                                <span className='btn-inner--icon'>
                                  <i className='fas fa-plus'></i>
                                </span>
                                <span className='btn-inner--text'>Shock</span>
                              </Fragment>
                            )}
                          </Button>

                          <Collapse isOpen={shockOpen}>
                            <FormGroup>
                              <Label className='form-control-label'>
                                TriChlor Shock
                              </Label>
                              <Input
                                type='select'
                                name='triChlor'
                                value={values.triChlor}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>No TriChlor Added</option>
                                <option className='option-heading' disabled>
                                  D.E. Scoop Measurement
                                </option>
                                <option>1/8 Scoop</option>
                                <option>1/4 Scoop</option>
                                <option>1/3 Scoop</option>
                                <option>1/2 Scoop</option>
                                <option>2/3 Scoop</option>
                                <option>3/4 Scoop</option>
                                <option>1 Full D.E. Scoop</option>
                                <option>1.5 D.E. Scoops</option>
                                <option>2 D.E. Scoops</option>
                                <option>3 D.E. Scoops</option>
                                <option>4 D.E. Scoops</option>
                                <option>5 D.E. Scoops</option>
                                <option className='option-heading' disabled>
                                  Ounces Measurement
                                </option>
                                <option>2 Ounces</option>
                                <option>4 Ounces</option>
                                <option>8 Ounces</option>
                                <option>12 Ounces</option>
                                <option>18 Ounces</option>
                                <option>22 Ounces</option>
                                <option>26 Ounces</option>
                                <option>30 Ounces</option>
                                <option>36 Ounces</option>
                                <option className='option-heading' disabled>
                                  Pounds Measurement
                                </option>
                                <option>1/2 Pound</option>
                                <option>1 Pound</option>
                                <option>1.5 Pounds</option>
                                <option>2 Pounds</option>
                                <option>2.5 Pounds</option>
                                <option>3 Pounds</option>
                                <option>3.5 Pounds</option>
                                <option>4 Pounds</option>
                                <option>4.5 Pounds</option>
                                <option>5 Pounds</option>
                                <option>6 Pounds</option>
                                <option>7 Pounds</option>
                                <option>8 Pounds</option>
                                <option>9 Pounds</option>
                                <option>10 Pounds</option>
                              </Input>
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>
                                DiChlor Shock
                              </Label>
                              <Input
                                type='select'
                                name='diChlor'
                                value={values.diChlor}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>No DiChlor Added</option>
                                <option className='option-heading' disabled>
                                  D.E. Scoop Measurement
                                </option>
                                <option>1/8 Scoop</option>
                                <option>1/4 Scoop</option>
                                <option>1/3 Scoop</option>
                                <option>1/2 Scoop</option>
                                <option>2/3 Scoop</option>
                                <option>3/4 Scoop</option>
                                <option>1 Full D.E. Scoop</option>
                                <option>1.5 D.E. Scoops</option>
                                <option>2 D.E. Scoops</option>
                                <option>3 D.E. Scoops</option>
                                <option>4 D.E. Scoops</option>
                                <option>5 D.E. Scoops</option>
                                <option className='option-heading' disabled>
                                  Ounces Measurement
                                </option>
                                <option>2 Ounces</option>
                                <option>4 Ounces</option>
                                <option>8 Ounces</option>
                                <option>12 Ounces</option>
                                <option>18 Ounces</option>
                                <option>22 Ounces</option>
                                <option>26 Ounces</option>
                                <option>30 Ounces</option>
                                <option>36 Ounces</option>
                                <option className='option-heading' disabled>
                                  Pounds Measurement
                                </option>
                                <option>1/2 Pound</option>
                                <option>1 Pound</option>
                                <option>1.5 Pounds</option>
                                <option>2 Pounds</option>
                                <option>2.5 Pounds</option>
                                <option>3 Pounds</option>
                                <option>3.5 Pounds</option>
                                <option>4 Pounds</option>
                                <option>4.5 Pounds</option>
                                <option>5 Pounds</option>
                                <option>6 Pounds</option>
                                <option>7 Pounds</option>
                                <option>8 Pounds</option>
                                <option>9 Pounds</option>
                                <option>10 Pounds</option>
                              </Input>
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>
                                CalHypo Shock
                              </Label>
                              <Input
                                type='select'
                                name='calHypo'
                                value={values.calHypo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>No CalHypo Added</option>
                                <option className='option-heading' disabled>
                                  D.E. Scoop Measurement
                                </option>
                                <option>1/8 Scoop</option>
                                <option>1/4 Scoop</option>
                                <option>1/3 Scoop</option>
                                <option>1/2 Scoop</option>
                                <option>2/3 Scoop</option>
                                <option>3/4 Scoop</option>
                                <option>1 Full D.E. Scoop</option>
                                <option>1.5 D.E. Scoops</option>
                                <option>2 D.E. Scoops</option>
                                <option>3 D.E. Scoops</option>
                                <option>4 D.E. Scoops</option>
                                <option>5 D.E. Scoops</option>
                                <option className='option-heading' disabled>
                                  Ounces Measurement
                                </option>
                                <option>2 Ounces</option>
                                <option>4 Ounces</option>
                                <option>8 Ounces</option>
                                <option>12 Ounces</option>
                                <option>18 Ounces</option>
                                <option>22 Ounces</option>
                                <option>26 Ounces</option>
                                <option>30 Ounces</option>
                                <option>36 Ounces</option>
                                <option className='option-heading' disabled>
                                  Pounds Measurement
                                </option>

                                <option>1/2 Pound</option>
                                <option>1 Pound</option>
                                <option>1.5 Pounds</option>
                                <option>2 Pounds</option>
                                <option>2.5 Pounds</option>
                                <option>3 Pounds</option>
                                <option>3.5 Pounds</option>
                                <option>4 Pounds</option>
                                <option>4.5 Pounds</option>
                                <option>5 Pounds</option>
                                <option>6 Pounds</option>
                                <option>7 Pounds</option>
                                <option>8 Pounds</option>
                                <option>9 Pounds</option>
                                <option>10 Pounds</option>
                                <option>11 Pounds</option>
                                <option>12 Pounds</option>
                                <option>13 Pounds</option>
                                <option>14 Pounds</option>
                                <option>15 Pounds</option>
                                <option>16 Pounds</option>
                                <option>17 Pounds</option>
                                <option>18 Pounds</option>
                                <option>19 Pounds</option>
                                <option>20 Pounds</option>
                                <option>21 Pounds</option>
                                <option>22 Pounds</option>
                                <option>23 Pounds</option>
                                <option>24 Pounds</option>
                                <option>25 Pounds</option>
                                <option>26 Pounds</option>
                                <option>27 Pounds</option>
                                <option>28 Pounds</option>
                                <option>29 Pounds</option>
                                <option>30 Pounds</option>
                                <option>31 Pounds</option>
                                <option>32 Pounds</option>
                                <option>33 Pounds</option>
                                <option>34 Pounds</option>
                                <option>35 Pounds</option>
                                <option>36 Pounds</option>
                                <option>37 Pounds</option>
                                <option>38 Pounds</option>
                                <option>39 Pounds</option>
                                <option>40 Pounds</option>
                                <option>41 Pounds</option>
                                <option>42 Pounds</option>
                                <option>43 Pounds</option>
                                <option>44 Pounds</option>
                                <option>45 Pounds</option>
                                <option>46 Pounds</option>
                                <option>47 Pounds</option>
                                <option>48 Pounds</option>
                                <option>49 Pounds</option>
                                <option>50 Pounds</option>
                              </Input>
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>
                                Non-Chlorine Shock/Potassium Monopersulfate
                              </Label>
                              <Input
                                type='select'
                                name='potassiumMono'
                                value={values.potassiumMono}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>
                                  No Potassium Monopersulfate Added
                                </option>
                                <option className='option-heading' disabled>
                                  D.E. Scoop Measurement
                                </option>
                                <option>1/8 Scoop</option>
                                <option>1/4 Scoop</option>
                                <option>1/3 Scoop</option>
                                <option>1/2 Scoop</option>
                                <option>2/3 Scoop</option>
                                <option>3/4 Scoop</option>
                                <option>1 Full D.E. Scoop</option>
                                <option>1.5 D.E. Scoops</option>
                                <option>2 D.E. Scoops</option>
                                <option>3 D.E. Scoops</option>
                                <option>4 D.E. Scoops</option>
                                <option>5 D.E. Scoops</option>
                                <option className='option-heading' disabled>
                                  Ounces Measurement
                                </option>
                                <option>2 Ounces</option>
                                <option>4 Ounces</option>
                                <option>8 Ounces</option>
                                <option>12 Ounces</option>
                                <option>18 Ounces</option>
                                <option>22 Ounces</option>
                                <option>26 Ounces</option>
                                <option>30 Ounces</option>
                                <option>36 Ounces</option>
                                <option className='option-heading' disabled>
                                  Pounds Measurement
                                </option>

                                <option>1/2 Pound</option>
                                <option>1 Pound</option>
                                <option>1.5 Pounds</option>
                                <option>2 Pounds</option>
                                <option>2.5 Pounds</option>
                                <option>3 Pounds</option>
                                <option>3.5 Pounds</option>
                                <option>4 Pounds</option>
                                <option>4.5 Pounds</option>
                                <option>5 Pounds</option>
                                <option>6 Pounds</option>
                                <option>7 Pounds</option>
                                <option>8 Pounds</option>
                                <option>9 Pounds</option>
                                <option>10 Pounds</option>
                                <option>11 Pounds</option>
                                <option>12 Pounds</option>
                                <option>13 Pounds</option>
                                <option>14 Pounds</option>
                                <option>15 Pounds</option>
                                <option>16 Pounds</option>
                                <option>17 Pounds</option>
                                <option>18 Pounds</option>
                                <option>19 Pounds</option>
                                <option>20 Pounds</option>
                                <option>21 Pounds</option>
                                <option>22 Pounds</option>
                                <option>23 Pounds</option>
                                <option>24 Pounds</option>
                                <option>25 Pounds</option>
                                <option>26 Pounds</option>
                                <option>27 Pounds</option>
                                <option>28 Pounds</option>
                                <option>29 Pounds</option>
                                <option>30 Pounds</option>
                                <option>31 Pounds</option>
                                <option>32 Pounds</option>
                                <option>33 Pounds</option>
                                <option>34 Pounds</option>
                                <option>35 Pounds</option>
                                <option>36 Pounds</option>
                                <option>37 Pounds</option>
                                <option>38 Pounds</option>
                                <option>39 Pounds</option>
                                <option>40 Pounds</option>
                                <option>41 Pounds</option>
                                <option>42 Pounds</option>
                                <option>43 Pounds</option>
                                <option>44 Pounds</option>
                                <option>45 Pounds</option>
                                <option>46 Pounds</option>
                                <option>47 Pounds</option>
                                <option>48 Pounds</option>
                                <option>49 Pounds</option>
                                <option>50 Pounds</option>
                                <option className='option-heading' disabled>
                                  Cups Measurement
                                </option>

                                <option>1/8 Cup</option>
                                <option>1/4 Cup</option>
                                <option>1/3 Cup</option>
                                <option>1/2 Cup</option>
                                <option>2/3 Cup</option>
                                <option>3/4 Cup</option>
                                <option>1 Cup</option>
                                <option>1.5 Cups</option>
                                <option>2 Cups</option>
                                <option>2.5 Cups</option>
                                <option>3 Cups</option>
                                <option>3.5 Cups</option>
                                <option>4 Cups</option>
                                <option>4.5 Cups</option>
                                <option>5 Cups</option>
                                <option>6 Cups</option>
                                <option>7 Cups</option>
                                <option>8 Cups</option>
                                <option>9 Cups</option>
                                <option>10 Cups</option>
                                <option>11 Cups</option>
                                <option>12 Cups</option>
                              </Input>
                            </FormGroup>
                          </Collapse>
                          <br />
                          <Button
                            className='btn-icon'
                            color='info'
                            onClick={() => {
                              if (algacidesOpen) {
                                setFieldValue('ammonia', '');
                                setFieldValue('copperBased', '');
                                setFieldValue('polyQuat', '');
                                setFieldValue('copperBlend', '');
                              }
                              setAlgacidesOpen(!algacidesOpen);
                            }}
                            block
                          >
                            {algacidesOpen ? (
                              <Fragment>
                                <span className='btn-inner--icon'>
                                  <i className='fas fa-minus'></i>
                                </span>
                                <span className='btn-inner--text'>
                                  Algacides
                                </span>
                              </Fragment>
                            ) : (
                              <Fragment>
                                <span className='btn-inner--icon'>
                                  <i className='fas fa-plus'></i>
                                </span>
                                <span className='btn-inner--text'>
                                  Algacides
                                </span>
                              </Fragment>
                            )}
                          </Button>

                          <Collapse isOpen={algacidesOpen}>
                            <FormGroup>
                              <Label className='form-control-label'>
                                Ammonia Based Liquid Algacide
                              </Label>
                              <Input
                                type='select'
                                name='ammonia'
                                value={values.ammonia}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>No Ammonia Algacide Added</option>

                                <option>2 Ounces</option>
                                <option>4 Ounces</option>
                                <option>6 Ounces</option>
                                <option>8 Ounces</option>
                                <option>10 Ounces</option>
                                <option>12 Ounces</option>
                                <option>14 Ounces</option>
                                <option>16 Ounces</option>
                                <option>18 Ounces</option>
                                <option>20 Ounces</option>
                                <option>22 Ounces</option>
                                <option>24 Ounces</option>
                                <option>26 Ounces</option>
                                <option>28 Ounces</option>
                                <option>30 Ounces</option>
                                <option>32 Ounces</option>
                              </Input>
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>
                                Copper Based Liquid Algacide
                              </Label>
                              <Input
                                type='select'
                                name='copperBased'
                                value={values.copperBased}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>No Copper Algacide Added</option>

                                <option>2 Ounces</option>
                                <option>4 Ounces</option>
                                <option>6 Ounces</option>
                                <option>8 Ounces</option>
                                <option>10 Ounces</option>
                                <option>12 Ounces</option>
                                <option>14 Ounces</option>
                                <option>16 Ounces</option>
                                <option>18 Ounces</option>
                                <option>20 Ounces</option>
                                <option>22 Ounces</option>
                                <option>24 Ounces</option>
                                <option>26 Ounces</option>
                                <option>28 Ounces</option>
                                <option>30 Ounces</option>
                                <option>32 Ounces</option>
                              </Input>
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>
                                PolyQuat Based Liquid Algacide
                              </Label>
                              <Input
                                type='select'
                                name='polyQuat'
                                value={values.polyQuat}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>No PolyQuat Algacide Added</option>

                                <option>2 Ounces</option>
                                <option>4 Ounces</option>
                                <option>6 Ounces</option>
                                <option>8 Ounces</option>
                                <option>10 Ounces</option>
                                <option>12 Ounces</option>
                                <option>14 Ounces</option>
                                <option>16 Ounces</option>
                                <option>18 Ounces</option>
                                <option>20 Ounces</option>
                                <option>22 Ounces</option>
                                <option>24 Ounces</option>
                                <option>26 Ounces</option>
                                <option>28 Ounces</option>
                                <option>30 Ounces</option>
                                <option>32 Ounces</option>
                                <option>48 Ounces</option>
                                <option>64 Ounces</option>
                                <option>96 Ounces</option>
                              </Input>
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>
                                Copper/PolyQuat Blend Liquid Algacide (Aqua
                                Pure)
                              </Label>
                              <Input
                                type='select'
                                name='copperBlend'
                                value={values.copperBlend}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>
                                  No Copper/PolyQuat Blend Algacide Added
                                </option>

                                <option>2 Ounces</option>
                                <option>4 Ounces</option>
                                <option>6 Ounces</option>
                                <option>8 Ounces</option>
                                <option>10 Ounces</option>
                                <option>12 Ounces</option>
                                <option>14 Ounces</option>
                                <option>16 Ounces</option>
                                <option>18 Ounces</option>
                                <option>20 Ounces</option>
                                <option>22 Ounces</option>
                                <option>24 Ounces</option>
                                <option>26 Ounces</option>
                                <option>28 Ounces</option>
                                <option>30 Ounces</option>
                                <option>32 Ounces</option>
                                <option>48 Ounces</option>
                                <option>64 Ounces</option>
                                <option>96 Ounces</option>
                              </Input>
                            </FormGroup>
                          </Collapse>
                          <br />
                          <Button
                            className='btn-icon'
                            color='info'
                            onClick={() => {
                              if (otherChemsOpen) {
                                setFieldValue('sodaAsh', '');
                                setFieldValue('CalciumChloride', '');
                                setFieldValue('conditioner', '');
                                setFieldValue('sodiumBicar', '');
                                setFieldValue('diatomaceous', '');
                                setFieldValue('diatomaceousAlt', '');
                                setFieldValue('sodiumBro', '');
                                setFieldValue('dryAcid', '');
                                setFieldValue('clarifier', '');
                                setFieldValue('phosphateRemover', '');
                                setFieldValue('salt', '');
                                setFieldValue('enzymes', '');
                                setFieldValue('metalSequester', '');
                                setFieldValue('bromineGran', '');
                                setFieldValue('bromineTab', '');
                                setFieldValue('poolFlocc', '');
                                setFieldValue('borate', '');
                              }
                              setOtherChemsOpen(!otherChemsOpen);
                            }}
                            block
                          >
                            {otherChemsOpen ? (
                              <Fragment>
                                <span className='btn-inner--icon'>
                                  <i className='fas fa-minus'></i>
                                </span>
                                <span className='btn-inner--text'>
                                  Other Chems
                                </span>
                              </Fragment>
                            ) : (
                              <Fragment>
                                <span className='btn-inner--icon'>
                                  <i className='fas fa-plus'></i>
                                </span>
                                <span className='btn-inner--text'>
                                  Other Chems
                                </span>
                              </Fragment>
                            )}
                          </Button>

                          <Collapse isOpen={otherChemsOpen}>
                            <FormGroup>
                              <Label className='form-control-label'>
                                Soda Ash (Sodium Carbonate)
                              </Label>
                              <Input
                                type='select'
                                name='sodaAsh'
                                value={values.sodaAsh}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>No Soda Ash Added</option>
                                <option className='option-heading' disabled>
                                  D.E. Scoop Measurement
                                </option>

                                <option>1/8 D.E. Scoop</option>
                                <option>1/4 D.E. Scoop</option>
                                <option>1/2 D.E. Scoop</option>
                                <option>3/4 D.E. Scoop</option>
                                <option>1 Full D.E. Scoop</option>
                                <option>1.5 D.E. Scoops</option>
                                <option>2 D.E. Scoops</option>
                                <option>3 D.E. Scoops</option>
                                <option>4 D.E. Scoops</option>
                                <option>5 D.E. Scoops</option>
                                <option className='option-heading' disabled>
                                  Ounces Measurement
                                </option>
                                <option>2 Ounces</option>
                                <option>4 Ounces</option>
                                <option>8 Ounces</option>
                                <option>12 Ounces</option>
                                <option>18 Ounces</option>
                                <option>22 Ounces</option>
                                <option>26 Ounces</option>
                                <option>30 Ounces</option>
                                <option>36 Ounces</option>
                                <option className='option-heading' disabled>
                                  Pounds Measurement
                                </option>
                                <option>1/2 Pound</option>
                                <option>1 Pound</option>
                                <option>1.5 Pounds</option>
                                <option>2 Pounds</option>
                                <option>2.5 Pounds</option>
                                <option>3 Pounds</option>
                                <option>3.5 Pounds</option>
                                <option>4 Pounds</option>
                                <option>4.5 Pounds</option>
                                <option>5 Pounds</option>
                                <option>6 Pounds</option>
                                <option>7 Pounds</option>
                                <option>8 Pounds</option>
                                <option>9 Pounds</option>
                                <option>10 Pounds</option>
                                <option className='option-heading' disabled>
                                  Cups Measurement
                                </option>
                                <option>1/8 Cup</option>
                                <option>1/4 Cup</option>
                                <option>1/3 Cup</option>
                                <option>1/2 Cup</option>
                                <option>2/3 Cup</option>
                                <option>3/4 Cup</option>
                                <option>1 Cup</option>
                                <option>1.5 Cups</option>
                                <option>2 Cups</option>
                                <option>2.5 Cups</option>
                                <option>3 Cups</option>
                                <option>3.5 Cups</option>
                                <option>4 Cups</option>
                                <option>4.5 Cups</option>
                                <option>5 Cups</option>
                                <option>6 Cups</option>
                                <option>7 Cups</option>
                                <option>8 Cups</option>
                                <option>9 Cups</option>
                                <option>10 Cups</option>
                                <option>11 Cups</option>
                                <option>12 Cups</option>
                              </Input>
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>
                                Calcium Chloride (Hardness+)
                              </Label>
                              <Input
                                type='select'
                                name='CalciumChloride'
                                value={values.CalciumChloride}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>No Calcium Chloride Added</option>
                                <option className='option-heading' disabled>
                                  D.E. Scoop Measurement
                                </option>

                                <option>1/8 D.E. Scoop</option>
                                <option>1/4 D.E. Scoop</option>
                                <option>1/2 D.E. Scoop</option>
                                <option>3/4 D.E. Scoop</option>
                                <option>1 Full D.E. Scoop</option>
                                <option>1.5 D.E. Scoops</option>
                                <option>2 D.E. Scoops</option>
                                <option>3 D.E. Scoops</option>
                                <option>4 D.E. Scoops</option>
                                <option>5 D.E. Scoops</option>
                                <option className='option-heading' disabled>
                                  Ounces Measurement
                                </option>
                                <option>2 Ounces</option>
                                <option>4 Ounces</option>
                                <option>8 Ounces</option>
                                <option>12 Ounces</option>
                                <option>18 Ounces</option>
                                <option>22 Ounces</option>
                                <option>26 Ounces</option>
                                <option>30 Ounces</option>
                                <option>36 Ounces</option>
                                <option className='option-heading' disabled>
                                  Pounds Measurement
                                </option>
                                <option>1/2 Pound</option>
                                <option>1 Pound</option>
                                <option>1.5 Pounds</option>
                                <option>2 Pounds</option>
                                <option>2.5 Pounds</option>
                                <option>3 Pounds</option>
                                <option>3.5 Pounds</option>
                                <option>4 Pounds</option>
                                <option>4.5 Pounds</option>
                                <option>5 Pounds</option>
                                <option>6 Pounds</option>
                                <option>7 Pounds</option>
                                <option>8 Pounds</option>
                                <option>9 Pounds</option>
                                <option>10 Pounds</option>
                                <option className='option-heading' disabled>
                                  Cups Measurement
                                </option>
                                <option>1/8 Cup</option>
                                <option>1/4 Cup</option>
                                <option>1/3 Cup</option>
                                <option>1/2 Cup</option>
                                <option>2/3 Cup</option>
                                <option>3/4 Cup</option>
                                <option>1 Cup</option>
                                <option>1.5 Cups</option>
                                <option>2 Cups</option>
                                <option>2.5 Cups</option>
                                <option>3 Cups</option>
                                <option>3.5 Cups</option>
                                <option>4 Cups</option>
                                <option>4.5 Cups</option>
                                <option>5 Cups</option>
                                <option>6 Cups</option>
                                <option>7 Cups</option>
                                <option>8 Cups</option>
                                <option>9 Cups</option>
                                <option>10 Cups</option>
                                <option>11 Cups</option>
                                <option>12 Cups</option>
                              </Input>
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>
                                Conditioner (Cyanuric Acid)
                              </Label>
                              <Input
                                type='select'
                                name='conditioner'
                                value={values.conditioner}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>No Conditioner Added</option>
                                <option className='option-heading' disabled>
                                  D.E. Scoop Measurement
                                </option>

                                <option>1/8 D.E. Scoop</option>
                                <option>1/4 D.E. Scoop</option>
                                <option>1/2 D.E. Scoop</option>
                                <option>3/4 D.E. Scoop</option>
                                <option>1 Full D.E. Scoop</option>
                                <option>1.5 D.E. Scoops</option>
                                <option>2 D.E. Scoops</option>
                                <option>3 D.E. Scoops</option>
                                <option>4 D.E. Scoops</option>
                                <option>5 D.E. Scoops</option>
                                <option className='option-heading' disabled>
                                  Ounces Measurement
                                </option>
                                <option>2 Ounces</option>
                                <option>4 Ounces</option>
                                <option>8 Ounces</option>
                                <option>12 Ounces</option>
                                <option>18 Ounces</option>
                                <option>22 Ounces</option>
                                <option>26 Ounces</option>
                                <option>30 Ounces</option>
                                <option>36 Ounces</option>
                                <option className='option-heading' disabled>
                                  Pounds Measurement
                                </option>
                                <option>1/2 Pound</option>
                                <option>1 Pound</option>
                                <option>1.5 Pounds</option>
                                <option>2 Pounds</option>
                                <option>2.5 Pounds</option>
                                <option>3 Pounds</option>
                                <option>3.5 Pounds</option>
                                <option>4 Pounds</option>
                                <option>4.5 Pounds</option>
                                <option>5 Pounds</option>
                                <option>6 Pounds</option>
                                <option>7 Pounds</option>
                                <option>8 Pounds</option>
                                <option>9 Pounds</option>
                                <option>10 Pounds</option>
                                <option className='option-heading' disabled>
                                  Cups Measurement
                                </option>
                                <option>1/8 Cup</option>
                                <option>1/4 Cup</option>
                                <option>1/3 Cup</option>
                                <option>1/2 Cup</option>
                                <option>2/3 Cup</option>
                                <option>3/4 Cup</option>
                                <option>1 Cup</option>
                                <option>1.5 Cups</option>
                                <option>2 Cups</option>
                                <option>2.5 Cups</option>
                                <option>3 Cups</option>
                                <option>3.5 Cups</option>
                                <option>4 Cups</option>
                                <option>4.5 Cups</option>
                                <option>5 Cups</option>
                                <option>6 Cups</option>
                                <option>7 Cups</option>
                                <option>8 Cups</option>
                                <option>9 Cups</option>
                                <option>10 Cups</option>
                                <option>11 Cups</option>
                                <option>12 Cups</option>
                              </Input>
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>
                                Sodium Bicarbonate (baking soda)
                              </Label>
                              <Input
                                type='select'
                                name='sodiumBicar'
                                value={values.sodiumBicar}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>No Sodium Bicarbonate Added</option>
                                <option className='option-heading' disabled>
                                  D.E. Scoop Measurement
                                </option>

                                <option>1/8 D.E. Scoop</option>
                                <option>1/4 D.E. Scoop</option>
                                <option>1/2 D.E. Scoop</option>
                                <option>3/4 D.E. Scoop</option>
                                <option>1 Full D.E. Scoop</option>
                                <option>1.5 D.E. Scoops</option>
                                <option>2 D.E. Scoops</option>
                                <option>3 D.E. Scoops</option>
                                <option>4 D.E. Scoops</option>
                                <option>5 D.E. Scoops</option>
                                <option className='option-heading' disabled>
                                  Ounces Measurement
                                </option>
                                <option>2 Ounces</option>
                                <option>4 Ounces</option>
                                <option>8 Ounces</option>
                                <option>12 Ounces</option>
                                <option>18 Ounces</option>
                                <option>22 Ounces</option>
                                <option>26 Ounces</option>
                                <option>30 Ounces</option>
                                <option>36 Ounces</option>
                                <option className='option-heading' disabled>
                                  Pounds Measurement
                                </option>
                                <option>1/2 Pound</option>
                                <option>1 Pound</option>
                                <option>1.5 Pounds</option>
                                <option>2 Pounds</option>
                                <option>2.5 Pounds</option>
                                <option>3 Pounds</option>
                                <option>3.5 Pounds</option>
                                <option>4 Pounds</option>
                                <option>4.5 Pounds</option>
                                <option>5 Pounds</option>
                                <option>6 Pounds</option>
                                <option>7 Pounds</option>
                                <option>8 Pounds</option>
                                <option>9 Pounds</option>
                                <option>10 Pounds</option>
                                <option className='option-heading' disabled>
                                  Cups Measurement
                                </option>
                                <option>1/8 Cup</option>
                                <option>1/4 Cup</option>
                                <option>1/3 Cup</option>
                                <option>1/2 Cup</option>
                                <option>2/3 Cup</option>
                                <option>3/4 Cup</option>
                                <option>1 Cup</option>
                                <option>1.5 Cups</option>
                                <option>2 Cups</option>
                                <option>2.5 Cups</option>
                                <option>3 Cups</option>
                                <option>3.5 Cups</option>
                                <option>4 Cups</option>
                                <option>4.5 Cups</option>
                                <option>5 Cups</option>
                                <option>6 Cups</option>
                                <option>7 Cups</option>
                                <option>8 Cups</option>
                                <option>9 Cups</option>
                                <option>10 Cups</option>
                                <option>11 Cups</option>
                                <option>12 Cups</option>
                              </Input>
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>
                                Diatomaceous Earth
                              </Label>
                              <Input
                                type='select'
                                name='diatomaceous'
                                value={values.diatomaceous}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>No Diatomaceous Earth Added</option>
                                <option className='option-heading' disabled>
                                  D.E. Scoop Measurement
                                </option>

                                <option>1/8 D.E. Scoop</option>
                                <option>1/4 D.E. Scoop</option>
                                <option>1/2 D.E. Scoop</option>
                                <option>3/4 D.E. Scoop</option>
                                <option>1 Full D.E. Scoop</option>
                                <option>1.5 D.E. Scoops</option>
                                <option>2 D.E. Scoops</option>
                                <option>3 D.E. Scoops</option>
                                <option>4 D.E. Scoops</option>
                                <option>5 D.E. Scoops</option>
                                <option className='option-heading' disabled>
                                  Ounces Measurement
                                </option>
                                <option>2 Ounces</option>
                                <option>4 Ounces</option>
                                <option>8 Ounces</option>
                                <option>12 Ounces</option>
                                <option>18 Ounces</option>
                                <option>22 Ounces</option>
                                <option>26 Ounces</option>
                                <option>30 Ounces</option>
                                <option>36 Ounces</option>
                                <option className='option-heading' disabled>
                                  Pounds Measurement
                                </option>
                                <option>1/2 Pound</option>
                                <option>1 Pound</option>
                                <option>1.5 Pounds</option>
                                <option>2 Pounds</option>
                                <option>2.5 Pounds</option>
                                <option>3 Pounds</option>
                                <option>3.5 Pounds</option>
                                <option>4 Pounds</option>
                                <option>4.5 Pounds</option>
                                <option>5 Pounds</option>
                                <option>6 Pounds</option>
                                <option>7 Pounds</option>
                                <option>8 Pounds</option>
                                <option>9 Pounds</option>
                                <option>10 Pounds</option>
                              </Input>
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>
                                Diatomaceous Earth Alternative (Aqua Perl,
                                FiberClear etc)
                              </Label>
                              <Input
                                type='select'
                                name='diatomaceousAlt'
                                value={values.diatomaceousAlt}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>
                                  No Diatomaceous Earth Alternative Added
                                </option>
                                <option className='option-heading' disabled>
                                  D.E. Scoop Measurement
                                </option>

                                <option>1/8 D.E. Scoop</option>
                                <option>1/4 D.E. Scoop</option>
                                <option>1/2 D.E. Scoop</option>
                                <option>3/4 D.E. Scoop</option>
                                <option>1 Full D.E. Scoop</option>
                                <option>1.5 D.E. Scoops</option>
                                <option>2 D.E. Scoops</option>
                                <option>3 D.E. Scoops</option>
                                <option>4 D.E. Scoops</option>
                                <option>5 D.E. Scoops</option>
                                <option className='option-heading' disabled>
                                  Ounces Measurement
                                </option>
                                <option>2 Ounces</option>
                                <option>4 Ounces</option>
                                <option>8 Ounces</option>
                                <option>12 Ounces</option>
                                <option>18 Ounces</option>
                                <option>22 Ounces</option>
                                <option>26 Ounces</option>
                                <option>30 Ounces</option>
                                <option>36 Ounces</option>
                                <option className='option-heading' disabled>
                                  Pounds Measurement
                                </option>
                                <option>1/2 Pound</option>
                                <option>1 Pound</option>
                                <option>1.5 Pounds</option>
                                <option>2 Pounds</option>
                                <option>2.5 Pounds</option>
                                <option>3 Pounds</option>
                                <option>3.5 Pounds</option>
                                <option>4 Pounds</option>
                                <option>4.5 Pounds</option>
                                <option>5 Pounds</option>
                                <option>6 Pounds</option>
                                <option>7 Pounds</option>
                                <option>8 Pounds</option>
                                <option>9 Pounds</option>
                                <option>10 Pounds</option>
                              </Input>
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>
                                Sodium Bromide
                              </Label>
                              <Input
                                type='select'
                                name='sodiumBro'
                                value={values.sodiumBro}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>No Sodium Bromide Added</option>
                                <option className='option-heading' disabled>
                                  D.E. Scoop Measurement
                                </option>

                                <option>1/8 D.E. Scoop</option>
                                <option>1/4 D.E. Scoop</option>
                                <option>1/2 D.E. Scoop</option>
                                <option>3/4 D.E. Scoop</option>
                                <option>1 Full D.E. Scoop</option>
                                <option>1.5 D.E. Scoops</option>
                                <option>2 D.E. Scoops</option>
                                <option>3 D.E. Scoops</option>
                                <option>4 D.E. Scoops</option>
                                <option>5 D.E. Scoops</option>
                                <option className='option-heading' disabled>
                                  Ounces Measurement
                                </option>
                                <option>2 Ounces</option>
                                <option>4 Ounces</option>
                                <option>8 Ounces</option>
                                <option>12 Ounces</option>
                                <option>18 Ounces</option>
                                <option>22 Ounces</option>
                                <option>26 Ounces</option>
                                <option>30 Ounces</option>
                                <option>36 Ounces</option>
                                <option className='option-heading' disabled>
                                  Pounds Measurement
                                </option>
                                <option>1/2 Pound</option>
                                <option>1 Pound</option>
                                <option>1.5 Pounds</option>
                                <option>2 Pounds</option>
                                <option>2.5 Pounds</option>
                                <option>3 Pounds</option>
                                <option>3.5 Pounds</option>
                                <option>4 Pounds</option>
                                <option>4.5 Pounds</option>
                                <option>5 Pounds</option>
                                <option>6 Pounds</option>
                                <option>7 Pounds</option>
                                <option>8 Pounds</option>
                                <option>9 Pounds</option>
                                <option>10 Pounds</option>
                              </Input>
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>
                                Dry Acid
                              </Label>
                              <Input
                                type='select'
                                name='dryAcid'
                                value={values.dryAcid}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>No Dry Acid Added</option>
                                <option className='option-heading' disabled>
                                  D.E. Scoop Measurement
                                </option>

                                <option>1/8 D.E. Scoop</option>
                                <option>1/4 D.E. Scoop</option>
                                <option>1/2 D.E. Scoop</option>
                                <option>3/4 D.E. Scoop</option>
                                <option>1 Full D.E. Scoop</option>
                                <option>1.5 D.E. Scoops</option>
                                <option>2 D.E. Scoops</option>
                                <option>3 D.E. Scoops</option>
                                <option>4 D.E. Scoops</option>
                                <option>5 D.E. Scoops</option>
                                <option className='option-heading' disabled>
                                  Ounces Measurement
                                </option>
                                <option>2 Ounces</option>
                                <option>4 Ounces</option>
                                <option>8 Ounces</option>
                                <option>12 Ounces</option>
                                <option>18 Ounces</option>
                                <option>22 Ounces</option>
                                <option>26 Ounces</option>
                                <option>30 Ounces</option>
                                <option>36 Ounces</option>
                                <option className='option-heading' disabled>
                                  Pounds Measurement
                                </option>
                                <option>1/2 Pound</option>
                                <option>1 Pound</option>
                                <option>1.5 Pounds</option>
                                <option>2 Pounds</option>
                                <option>2.5 Pounds</option>
                                <option>3 Pounds</option>
                                <option>3.5 Pounds</option>
                                <option>4 Pounds</option>
                                <option>4.5 Pounds</option>
                                <option>5 Pounds</option>
                                <option>6 Pounds</option>
                                <option>7 Pounds</option>
                                <option>8 Pounds</option>
                                <option>9 Pounds</option>
                                <option>10 Pounds</option>
                              </Input>
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>
                                Clarifier
                              </Label>
                              <Input
                                type='select'
                                name='clarifier'
                                value={values.clarifier}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>No Clarifier Added</option>
                                <option>2 Ounces</option>
                                <option>4 Ounces</option>
                                <option>6 Ounces</option>
                                <option>8 Ounces</option>
                                <option>10 Ounces</option>
                                <option>12 Ounces</option>
                                <option>14 Ounces</option>
                                <option>16 Ounces</option>
                                <option>18 Ounces</option>
                                <option>20 Ounces</option>
                                <option>22 Ounces</option>
                                <option>24 Ounces</option>
                                <option>26 Ounces</option>
                                <option>28 Ounces</option>
                                <option>30 Ounces</option>
                                <option>32 Ounces</option>
                                <option>48 Ounces</option>
                                <option>64 Ounces</option>
                                <option>96 Ounces</option>
                              </Input>
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>
                                Phosphate Remover
                              </Label>
                              <Input
                                type='select'
                                name='phosphateRemover'
                                value={values.phosphateRemover}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>No Phosphate Remover Added</option>
                                <option>2 Ounces</option>
                                <option>4 Ounces</option>
                                <option>6 Ounces</option>
                                <option>8 Ounces</option>
                                <option>10 Ounces</option>
                                <option>12 Ounces</option>
                                <option>14 Ounces</option>
                                <option>16 Ounces</option>
                                <option>18 Ounces</option>
                                <option>20 Ounces</option>
                                <option>22 Ounces</option>
                                <option>24 Ounces</option>
                                <option>26 Ounces</option>
                                <option>28 Ounces</option>
                                <option>30 Ounces</option>
                                <option>32 Ounces</option>
                                <option>48 Ounces</option>
                                <option>64 Ounces</option>
                                <option>96 Ounces</option>
                              </Input>
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>Salt</Label>
                              <Input
                                type='select'
                                name='salt'
                                value={values.salt}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>No Salt Added</option>
                                <option>1 bag of Salt</option>
                                <option>2 bags of Salt</option>
                                <option>3 bags of Salt</option>
                                <option>4 bags of Salt</option>
                                <option>5 bags of Salt</option>
                                <option>6 bags of Salt</option>
                                <option>7 bags of Salt</option>
                                <option>8 bags of Salt</option>
                                <option>9 bags of Salt</option>
                                <option>10 bags of Salt</option>
                                <option>11 bags of Salt</option>
                                <option>12 bags of Salt</option>
                                <option>13 bags of Salt</option>
                                <option>14 bags of Salt</option>
                                <option>15 bags of Salt</option>
                                <option>16 bags of Salt</option>
                                <option>17 bags of Salt</option>
                                <option>18 bags of Salt</option>
                                <option>19 bags of Salt</option>
                                <option>20 bags of Salt</option>
                              </Input>
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>
                                Pool Enzymes (Pool Perfect, Pool Zyme etc)
                              </Label>
                              <Input
                                type='select'
                                name='enzymes'
                                value={values.enzymes}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>No Pool Enzymes Added</option>
                                <option>2 Ounces</option>
                                <option>4 Ounces</option>
                                <option>6 Ounces</option>
                                <option>8 Ounces</option>
                                <option>10 Ounces</option>
                                <option>12 Ounces</option>
                                <option>14 Ounces</option>
                                <option>16 Ounces</option>
                                <option>18 Ounces</option>
                                <option>20 Ounces</option>
                                <option>22 Ounces</option>
                                <option>24 Ounces</option>
                                <option>26 Ounces</option>
                                <option>28 Ounces</option>
                                <option>30 Ounces</option>
                                <option>32 Ounces</option>
                                <option>48 Ounces</option>
                                <option>64 Ounces</option>
                                <option>96 Ounces</option>
                              </Input>
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>
                                Metal Sequestering Agent
                              </Label>
                              <Input
                                type='select'
                                name='metalSequester'
                                value={values.metalSequester}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>No Sequestering Agent Added</option>
                                <option>2 Ounces</option>
                                <option>4 Ounces</option>
                                <option>6 Ounces</option>
                                <option>8 Ounces</option>
                                <option>10 Ounces</option>
                                <option>12 Ounces</option>
                                <option>14 Ounces</option>
                                <option>16 Ounces</option>
                                <option>18 Ounces</option>
                                <option>20 Ounces</option>
                                <option>22 Ounces</option>
                                <option>24 Ounces</option>
                                <option>26 Ounces</option>
                                <option>28 Ounces</option>
                                <option>30 Ounces</option>
                                <option>32 Ounces</option>
                                <option>48 Ounces</option>
                                <option>64 Ounces</option>
                                <option>96 Ounces</option>
                                <option>128 Ounces</option>
                              </Input>
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>
                                Bromine Granular
                              </Label>
                              <Input
                                type='select'
                                name='bromineGran'
                                value={values.bromineGran}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>No Bromine Granular Added</option>
                                <option>2 Ounces</option>
                                <option>4 Ounces</option>
                                <option>6 Ounces</option>
                                <option>8 Ounces</option>
                                <option>10 Ounces</option>
                                <option>12 Ounces</option>
                                <option>14 Ounces</option>
                                <option>16 Ounces</option>
                                <option>18 Ounces</option>
                                <option>20 Ounces</option>
                                <option>22 Ounces</option>
                                <option>24 Ounces</option>
                                <option>26 Ounces</option>
                                <option>28 Ounces</option>
                                <option>30 Ounces</option>
                                <option>32 Ounces</option>
                                <option>48 Ounces</option>
                                <option>64 Ounces</option>
                                <option>96 Ounces</option>
                                <option>128 Ounces</option>
                              </Input>
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>
                                Bromine Tablets
                              </Label>
                              <Input
                                type='select'
                                name='bromineTab'
                                value={values.bromineTab}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>No Bromine Tablets Used</option>
                                <option>1 Tab</option>
                                <option>2 Tabs</option>
                                <option>3 Tabs</option>
                                <option>4 Tabs</option>
                                <option>5 Tabs</option>
                                <option>6 Tabs</option>
                                <option>7 Tabs</option>
                                <option>8 Tabs</option>
                                <option>9 Tabs</option>
                                <option>10 Tabs</option>
                                <option>11 Tabs</option>
                                <option>12 Tabs</option>
                                <option>13 Tabs</option>
                                <option>14 Tabs</option>
                                <option>15 Tabs</option>
                                <option>16 Tabs</option>
                                <option>17 Tabs</option>
                                <option>18 Tabs</option>
                                <option>19 Tabs</option>
                                <option>20 Tabs</option>
                                <option>21 Tabs</option>
                                <option>22 Tabs</option>
                                <option>23 Tabs</option>
                                <option>24 Tabs</option>
                                <option>25 Tabs</option>
                                <option>26 Tabs</option>
                                <option>27 Tabs</option>
                                <option>28 Tabs</option>
                                <option>29 Tabs</option>
                                <option>30 Tabs</option>
                              </Input>
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>
                                Pool Flocculant
                              </Label>
                              <Input
                                type='select'
                                name='poolFlocc'
                                value={values.poolFlocc}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>No Pool Flocculant Added</option>
                                <option>2 Ounces</option>
                                <option>4 Ounces</option>
                                <option>6 Ounces</option>
                                <option>8 Ounces</option>
                                <option>10 Ounces</option>
                                <option>12 Ounces</option>
                                <option>14 Ounces</option>
                                <option>16 Ounces</option>
                                <option>18 Ounces</option>
                                <option>20 Ounces</option>
                                <option>22 Ounces</option>
                                <option>24 Ounces</option>
                                <option>26 Ounces</option>
                                <option>28 Ounces</option>
                                <option>30 Ounces</option>
                                <option>32 Ounces</option>
                                <option>48 Ounces</option>
                                <option>64 Ounces</option>
                                <option>96 Ounces</option>
                                <option>128 Ounces</option>
                              </Input>
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>
                                Borate
                              </Label>
                              <Input
                                type='select'
                                name='borate'
                                value={values.borate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>No Borate Added</option>
                                <option className='option-heading' disabled>
                                  D.E. Scoop Measurement
                                </option>

                                <option>1/8 D.E. Scoop</option>
                                <option>1/4 D.E. Scoop</option>
                                <option>1/2 D.E. Scoop</option>
                                <option>3/4 D.E. Scoop</option>
                                <option>1 Full D.E. Scoop</option>
                                <option>1.5 D.E. Scoops</option>
                                <option>2 D.E. Scoops</option>
                                <option>3 D.E. Scoops</option>
                                <option>4 D.E. Scoops</option>
                                <option>5 D.E. Scoops</option>
                                <option className='option-heading' disabled>
                                  Ounces Measurement
                                </option>
                                <option>2 Ounces</option>
                                <option>4 Ounces</option>
                                <option>8 Ounces</option>
                                <option>12 Ounces</option>
                                <option>18 Ounces</option>
                                <option>22 Ounces</option>
                                <option>26 Ounces</option>
                                <option>30 Ounces</option>
                                <option>36 Ounces</option>
                                <option className='option-heading' disabled>
                                  Pounds Measurement
                                </option>
                                <option>1/2 Pound</option>
                                <option>1 Pound</option>
                                <option>1.5 Pounds</option>
                                <option>2 Pounds</option>
                                <option>2.5 Pounds</option>
                                <option>3 Pounds</option>
                                <option>3.5 Pounds</option>
                                <option>4 Pounds</option>
                                <option>4.5 Pounds</option>
                                <option>5 Pounds</option>
                                <option>6 Pounds</option>
                                <option>7 Pounds</option>
                                <option>8 Pounds</option>
                                <option>9 Pounds</option>
                                <option>10 Pounds</option>
                                <option>11 Pounds</option>
                                <option>12 Pounds</option>
                                <option>13 Pounds</option>
                                <option>14 Pounds</option>
                                <option>15 Pounds</option>
                                <option>16 Pounds</option>
                                <option>17 Pounds</option>
                                <option>18 Pounds</option>
                                <option>19 Pounds</option>
                                <option>20 Pounds</option>
                                <option>21 Pounds</option>
                                <option>22 Pounds</option>
                                <option>23 Pounds</option>
                                <option>24 Pounds</option>
                                <option>25 Pounds</option>
                                <option>26 Pounds</option>
                                <option>27 Pounds</option>
                                <option>28 Pounds</option>
                                <option>29 Pounds</option>
                                <option>30 Pounds</option>
                                <option>31 Pounds</option>
                                <option>32 Pounds</option>
                                <option>33 Pounds</option>
                                <option>34 Pounds</option>
                                <option>35 Pounds</option>
                                <option>36 Pounds</option>
                                <option>37 Pounds</option>
                                <option>38 Pounds</option>
                                <option>39 Pounds</option>
                                <option>40 Pounds</option>
                                <option>41 Pounds</option>
                                <option>42 Pounds</option>
                                <option>43 Pounds</option>
                                <option>44 Pounds</option>
                                <option>45 Pounds</option>
                                <option>46 Pounds</option>
                                <option>47 Pounds</option>
                                <option>48 Pounds</option>
                                <option>49 Pounds</option>
                                <option>50 Pounds</option>
                                <option className='option-heading' disabled>
                                  Cups Measurement
                                </option>
                                <option>1/8 Cup</option>
                                <option>1/4 Cup</option>
                                <option>1/3 Cup</option>
                                <option>1/2 Cup</option>
                                <option>2/3 Cup</option>
                                <option>3/4 Cup</option>
                                <option>1 Cup</option>
                                <option>1.5 Cups</option>
                                <option>2 Cups</option>
                                <option>2.5 Cups</option>
                                <option>3 Cups</option>
                                <option>3.5 Cups</option>
                                <option>4 Cups</option>
                                <option>4.5 Cups</option>
                                <option>5 Cups</option>
                                <option>6 Cups</option>
                                <option>7 Cups</option>
                                <option>8 Cups</option>
                                <option>9 Cups</option>
                                <option>10 Cups</option>
                                <option>11 Cups</option>
                                <option>12 Cups</option>
                              </Input>
                            </FormGroup>
                          </Collapse>
                        </FormGroup>
                      </Fragment>
                    )
                  )}

                  <Fragment>
                    {notesView && !showChems && (
                      <Fragment>
                        <FormGroup>
                          <Label className='form-control-label'>
                            Log Images (Emailed to Customer)
                          </Label>
                          <ImageUploader
                            withIcon={true}
                            buttonText='Choose images'
                            onChange={onDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                            withPreview={true}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className='form-control-label'>
                            Private Notes (Only Visible to Company)
                          </Label>
                          <Input
                            type='textarea'
                            name='privateNote'
                            onChange={handleChange}
                            value={values.privateNote}
                            onBlur={handleBlur}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className='form-control-label'>
                            Note To Customer (Emailed to Customer)
                          </Label>
                          <Input
                            type='select'
                            name='publicNote'
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option disabled selected>
                              Click Here to Select Quick Note
                            </option>
                            <option>
                              Please add water to your pool immediately.
                            </option>
                            <option>
                              Unable to service the pool due to the gate being
                              locked.
                            </option>
                            <option>
                              Unable to service the pool due to the gate being
                              locked.
                            </option>
                            <option>
                              Repairs needed, we were unable to service the pool
                              due to repairs being needed.
                            </option>
                            <option>
                              Your pool was shocked, no swimming for at least 24
                              hours.
                            </option>
                            <option>No swimming for 30 minutes.</option>
                            <option>No swimming for 1 hour.</option>
                            <option>No swimming for 2 hours.</option>
                            <option>No swimming for 3 hours.</option>
                            <option>No swimming for 4 hours.</option>
                            <option>No swimming for 5 hours.</option>
                            <option>No swimming for 6 hours.</option>
                          </Input>
                          <br />
                          <Input
                            type='textarea'
                            name='publicNote'
                            onChange={handleChange}
                            value={values.publicNote}
                            onBlur={handleBlur}
                          />
                        </FormGroup>

                        <Button
                          color='info'
                          block
                          onClick={() => {
                            setShowRepair(!showRepair);
                            setFieldValue('repairOrder', !values.repairOrder);
                          }}
                        >
                          {!showRepair ? <span>Add</span> : <span>Cancel</span>}{' '}
                          Repair Order
                        </Button>
                        <Collapse isOpen={showRepair}>
                          <Fragment>
                            <FormGroup>
                              <Label className='form-control-label'>
                                Repair Type
                              </Label>
                              <Input
                                type='select'
                                name='repairType'
                                value={values.repairType}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>
                                  Repair Request (Submit a Order for Future
                                  Repair)
                                </option>
                                <option>
                                  Repair Request (Requires Part Purchase /
                                  Office Approval)
                                </option>
                                <option>Repair Completed</option>
                              </Input>
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>
                                Notify Customer?
                              </Label>{' '}
                              <br />
                              <label className='custom-toggle'>
                                <Input
                                  type='checkbox'
                                  name='repairNotify'
                                  value={values.repairNotify}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <span
                                  className='custom-toggle-slider rounded-circle'
                                  data-label-off='No'
                                  data-label-on='Yes'
                                ></span>
                              </label>
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>
                                Enter Description of Repair (May be sent to
                                customer)
                              </Label>
                              <Input
                                type='textarea'
                                name='repairDescription'
                                value={values.repairDescription}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormGroup>

                            <FormGroup>
                              <Label className='form-control-label'>
                                Note for Office (Company Only)
                              </Label>
                              <Input
                                type='textarea'
                                name='repairOfficeNote'
                                value={values.repairOfficeNote}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormGroup>
                            {/* <Label className='form-control-label'>
                              Add Picture(s) of Item(s) That Need Repair
                            </Label>
                            <ImageUploader
                              withIcon={true}
                              buttonText='Choose images'
                              onChange={onDropRepair}
                              imgExtension={[
                                '.jpg',
                                '.gif',
                                '.png',
                                '.gif'
                              ]}
                              maxFileSize={5242880}
                              withPreview={true}
                            /> */}
                          </Fragment>
                        </Collapse>
                        <br />
                      </Fragment>
                    )}
                  </Fragment>

                  <Fragment>
                    {!showChems && !notesView && (
                      <Button
                        color='primary'
                        className='btn-icon'
                        block
                        onClick={() => {
                          setShowChems(!showChems);
                        }}
                      >
                        <span className='btn-inner--text'>Next</span>
                        <span className='btn-inner--icon'>
                          <i className='ni ni-bold-right'></i>
                        </span>
                      </Button>
                    )}
                  </Fragment>

                  <Fragment>
                    {!showChems && notesView && (
                      <Row>
                        <Col>
                          <Button
                            color='secondary'
                            className='btn-icon'
                            block
                            onClick={() => {
                              setShowChems(!showChems);
                              setNotesView(!notesView);
                            }}
                          >
                            <span className='btn-inner--icon'>
                              <i className='ni ni-bold-left'></i>
                            </span>
                            <span className='btn-inner--text'>Back</span>
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            color='success'
                            className='btn-icon'
                            block
                            type='submit'
                            onClick={handleSubmit}
                          >
                            <span className='btn-inner--icon'>
                              <i className='fas fa-check-circle'></i>
                            </span>
                            {isProcessing ? (
                              <span className='btn-inner--text'>
                                <SpinnerCircular
                                  size={24}
                                  thickness={180}
                                  speed={100}
                                  color='rgba(57, 125, 172, 1)'
                                  secondaryColor='rgba(0, 0, 0, 0.44)'
                                />
                                Processing...
                              </span>
                            ) : (
                              <span className='btn-inner--text'>
                                Complete Service
                              </span>
                            )}
                          </Button>
                        </Col>
                      </Row>
                    )}
                  </Fragment>

                  <Fragment>
                    {showChems && !notesView && (
                      <Row>
                        <Col>
                          <Button
                            color='secondary'
                            className='btn-icon'
                            block
                            onClick={() => {
                              setShowChems(!showChems);
                            }}
                          >
                            <span className='btn-inner--icon'>
                              <i className='ni ni-bold-left'></i>
                            </span>
                            <span className='btn-inner--text'>Back</span>
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            color='primary'
                            className='btn-icon'
                            block
                            onClick={() => {
                              setNotesView(!notesView);
                              setShowChems(!showChems);
                            }}
                          >
                            <span className='btn-inner--text'>Next</span>
                            <span className='btn-inner--icon'>
                              <i className='ni ni-bold-right'></i>
                            </span>
                          </Button>
                        </Col>
                      </Row>
                    )}
                  </Fragment>
                </Form>
              </Fragment>
            )}
          />
        </ModalBody>
      </Modal>

      <Col md='8'>
        <Card className='shadow'>
          <CardHeader>
            <h3>{routeDay}'s Route</h3>
            {/* <Progress
              animated
              value={
                (100 *
                  routeList.filter(c =>
                    c.type !== 'Work Order' &&
                    moment(c.customer.lastServiced).isSame(Date.now(), 'day') &&
                    (c.customer.scheduledDay === routeDay) === 'Today'
                      ? moment(new Date()).format('dddd')
                      : (routeDay && c.customer.lastServiced !== undefined) ||
                        (c.type === 'Work Order' &&
                          moment(c.scheduledDate).isSame(Date.now(), 'day') &&
                          c.status === 'Completed')
                  ).length) /
                routeList.length
              }
            /> */}
          </CardHeader>
          <CardBody>
            <ListGroup>
              {isAuthenticated && routeList && (
                <Fragment>
                  {routeList.map((customer, index) => (
                    <Fragment key={customer._id}>
                      {(customer.customer.scheduledDay === routeDay) === 'Today'
                        ? moment(new Date()).format('dddd')
                        : routeDay && (
                            <ListGroupItem>
                              <Row>
                                <Col md='2'>
                                  {(moment(
                                    customer.customer.lastServiced
                                  ).isSame(Date.now(), 'day') &&
                                    customer.type !== 'Work Order' &&
                                    customer.customer.lastServiced !=
                                      undefined) ||
                                  (customer.type === 'Work Order' &&
                                    customer.status === 'Completed') ? (
                                    <div className='route-box bg-green text-center'>
                                      <h2>
                                        <i className='fas fa-check-circle'></i>
                                      </h2>
                                    </div>
                                  ) : (
                                    <div className='route-box text-center'>
                                      {customer.customer.unableService !==
                                        undefined &&
                                      moment(
                                        customer.customer.unableService
                                      ).isSame(Date.now(), 'day') ? (
                                        <i className='fas fa-times-circle color-white'></i>
                                      ) : (
                                        <h2>{index + 1}</h2>
                                      )}
                                    </div>
                                  )}
                                </Col>
                                <Col md='8'>
                                  <div className='text-center'>
                                    <h3>
                                      {customer.customer.firstName}{' '}
                                      {customer.customer.lastName}{' '}
                                      {customer.type === 'Work Order' ||
                                      (customer.customer.scheduledDay !==
                                        routeDay &&
                                        customer.customer.scheduledDay !==
                                          moment(Date.now()).format('dddd')) ? (
                                        <Badge color='warning'>
                                          Work Order
                                        </Badge>
                                      ) : (
                                        <Badge color='success'>
                                          Service Call
                                        </Badge>
                                      )}
                                    </h3>
                                    <p>{customer.customer.serviceAddress}</p>
                                    {(moment(
                                      customer.customer.lastServiced
                                    ).isSame(Date.now(), 'day') &&
                                      customer.customer.lastServiced !=
                                        undefined &&
                                      customer.type !== 'Work Order') ||
                                    (routeDay !== 'Today' &&
                                      routeDay !==
                                        moment(new Date()).format('dddd') &&
                                      customer.type !== 'Work Order') ? (
                                      <span></span>
                                    ) : (
                                      <Row>
                                        {(customer.type === 'Work Order' &&
                                          customer.status === 'Completed') ||
                                        (customer.type !== 'Work Order' &&
                                          customer.customer.unableService !==
                                            undefined &&
                                          moment(
                                            customer.customer.unableService
                                          ).isSame(Date.now(), 'day')) ? (
                                          <Fragment></Fragment>
                                        ) : (
                                          <Fragment>
                                            <Col>
                                              {' '}
                                              <Button
                                                className='btn-icon mgn-btm-10'
                                                color='success'
                                                href={`https://www.google.com/maps/dir/?api=1&origin=Your+Location&destination=${customer.customer.serviceLat},${customer.customer.serviceLng}`}
                                                target='_blank'
                                              >
                                                <span className='btn-inner--icon'>
                                                  <i className='fas fa-directions'></i>
                                                </span>
                                                <span className='btn-inner--text'>
                                                  GPS To Stop
                                                </span>
                                              </Button>
                                            </Col>
                                            <Col>
                                              {' '}
                                              <Button
                                                className='btn-icon mgn-btm-10'
                                                color='primary'
                                                onClick={() => {
                                                  getChecklist(
                                                    customer.customer._id
                                                  );
                                                  getCustomerServiceNotes(
                                                    customer.customer._id
                                                  );

                                                  setLogModal({
                                                    isServiceInfoOpen: true,
                                                    active:
                                                      customer.customer._id,
                                                    activeName:
                                                      customer.customer
                                                        .firstName +
                                                      ' ' +
                                                      customer.customer
                                                        .lastName,
                                                    customerLock:
                                                      customer.customer
                                                        .gatecode,
                                                    equipment:
                                                      customer.customer
                                                        .poolEquipment,
                                                    type: customer.type
                                                      ? customer.type
                                                      : 'Service',
                                                    index:
                                                      customer.type ===
                                                      'Work Order'
                                                        ? routeList.findIndex(
                                                            e =>
                                                              e._id.toString() ===
                                                              customer._id.toString()
                                                          )
                                                        : null,
                                                    serviceDay:
                                                      customer.customer
                                                        .scheduledDay
                                                  });
                                                }}
                                              >
                                                <span className='btn-inner--icon'>
                                                  <i className='fas fa-tint'></i>
                                                </span>
                                                <span className='btn-inner--text'>
                                                  Start Service
                                                </span>
                                              </Button>
                                            </Col>
                                          </Fragment>
                                        )}
                                      </Row>
                                    )}
                                  </div>
                                </Col>
                              </Row>
                            </ListGroupItem>
                          )}
                    </Fragment>
                  ))}
                </Fragment>
              )}
            </ListGroup>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

RouteViewer.propTypes = {
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
})(RouteViewer);
