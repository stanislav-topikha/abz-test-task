/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import cn from 'classnames';
import React, { useState } from 'react';
import './fileInput.scss';

interface Props extends React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement
> {
  errorMessage: string
  validator: (value: File) => boolean
}

export const FileInput: React.FC<Props> = (props) => {
  const {
    required, validator, errorMessage, placeholder, ...rest
  } = props;
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    if (!e.target.files || !validator(e.target.files[0])) {
      setError(true);
      return;
    }

    setError(false);
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
        onChange={handleChange}
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
