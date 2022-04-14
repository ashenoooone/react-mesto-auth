import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import api from '../utils/Api';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import RequierAuth from '../hoc/ProtectedRoute';
import AuthApi from '../utils/Auth';
import IsAlreadyAuth from '../hoc/IsAlreadyAuth';
import InfoTooltip from './InfoTooltip';
function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditAvatarPopupOpen, setEditAvatarOpened] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfileOpened] = React.useState(false);
  const [isAddCardPopupOpen, setAddPlaceOpened] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isLogged, setIsLogged] = React.useState(false);
  const navigate = useNavigate();
  const [InfoTooltipSettings, setInfoTooltipSettings] = React.useState({
    title: '',
    error: false,
  });
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
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

  function handleLoginSubmit(email, password) {
    AuthApi.signin({ email, password })
      .then(({ token }) => {
        localStorage.setItem('jwt', token);
        handleLogin(token);
      })
      .catch(() => {
        setInfoTooltipSettings({
          title: `Что-то пошло не так!
        Попробуйте ещё раз.`,
          error: true,
        });
        setInfoTooltipOpen(true);
      });
  }

  function handleLogin(token) {
    Promise.all([
      AuthApi.tokenCheck(token),
      api.getInitialCards(),
      api.getInitialProfileInfo(),
    ]).then(([{ data }, cards, user]) => {
      setIsLogged(true);
      navigate('/');
      setCurrentUser({ ...data, ...user, ...currentUser });
      setCards(cards);
    });
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
    setInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      Promise.all([
        api.getInitialCards(),
        api.getInitialProfileInfo(),
        AuthApi.tokenCheck(jwt),
      ])
        .then(([cards, user, { data }]) => {
          setIsLogged(true);
          navigate('/');
          setCurrentUser({
            ...data,
            ...user,
            ...currentUser,
          });
          setCards(cards);
        })
        .catch((e) => console.error(e));
    }
  }, []);

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.removeItem('jwt');
    setCurrentUser({});
  };

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

  function handleRegisterSubmit(email, password) {
    AuthApi.signup({ email, password })
      .then(() => {
        setInfoTooltipSettings({
          title: `Вы успешно зарегистрировались!`,
          error: false,
        });
        setInfoTooltipOpen(true);
        navigate('/login');
      })
      .catch(() => {
        setInfoTooltipSettings({
          title: `Что-то пошло не так!
        Попробуйте ещё раз.`,
          error: true,
        });
        setInfoTooltipOpen(true);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
          isLogged={isLogged}
          handleLogout={handleLogout}
          currentUser={currentUser}
        />
        <Routes>
          <Route
            path='/'
            element={
              <RequierAuth isLogged={isLogged}>
                <Main
                  handleEditAvatarClick={handleEditAvatarClick}
                  handleEditProfileClick={handleEditProfileClick}
                  handleAddPlaceClick={handleAddPlaceClick}
                  handleCardClick={handleCardClick}
                  handleCardDelete={handleCardDelete}
                  handleCardLike={handleCardLike}
                  cards={cards}
                />
              </RequierAuth>
            }
          />
          <Route
            path='login'
            element={
              <IsAlreadyAuth isLogged={isLogged}>
                <Login handleSubmit={handleLoginSubmit} />
              </IsAlreadyAuth>
            }
          />
          <Route
            path='register'
            element={
              <IsAlreadyAuth isLogged={isLogged}>
                <Register handleSubmit={handleRegisterSubmit} />
              </IsAlreadyAuth>
            }
          />
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
        <InfoTooltip
          title={InfoTooltipSettings.title}
          isOpened={isInfoTooltipOpen}
          isError={InfoTooltipSettings.error}
          onClose={closeAllPopups}
          name='info-tooltip'
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
