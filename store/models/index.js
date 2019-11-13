import {action, thunk} from 'easy-peasy';
const todoModel = {
  todos: [{text: 'Drink coffee', completed: false}],
  addTodo: action((state, payload) => {
    state.todos.push(payload);
  }),
  removeTodo: action((state, payload) => {
    state.todos = state.todos.filter(todo => todo.text !== payload.text);
  }),
  addTodoAsync: thunk((actions, payload) => {
    // call our service
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    }).then(() => {
      // then dispatch an action to update state
      actions.addTodo(payload);
    });
  }),
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
