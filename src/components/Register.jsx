import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ handleSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(email, password);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <section className='register'>
      <h1 className='register__title'>Регистрация</h1>
      <form className='register__form' onSubmit={onSubmit}>
        <input
          type='email'
          value={email}
          onChange={handleEmailChange}
          placeholder='Email'
          className='register__input'
        />
        <input
          type='password'
          placeholder='Пароль'
          value={password}
          onChange={handlePasswordChange}
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
