import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function Card({ card, handleCardClick, handleCardLike, handleCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwner = currentUser._id === card.owner._id;
  const isLiked = card.likes.some((item) => item._id === currentUser._id);
  function handleClick() {
    handleCardClick({ name: card.name, src: card.link });
  }
  return (
    <div className='card'>
      <button
        className={`${
          isOwner
            ? 'card__delete-button_active'
            : 'card__delete-button_inactive'
        }`}
        onClick={() => handleCardDelete(card)}
        aria-label='удалить'
        type='button'
      ></button>
      <img
        src={card.link}
        alt={card.name}
        className='card__image'
        onClick={handleClick}
      />
      <div className='card__info'>
        <h2 className='card__title'>{card.name}</h2>
        <div className='card__container'>
          <button
            className={`card__like-button ${
              isLiked && 'card__like-button_active'
            }`}
            type='button'
            aria-label='лайк'
            onClick={() => handleCardLike(card)}
          ></button>
          <p className='card__like-counter'>{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
export default Card;
