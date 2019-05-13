import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function TextInputGroup({
  lable,
  name,
  type,
  placeholder,
  value,
  onChange,
  error
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{lable}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

TextInputGroup.propType = {
  name: PropTypes.string.isRequired,
  lable: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};
TextInputGroup.defaultProps = {
  type: 'text'
};
