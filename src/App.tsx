import * as React from 'react';
import { connect } from 'react-redux';
import Footer from './components/Footer';
import Header from './components/Header';
import TodoList from './components/TodoList';
import {IAddTodoAction} from './redux/redux';

import 'todomvc-app-css/index.css';
import 'todomvc-common/base';
import 'todomvc-common/base.css';
import './App.css';

class App extends React.Component<any, any> {
  render() {
    // tslint:disable-next-line:no-console
    console.log(this.props, '=======================app');
    return (
      <section className='todoapp'>
        <Header />
        <TodoList todoListReducer={this.props.todoListReducer}/>
        <Footer />
      </section>
    );
  }
}

const select = (state: IAddTodoAction[]) => {
  return state
};

export default connect(select)(App);
