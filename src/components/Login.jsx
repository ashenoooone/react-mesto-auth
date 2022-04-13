import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <section className='register'>
      <h1 className='register__title'>Вход</h1>
      <form className='register__form'>
        <input type='email' placeholder='Email' className='register__input' />
        <input
          type='password'
          placeholder='Пароль'
          className='register__input'
        />
        <button type='submit' className='register__submit-button'>
          Войти
        </button>
      </form>
    </section>
  );
};

export default Login;
