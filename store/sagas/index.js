import {fork, all} from 'redux-saga/effects';
import {todoSaga} from './todoSaga';

export function* rootSaga() {
  console.log('Hello Sagas!');
  //Fire this action below from redux dev tools to see the magic
  //This is the way to integrate different models of the application to talk to each other async
  yield all([fork(todoSaga)]);
}
