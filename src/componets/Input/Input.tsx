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

export const Input: React.FC<Props> = ({
  validator, errorMessage, tipMessage, placeholder, ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState(false);

  const validateInput = (value: string) => {
    const isValid = Boolean(value.trim()) && validator(value);

    setError(!isValid);
  };

  const handleFocus = () => setFocused(true);

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(false);
    validateInput(e.currentTarget.value);
  };

  const handleInput: React.FormEventHandler<HTMLInputElement> = (e) => {
    if (focused) {
      setError(false);

      return;
    }

    validateInput(e.currentTarget.value);
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
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />

      <div className="input__info">
        {error ? errorMessage : tipMessage}
      </div>
    </div>
  );
};
