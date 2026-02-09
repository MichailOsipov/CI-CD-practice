export {
  initStartRegistrationAction,
  initCompleteRegistrationAction,
  registrationReducer,
} from './registrationSlice';
export { registrationWatcher } from './registrationSagas';
export {
  getIsLoadingStartRegistration,
  getIsLoadingCompleteRegistration,
} from './registrationSelectors';
