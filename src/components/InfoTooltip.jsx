import React from 'react';
import authErrorImage from '../images/auth-error.svg';
import authSuccesImage from '../images/auth-succes.svg';

const InfoTooltip = ({ name, title, isError, isOpened, onClose }) => {
  return (
    <div
      onClick={(e) => {
        if (
          e.target.classList.contains('popup') ||
          e.target.classList.contains('popup__close-button')
        )
          onClose();
      }}
      className={
        isOpened
          ? `popup popup_type_${name} popup_active`
          : `popup popup_type_${name}`
      }
    >
      <div className='popup__container'>
        <button className='popup__close-button' type='button'></button>
        <img
          src={isError ? authErrorImage : authSuccesImage}
          alt=''
          className='popup__image'
        />
        <h2 className='popup__info'>{title}</h2>
      </div>
    </div>
  );
};

export default InfoTooltip;
