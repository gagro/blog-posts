import React from "react";

type ButtonProps = {
  text: string;
  type?: "submit" | "button" | "reset" | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<ButtonProps> = (props) => {
  const { text, type, onClick } = props;

  return (
    <button
      className="mb-1 rounded-xl border border-solid border-black py-2 px-10 shadow-xl hover:bg-[#ebe3e3]"
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
