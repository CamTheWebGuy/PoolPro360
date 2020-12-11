import React, { Fragment } from 'react';

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

const FormSettingsController = () => {
  return (
    <Fragment>
      <Container fluid>
        <Row className='mgn-top-50'>
          <Col md='12'>
            <i className='fas fa-chevron-left'></i> Back to Booking Forms
          </Col>
        </Row>
        <Row className='mgn-top-50'>
          <Col>
            <Button color='danger'>Form Builder</Button>
            <Button color='danger'>Form Settings</Button>
          </Col>
        </Row>
        <Row className='mgn-top-50'>
          <Col md='4'>
            <Label>Form Name:</Label>
            <Input type='text' placeholder='Form Name' />
          </Col>
          <Col md='1'>
            <Label>Base Price:</Label>
            <Input type='text' placeholder='9.99' />
          </Col>
          <Col md='1'>
            <Label>Frequency:</Label>
            <Input type='select' name='frequency'>
              <option>MO</option>
              <option>WK</option>
              <option>BWK</option>
            </Input>
          </Col>
          <Col>
            <Button color='danger'>Clear Form</Button>
            <Button color='primary'>Save Form</Button>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default FormSettingsController;
