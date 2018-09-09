import { types, applySnapshot, destroy } from "mobx-state-tree";
import makeInspectable from "mobx-devtools-mst";
import * as uuid from "uuid";

let store = null;

const Todo = types
  .model("Todo", {
    id: types.identifier,
    text: types.string,
    completed: false
  })
  .actions(self => ({
    toggleCompleted() {
      self.completed = !self.completed;
    }
  }));

const Store = types
  .model({
    todos: types.array(Todo)
  })
  .views(self => {
    return {
      get unfinishedTodos() {
        return self.todos.filter(t => !t.completed);
      },
      findById(id) {
        const found = self.todos.find(t => t.id === id);

        if (!found) {
          throw new Error(`Error. No todo found with id: ${id}`);
        }
        return found;
      }
    };
  })
  .actions(self => ({
    addTodo(todoText) {
      self.todos.push({
        id: uuid.v4(),
        text: todoText
      });
    },
    deleteTodo(id) {
      destroy(self.findById(id));
    },
    toggleCompleted(id) {
      self.findById(id).toggleCompleted();
    }
  }));

export function initStore(isServer, snapshot = null) {
  if (isServer) {
    store = Store.create({ todos: [] });
  }
  if (store === null) {
    store = Store.create({ todos: [] });

    if (process.env.NODE_ENV === "development") {
      makeInspectable(store);
    }
  }
  if (snapshot) {
    applySnapshot(store, snapshot);
  }
  return store;
}
