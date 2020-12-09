import React, { Fragment, useState } from 'react';

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

const FormItemController = ({
  item,
  deleteItem,
  editItem,
  editPictureField
}) => {
  const [modal, setModal] = useState(false);

  const [formData, setFormData] = useState({
    label: item.label,
    placeholder: item.placeholder
  });

  const [pictureData, setPictureData] = useState({
    label: item.label,
    items: item.items
  });

  const onPictureOptionLabelChange = (e, itemId) => {
    const itemsList = pictureData.items;

    const sliced = itemsList.slice();

    let foundIndex = sliced.findIndex(e => e.id == itemId);

    sliced[foundIndex].label = e.target.value;

    setPictureData({ ...pictureData, items: sliced });
  };

  const onPictureLabelChange = e =>
    setPictureData({ ...pictureData, [e.target.name]: e.target.value });

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
                  {item.items.length >= 2 && (
                    <Fragment>
                      {pictureData.items.map((option, index) => (
                        <Row key={index} className='mgn-top-10'>
                          <Col md='4'>
                            <img
                              className='width-100'
                              src='https://lh3.googleusercontent.com/proxy/y-JA2ABFXKrppSjtsqdMs069O_zDy8H6NRvJvOm3mzORdANpNXztfOpcff-HozCWNAzjQg21CwrfbVtvZIZk3lpziCOBjQ3x97d1QWpr'
                              alt=''
                            />
                          </Col>
                          <Col md='4'>
                            <Label for='placeholderField'>Label</Label>
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
                            <Label for='placeholderField'>Price Change</Label>
                            <Row>
                              <Col>
                                <Input
                                  type='select'
                                  name='select'
                                  className='pr-0'
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
                                <Input type='text' value={option.amount} />
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
