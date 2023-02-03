import { useState } from "react";

type Form = {
    initialValues: {
        [key: string]: string
    }
    onSubmit: (data: any) => void
    validations: {
        [key: string]: {
            pattern?: {
                value: string
                message: string
            },
            required?: {
                value: boolean
                message: string
            }
        }
    }
}

type Error = {
    [key: string]: string
}

const useForm = (options: Form) => {
  const { initialValues, onSubmit, validations } = options;

  const [values, setValues] = useState<typeof initialValues>(initialValues || {});
  const [errors, setErrors] = useState<Error>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validations) {
      let valid = true;
      const newErrors: Error = {};
      for (const key in validations) {
        const value: string = values[key]!;
        const validation = validations[key as keyof typeof validations];

        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const required = validation?.required;
        if(required?.value && value === "") {
            valid = false;
            newErrors[key] = required.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});

    if (onSubmit) {
      onSubmit(values);
    }
  };

  return {
    values,
    handleChange,
    handleSubmit,
    errors,
  };
};

export default useForm;