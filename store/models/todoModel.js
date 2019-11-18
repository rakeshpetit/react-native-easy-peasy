import {action, computed, actionOn} from 'easy-peasy';

const currentContextTodos = state => state.todos[state.currentContext];

const todoModel = {
  todos: {
    home: [{text: 'Drink coffee', completed: false, archived: false}],
    triggerUpdate: false,
  },
  clearTodos: action(state => {
    state.todos[state.currentContext] = [];
  }),
  addTodo: action((state, payload) => {
    currentContextTodos(state).push(payload);
  }),
  unarchiveTodo: action((state, payload) => {
    let todos = currentContextTodos(state);
    state.todos[state.currentContext] = todos.map(todo =>
      todo.text === payload.text
        ? {...todo, completed: false, archived: false}
        : todo,
    );
  }),
  modifyTodo: action((state, payload) => {
    let todos = state.todos[state.currentContext];
    if (!payload.completed) {
      state.todos[state.currentContext] = todos.map(todo =>
        todo.text === payload.text ? {...todo, completed: true} : todo,
      );
    } else {
      state.todos[state.currentContext] = todos.map(todo =>
        todo.text === payload.text ? {...todo, archived: true} : todo,
      );
    }
  }),
  contextChange: actionOn(
    (actions, storeActions) => storeActions.contextList.contextChange,
    (state, target) => {
      // console.log('state', state);
      if (!state.todos[state.currentContext]) {
        state.todos[state.currentContext] = [];
      } else {
        state.triggerUpdate = !state.triggerUpdate;
      }
    },
  ),
  addTodoAsync: action(() => {}),
  completedCount: computed(
    state => state.currentContextTodos.filter(todo => todo.completed).length,
  ),
  incompleteCount: computed(
    state => state.currentContextTodos.filter(todo => !todo.completed).length,
  ),
  archivedCount: computed(
    state => state.currentContextTodos.filter(todo => todo.archived).length,
  ),
  currentContext: computed(
    [
      state => state.todos,
      (state, storeState) => storeState.contextList.contexts,
    ],
    (todos, contexts) => {
      return contexts.find(context => context.current).name;
    },
  ),
  currentContextTodos: computed(
    [
      state => state.todos,
      (state, storeState) => storeState.contextList.contexts,
    ],
    (todos, contexts) => {
      const contextName = contexts.find(context => context.current).name;
      return todos[contextName];
    },
  ),
  validTodos: computed(state =>
    state.todos[state.currentContext].filter(todo => !todo.archived),
  ),
  archivedTodos: computed(state =>
    state.todos[state.currentContext].filter(todo => todo.archived),
  ),
};
export default todoModel;
