import React, { Fragment, useState, useEffect, useRef } from 'react';
import {
  Container,
  Row,
  Button,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  Input,
  FormGroup
} from 'reactstrap';

import { Formik } from 'formik';

const EditServiceNoteModal = ({
  isOpen,
  toggle,
  activeNote,
  noteId,
  noteContent,
  showDuringVisit,
  editFunction
}) => {
  const formRef = useRef();

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  if (activeNote === noteId) {
    return (
      <Fragment>
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Edit Service Note:</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                content: noteContent,
                showDuringVisit: showDuringVisit
              }}
              innerRef={formRef}
              onSubmit={async data => {
                // console.log(data);
                await editFunction(noteId, data);
                toggle();
                // Pass the action function to update here
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
                      <Label for='content' className='form-control-label'>
                        Note Content
                      </Label>
                      <Input
                        type='textarea'
                        name='content'
                        placeholder='Note Content'
                        value={values.content}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                    <Row>
                      <Col lg='12'>
                        <FormGroup>
                          <span>Show to Technician During Visit?</span>
                          <br />
                          <small>
                            This will make note display to technician during
                            each service visit.
                          </small>
                          <br />
                          <br />
                          <Label className='custom-toggle'>
                            <Input
                              type='checkbox'
                              name='showDuringVisit'
                              onChange={handleChange}
                              value={values.showDuringVisit}
                              defaultChecked={
                                values.showDuringVisit === true ? true : false
                              }
                            />
                            <span
                              className='custom-toggle-slider rounded-circle'
                              data-label-off='No'
                              data-label-on='Yes'
                            ></span>
                          </Label>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </Fragment>
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={toggle}>Cancel</Button>
            <Button color='success' onClick={handleSubmit}>
              Save Changes
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  } else {
    return <span></span>;
  }
};

export default EditServiceNoteModal;
