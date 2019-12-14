import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FormCustomer from './formCustomer';
import * as actions from '../home/actions';
import { ELEMENT_TYPE, CUSTOMER_TYPE_OPTIONS, GENDER_OPTIONS } from './constants';

import './styles.scss';

/**
 * Fucntion use to create init data for form.
 * @param {object} data
 * @returns {object}
 */
const createInitValue = data => ({
  customerId: {
    value: data.customerId,
    title: 'customer Id',
    type: ELEMENT_TYPE.NONE_DISPLAY,
  },
  customerName: {
    value: data.customerName,
    title: 'Customer Name',
    type: ELEMENT_TYPE.INPUT,
  },
  customerType: {
    value: data.customerType || 'A',
    title: 'Customer Type',
    type: ELEMENT_TYPE.SELECT,
    options: CUSTOMER_TYPE_OPTIONS,
  },
  balance: {
    value: data.balance,
    title: 'Balance',
    type: ELEMENT_TYPE.INPUT,
  },
  phone: {
    value: data.phone,
    title: 'Phone',
    type: ELEMENT_TYPE.INPUT,
  },
  email: {
    value: data.email,
    title: 'Email',
    type: ELEMENT_TYPE.INPUT,
  },
  address: {
    value: data.address,
    title: 'Address',
    type: ELEMENT_TYPE.INPUT,
  },
  status: {
    value: data.status,
    title: 'Status',
    type: ELEMENT_TYPE.INPUT,
  },
  accountNumber: {
    value: data.accountNumber,
    title: 'Account Number',
    type: ELEMENT_TYPE.INPUT,
  },
  gender: {
    value: data.gender || '0',
    title: 'Gender',
    type: ELEMENT_TYPE.SELECT,
    options: GENDER_OPTIONS,
  }
});

/**
 * Custom hook use for handle input form.
 * @param initialValue
 * @returns {Object} contain value and onChange action for input tag
 */
function useFormInput(initialValue = {}) {
  const [formValue, setFormValue] = useState(() => createInitValue(initialValue));
  function onChangeValue(field, data) {
    setFormValue({...formValue, [field]: {...formValue[field], value: data}});
  }
  return {
    formValue,
    onChange: onChangeValue,
  };
}

/**
 * Convert data from form to the data need to be sent to server.
 * @param data raw data get from form.
 */
function handleData(data = {}) {
  return Object.keys(data).reduce((acc, key) => ({...acc, [key]: data[key].value}), {});
}

function Customer(props) {
  const customer = useFormInput(props.value || {});
  function saveCustomer() {
    const rawData = customer.formValue;
    const data = handleData(rawData);
    props.actions.addCustomer(data).then(() => {
      props.history.push('/');
    });
  }
  return (<div className="customer-container">
    <FormCustomer {...customer} className="add-customer" />
    <div className="customer-list-btn">
      <button onClick={saveCustomer} className="btn btn-primary customer-save-btn">Save</button>
      <button onClick={props.history.goBack} className="btn btn-secondary customer-save-btn">Cancel</button>
    </div>
  </div>);
}

Customer.propTypes = {
  actions: PropTypes.shape({
    addCustomer: PropTypes.func.isRequired,
  }),
  history: PropTypes.shape({}),
  value: PropTypes.object,
};
Customer.defaultProps = {
  value: {}
};
const mapStateToProps = state => ({
  value: state.homeReducer.get('editingCustomer'),
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions , dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
