import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthApi from '../utils/Auth';
import InfoTooltip from './InfoTooltip';

const Register = ({ handleInfoToolTip }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    AuthApi.signup({ email, password })
      .then(({ _id, email }) => {
        handleInfoToolTip(`Вы успешно зарегистрировались!`, false);
        navigate('/login');
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
      <h1 className='register__title'>Регистрация</h1>
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
