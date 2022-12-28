/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import cn from 'classnames';
import React, { useState } from 'react';
import './fileInput.scss';

interface Props extends React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement
> {
  errorMessage: string
  validator: (value: File) => Promise<boolean>
}

export const FileInput: React.FC<Props> = ({
  required, validator, errorMessage, placeholder, ...rest
}) => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState(false);

  const handleInput: React.FormEventHandler<HTMLInputElement> = async (e) => {
    setValue(e.currentTarget.value);

    if (!e.currentTarget.value || !e.currentTarget.files) {
      setError(true);
      return;
    }

    const isValid = await validator(e.currentTarget.files[0]);

    setError(!isValid);
  };

  return (
    <label
      className={cn(
        'file-input',
        {
          'file-input--failed': error,
        },
      )}
      data-placeholder={
        value.split('\\').pop() || placeholder
      }
      data-filled={Boolean(value)}
    >
      <input
        value={value}
        type="file"
        className="file-input__field"
        onInput={handleInput}
        required={required}
        {...rest}
      />

      {error && (
        <div className="file-input__error">
          {errorMessage}
        </div>
      )}
    </label>
  );
};
