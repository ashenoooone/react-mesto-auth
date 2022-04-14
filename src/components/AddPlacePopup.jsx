import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useState, useEffect } from 'react';

const AddPlacePopup = ({ onClose, isOpened, handleAddPlaceSubmit }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    handleAddPlaceSubmit({ name, link });
    onClose();
  };
  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpened]);

  return (
    <PopupWithForm
      name='add-card'
      title='Новое место'
      onClose={onClose}
      isOpened={isOpened}
      formName='form_type_add-card'
      submitButtonValue='Создать'
      onSubmit={onSubmit}
    >
      <>
        <input
          type='text'
          className='popup__input popup__input_type_title'
          placeholder='Название'
          name='inputTitle'
          required
          id='title-input'
          minLength='2'
          maxLength='30'
          value={name}
          onChange={handleNameChange}
        />
        <span className='popup__input-error title-input-error'></span>
        <input
          type='url'
          className='popup__input popup__input_type_link'
          placeholder='Ссылка на картинку'
          name='inputLink'
          value={link}
          required
          id='link-input'
          onChange={handleLinkChange}
        />
        <span className='popup__input-error link-input-error'></span>
      </>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
