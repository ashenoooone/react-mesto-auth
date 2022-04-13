import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useRef, useEffect } from 'react';

const EditAvatarPopup = ({ onClose, isOpened, onUpdateAvatar }) => {
  const avatarRef = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
    onClose();
  };

  return (
    <PopupWithForm
      name='edit-avatar'
      title='Обновить аватар'
      onClose={onClose}
      isOpened={isOpened}
      submitButtonValue='Сохранить'
      formName='form_type_edit-avatar'
      onSubmit={onSubmit}
    >
      <>
        <input
          type='url'
          name='inputAvatarLink'
          id='avatar-link-input'
          className='popup__input popup__input_type_avatar-link'
          placeholder='Ссылка на аватар'
          ref={avatarRef}
          required
        />
        <span className='popup__input-error avatar-link-input-error'></span>
      </>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
