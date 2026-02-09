import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { type AppDispatch, type AppThunk, type RootState } from '../store';
import { incrementCounter, incrementByAmountCounter, decrementCounter } from '../store/counter';

const makeAsyncAction = (count: number): AppThunk => (dispatch, /* getState */) => {
  let i = 0;
  
  const timerId = setInterval(() => {
    if (i > count) {
      clearInterval(timerId);

      return;
    }
    dispatch(incrementCounter());

    i += 1;
  }, 1000);
};

export const ThunkExample = () => {
  const counter = useSelector<RootState, number>(state => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      Counter: {counter}
      <button type="button" onClick={() => dispatch(incrementCounter())}>
        increment
      </button>
      <button type="button" onClick={() => dispatch(decrementCounter())}>
        decrement
      </button>
      <button type="button" onClick={() => dispatch(incrementByAmountCounter(5))}>
        increase by amount
      </button>
      <button type="button" onClick={() => dispatch(makeAsyncAction(6))}>
        thunk action
      </button>
    </div>
  );
};
