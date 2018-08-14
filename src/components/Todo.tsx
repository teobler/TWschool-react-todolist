import * as React from 'react';
import {connect} from 'react-redux';
import {
  deleteItemActionCreator,
  toggleActionCreator,
  updateItemActionCreator
} from '../redux/actions/todoListActionCreator';
import {ITodoItem} from '../redux/redux';
import {ENTER_KEY_CODE} from './Header';

interface ITodoProps {
  todoItem: ITodoItem;
  idx: number;
  toggle: (index: number) => void;
  deleteItem: (index: number) => void;
  updateTodo: (label: string) => void;
}

class Todo extends React.Component<ITodoProps, any> {
  constructor(props: ITodoProps) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  render() {
    const {todoItem} = this.props;
    let clazz = '';
    if (todoItem.completed) {
      clazz += 'completed';
    }
    if (this.state.editing) {
      clazz += ' editing';
    }
    return (
      <li className={clazz}>
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
               onKeyDown={this.labelInputKeyPressHandle}/>
      </li>
    )
  }


  // FIXME: need a index in state;
  labelInputKeyPressHandle = (event: any) => {
    const {updateTodo} = this.props;
    if (event.target.keyCode === ENTER_KEY_CODE && event.target.value.trim() !== '') {
      updateTodo(event.target.value.trim());
      this.setState({editing: false});
    }
  };

  labelDoubleClickHandle = () => {
    this.setState({editing: true});
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
  updateTodo: (label: string) => {
    dispatch(updateItemActionCreator(label));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
