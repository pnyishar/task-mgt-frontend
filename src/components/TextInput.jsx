import React from 'react'
import { ErrorMessage } from '@hookform/error-message'

const TextInput = React.forwardRef(
  (
    {
      onChange,
      onBlur,
      label,
      name,
      visibleLabel,
      className,
      placeholder,
      type,
      value,
      errors,
      readOnly,
    },
    ref,
  ) => {
    return (
      <div className="mb-4">
        {visibleLabel && (
          <label className="block text-gray-500 text-sm mb-2" htmlFor={label}>
            {label}
          </label>
        )}
        <input
          className={`shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
          ref={ref}
          id={label}
          type={type}
          placeholder={placeholder}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          name={name}
          readOnly={readOnly}
        />
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ type, message }) => (
            <span
              key={type}
              className="text-[12px] text-red-700 text-left float-left px-2 py-2"
            >
              {message}
            </span>
          )}
        />
      </div>
    )
  },
)

export default TextInput
