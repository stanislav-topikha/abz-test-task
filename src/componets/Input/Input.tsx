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

  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleFocus = () => {
    setFocused(true);

    if (error) {
      setError(false);
    }
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFocused(false);

    const isValid = Boolean(e.target.value.trim()) && validator(e.target.value);

    if (!isValid) {
      setError(true);
    }
  };

  const shouldShowInfo = focused || error;

  return (
    <div
      className={cn(
        'input',
        { 'input--failed': error },
      )}
    >
      {(shouldShowInfo || Boolean(value)) && (
        <div className="input__label">
          {placeholder}
        </div>
      )}

      <input
        className="input__field"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleBlur} // autocomplete check
        required={required}
        {...rest}
      />

      {shouldShowInfo && (
        <div className="input__info">
          {error ? errorMessage : tipMessage}
        </div>
      )}
    </div>
  );
};
