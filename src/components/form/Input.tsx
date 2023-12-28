import React from "react";

type InputProps = {
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder?: string;
  type?: string;
  name: string;
  error?: string;
  minLength?: number;
  maxLength?: number;
};

const Input: React.FC<InputProps> = (props) => {
  const {
    value,
    onChange,
    label,
    placeholder,
    type,
    name,
    error,
    minLength,
    maxLength,
  } = props;

  return (
    <div
      className={`box-border flex w-full flex-col bg-white p-4 ${error ? "text-red-500" : ""
        }`}
    >
      <label htmlFor={name}>{label}</label>
      <input
        className={`box-border rounded-xl border border-solid border-black p-2.5 text-black shadow-xl focus:outline-none ${error ? "border-red-500" : ""
          }`}
        type={type}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        name={name}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
      />
      {error && <span>{error}</span>}
    </div>
  );
};

export default Input;
