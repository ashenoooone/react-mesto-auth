import React, { useState } from 'react';

const Login = ({ handleSubmit }) => {
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
      <h1 className='register__title'>Вход</h1>
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
          className='register__input'
          value={password}
          onChange={handlePasswordChange}
        />
        <button type='submit' className='register__submit-button'>
          Войти
        </button>
      </form>
    </section>
  );
};

export default Login;
