import { ChangeEvent, useState } from 'react';
import { IMemberLogin } from '../features/interfaces/Auth/Auth';
import API, { setAuthToken } from '../lib/Api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AUTH_LOGIN, AUTH_LOGOUT } from '../stores/rootReducer';

export function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState<IMemberLogin>({
    email: '',
    password: '',
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleLogin() {
    try {
      const response = await API.post('/auth/login', form);
      dispatch(AUTH_LOGIN(response.data));
      setAuthToken(localStorage.token);
      navigate('/');
    } catch (err) {
      console.log('error', err);
    }
  }

  async function handleLogout() {
    try {
      const response = await API.get('/logout');
      dispatch(AUTH_LOGOUT(response.data));
      navigate('/login');
    } catch (error) {
      console.log('Error loading out:', error);
    }
  }

  return { handleChange, handleLogin, handleLogout };
}
