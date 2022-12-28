/* eslint-disable react/jsx-props-no-spreading */
import cn from 'classnames';
import React, { useState } from 'react';
import './input.scss';

interface Props extends React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement
> {
  tipMessage: string;
  errorMessage: string
  validator: (value: string) => boolean
}

export const Input: React.FC<Props> = (props) => {
  const {
    required, validator, errorMessage, tipMessage, placeholder, ...rest
  } = props;

  const [error, setError] = useState(false);

  const handleFocus = () => {
    if (error) {
      setError(false);
    }
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const isValid = Boolean(e.target.value.trim()) && validator(e.target.value);

    if (!isValid) {
      setError(true);
    }
  };

  return (
    <div
      className={cn(
        'input',
        { 'input--failed': error },
      )}
    >
      <div className="input__label">
        {placeholder}
      </div>

      <input
        className="input__field"
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleBlur} // autocomplete check
        required={required}
        {...rest}
      />

      <div className="input__info">
        {error ? errorMessage : tipMessage}
      </div>
    </div>
  );
};
