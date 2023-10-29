import { ChangeEvent, useState } from 'react';
import { IMemberRegister } from '../features/interfaces/Auth/Auth';
import API from '../lib/Api';
import { useNavigate } from 'react-router-dom';

export function useRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState<IMemberRegister>({
    name: '',
    email: '',
    password: '',
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleRegister() {
    try {
      const response = await API.post('/auth/register', form);
      console.log('regiister', response.data);
      navigate('/login');
    } catch (err) {
      console.log('error', err);
    }
  }

  return { handleChange, handleRegister };
}
