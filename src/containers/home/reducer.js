import { Map } from 'immutable';
import * as E from './type';

const initialState = Map({
  data: [{
    customerId: 0,
    customerName: "Nguyễn Văn A",
    customerType: "A",
    balance: 100,
    phone: "12345",
    email: "a@gmail.com",
    address: "HCM",
    status: 1,
    accountNumber: 0,
    gender: 0,
  }, {
    customerId: 1,
    customerName: "Nguyễn Văn B",
    customerType: "B",
    balance: 100,
    phone: "12345",
    email: "b@gmail.com",
    address: "HCM",
    status: 1,
    accountNumber: 0,
    gender: 0,
  }],
  requesting: false,
  error: null,
});
const handlerMaps = {};

handlerMaps[E.GET_CUSTOMERS_START] = (state) => state
  .set('requesting', true);
handlerMaps[E.GET_CUSTOMERS_SUCCESS] = (state, action) => state
  .set('requesting', false)
  .set('data', action.payload);
handlerMaps[E.GET_CUSTOMERS_FAILURE] = (state, action) => state
  .set('requesting', false)
  .set('error', action.error);

export default (state = initialState, action) => {
  const fn = handlerMaps[action.type];
  return fn ? fn(state, action) : state;
};
