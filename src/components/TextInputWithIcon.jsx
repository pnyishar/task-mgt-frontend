import React from 'react'
import { ErrorMessage } from '@hookform/error-message'

const TextInputWithIcon = React.forwardRef(
  (
    {
      onChange,
      onBlur,
      label,
      name,
      visibleLabel,
      className,
      placeholder,
      value,
      type,
      errors,
      readonly,
      autoComplete,
      LeftIcon,
      RightIcon,
      show,
      setShow,
      title,
    },
    ref,
  ) => {
    return (
      <div className="flex flex-col mb-4">
        {visibleLabel && (
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={label}
          >
            {label}
          </label>
        )}
        <div className="flex items-center relative text-gray-400 focus:text-gray-600">
          {LeftIcon && <LeftIcon size={20} className="absolute left-2" />}
          <input
            className={`shadow appearance-none border rounded-lg w-full py-2 ${
              LeftIcon ? 'pl-8' : 'pl-3'
            } pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
            id={label}
            placeholder={placeholder}
            value={value}
            ref={ref}
            type={type}
            autoComplete={autoComplete}
            readOnly={readonly}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            title={title}
          />
          {RightIcon && (
            <RightIcon
              size={20}
              className="absolute text-gray-500 right-2"
              onClick={() => setShow(!show)}
            />
          )}
        </div>
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

export default TextInputWithIcon
