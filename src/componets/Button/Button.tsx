/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import './button.scss';

export const Button: React.FC<
React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = (props) => (
  <button
    type="button"
    className="button"
    {...props}
  />
);
