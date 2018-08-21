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
  updateTodo: (label: string, index: number) => void;
}

class Todo extends React.Component<ITodoProps, any> {
  private todoItemInput: any;
  constructor(props: ITodoProps) {
    super(props);
    this.todoItemInput = React.createRef();
    this.state = {
      editing: false,
    };
  }

  componentDidUpdate() {
    if (this.todoItemInput) {
      // props have changed but input's value not change
      this.todoItemInput.current.value = this.props.todoItem.label;
      this.todoItemInput.current.focus();
    }
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
               ref={this.todoItemInput}
               onKeyDown={this.labelInputKeyPressHandle}
               onBlur={this.labelInputBlurHandle}/>
      </li>
    )
  }

  labelInputKeyPressHandle = (event: any) => {
    const {updateTodo, idx} = this.props;
    if (event.keyCode === ENTER_KEY_CODE && event.target.value.trim() !== '') {
      updateTodo(event.target.value.trim(), idx);
      this.setState({editing: false});
    }
  };

  labelInputBlurHandle = (event: any) => {
    const {updateTodo, idx} = this.props;
    if (event.target.value.trim() !== '') {
      updateTodo(event.target.value.trim(), idx);
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
  updateTodo: (label: string, index: number) => {
    dispatch(updateItemActionCreator(label, index));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
