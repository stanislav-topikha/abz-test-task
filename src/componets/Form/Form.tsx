/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './form.scss';
import { Input } from '../Input/Input';
import { usePositions } from '../../hooks/usePositions';
import { Loader } from '../Loader/Loader';
import { RadioInput } from '../RadioInput/RadioInput';
import { FileInput } from '../FileInput/FileInput';
import { Button } from '../Button/Button';
import { useToken } from '../../hooks/useToken';
import { sendUser } from '../../helpers/api';

interface Fields {
  name: string;
  email: string;
  tel: string;
  image: null | File;
  position: null | number;
}

type Validators = {
  [Property in keyof Fields]: (
    value: Fields[Property]
  ) => (
    Property extends 'image'
      ? Promise<boolean>
      : boolean
  );
};

// eslint-disable-next-line prefer-regex-literals, no-useless-escape
const emailTestPattern = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
const telTestPattern = /^[+]{0,1}380([0-9]{9})$/;

export const Form: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState<Fields>({
    name: '',
    email: '',
    tel: '',
    image: null,
    position: null,
  });
  const [fileError, setFileError] = useState('Upload your image');
  const { token, softUpdate } = useToken();
  const { positions, loading: positionsLoading } = usePositions();

  const updateField = <T extends keyof Fields>(
    field: T,
    values: typeof fields[T],
  ) => {
    setFields((prev) => ({ ...prev, [field]: values }));
  };

  const validators: Validators = {
    name(value) {
      const normalizedValueLength = value.trim().length;

      const isValid = normalizedValueLength >= 2 && normalizedValueLength <= 60;

      return isValid;
    },

    email(value) {
      const normalizedValue = value.trim();
      const normalizedValueLength = normalizedValue.length;

      const isValid = (
        normalizedValueLength >= 2
        && normalizedValueLength <= 100
        && emailTestPattern.test(normalizedValue)
      );

      return isValid;
    },

    tel(value) {
      const isValid = telTestPattern.test(value);

      return isValid;
    },

    position(value) {
      return Boolean(value);
    },

    image: async (file) => {
      if (!file) {
        return false;
      }

      const sizeLimit = 5 * 1024 * 1024;

      if (file.size >= sizeLimit) {
        setFileError('File should be under 5mb');

        return false;
      }

      const fileFormat = file.name.split('.').pop() || '';

      if (!['jpg', 'jpeg'].includes(fileFormat)) {
        setFileError('Only jpg/jpeg files allowed');

        return false;
      }

      const image = new Image();

      image.src = window.URL.createObjectURL(file);

      await image.decode();

      if (image.height < 70 || image.width < 70) {
        setFileError('Image should be at least 70x70px');

        return false;
      }

      return true;
    },
  };

  const isAllFieldsValid = [
    Boolean(fields.name) && validators.name(fields.name),
    Boolean(fields.email) && validators.email(fields.email),
    Boolean(fields.tel) && validators.tel(fields.tel),
    Boolean(fields.position) && validators.position(fields.position),
    Boolean(fields.image) && validators.image(fields.image),
  ].every((statement) => (statement));

  const handleSubmit:React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!isAllFieldsValid || !token) {
      return;
    }

    setLoading(true);

    await softUpdate();

    try {
      await sendUser({
        token: token.token,
        user: {
          name: fields.name,
          email: fields.email,
          phone: fields.tel,
          position_id: `${fields.position!}`,
          photo: fields.image!,
        },
      });
    } catch (error) {
      alert((error as Error).message);

      setLoading(false);
      return;
    }

    setLoading(false);

    e.currentTarget.reset();
  };

  if (loading) {
    return (
      <Loader size={100} />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="form"
    >
      <div className="form__fields">
        <Input
          onChange={(e) => { updateField('name', e.target.value); }}
          value={fields.name}
          validator={validators.name}
          tipMessage="Type your name"
          errorMessage="Invalid name"
          placeholder="Your name"
          type="text"
          name="name"
          minLength={2}
          maxLength={60}
          required
        />

        <Input
          onChange={(e) => { updateField('email', e.target.value); }}
          value={fields.email}
          type="email"
          tipMessage="Type your email"
          errorMessage="Invalid email"
          validator={validators.email}
          placeholder="Email"
          minLength={2}
          maxLength={100}
          pattern={emailTestPattern.source}
          name="email"
          required
        />

        <Input
          onChange={(e) => { updateField('tel', e.target.value); }}
          value={fields.tel}
          type="tel"
          tipMessage="+38 (XXX) XXX - XX - XX"
          errorMessage="Provide valid phone number"
          validator={validators.tel}
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

        {positionsLoading && (
          <Loader size={50} />
        )}

        {positions.map(({ name, id }, i) => {
          const isFirst = i === 0;

          if (isFirst && fields.position !== id) {
            updateField('position', id);
          }

          return (
            <RadioInput
              name="position"
              key={id}
              label={name}
              value={id}
              onClick={() => (updateField('position', id))}
              defaultChecked={isFirst}
            />
          );
        })}
      </div>

      <div className="form__file-input">
        <FileInput
          validator={validators.image}
          errorMessage={fileError}
          placeholder="Upload your photo"
          accept=".jpg, .jpeg"
          onChange={(e) => updateField('image', e.currentTarget.files && e.currentTarget.files[0])}
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
  );
};
