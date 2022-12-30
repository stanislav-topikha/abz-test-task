import React from 'react';
import { Button } from '../Button/Button';
import { Container } from '../Container/Container';
import './hero.scss';

export const Hero: React.FC = () => (
  <Container>
    <div className="hero">
      <div className="hero__content">
        <h1 className="hero__title">
          Test assignment for front-end developer
        </h1>

        <p className="hero__text">
          {/* eslint-disable-next-line max-len */}
          What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they&apos;ll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
        </p>

        <a href="#sign-up">
          <Button>
            Sign up
          </Button>
        </a>
      </div>
    </div>
  </Container>
);
