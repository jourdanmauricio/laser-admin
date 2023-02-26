import { useState } from 'react';

const useClinic = ({ clinic, setClinic, setAction, handleSubmit }) => {
  const [error, setError] = useState({
    name: null,
    phone: null,
    email: null,
    state: null,
    order: null,
    city: null,
    cp: null,
    street: null,
    number: null,
    floor: null,
    apartment: null,
    days: null,
    observation: null,
  });

  const handleChange = (name, value) => {
    setClinic({ ...clinic, [name]: value });
  };

  const handleCancel = () => {
    setAction('VIEW');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };
  return { error, handleChange, handleSubmit, handleCancel, onSubmit };
};

export default useClinic;
