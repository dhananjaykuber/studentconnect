import React, { useState } from "react";

const FormInput = ({
  label,
  type,
  placeholder,
  required = false,
  onChange,
  value,
  //   validator = () => {},
  name,
  error,
  resetError,
  leftIcon,
  rightIcon,
  handleFocusCaputer,
  handleOnBlur,
  minvalue,
  maxvalue,
}) => {
  const [localType, setLocalType] = useState(type);
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    // const response = validator(inputValue);

    // setIsValid(response); // Update the validity state
    onChange(inputValue); // Pass the input value to
  };

  const handleIconClick = () => {
    if (localType === "password") {
      setLocalType("text");
    } else {
      setLocalType("password");
    }
  };

  return (
    <div className="mb-3">
      {label && (
        <label className="mb-1 block text-sm font-semibold text-gray-900 dark:font-medium dark:text-gray-100">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="letf-0 pointer-events-none absolute inset-y-0 flex items-center pl-3">
            {leftIcon}
          </div>
        )}
        <input
          onFocus={resetError}
          type={localType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          required={required}
          onFocusCapture={handleFocusCaputer}
          onBlur={handleOnBlur}
          min={minvalue}
          max={maxvalue}
          className={`border ${
            error ? "border-red-600" : "border-gray-400"
          }  block w-full rounded-lg text-sm text-gray-900 focus:border-blue-500 focus:ring-2
          focus:ring-blue-200 ${
            leftIcon && "pl-9"
          } p-2 outline-none dark:bg-gray-700 dark:text-white `}
        />
        {rightIcon && (
          <div
            className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
            onClick={handleIconClick}
          >
            {rightIcon}
          </div>
        )}
      </div>
      {/* {!isValid?.isValid && error === null && (
        <span className="mt-2 text-sm text-red-600">{isValid?.msg}</span>
      )} */}
      {error && <span className="mt-2 text-sm text-red-600">{error}</span>}
    </div>
  );
};

export default FormInput;
