import React from 'react'
import Select, { components } from 'react-select'
import { ErrorMessage } from '@hookform/error-message'
import { Controller } from 'react-hook-form'
import CustomIcon from './CustomIcon'
import { searchGray } from '@/assets'

const Control = ({ children, ...props }) => (
  <components.Control {...props}>
    <div className="flex relative items-center w-full">
      <div className="absolute pl-3">
        <CustomIcon icon={searchGray} className="h-4" title="search" />
      </div>
      <div className="flex w-full rounded-lg pl-8 text-[12px]">{children}</div>
    </div>
  </components.Control>
)

const SelectControllerInput = React.forwardRef(
  (
    {
      label,
      name,
      control,
      errors,
      options,
      className,
      placeholder,
      isMulti,
      value,
      onChange: propOnChange,
    },
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
        <Controller
          control={control}
          render={({
            field: { onChange: controllerOnChange, onBlur, value },
          }) => (
            <Select
              components={{ Control }}
              onChange={(selectedOptions) => {
                // Call the parent's onChange handler if provided
                propOnChange && propOnChange(selectedOptions)
                // Call the controller's onChange handler
                controllerOnChange(selectedOptions)
              }}
              onBlur={onBlur}
              value={value}
              options={options}
              ref={ref}
              isSearchable
              isMulti={isMulti}
              styles={{
                placeholder: (base) => ({
                  ...base,
                  fontSize: 12,
                  fontWeight: 400,
                }),
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderRadius: 10,
                  borderColor: '#000000',
                }),
                input: (base) => ({
                  ...base,
                  height: 38,
                }),
                valueSingle: (baseStyles) => ({
                  paddingLeft: 30,
                }),
              }}
              theme={{ roundness: 30 }}
              placeholder={placeholder}
              className={`text-[12px] ${className}`}
            />
          )}
          defaultValue={value}
          name={name}
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

export default SelectControllerInput
