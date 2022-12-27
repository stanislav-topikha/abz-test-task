/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './radioInput.scss';

interface Props extends React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement
> {
  label: string;
}

export const RadioInput: React.FC<Props> = ({ label, ...rest }) => (
  <label className="radio-input">
    <input
      type="radio"
      className="radio-input__input"
      {...rest}
    />
    {label}
  </label>
);
