import {takeEvery, call, put, delay} from 'redux-saga/effects';

export function* rootSaga() {
  console.log('Hello Sagas!');
  yield call(addTodo);
  yield takeEvery('@action.todoList.removeTodo', removeTodoAudit);
  //Fire this action below from redux dev tools to see the magic
  //This is the way to integrate different models of the application to talk to each other async
  yield takeEvery('@action.todos.clearAllTodos', clearAllTodos);
  yield takeEvery('@action.todoList.addTodoAsync', addTodoAsync);
}

export function* addTodoAsync({payload}) {
  console.log('Add todo', payload);
  yield delay(200);
  yield put({
    type: '@action.todoList.addTodo',
    payload,
  });
}

function* clearAllTodos() {
  console.log('Clear all todos');
  yield put({
    type: '@action.todoList.clearTodos',
  });
}

function* removeTodoAudit(payload) {
  console.log('A todo was removed', payload);
}

function* addTodo() {
  yield delay(2000);
  yield put({
    type: '@action.todoList.addTodo',
    payload: {
      text: 'saga action',
      completed: false,
      archived: false,
    },
  });
}
