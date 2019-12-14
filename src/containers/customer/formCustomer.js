import React from 'react';
import PropTypes from 'prop-types';
import { ELEMENT_TYPE } from './constants';

/**
 * Function return html element depend on type of data.
 * @param {object} data
 * @param {string} key
 * @param {function} onChange
 * @returns {element}
 */
function getElement(data, key, onChange) {
  if (data.type === ELEMENT_TYPE.SELECT) {
    return (<>
      <label>{data.title}</label>
      <select value={data.value} onChange={(e) => onChange(key, e.target.value)} className="form-control">
        {data.options.map(dt => <option key={dt.key} value={dt.key}>{dt.value}</option>)}
      </select>
    </>);
  } else if (data.type === ELEMENT_TYPE.NONE_DISPLAY) {
    return null;
  }
  return (<>
    <label htmlFor={key}>{data.title}</label>
    <input id={key} value={data.value} onChange={(e) => onChange(key, e.target.value)} />
  </>);
}

function FormCustomer(props) {
  const { formValue, onChange, className } = props;
  return (<div className={className}>
    {Object.keys(formValue).map(k => <div key={k}>
      {getElement(formValue[k], k, onChange)}
    </div>)}
  </div>);
}

FormCustomer.propTypes = {
  formValue: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};
FormCustomer.defaultProps = {
  formValue: {},
  className: '',
};
export default FormCustomer;
