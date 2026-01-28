import { type Action, configureStore, type ThunkAction } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { counterReducer } from './counter';
import { dictionariesReducer } from './dictiomaries';
import { lkReducer } from './lk';
import { registrationReducer } from './registration';
import { rootSaga } from './rootSaga';
import { smsConfirmationReducer } from './smsConfirmation';
import { studentInfoReducer } from './studentInfo';
import { userReducer } from './user';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    studentInfo: studentInfoReducer,
    user: userReducer,
    registration: registrationReducer,
    dictionaries: dictionariesReducer,
    smsConfirmation: smsConfirmationReducer,
    lk: lkReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type GetState = () => RootState;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;

// 8. убрать коллбеки в сагах и делаем так что регистрация сага дергает сагу смс и слушает ее 
// 7. навешиваем react-hook-forms
// 8. add ts to server
