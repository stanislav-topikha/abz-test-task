import React from 'react';
import './container.scss';

export const Container: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="container">
    {children}
  </div>
);
