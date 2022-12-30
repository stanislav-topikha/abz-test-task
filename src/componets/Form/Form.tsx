/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
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
  name: {
    check: boolean;
    value: null | string;
  }
  email: {
    check: boolean;
    value: null | string;
  }
  tel: {
    check: boolean;
    value: null | string;
  }
  image: {
    check: boolean;
    value: null | File;
  }
  position: {
    check: boolean;
    value: null | number;
  }
}

type Validators = {
  [Property in keyof Fields]: (
    value: NonNullable<Fields[Property]['value']>
  ) => (
    Property extends 'image'
      ? Promise<boolean>
      : boolean
  );
};

// eslint-disable-next-line prefer-regex-literals, no-useless-escape
const emailTestPattern = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
const telTestPattern = /^[+]{0,1}380([0-9]{9})$/;

interface Props {
  onSuccess: VoidFunction;
}

export const Form: React.FC<Props> = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState<Readonly<Fields>>({
    name: {
      value: null,
      check: false,
    },
    email: {
      value: null,
      check: false,
    },
    tel: {
      value: null,
      check: false,
    },
    image: {
      value: null,
      check: false,
    },
    position: {
      value: null,
      check: false,
    },
  });
  const [fileError, setFileError] = useState('Upload your image');
  const { token, softUpdate } = useToken();
  const { positions, loading: positionsLoading } = usePositions();

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

  const updateField = async <T extends keyof Fields> (
    field: T,
    value: Fields[T]['value'],
  ) => {
    if (!value) {
      setFields((prev) => ({
        ...prev,
        [field]: {
          value,
          check: false,
        },
      }));

      return;
    }
    const isValid = await validators[field](value);

    setFields((prev) => ({
      ...prev,
      [field]: {
        value,
        check: isValid,
      },
    }));
  };

  const isAllFieldsValid = Object.values(fields)
    .map(({ check }) => (check))
    .every((check) => (check));

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
          name: fields.name.value!,
          email: fields.email.value!,
          phone: fields.tel.value!,
          position_id: `${fields.position.value!}`,
          photo: fields.image.value!,
        },
      });
    } catch (error) {
      toast.error((error as Error).message, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'light',
      });

      setLoading(false);
      return;
    }

    setLoading(false);
    onSuccess();
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
          onInput={(e) => { updateField('name', e.currentTarget.value); }}
          isValid={fields.name.check}
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
          onInput={(e) => { updateField('email', e.currentTarget.value); }}
          isValid={fields.email.check}
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
          onInput={(e) => { updateField('tel', e.currentTarget.value); }}
          isValid={fields.tel.check}
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

          if (isFirst && fields.position.value === null) {
            updateField('position', id);
          }

          return (
            <RadioInput
              name="position"
              key={id}
              label={name}
              value={id}
              onChange={() => {
                updateField('position', id);
              }}
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
