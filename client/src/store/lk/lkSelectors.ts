import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../store';

const getLkState = (state: RootState) => state.lk;

export const getIsLoadingLkData = createSelector(
  getLkState,
  state => state.isLoadingLkData,
);

const getLkTaxes = createSelector(
  getLkState,
  state => state.taxes,
);
const getLkIncome = createSelector(
  getLkState,
  state => state.income,
);

export const getLkInfo = createSelector(
  getLkTaxes,
  getLkIncome,
  (taxes, income) => ({
    taxes, income,
  }),
);

export const getIsLoadingSaveCheck = createSelector(
  getLkState,
  state => state.isLoadingSaveCheck,
);
