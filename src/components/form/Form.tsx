import React from "react";

type FormProps = {
  children: React.ReactNode;
  handleSubmit: (e: React.FormEvent) => void;
  title: string;
};

const Form: React.FC<FormProps> = (props) => {
  const { title, handleSubmit, children } = props;

  return (
    <div className="box-border w-full rounded-xl bg-white p-2">
      <h1 className="text-center text-2xl">{title}</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        {children}
      </form>
    </div>
  );
};

export default Form;
