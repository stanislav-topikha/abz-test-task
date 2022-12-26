import React from 'react';
import './loader.scss';
import LoaderIcon from '../../static/images/loader.svg';

interface Props {
  size: number;
}

export const Loader: React.FC<Props> = ({ size }) => (
  <img
    style={{
      height: `${size}px`,
      width: `${size}px`,
    }}
    className="loader"
    src={LoaderIcon}
    alt="loader"
  />
);
