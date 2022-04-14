import React, { useState } from 'react';
import AuthApi from '../utils/Auth';
import InfoTooltip from './InfoTooltip';

const Login = ({ handleLogin, handleInfoToolTip }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    AuthApi.signin({ email, password })
      .then(({ token }) => {
        localStorage.setItem('jwt', token);
        handleLogin(token);
      })
      .catch(() => {
        handleInfoToolTip(
          `Что-то пошло не так!
        Попробуйте ещё раз.`,
          true
        );
      });
  };
  return (
    <section className='register'>
      <h1 className='register__title'>Вход</h1>
      <form className='register__form' onSubmit={handleSubmit}>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          className='register__input'
        />
        <input
          type='password'
          placeholder='Пароль'
          className='register__input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit' className='register__submit-button'>
          Войти
        </button>
      </form>
    </section>
  );
};

export default Login;
