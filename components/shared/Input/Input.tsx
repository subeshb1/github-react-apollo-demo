import React from 'react';

interface InputProps {
  label?: string;
  id?: string;
  labelClass?: string;
  wrapperClass?: string;
  focusClass?: string;
  focusOutlineClass?: string;
  className?: string;
  message?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  state?: 'error' | 'warning' | 'success';
  readOnly?: boolean;
}

const Input = React.forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<
    InputProps &
      React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >
  >
>(function InputWithRef(
  {
    label,
    id = Math.random().toString(),
    wrapperClass,
    labelClass,
    message,
    state,
    className = '',
    focusClass = 'focus:border-br-primary',
    focusOutlineClass = 'focus:ring-br-primary',
    onPressEnter,
    onKeyDown,
    readOnly,
    ...otherProps
  },
  ref
) {
  const input = (
    <input
      type={'text'}
      id={id}
      readOnly={readOnly}
      ref={ref}
      onKeyDown={(event) => {
        if (event.code === 'Enter') {
          onPressEnter?.(event);
        }
        onKeyDown?.(event);
      }}
      className={`block placeholder-gray-400 sm:text-sm border-gray-300 disabled:bg-gray-100 ${
        readOnly ? 'read-only:bg-gray-100' : ''
      } rounded-md shadow-sm ${focusOutlineClass} ${focusClass} ${className} ${
        otherProps.type === 'checkbox' ? 'h-4 w-4 !rounded text-br-primary' : ''
      }
      ${
        otherProps.type === 'radio'
          ? 'h-4 w-4 !rounded-full text-br-primary'
          : ''
      }
      `}
      {...otherProps}
    />
  );
  if (!label) {
    return input;
  }
  return (
    <div className={wrapperClass}>
      <label
        htmlFor={id}
        className={`block text-sm font-medium text-gray-700 ${labelClass}`}
      >
        {label}
      </label>
      <div className="mt-1 relative flex items-center">{input}</div>
      {message && (
        <p
          className={`mt-2 text-sm ${
            state === 'error' ? 'text-red-400' : 'text-gray-500'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
});

export default Input;
