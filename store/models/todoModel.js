import {action, computed} from 'easy-peasy';
const todoModel = {
  todos: [{text: 'Drink coffee', completed: false, archived: false}],
  clearTodos: action(state => {
    state.todos = [];
  }),
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
  modifyTodo: action((state, payload) => {
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
  addTodoAsync: action(() => {}),
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
export default todoModel;
