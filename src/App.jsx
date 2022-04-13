import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import PopupWithForm from './components/PopupWithForm';
import api from './utils/Api';
import ImagePopup from './components/ImagePopup';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import EditProfilePopup from './components/EditProfilePopup';
import EditAvatarPopup from './components/EditAvatarPopup';
import AddPlacePopup from './components/AddPlacePopup';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditAvatarPopupOpen, setEditAvatarOpened] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfileOpened] = React.useState(false);
  const [isAddCardPopupOpen, setAddPlaceOpened] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  function handleEditAvatarClick() {
    setEditAvatarOpened(true);
  }

  function handleEditProfileClick() {
    setEditProfileOpened(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceOpened(true);
  }

  function handleCardClick(obj) {
    setSelectedCard(obj);
  }

  function handleAddPlaceSubmit(obj) {
    api
      .addCard(obj.name, obj.link)
      .then((res) => {
        setCards([res, ...cards]);
      })
      .catch((e) => console.error(e));
  }

  function handleUpdateUser(obj) {
    api
      .editProfile(obj.name, obj.about)
      .then((res) => {
        setCurrentUser({ ...currentUser, name: obj.name, about: obj.about });
      })
      .catch((e) => console.error(e));
  }

  function onUpdateAvatar(obj) {
    api
      .setNewAvatar(obj.avatar)
      .then((res) => setCurrentUser({ ...currentUser, avatar: obj.avatar }))
      .catch((e) => console.error(e));
  }

  function closeAllPopups() {
    setEditAvatarOpened(false);
    setEditProfileOpened(false);
    setAddPlaceOpened(false);
    setSelectedCard(null);
  }

  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getInitialProfileInfo()])
      .then(([cards, user]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((e) => console.error(e));
  }, []);

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch((e) => console.error(e));
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api
      .toggleLike(card._id, !isLiked)
      .then((c) => {
        setCards((cards) =>
          cards.map((item) => (item._id === card._id ? c : item))
        );
      })
      .catch((e) => console.error(e));
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              <Main
                handleEditAvatarClick={handleEditAvatarClick}
                handleEditProfileClick={handleEditProfileClick}
                handleAddPlaceClick={handleAddPlaceClick}
                handleCardClick={handleCardClick}
                handleCardDelete={handleCardDelete}
                handleCardLike={handleCardLike}
                cards={cards}
              />
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <EditAvatarPopup
          onClose={closeAllPopups}
          isOpened={isEditAvatarPopupOpen}
          onUpdateAvatar={onUpdateAvatar}
        />
        <PopupWithForm
          name='delete-card'
          title='Вы уверенны?'
          onClose={closeAllPopups}
          submitButtonValue='Да'
          children={<form className='popup__form'></form>}
        />
        <EditProfilePopup
          onClose={closeAllPopups}
          isOpened={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          onClose={closeAllPopups}
          isOpened={isAddCardPopupOpen}
          handleAddPlaceSubmit={handleAddPlaceSubmit}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
