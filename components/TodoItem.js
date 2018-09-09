import { observer, inject } from "mobx-react";
import * as T from "./Todo";

export default inject("store")(
  observer(({ completed, id, store, text }) => (
    <T.TodoItem>
      <T.TodoCheckbox
        name={id}
        type="checkbox"
        checked={completed}
        onChange={() => store.toggleCompleted(id)}
      />
      <T.TodoItemLabel htmlFor={id} onClick={() => store.toggleCompleted(id)}>
        {text}
      </T.TodoItemLabel>
      <T.TodoItemDelete onClick={() => store.deleteTodo(id)}>
        X
      </T.TodoItemDelete>
    </T.TodoItem>
  ))
);
