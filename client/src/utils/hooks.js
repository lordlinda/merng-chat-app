import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  /**inital state will be what we pass in */
  const [values, setValues] = useState(initialState);
  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };
  return {
    onChange,
    onSubmit,
    values,
  };
};
