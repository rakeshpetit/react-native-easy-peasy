import {createStore} from 'easy-peasy';
import {storeModel} from './models';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(storeModel, {
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
