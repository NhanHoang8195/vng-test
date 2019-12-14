import React from 'react';
import PropTypes from 'prop-types';
import { SELECT } from './constants';

function getElement(data, key, onChange) {
  if (data.type === SELECT) {
    return (<>
      <label>{data.title}</label>
      <select value={data.value} onChange={(e) => onChange(key, e.target.value)} className="form-control">
        {data.options.map(dt => <option value={dt.key}>{dt.value}</option>)}
      </select>
    </>);
  }
  return (<>
    <label htmlFor={key}>{data.title}</label>
    <input id={key} value={data.value} onChange={(e) => onChange(key, e.target.value)} />
  </>);
}

function AddCustomer(props) {
  const { formValue, onChange, className } = props;
  return (<div className={className}>
    {Object.keys(formValue).map(k => <div key={k}>
      {getElement(formValue[k], k, onChange)}
    </div>)}
  </div>);
}

AddCustomer.propTypes = {
  formValue: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};
AddCustomer.defaultProps = {
  formValue: {},
  className: '',
};
export default AddCustomer;
