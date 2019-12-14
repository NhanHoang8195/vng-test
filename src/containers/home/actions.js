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
/**
 * Handle action get data failure.
 * @param {string} type of action.
 * @param {object} error. Error.
 * @returns {object} Object need to dispatch action failure.
 */
function handleFailure(type, error) {
  return {
    type,
    error,
  };
}

export function addCustomer(data) {
  return async (dispatch) => {
    dispatch({ type: E.ADD_CUSTOMER_START});
    dispatch(handleSuccess(E.ADD_CUSTOMER_SUCCESS, data));
  };
}

export function deleteCustomer(id) {
  return async (dispatch) => {
    dispatch({ type: E.DELETE_CUSTOMER_START});
    dispatch(handleSuccess(E.DELETE_CUSTOMER_SUCCESS, id));
  };
}