import {takeEvery, call, put, delay} from 'redux-saga/effects';

const addTodoAsyncAction = '@action.todoList.addTodoAsync';
const addTodoAction = '@action.todoList.addTodo';
export function* todoSaga() {
  console.log('Hello todoSaga!');
  yield call(addTodo);
  //Fire this action below from redux dev tools to see the magic
  //This is the way to integrate different models of the application to talk to each other async
  yield takeEvery(addTodoAsyncAction, addTodoAsync);
}

function* addTodoAsync({payload}) {
  console.log('Add todo', payload);
  yield delay(200);
  yield put({
    type: addTodoAction,
    payload,
  });
}

function* addTodo() {
  yield delay(2000);
  yield put({
    type: addTodoAction,
    payload: {
      text: 'saga action',
      completed: false,
      archived: false,
    },
  });
}
