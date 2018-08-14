import * as React from 'react';
import {connect} from 'react-redux';
import {todoListActionCreator} from '../redux/actions/todoListActionCreator';

export const ENTER_KEY_CODE = 13;

class Header extends React.Component<any, any> {
  render() {
    return (
      <header className='header'>
        <h1>todos</h1>
        <input className='new-todo'
               placeholder='What needs to be done?'
               autoFocus={true}
               onKeyDown={this.keyPressHandle}/>
      </header>
    );
  }

  keyPressHandle = (event: any) => {
    const {addTodo} = this.props;
    if (event.keyCode === ENTER_KEY_CODE && event.target.value !== '') {
      addTodo(event.target.value);
      event.target.value = '';
    }
  };
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => ({
  addTodo: (label: string) => {
    dispatch(todoListActionCreator(label));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Header);
