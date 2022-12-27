/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './form.scss';
import { Input } from '../Input/Input';
import { Container } from '../Container/Container';
import { usePositions } from '../../hooks/usePositions';
import { Loader } from '../Loader/Loader';
import { RadioInput } from '../RadioInput/RadioInput';
import { FileInput } from '../FileInput/FileInput';

export const Form: React.FC = () => {
  const { positions, loading } = usePositions();

  const handleSubmit = () => {
  };

  const handleChange = () => {
  };

  return (
    <Container>
      <h2 className="title">Working with POST request</h2>

      <form
        onChange={handleChange}
        onSubmit={handleSubmit}
        className="form"
      >
        <div className="form__fields">
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
        </div>

        <div className="form__radio-buttons">
          <h2 className="form__radio-title">
            Select your position
          </h2>

          {loading && (
            <Loader size={50} />
          )}

          {positions.map(({ name, id }, i) => (
            <RadioInput
              name="position"
              key={id}
              label={name}
              value={name}
              defaultChecked={i === 0}
            />
          ))}
        </div>

        <div>
          <FileInput
            validator={() => false}
            errorMessage="Error: jpg/jpeg, less then 5mb, at least 70x70"
            placeholder="Upload your photo"
          />
        </div>
      </form>
    </Container>
  );
};
