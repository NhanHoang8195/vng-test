import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddCustomer from './addCustomer';
import * as actions from '../home/actions';
import { SELECT, INPUT, CUSTOMER_TYPE_OPTIONS, GENDER_OPTIONS } from './constants';

import './styles.scss';

/**
 * Fucntion use to create init data for form.
 * @param {object} data
 * @returns {object}
 */
const createInitValue = data => ({
  customerName: {
    value: data.customerName || '',
    title: 'Customer Name',
    type: INPUT,
  },
  customerType: {
    value: data.customerType || 'A',
    title: 'Customer Type',
    type: SELECT,
    options: CUSTOMER_TYPE_OPTIONS,
  },
  balance: {
    value: data.balance || '',
    title: 'Balance',
    type: INPUT,
  },
  phone: {
    value: data.phone || '',
    title: 'Phone',
    type: INPUT,
  },
  email: {
    value: data.customerType || '',
    title: 'Email',
    type: INPUT,
  },
  address: {
    value: data.address || '',
    title: 'Address',
    type: INPUT,
  },
  status: {
    value: data.status || '',
    title: 'Status',
    type: INPUT,
  },
  accountNumber: {
    value: data.accountNumber || '',
    title: 'Account Number',
    type: INPUT,
  },
  gender: {
    value: data.gender || '0',
    title: 'Gender',
    type: SELECT,
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
  const customer = useFormInput(props.value);
  function saveCustomer() {
    const rawData = customer.formValue;
    const data = handleData(rawData);
    props.actions.addCustomer(data).then(() => {
      props.history.push('/');
    });
  }
  return (<div className="customer-container">
    <AddCustomer {...customer} className="add-customer" />
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
  data: state.homeReducer.get('data'),
  requesting: state.homeReducer.get('requesting'),
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions , dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
