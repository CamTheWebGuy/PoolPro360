import React, { useState, useEffect, Fragment, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {
  getChecklist,
  updateChecklist,
  addItemChecklist,
  getSingleCustomer
} from '../../actions/customer';

import {
  Container,
  Row,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  Input,
  FormGroup,
  ListGroup,
  ListGroupItem
} from 'reactstrap';

import { SpinnerCircular } from 'spinners-react';
import { Formik } from 'formik';

import Sidebar from '../dashboard/Sidebar';
import Dashnav from '../dashboard/Dashnav';
import Footer from '../Layout/Footer';

const ManageChecklist = ({
  match,
  getChecklist,
  updateChecklist,
  addItemChecklist,
  getSingleCustomer,
  checklist,
  customer: { customer, singleLoading }
}) => {
  const [itemList, updateItemList] = useState(null);
  const [itemListLoading, setItemListLoading] = useState(false);

  const [addItemModal, setAddItemModal] = useState({
    isOpen: false,
    isLoading: false
  });

  const toggleAddModal = () => {
    setAddItemModal({ ...addItemModal, isOpen: !addItemModal.isOpen });
  };

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    active: null,
    isLoading: false
  });

  const deleteModalToggle = itemId => {
    setDeleteModal({
      ...deleteModal,
      isOpen: !deleteModal.isOpen,
      active: itemId
    });
  };

  const deleteItemHandler = async () => {
    setDeleteModal({ ...deleteModal, isLoading: true });
    let newList = [...itemList];

    newList.splice(
      itemList.findIndex(item => item._id === deleteModal.active),
      1
    );

    await updateItemList(newList);
    await updateChecklist(match.params.id, newList);

    setDeleteModal({ ...deleteModal, isLoading: false, isOpen: false });
  };

  const [editModal, setEditModal] = useState({
    active: null,
    activeContent: null,
    isOpen: false,
    isLoading: false
  });

  const toggleEditModal = (itemId, itemContent) => {
    setEditModal({
      ...editModal,
      active: itemId,
      activeContent: itemContent,
      isOpen: !editModal.isOpen
    });
  };

  const formRef = useRef();

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const addRef = useRef();

  const handleAddItem = () => {
    if (addRef.current) {
      addRef.current.handleSubmit();
    }
  };

  const handleOnDragEnd = result => {
    if (!result.destination) return;
    const items = Array.from(itemList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateItemList(items);
  };
  useEffect(() => {
    async function getData() {
      await getChecklist(match.params.id);
    }
    getData();
  }, [getChecklist, match]);

  useEffect(() => {
    // if (itemListLoading === true) return;
    updateItemList(checklist);
    // console.log('updated');
  }, [checklist]);

  useEffect(() => {
    getSingleCustomer(match.params.id);
  }, [getSingleCustomer]);

  const onSaveHandler = async () => {
    setItemListLoading(true);
    await updateChecklist(match.params.id, itemList);
    await getChecklist(match.params.id);
    setItemListLoading(false);
  };

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
                      {customer && customer.length >= 1 && (
                        <li className='breadcrumb-item'>
                          <Link to={`/customers/${match.params.id}`}>
                            {customer[0].firstName} {customer[0].lastName}
                          </Link>
                        </li>
                      )}
                      <li className='breadcrumb-item active'>
                        <Link to={`/customers/${match.params.id}/deleteImage`}>
                          Manage Service Checklist
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
                <Col lg={{ size: 'auto' }}>
                  <h3 className='mb-0'>Manage Checklist</h3>
                  <small>Drag and Drop Items to Rearrange Their Order.</small>
                </Col>
                <Col lg={{ size: 'auto', offset: 9 }}>
                  <Button
                    className='btn-icon'
                    color='success'
                    onClick={onSaveHandler}
                  >
                    <span className='btn-inner--icon'>
                      <i className='fas fa-save'></i>
                    </span>
                    <span className='btn-inner--text'>Save Changes</span>
                  </Button>
                </Col>
              </div>
            </CardHeader>
            <CardBody>
              {!checklist || itemList === null || checklist.length < 1 ? (
                <Fragment>
                  <div className='text-center'>
                    <h3>No Items Found...</h3>
                    <p>Try adding one!</p>
                    <br />
                    <Button
                      className='btn-icon'
                      color='primary'
                      onClick={() => toggleAddModal()}
                    >
                      <span className='btn-inner--icon'>
                        <i className='fas fa-plus'></i>
                      </span>
                      <span className='btn-inner--text'>Add Item</span>
                    </Button>
                  </div>
                </Fragment>
              ) : (
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId='items'>
                    {provided => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {itemListLoading ? (
                          <div className='text-center'>
                            <SpinnerCircular
                              size={24}
                              thickness={180}
                              speed={100}
                              color='rgba(57, 125, 172, 1)'
                              secondaryColor='rgba(0, 0, 0, 0.44)'
                            />{' '}
                            <h3>Processing Changes...</h3>
                          </div>
                        ) : (
                          <Fragment>
                            <ListGroup>
                              {itemList.map((item, index) => (
                                <Draggable
                                  key={item._id}
                                  draggableId={item._id}
                                  index={index}
                                >
                                  {provided => (
                                    <div
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                    >
                                      <Fragment>
                                        <ListGroupItem className='mgn-btm-10'>
                                          <i className='fas fa-bars'></i>{' '}
                                          {item.item}{' '}
                                          <Button
                                            size='sm'
                                            color='primary'
                                            onClick={() =>
                                              toggleEditModal(
                                                item._id,
                                                item.item
                                              )
                                            }
                                          >
                                            Edit
                                          </Button>
                                          <Button
                                            size='sm'
                                            color='danger'
                                            onClick={() =>
                                              deleteModalToggle(item._id)
                                            }
                                          >
                                            Delete
                                          </Button>
                                        </ListGroupItem>
                                      </Fragment>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </ListGroup>
                            <Modal
                              isOpen={editModal.isOpen}
                              toggle={toggleEditModal}
                            >
                              <ModalHeader toggle={toggleEditModal}>
                                Edit Item: {editModal.activeContent}
                              </ModalHeader>

                              <Formik
                                initialValues={{
                                  item: editModal.activeContent
                                }}
                                innerRef={formRef}
                                onSubmit={async data => {
                                  const index = itemList.findIndex(
                                    item => item._id === editModal.active
                                  );
                                  const original = [...itemList];
                                  original[index].item = data.item;
                                  await updateItemList(original);
                                  onSaveHandler();
                                  setEditModal({ ...editModal, isOpen: false });
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
                                    <ModalBody>
                                      <Form onSubmit={handleSubmit}>
                                        <Row>
                                          <Col lg='12'>
                                            <FormGroup>
                                              <Label>Item:</Label>
                                              <Input
                                                type='text'
                                                name='item'
                                                value={values.item}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                              />
                                            </FormGroup>
                                          </Col>
                                        </Row>
                                      </Form>
                                    </ModalBody>
                                  </Fragment>
                                )}
                              />

                              <ModalFooter>
                                <Button onClick={toggleEditModal}>
                                  Cancel
                                </Button>
                                <Button color='success' onClick={handleSubmit}>
                                  Save Changes
                                </Button>
                              </ModalFooter>
                            </Modal>
                            <div className='text-center mgn-top-50'>
                              <Button
                                className='btn-icon'
                                color='primary'
                                onClick={toggleAddModal}
                              >
                                <span className='btn-inner--icon'>
                                  <i className='fas fa-plus'></i>
                                </span>
                                <span className='btn-inner--text'>
                                  Add Item
                                </span>
                              </Button>
                            </div>
                          </Fragment>
                        )}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </CardBody>
          </Card>
          <Modal isOpen={addItemModal.isOpen} toggle={toggleAddModal}>
            <ModalHeader toggle={toggleAddModal}>Add New Item:</ModalHeader>
            <ModalBody>
              <Formik
                initialValues={{
                  item: ''
                }}
                innerRef={addRef}
                onSubmit={async data => {
                  await addItemChecklist(match.params.id, data);
                  await getChecklist(match.params.id);
                  toggleAddModal();
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
                    <Form onSubmit={handleSubmit}>
                      <FormGroup>
                        <Label>Item Content:</Label>
                        <Input
                          type='text'
                          name='item'
                          placeholder='Item Content...'
                          value={values.item}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </FormGroup>
                    </Form>
                  </Fragment>
                )}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={toggleAddModal}>Cancel</Button>
              <Button color='success' onClick={handleAddItem}>
                Save Item
              </Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={deleteModal.isOpen} toggle={deleteModalToggle}>
            <ModalHeader toggle={deleteModalToggle}>Are You Sure?</ModalHeader>
            <ModalBody>
              This will delete this item. This action is permanent and cannot be
              undone.
            </ModalBody>
            <ModalFooter>
              <Button onClick={deleteModalToggle}>Cancel</Button>
              <Button color='danger' onClick={deleteItemHandler}>
                {deleteModal.isLoading ? (
                  <span>
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
                  <span>Delete Item</span>
                )}
              </Button>
            </ModalFooter>
          </Modal>
          <Footer />
        </Container>
      </div>
    </Fragment>
  );
};

ManageChecklist.propTypes = {
  getChecklist: PropTypes.func.isRequired,
  updateChecklist: PropTypes.func.isRequired,
  addItemChecklist: PropTypes.func.isRequired,
  getSingleCustomer: PropTypes.func.isRequired,
  checklist: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  checklist: state.customer.checklist,
  customer: state.customer.singleCustomer
});

export default connect(mapStateToProps, {
  getChecklist,
  updateChecklist,
  addItemChecklist,
  getSingleCustomer
})(ManageChecklist);
