import {action, computed, thunk} from 'easy-peasy';
const todoModel = {
  todos: [{text: 'Drink coffee', completed: false, archived: false}],
  addTodo: action((state, payload) => {
    state.todos.push(payload);
  }),
  unarchiveTodo: action((state, payload) => {
    state.todos = state.todos.map(todo =>
      todo.text === payload.text
        ? {...todo, completed: false, archived: false}
        : todo,
    );
  }),
  removeTodo: action((state, payload) => {
    if (!payload.completed) {
      state.todos = state.todos.map(todo =>
        todo.text === payload.text ? {...todo, completed: true} : todo,
      );
    } else {
      state.todos = state.todos.map(todo =>
        todo.text === payload.text ? {...todo, archived: true} : todo,
      );
    }
  }),
  addTodoAsync: thunk((actions, payload) => {
    // call our service
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 200);
    }).then(() => {
      // then dispatch an action to update state
      actions.addTodo(payload);
    });
  }),
  completedCount: computed(
    state => state.todos.filter(todo => todo.completed).length,
  ),
  incompleteCount: computed(
    state => state.todos.filter(todo => !todo.completed).length,
  ),
  archivedCount: computed(
    state => state.todos.filter(todo => todo.archived).length,
  ),
  validTodos: computed(state => state.todos.filter(todo => !todo.archived)),
  archivedTodos: computed(state => state.todos.filter(todo => todo.archived)),
};

const basketModel = {
  productIds: [1],
  addProduct: action((state, payload) => {
    state.productIds.push(payload);
  }),
};

export const storeModel = {
  todoList: todoModel,
  basket: basketModel,
};
