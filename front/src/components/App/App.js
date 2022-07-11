import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ImagePopup from "../ImagePopup/ImagePopup";
import { api } from "../../utils/api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import DeleteConfirmPopup from "../DeleteConfirmPopup/DeleteConfirmPopup";
import { Route, Switch, Redirect, useHistory, Link } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { auth } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isPhotoViewingPopupOpen, setIsPhotoViewingPopupOpen] =
    React.useState(false);
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] =
    React.useState(false);
  const [isBurgerOpen, setIsBurgerOpen] =
    React.useState(true);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cardForDelete, setCardForDelete] = React.useState({});
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSuccessAction, setIsSuccessAction] = React.useState(false);
  const [email, setEmail] = React.useState(null);
  const history = useHistory();
  const [likeCount, setLikeCount] = React.useState(false);

  React.useEffect(() => {
    api
      .getData()
      .then(([userData, cardsList]) => {
        setCurrentUser(userData);
        setCards(cardsList);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }
  

  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(cardForDelete._id)
      .then(() => {
        const newCards = cards.filter(
          (currentCard) => currentCard !== cardForDelete
        );
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleEditProfilePopupOpen() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPhotoPopupOpen() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarPopupOpen() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleDeleteConfirmPopupOpen(card) {
    setCardForDelete(card);
    setIsDeleteConfirmPopupOpen(true);
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function handeleBurgerOpen() {
    setIsBurgerOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsPhotoViewingPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPhotoViewingPopupOpen(false);
    setIsDeleteConfirmPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setIsInfoTooltipOpen(false);
    setIsBurgerOpen(true);
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editProfile(data.name, data.about)
      .then((name, about) => {
        setCurrentUser(name, about);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .editAvatar(data.avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }
  
  function handleRegisterSubmit(data) {
    setIsLoading(true);
    auth
      .register(data.email, data.password)
      .then(() => {
        setIsSuccessAction(true);
        handleInfoTooltipOpen();
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessAction(false);
        handleInfoTooltipOpen();
    })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLoginSubmit(data) {
    setIsLoading(true);
    auth
      .login(data.email, data.password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setEmail(email);
        setIsLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessAction(false);
        setIsInfoTooltipOpen(true);
    })
      .finally(() => {
        setIsLoading(false);
      });
  }

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth
        .getToken(token)
        .then((data) => {
          setEmail(data.data.email);
          setIsLoggedIn(true);
          history.push('/');
        })
        .catch((err) =>{
          console.log(err);
          history.push('/sign-in');
        })
    }
  }, [history]);

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoadingData={isLoading}
          />

          <AddPlacePopup
            isLoadingData={isLoading}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <ImagePopup
            name="viewing"
            card={selectedCard}
            isOpen={isPhotoViewingPopupOpen}
            onClose={closeAllPopups}
          />

          <DeleteConfirmPopup
            isOpen={isDeleteConfirmPopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            isLoadingData={isLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            isLoadingData={isLoading}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isSuccessAction={isSuccessAction} 
          />

          <Switch>
            <Route path="/sign-up">

              <Header>
                <div className="header__container">
                  <Link className="header__link" to="/sign-in">Войти</Link>
                </div>
              </Header>

              <Register
                onRegister={handleRegisterSubmit}
                isLoadingData={isLoading} />
            </Route>

            <Route path="/sign-in">
              <Header>
                <div className="header__container">
                  <Link className="header__link" to="/sign-up">Регистрация</Link>
                </div>
              </Header>

              <Login
                onLogin={handleLoginSubmit}
                isLoadingData={isLoading} />
            </Route>
            
            <ProtectedRoute 
              path="/"
              component={Main}
              isLoggedIn={isLoggedIn}
              onEditProfile={handleEditProfilePopupOpen}
              onAddPlace={handleAddPhotoPopupOpen}
              onEditAvatar={handleEditAvatarPopupOpen}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteConfirmPopupOpen}
              email={email}
              onSignOut={handleSignOut}
              onBurgerOpen={handeleBurgerOpen}
              isBurgerOpen={isBurgerOpen}
              onBurgerClose={closeAllPopups}
              />

            <Route>
             {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
            
          </Switch>
          
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
