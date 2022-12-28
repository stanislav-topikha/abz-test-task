import React, { useState } from 'react';
import './footer.scss';
import successImage from '../../static/images/success-image.svg';
import { Container } from '../Container/Container';
import { Form } from '../Form/Form';

export const Footer: React.FC = () => {
  const [isSend, setIsSend] = useState(false);

  return (
    <Container>
      <footer className="footer">
        {isSend ? (
          <>
            <h2 className="footer__title">User successfully registered</h2>

            <img
              className="footer__success-image"
              src={successImage}
              alt="Success"
            />
          </>
        ) : (
          <>
            <h2 className="footer__title">Working with POST request</h2>

            <Form onSuccess={() => (setIsSend(true))} />
          </>
        )}
      </footer>
    </Container>
  );
};
