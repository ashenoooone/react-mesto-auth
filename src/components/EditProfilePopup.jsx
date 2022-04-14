import React from 'react';
import PopupWithForm from './PopupWithForm';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useState, useEffect } from 'react';

const EditProfilePopup = ({ onUpdateUser, onClose, isOpened }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about,
    });
    onClose();
  };
  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpened]);

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      onClose={onClose}
      isOpened={isOpened}
      formName='form_type-edit'
      submitButtonValue='Сохранить'
      onSubmit={handleSubmit}
    >
      <>
        <input
          type='text'
          value={name}
          className='popup__input popup__input_type_name'
          placeholder='Имя'
          name='inputName'
          required
          id='name-input'
          minLength='2'
          maxLength='40'
          onChange={handleNameChange}
        />
        <span className='popup__input-error name-input-error'></span>
        <input
          type='text'
          value={about}
          className='popup__input popup__input_type_activity'
          placeholder='Деятельность'
          name='inputActivity'
          required
          id='activity-input'
          minLength='2'
          maxLength='200'
          onChange={handleAboutChange}
        />
        <span className='popup__input-error activity-input-error'></span>
      </>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
