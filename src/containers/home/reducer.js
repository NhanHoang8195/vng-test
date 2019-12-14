import { Map } from 'immutable';
import * as E from './type';
import mockData from './mockInitData.json';

const initialState = Map({
  data: mockData,
  requesting: false,
  error: null,
  editingCustomer: null,
});
const handlerMaps = {};

function updateData(customers = [], newCustomer = {}) {
  const newCustomers = [...customers];
  const idxCustomer = newCustomers.findIndex(c => c.customerId === newCustomer.customerId);
  if (idxCustomer > -1) {
    newCustomers[idxCustomer] = newCustomer;
  } else {
    const lastCustomer = customers[customers.length - 1];
    const lastCustomerId = lastCustomer ? lastCustomer.customerId : - 1;

    newCustomers.push({ ...newCustomer, customerId: lastCustomerId + 1 });
  }

  return newCustomers;
}

handlerMaps[E.GET_CUSTOMERS_START] = (state) => state
  .set('requesting', true);
handlerMaps[E.GET_CUSTOMERS_SUCCESS] = (state, action) => state
  .set('requesting', false)
  .set('data', action.payload);
handlerMaps[E.GET_CUSTOMERS_FAILURE] = (state, action) => state
  .set('requesting', false)
  .set('error', action.error);

handlerMaps[E.ADD_CUSTOMER_START] = (state) => state
  .set('requesting', true);
handlerMaps[E.ADD_CUSTOMER_SUCCESS] = (state, action) => {

  const updatedData = updateData(state.get('data'), action.payload);
  return state
    .set('requesting', false)
    .set('data', updatedData);
};
handlerMaps[E.ADD_CUSTOMER_FAILURE] = (state, action) => state
  .set('requesting', false)
  .set('error', action.error);

handlerMaps[E.DELETE_CUSTOMER_START] = (state) => state
  .set('requesting', true);
handlerMaps[E.DELETE_CUSTOMER_SUCCESS] = (state, action) => {
  const updatedData = state.get('data').filter(c => c.customerId !== action.payload);
  return state
    .set('requesting', false)
    .set('data', updatedData);
};
handlerMaps[E.DELETE_CUSTOMER_FAILURE] = (state, action) => state
  .set('requesting', false)
  .set('error', action.error);

handlerMaps[E.SAVE_CUSTOMER_TO_EDIT] = (state, action) => {
  const saveData = state.get('data').find(c => c.customerId === action.payload);
  return state
    .set('editingCustomer', saveData);
};
handlerMaps[E.CLEAR_CUSTOMER_EDITED] = (state) => state
  .delete('editingCustomer');

export default (state = initialState, action) => {
  const fn = handlerMaps[action.type];
  return fn ? fn(state, action) : state;
};
