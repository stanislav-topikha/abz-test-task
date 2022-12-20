import React from 'react';
import './header.scss';
import { LogoIcon } from '../Logo/Logo';
import { Button } from '../Button/Button';
import { Hero } from '../Hero/Hero';

export const Header: React.FC = () => (
  <header className="header">
    <nav className="header__nav">
      <LogoIcon />

      <div className="header__buttons">
        <Button>Users</Button>
        <Button>Sign up</Button>
      </div>
    </nav>

    <Hero />
  </header>
);
