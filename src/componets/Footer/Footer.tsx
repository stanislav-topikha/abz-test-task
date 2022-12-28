import React from 'react';
import './footer.scss';
import { Container } from '../Container/Container';
import { Form } from '../Form/Form';

export const Footer: React.FC = () => (
  <Container>
    <footer className="footer">
      <h2 className="footer__title">Working with POST request</h2>

      <Form />
    </footer>
  </Container>
);
