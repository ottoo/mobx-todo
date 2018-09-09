import React from "react";
import { observer, inject } from "mobx-react";

import Title from "./Title";
import * as T from "./Todo";
import TodoItem from "./TodoItem";

@inject("store")
@observer
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }

  onChange = event => this.setState({ inputValue: event.target.value });

  onEnter = event => {
    if (event.keyCode === 13) {
      this.props.store.addTodo(event.target.value);
      this.setState({ inputValue: "" });
    }
  };

  render() {
    const { store } = this.props;
    const { inputValue } = this.state;

    return (
      <T.TodoContainer>
        <Title>TODOS</Title>
        <T.TodoInput
          onKeyDown={this.onEnter}
          onChange={this.onChange}
          placeholder="What needs to be done?"
          value={inputValue}
        />
        <T.TodoList>
          {store.todos.map(t => (
            <TodoItem {...t} />
          ))}
        </T.TodoList>
        {store.todos.length > 0 ? (
          <T.TodoFooter>{store.unfinishedTodos.length} items left</T.TodoFooter>
        ) : null}
      </T.TodoContainer>
    );
  }
}
