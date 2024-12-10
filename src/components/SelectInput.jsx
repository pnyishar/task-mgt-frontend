import React from 'react'
import { ErrorMessage } from '@hookform/error-message'

const SelectInput = React.forwardRef(
  (
    { label, name, errors, onChange, onBlur, options, className, placeholder },
    ref,
  ) => {
    return (
      <div className="mb-4">
        {label && (
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={name}
          >
            {label}
          </label>
        )}
        <select
          className={`shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
          onBlur={onBlur}
          onChange={onChange}
          name={name}
          ref={ref}
        >
          <option value={null}>{placeholder}</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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

export default SelectInput
