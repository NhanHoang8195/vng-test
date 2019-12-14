import * as E from './type';

/**
 * Handle action get data successfully.
 * @param {string} type of action.
 * @param {object} data. Data receive from  axios(res.data)
 * @returns {object} Object need to dispatch action success.
 */
function handleSuccess(type, data) {
  return {
    type,
    payload: data,
  };
}
export function addCustomer(data) {
  return async (dispatch) => {
    dispatch({ type: E.ADD_CUSTOMER_START });
    dispatch(handleSuccess(E.ADD_CUSTOMER_SUCCESS, data));
  };
}

export function deleteCustomer(id) {
  return async (dispatch) => {
    dispatch({ type: E.DELETE_CUSTOMER_START});
    dispatch(handleSuccess(E.DELETE_CUSTOMER_SUCCESS, id));
  };
}

export function saveCustomerToEdit(id) {
  return dispatch => {
    dispatch(handleSuccess(E.SAVE_CUSTOMER_TO_EDIT, id));
  }
}
export function clearCustomerEdited() {
  return dispatch => {
    dispatch({ type: E.CLEAR_CUSTOMER_EDITED});
  }
}