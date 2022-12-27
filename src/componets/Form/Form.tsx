/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './form.scss';
import { Input } from '../Input/Input';
import { Container } from '../Container/Container';
import { usePositions } from '../../hooks/usePositions';
import { Loader } from '../Loader/Loader';
import { RadioInput } from '../RadioInput/RadioInput';
import { FileInput } from '../FileInput/FileInput';
import { Button } from '../Button/Button';
import { useToken } from '../../hooks/useToken';
import { sendUser } from '../../helpers/api';

// eslint-disable-next-line prefer-regex-literals, no-useless-escape
const emailTestPattern = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
const telTestPattern = /^[+]{0,1}380([0-9]{9})$/;

export const Form: React.FC = () => {
  const [fieldsValidity, setFieldsValidity] = useState({
    name: false,
    email: false,
    tel: false,
    image: false,
  });
  const [fileError, setFileError] = useState('Upload your image');
  const { token, softUpdate } = useToken();
  const { positions, loading } = usePositions();

  const validateName = (value: string):boolean => {
    const normalizedValueLength = value.trim().length;

    const isValid = normalizedValueLength >= 2 && normalizedValueLength <= 60;

    setFieldsValidity((prev) => ({ ...prev, name: isValid }));

    return isValid;
  };

  const validateEmail = (value: string):boolean => {
    const normalizedValue = value.trim();
    const normalizedValueLength = normalizedValue.length;

    const isValid = (
      normalizedValueLength >= 2
      && normalizedValueLength <= 100
      && emailTestPattern.test(normalizedValue)
    );

    setFieldsValidity((prev) => ({ ...prev, email: isValid }));

    return isValid;
  };

  const validateTel = (value: string):boolean => {
    const isValid = telTestPattern.test(value);

    setFieldsValidity((prev) => ({ ...prev, tel: isValid }));

    return isValid;
  };

  const validateImage = (file: File): boolean => {
    const sizeLimit = 5 * 1024 * 1024;

    if (file.size >= sizeLimit) {
      setFileError('File should be under 5mb');

      setFieldsValidity((prev) => ({ ...prev, image: false }));

      return false;
    }

    const fileFormat = file.name.split('.').pop() || '';

    if (!['jpg', 'jpeg'].includes(fileFormat)) {
      setFileError('Only jpg/jpeg files allowed');

      setFieldsValidity((prev) => ({ ...prev, image: false }));

      return false;
    }

    setFieldsValidity((prev) => ({ ...prev, image: true }));

    return true;
  };

  const isAllFieldsValid = Object.values(fieldsValidity).every((value) => value);

  const handleSubmit:React.FormEventHandler<HTMLFormElement> = () => {
    if (!isAllFieldsValid) {
      return;
    }

    softUpdate();
  };

  return (
    <Container>
      <h2 className="title">Working with POST request</h2>

      <form
        onSubmit={handleSubmit}
        className="form"
      >
        <div className="form__fields">
          <Input
            type="text"
            tipMessage="Type your name"
            errorMessage="Invalid name"
            validator={validateName}
            placeholder="Your name"
            name="name"
            minLength={2}
            maxLength={60}
            required
          />

          <Input
            type="email"
            tipMessage="Type your email"
            errorMessage="Invalid email"
            validator={validateEmail}
            placeholder="Email"
            minLength={2}
            maxLength={100}
            pattern={emailTestPattern.source}
            name="email"
            required
          />

          <Input
            type="tel"
            tipMessage="+38 (XXX) XXX - XX - XX"
            errorMessage="Provide valid phone number"
            validator={validateTel}
            placeholder="Phone"
            name="name"
            pattern={telTestPattern.source}
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
              value={id}
              defaultChecked={i === 0}
            />
          ))}
        </div>

        <div className="form__file-input">
          <FileInput
            validator={validateImage}
            errorMessage={fileError}
            placeholder="Upload your photo"
            accept=".jpg, .jpeg"
            required
          />
        </div>

        <div className="form__submit">
          <Button
            type="submit"
            disabled={!isAllFieldsValid}
          >
            Sign up
          </Button>
        </div>
      </form>
    </Container>
  );
};
