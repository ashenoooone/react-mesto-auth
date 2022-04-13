import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <section className='register'>
      <h1 className='register__title'>Регистрация</h1>
      <form className='register__form'>
        <input type='email' placeholder='Email' className='register__input' />
        <input
          type='password'
          placeholder='Пароль'
          className='register__input'
        />
        <button type='submit' className='register__submit-button'>
          Зарегистироваться
        </button>
      </form>
      <Link to='/login' className='register__link'>
        Уже зарегистрированы? Войти
      </Link>
    </section>
  );
};

export default Register;
