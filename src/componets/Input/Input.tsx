/* eslint-disable react/jsx-props-no-spreading */
import cn from 'classnames';
import React, { useState } from 'react';
import './input.scss';

interface Props extends React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement
> {
  tipMessage: string;
  errorMessage: string;
  isValid: boolean;
  validator: (value: string) => boolean;
  onInput: React.FormEventHandler<HTMLInputElement>;
}

export const Input: React.FC<Props> = ({
  validator, errorMessage, tipMessage, placeholder, isValid, onInput, ...rest
}) => {
  const [isToched, setIsToched] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
    setIsToched(true);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    setFocused(false);
  };

  const handleInput: React.FormEventHandler<HTMLInputElement> = (e) => {
    onInput(e);
    setIsToched(true);
  };

  const shouldShowError = isToched && !isValid && !focused;

  return (
    <div
      className={cn(
        'input',
        { 'input--failed': shouldShowError },
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
        {shouldShowError ? errorMessage : tipMessage}
      </div>
    </div>
  );
};
