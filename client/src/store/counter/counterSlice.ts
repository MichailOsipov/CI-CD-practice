import { createSlice } from '@reduxjs/toolkit';

export type CounterState = {
  value: number;
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    incrementCounter: (state) => {
      return { ...state, value: state.value + 1 };
    },
    decrementCounter: (state) => {
      return { ...state, value: state.value - 1 };
    },
    incrementByAmountCounter: (state, action) => {
      return { ...state, value: state.value + action.payload };
    }, 
  }
});

export const { incrementCounter, decrementCounter, incrementByAmountCounter } = counterSlice.actions;
export const counterReducer = counterSlice.reducer;
