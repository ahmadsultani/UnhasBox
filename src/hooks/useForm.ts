import { useState } from "react";

type FormProps<T> = {
  initialValues: T;
  onSubmit: (values: T) => void;
};

export const useForm = <T extends Record<string, unknown>>({
  initialValues,
  onSubmit,
}: FormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(values);
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    handleChange,
    handleSubmit,
    resetForm,
    values,
  };
};
