import { useState } from 'react';

export default function useForm(initialValues = {}) {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: null,
    }));
  };

  const setServerErrors = (serverErrors) => {
    setErrors(serverErrors || {});
  };

  const resetForm = () => {
    setForm(initialValues);
    setErrors({});
  };

  return {
    form,
    errors,
    setForm,
    setErrors,
    updateField,
    setServerErrors,
    resetForm,
  };
}