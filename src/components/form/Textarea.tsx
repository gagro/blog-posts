import React from "react";

type TextareaProps = {
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  placeholder?: string;
  name: string;
  error?: string;
  minLength?: number;
  maxLength?: number;
};

const Textarea: React.FC<TextareaProps> = (props) => {
  const {
    value,
    onChange,
    label,
    placeholder,
    name,
    error,
    minLength,
    maxLength,
  } = props;

  return (
    <div
      className={`box-border flex w-full flex-col bg-white p-4 ${
        error ? "text-red-500" : ""
      }`}
    >
      <label htmlFor={name}>{label}</label>
      <textarea
        className={`box-border h-32 rounded-xl border border-solid border-black p-2.5 text-black shadow-xl focus:outline-none ${
          error ? "border-red-500" : ""
        }`}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e)}
        name={name}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
      />
      {error && <span>{error}</span>}
    </div>
  );
};

export default Textarea;
