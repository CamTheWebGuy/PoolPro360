import React, { Fragment, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import {
  Button,
  Row,
  Col,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';
import { useEffect } from 'react';

const FormItemController = ({
  item,
  deleteItem,
  editItem,
  editPictureField,
  editPictureList,
  deletePictureOption
}) => {
  const [modal, setModal] = useState(false);
  const [isHovered, setHover] = useState({
    id: '',
    isActive: false
  });

  const [formData, setFormData] = useState({
    label: item.label,
    placeholder: item.placeholder
  });

  const [pictureData, setPictureData] = useState({
    label: item.label,
    items: item.items
  });

  const onPictureAddOption = () => {
    const itemsList = pictureData.items;

    const sliced = itemsList.slice();

    const newOption = {
      id: uuidv4(),
      label: 'New Option',
      priceChange: 'increase',
      amount: '0'
    };

    const newList = [...sliced, newOption];

    setPictureData({ ...pictureData, items: newList });

    setPictureData(state => {
      editPictureField(item.id, state.label, state.items);

      return state;
    });
  };

  const onPictureOptionLabelChange = (e, itemId) => {
    const itemsList = pictureData.items;

    const sliced = itemsList.slice();

    let foundIndex = sliced.findIndex(e => e.id == itemId);

    sliced[foundIndex].label = e.target.value;

    setPictureData({ ...pictureData, items: sliced });
  };

  const onPictureLabelChange = e =>
    setPictureData({ ...pictureData, [e.target.name]: e.target.value });

  const onPicturePriceChange = (e, itemId) => {
    const itemsList = pictureData.items;

    const sliced = itemsList.slice();

    let foundIndex = sliced.findIndex(e => e.id == itemId);

    sliced[foundIndex].priceChange = e.target.value;

    setPictureData({ ...pictureData, items: sliced });
  };

  const onPictureAmountChange = (e, itemId) => {
    const itemsList = pictureData.items;

    const sliced = itemsList.slice();

    let foundIndex = sliced.findIndex(e => e.id == itemId);

    sliced[foundIndex].amount = e.target.value;

    setPictureData({ ...pictureData, items: sliced });
  };

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const toggle = () => {
    editItem(item.id, formData.label, formData.placeholder);
    setModal(!modal);
  };

  const editPicture = () => {
    editPictureField(item.id, pictureData.label, pictureData.items);
    setModal(!modal);
  };

  const hoverController = (value, option) => {
    setHover({
      isActive: value,
      id: option.id
    });
  };

  const onOptionDelete = (fieldId, optionId) => {
    deletePictureOption(fieldId, optionId);
  };

  return (
    <Fragment>
      {item.content === 'Picture Choice' ? pictureData.label : formData.label}

      <div className='mgn-left-30'>
        <Button size='sm' color='info' onClick={toggle}>
          Edit
        </Button>
        <Button size='sm' color='warning' onClick={() => deleteItem(item.id)}>
          Delete
        </Button>
      </div>

      {item.content === 'Picture Choice' && (
        <div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
              Edit: {item.content} Field
            </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for='labelField'>Label:</Label>
                  <Input
                    type='text'
                    name='label'
                    id='labelField'
                    placeholder='An Example Label...'
                    value={pictureData.label}
                    onChange={e => onPictureLabelChange(e)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Options:</Label>
                  {item.items.length >= 2 && (
                    <Fragment>
                      {pictureData.items.map((option, index) => (
                        <Row key={index} className='mgn-top-10'>
                          <Col md='4'>
                            <div
                              className='imageContainer'
                              onMouseOver={() => hoverController(true, option)}
                              onMouseLeave={() =>
                                hoverController(false, option)
                              }
                            >
                              <img
                                className='width-100'
                                src='https://pbjc.com/wp-content/themes/pbjc/assets/images/home/021.jpg'
                                alt=''
                              />

                              {isHovered.isActive &&
                                isHovered.id === option.id && (
                                  <Fragment>
                                    <div className='overlay'></div>
                                    <Button
                                      size='sm'
                                      style={{
                                        position: 'absolute',
                                        top: '5px',
                                        right: '20px'
                                      }}
                                      color='primary'
                                    >
                                      Change Image
                                    </Button>
                                    <Button
                                      size='sm'
                                      style={{
                                        position: 'absolute',
                                        top: '40px',
                                        right: '30px'
                                      }}
                                      color='danger'
                                      onClick={e =>
                                        onOptionDelete(item.id, option.id)
                                      }
                                    >
                                      Delete Option
                                    </Button>
                                  </Fragment>
                                )}
                            </div>
                          </Col>
                          <Col md='4'>
                            <Label for='label'>Label</Label>
                            <Input
                              type='text'
                              placeholder='Option...'
                              name='label'
                              value={option.label}
                              onChange={e =>
                                onPictureOptionLabelChange(e, option.id)
                              }
                            />
                          </Col>
                          <Col md='4'>
                            <Label for='select'>Price Change</Label>
                            <Row>
                              <Col>
                                <Input
                                  type='select'
                                  name='select'
                                  className='pr-0'
                                  onChange={e =>
                                    onPicturePriceChange(e, option.id)
                                  }
                                >
                                  <option
                                    value='increase'
                                    selected={
                                      option.priceChange === 'increase' && true
                                    }
                                  >
                                    +
                                  </option>
                                  <option
                                    value='decrease'
                                    selected={
                                      option.priceChange === 'decrease' && true
                                    }
                                  >
                                    -
                                  </option>
                                </Input>
                              </Col>
                              <Col>
                                <Input
                                  type='text'
                                  value={option.amount}
                                  onChange={e =>
                                    onPictureAmountChange(e, option.id)
                                  }
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      ))}
                    </Fragment>
                  )}
                  <Button
                    className='btn-icon btn-3 mgn-top-10'
                    color='primary'
                    type='button'
                    onClick={e => onPictureAddOption(item.id)}
                    block
                  >
                    <span className='btn-inner--icon'>
                      <i className='fas fa-plus-square'></i>
                    </span>
                    <span className='btn-inner--text'>Add Option</span>
                  </Button>
                </FormGroup>
                <FormGroup>
                  <Label for='labelField'>Required?</Label>
                  <br />
                  <small>
                    Require this field to be complete before submitting?
                  </small>
                  <br />
                  <Input type='checkbox' name='required' id='requiredField' />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={editPicture}>
                Save Changes
              </Button>{' '}
              <Button color='secondary' onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      )}

      {item.content != 'Multiple Choice' && item.content != 'Picture Choice' && (
        <div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
              Edit: {item.content} Field
            </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for='labelField'>Label:</Label>
                  <Input
                    type='text'
                    name='label'
                    id='labelField'
                    placeholder='An Example Label...'
                    value={formData.label}
                    onChange={e => onChange(e)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='placeholderField'>Placeholder:</Label>
                  <Input
                    type='text'
                    name='placeholder'
                    id='placeholderField'
                    placeholder='Placeholder text...'
                    value={formData.placeholder}
                    onChange={e => onChange(e)}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={toggle}>
                Save Changes
              </Button>{' '}
              <Button color='secondary' onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      )}
    </Fragment>
  );
};

export default FormItemController;
