import {takeEvery, call, put, delay} from 'redux-saga/effects';

export function* rootSaga() {
  console.log('Hello Sagas!');
  yield call(addTodo);
  yield takeEvery('@action.todoList.removeTodo', removeTodoAudit);
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
