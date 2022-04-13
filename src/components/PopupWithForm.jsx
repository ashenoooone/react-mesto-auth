import React from 'react';
function PopupWithForm(props) {
  return (
    <div
      onClick={(e) => {
        if (
          e.target.classList.contains('popup') ||
          e.target.classList.contains('popup__close-button')
        )
          props.onClose();
      }}
      className={
        props.isOpened
          ? `popup popup_type_${props.name} popup_active`
          : `popup popup_type_${props.name}`
      }
    >
      <div className='popup__container'>
        <h2 className='popup__title'>{props.title}</h2>
        <button className='popup__close-button' type='button'></button>
        <form
          className={`popup__form popup__${props.formName}`}
          name={props.formName}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            type='submit'
            className='popup__save-button'
            value={props.submitButtonValue}
          >
            {props.submitButtonValue}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
