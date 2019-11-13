import {call, delay} from 'redux-saga/effects';
import store from '../';

export function* rootSaga() {
  console.log('Hello Sagas!');
  yield call(addTodo);
}

function* addTodo() {
  yield delay(1000);
  store
    ? store.dispatch.todoList.addTodo({text: 'saga', completed: 'false'})
    : null;
}
