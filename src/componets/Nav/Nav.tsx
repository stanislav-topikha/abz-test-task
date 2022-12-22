import React from 'react';
import './nav.scss';
import { LogoIcon } from '../Logo/Logo';
import { Button } from '../Button/Button';

import { Container } from '../Container/Container';

export const Nav: React.FC = () => (
  <nav className="nav">
    <Container>
      <div className="nav__content">
        <a href="/">
          <LogoIcon />
        </a>

        <div className="nav__buttons">
          <a href="#users">
            <Button>
              Users
            </Button>
          </a>

          <a href="#sign-up">
            <Button>
              Sign up
            </Button>
          </a>
        </div>
      </div>
    </Container>
  </nav>
);