import * as React from 'react';
import {connect} from 'react-redux';
import {deleteItemActionCreator, toggleActionCreator} from '../redux/actions/todoListActionCreator';
import {ITodoItem} from '../redux/redux';

interface ITodoProps {
  todoItem: ITodoItem;
  idx: number;
  toggle: (index: number) => void;
  deleteItem: (index: number) => void;
}

class Todo extends React.Component<ITodoProps, any> {
  render() {
    const {todoItem} = this.props;
    return (
      <li className={todoItem.completed ? 'completed' : ''}>
        <div className='view'>
          <input className='toggle'
                 type='checkbox'
                 checked={todoItem.completed}
                 onChange={this.inputOnChangeHandle}/>
          <label onDoubleClick={this.labelDoubleClickHandle}>{todoItem.label}</label>
          <button className='destroy' onClick={this.deleteItemClickHandle}/>
        </div>
        <input className='edit'
               defaultValue={todoItem.label}
               onKeyPress={this.labelInputKeyPressHandle}/>
      </li>
    )
  }

  labelInputKeyPressHandle = (event: any) => {
    return event;
  };

  labelDoubleClickHandle = (event: any) => {
    return event;
  };

  deleteItemClickHandle = () => {
    const {idx, deleteItem} = this.props;
    deleteItem(idx);
  };

  inputOnChangeHandle = () => {
    const {idx, toggle} = this.props;
    toggle(idx);
  };
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => ({
  toggle: (index: number) => {
    dispatch(toggleActionCreator(index));
  },
  deleteItem: (index: number) => {
    dispatch(deleteItemActionCreator(index));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
