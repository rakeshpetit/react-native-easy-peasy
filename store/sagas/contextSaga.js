import {takeEvery, put} from 'redux-saga/effects';

const contextChangeAction = '@action.contextList.contextChange';
const contextChangeTodoAction = '@action.todoList.contextChange';
export function* contextSaga() {
  console.log('Hello contextSaga!');
  //Fire this action below from redux dev tools to see the magic
  //This is the way to integrate different models of the application to talk to each other async
  yield takeEvery(contextChangeAction, contextChangeAsync);
}

function* contextChangeAsync() {
  console.log('contextChangeAsync');
  yield put({
    type: contextChangeTodoAction,
  });
}
