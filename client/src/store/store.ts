import { type Action, configureStore, type ThunkAction } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { counterReducer } from './counter';
import { rootSaga } from './rootSaga';
import { studentInfoReducer } from './studentInfo';
import { userReducer } from './user';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    studentInfo: studentInfoReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type GetState = () => RootState;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;

// 4. делаем флоу регистрации 4 шага, интро инфо смс успех
// 5. делаем страницу лк главная с данными по доходам
// 6. делаем страницу моих доходов со списком и кнопкой подгрузить
// 7. навешиваем react-hook-forms
