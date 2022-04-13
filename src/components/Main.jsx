import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className='profile content__section'>
        <div className='profile__person'>
          <div
            className='profile__image-container'
            onClick={props.handleEditAvatarClick}
          >
            <img src={currentUser.avatar} alt='' className='profile__avatar' />
          </div>
          <div className='profile__info'>
            <div className='profile__container'>
              <h1 className='profile__name'>{currentUser.name}</h1>
              <button
                onClick={props.handleEditProfileClick}
                className='profile__edit-button'
                type='button'
                aria-label='редактировать'
              ></button>
            </div>
            <p className='profile__activity'>{currentUser.about}</p>
          </div>
        </div>
        <button
          className='profile__add-button'
          type='button'
          aria-label='добавить'
          onClick={props.handleAddPlaceClick}
        ></button>
      </section>
      <section className='elements'>
        {props.cards.map((item) => {
          return (
            <Card
              card={item}
              handleCardClick={props.handleCardClick}
              handleCardLike={props.handleCardLike}
              handleCardDelete={props.handleCardDelete}
              key={item._id}
            />
          );
        })}
      </section>
    </main>
  );
}
export default Main;
