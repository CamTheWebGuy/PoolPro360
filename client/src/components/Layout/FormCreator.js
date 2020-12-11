import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid/v4';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import FormItemController from './FormItemController';
import FormSettingsController from './FormSettingsController';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const Content = styled.div`
  margin-right: 200px;
`;

const Item = styled.div`
  display: flex;
  user-select: none;
  padding: 0.5rem;
  margin: 0 0 0.5rem 0;
  align-items: flex-start;
  align-content: flex-start;
  line-height: 1.5;
  border-radius: 3px;
  background: #fff;
  border: 1px ${props => (props.isDragging ? 'dashed #000' : 'solid #ddd')};
`;

const Clone = styled(Item)`
  ~ div {
    transform: none !important;
  }
`;

const Handle = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  user-select: none;
  margin: -0.5rem 0.5rem -0.5rem -0.5rem;
  padding: 0.5rem;
  line-height: 1.5;
  border-radius: 3px 0 0 3px;
  background: #fff;
  border-right: 1px solid #ddd;
  color: #000;
`;

const List = styled.div`
  border: 1px ${props => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
  background: #fff;
  padding: 0.5rem 0.5rem 0;
  border-radius: 3px;
  flex: 0 0 150px;
  font-family: sans-serif;
  min-height: 200px;
`;

const Kiosk = styled(List)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 200px;
`;

const Container = styled(List)`
  margin: 0.5rem 0.5rem 1.5rem;
`;

const Notice = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding: 0.5rem;
  margin: 0 0.5rem 0.5rem;
  border: 1px solid transparent;
  line-height: 1.5;
  color: #aaa;
`;

const ITEMS = [
  {
    id: uuid(),
    content: 'Input',
    icon: 'fa-font',
    tag: 'input',
    type: 'text',
    label: 'Input Field',
    placeholder: ''
  },
  {
    id: uuid(),
    content: 'Text Area',
    icon: 'fa-align-left',
    tag: 'textarea',
    label: 'Text Area Field',
    placeholder: ''
  },
  {
    id: uuid(),
    content: 'Multiple Choice',
    icon: 'fa-check-square',
    label: 'Multiple Choice Field',
    placeholder: '',
    items: [
      {
        label: 'Inground Pool',
        priceChange: 'increase',
        amount: '20'
      },
      {
        label: 'Above Ground Pool',
        priceChange: 'increase',
        amount: '0'
      }
    ]
  },
  {
    id: uuid(),
    content: 'Email',
    icon: 'fa-envelope',
    tag: 'input',
    type: 'email',
    label: 'Email Field',
    placeholder: ''
  },
  {
    id: uuid(),
    content: 'Picture Choice',
    icon: 'fa-image',
    label: 'Picture Choice Field',
    placeholder: '',
    items: [
      {
        id: uuid(),
        label: 'Inground Pool',
        priceChange: 'increase',
        amount: '20'
      },
      {
        id: uuid(),
        label: 'Above Ground Pool',
        priceChange: 'decrease',
        amount: '5'
      }
    ]
  }
];

export default class FormCreator extends Component {
  state = {
    form: []
  };

  editPictureList(itemData) {}

  editPictureField(itemId, label, itemData) {
    const formState = this.state.form;
    let foundIndex = formState.findIndex(e => e.id == itemId);

    formState[foundIndex].label = label;
    formState[foundIndex].items = itemData;
  }

  editItem(itemId, label, placeholder) {
    const formState = this.state.form;

    let foundIndex = formState.findIndex(e => e.id == itemId);

    formState[foundIndex].label = label;
    formState[foundIndex].placeholder = placeholder;
  }

  deleteItem(item) {
    const formState = this.state.form;

    let updatedForm = formState.filter(obj => {
      return obj.id !== `${item}`;
    });

    this.setState({ form: updatedForm });
  }

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        this.setState({
          [destination.droppableId]: reorder(
            this.state[source.droppableId],
            source.index,
            destination.index
          )
        });
        break;
      case 'ITEMS':
        this.setState({
          [destination.droppableId]: copy(
            ITEMS,
            this.state[destination.droppableId],
            source,
            destination
          )
        });
        break;
      default:
        this.setState(
          move(
            this.state[source.droppableId],
            this.state[destination.droppableId],
            source,
            destination
          )
        );
        break;
    }
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    // console.log(this.state.form);
    return (
      <Fragment>
        <FormSettingsController />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId='ITEMS' isDropDisabled={true}>
            {(provided, snapshot) => (
              <Kiosk
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
                className='builder__sidebar'
              >
                <h3 className='text-center text-white'>Control Panel</h3>
                {ITEMS.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <React.Fragment>
                        <Item
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          isDragging={snapshot.isDragging}
                          style={provided.draggableProps.style}
                          className='text-center creator__block'
                        >
                          <div className='width-100'>
                            <i className={`fas ${item.icon}`}></i>
                            <h4 className='text-white fweight-normal'>
                              {item.content}
                            </h4>
                          </div>
                        </Item>
                        {snapshot.isDragging && (
                          <Clone>
                            {' '}
                            <div className='width-100 text-center creator__block'>
                              <i className={`fas ${item.icon}`}></i>
                              <h4 className='text-white fweight-normal'>
                                {item.content}
                              </h4>
                            </div>
                          </Clone>
                        )}
                      </React.Fragment>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </Kiosk>
            )}
          </Droppable>
          <Content>
            {Object.keys(this.state).map((list, i) => (
              <Droppable key={list} droppableId={list}>
                {(provided, snapshot) => (
                  <Container
                    ref={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    <div className='text-center'>
                      <i className='fas fa-plus-square'></i>
                      <p>
                        Drag and drop a item from the control panel to get
                        started.
                      </p>
                    </div>

                    {this.state[list].length
                      ? this.state[list].map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <Item
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                isDragging={snapshot.isDragging}
                                style={provided.draggableProps.style}
                              >
                                <Handle {...provided.dragHandleProps}>
                                  <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                  >
                                    <path
                                      fill='currentColor'
                                      d='M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z'
                                    />
                                  </svg>
                                </Handle>
                                <FormItemController
                                  item={item}
                                  deleteItem={this.deleteItem.bind(this)}
                                  editItem={this.editItem.bind(this)}
                                  editPictureField={this.editPictureField.bind(
                                    this
                                  )}
                                  editPictureList={this.editPictureList.bind(
                                    this
                                  )}
                                />
                                {/* {item.content}
                              
                              <div className='mgn-left-30'>
                                <Button size='sm' color='info'>
                                  Edit
                                </Button>
                                <Button
                                  size='sm'
                                  color='warning'
                                  onClick={e => this.deleteItem(item.id)}
                                >
                                  Delete
                                </Button>
                              </div> */}
                              </Item>
                            )}
                          </Draggable>
                        ))
                      : !provided.placeholder && (
                          <Notice>Drop items here</Notice>
                        )}
                    {provided.placeholder}
                  </Container>
                )}
              </Droppable>
            ))}
          </Content>
        </DragDropContext>
      </Fragment>
    );
  }
}

// export default FormCreator;
