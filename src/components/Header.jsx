import React from 'react';
import headerLogo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import burger from '../images/burger.svg';
import closeButton from '../images/closebutton.svg';

function Header({ isLogged, handleLogout, currentUser }) {
  const [burgerActive, setBurgerActive] = React.useState(false);
  const location = useLocation();
  return (
    <header className='header'>
      <div
        className={`header__user-panel ${
          burgerActive && isLogged && 'header__user-panel_active'
        }`}
      >
        <p className='header__email'>{currentUser.email}</p>
        <button onClick={handleLogout} className='header__exit-button'>
          Выйти
        </button>
      </div>
      <div
        className={`${
          burgerActive && 'header_burger-active'
        } header__main-content`}
      >
        <img src={headerLogo} alt='логотип' className='logo' />
        <img
          style={{ display: !isLogged && 'none' }}
          src={!burgerActive ? burger : closeButton}
          alt='бургер'
          className='header__burger'
          onClick={() => setBurgerActive(!burgerActive)}
        />
        <div
          className='header__container'
          style={{ display: !isLogged && 'block' }}
        >
          <Link
            to={location.pathname === '/register' ? '/login' : '/register'}
            className={`header__link ${isLogged && 'header__link_inactive'}`}
          >
            {location.pathname === '/register' ? 'Войти' : 'Регистрация'}
          </Link>
          <div className={`header__menu ${isLogged && 'header__menu_active'}`}>
            <p className='header__email'>{currentUser.email}</p>
            <button onClick={handleLogout} className='header__exit-button'>
              Выйти
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
