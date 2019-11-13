import {action} from 'easy-peasy';
const todoModel = {
  todos: [{text: 'Drink coffee', completed: false}],
  addTodo: action((state, payload) => {
    state.todos.push(payload);
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
