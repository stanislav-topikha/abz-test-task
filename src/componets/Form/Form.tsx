import React from 'react';
import './form.scss';
import { Input } from '../Input/Input';
import { Container } from '../Container/Container';
import { Loader } from '../Loader/Loader';

interface Props {
  onSubmit: VoidFunction;
}

export const Form: React.FC<Props> = ({ onSubmit }) => {
  const handleSubmit = () => {
    onSubmit();
  };

  const handleChange = () => (
    onSubmit()
  );

  return (
    <Container>
      <Loader size={100} />
      <h2 className="title">Working with POST request</h2>

      <form
        onChange={handleChange}
        onSubmit={handleSubmit}
        className="form"
      >
        <Input
          type="text"
          tipMessage="Type your name"
          errorMessage="Invalid name"
          validator={() => true}
          placeholder="Your name"
          name="name"
          required
        />

        <Input
          type="email"
          tipMessage="Type your email"
          errorMessage="Invalid email"
          validator={() => true}
          placeholder="Email"
          name="email"
          required
        />

        <Input
          type="tel"
          tipMessage="+38 (XXX) XXX - XX - XX"
          errorMessage="Provide valid phone number"
          validator={() => true}
          placeholder="Phone"
          name="name"
          required
        />

      </form>
    </Container>
  );
};
