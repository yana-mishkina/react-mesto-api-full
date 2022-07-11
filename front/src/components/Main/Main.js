import React from "react";
import Card from "../Card/Card";
import Footer from "../Footer/Footer";
import Header from "../Header/Header"
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import burgerIcon from "../../images/Burger-icon.svg";
import HeaderPopup from "../HeaderPopup/HeaderPopup";
import closeIcon from "../../images/Close_Icon.svg";

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <HeaderPopup
        isBurgerOpen={props.isBurgerOpen}
        onSignOut={props.onSignOut}
        email={props.email} />

      <Header>
        <div className="header__container">
          <p className="header__email">{props.email}</p>
          <button className="button header__button" onClick={props.onSignOut}>Выйти</button>
          <button className="button header__button header__button_burger" onClick={props.isBurgerOpen ? props.onBurgerOpen : props.onBurgerClose}>
            {props.isBurgerOpen ? 
              <img className="header__button-img" src={burgerIcon} alt="Иконка меню"/> : 
              <img className="header__button-img" src={closeIcon} alt="Иконка закрытия"/>}
          </button>
        </div>
      </Header>
        
      <main className="content">
        <section className="profile">
          <button
            className="button button_type_edit-avatar profile__button"
            type="button"
            onClick={props.onEditAvatar}
          >
            <img
              className="profile__image"
              alt="Фото профиля"
              src={currentUser.avatar}
              id="photo"
            />
            <span className="profile__edit-icon"></span>
          </button>
          <div className="profile__title-edit">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="button button_type_edit profile__button"
              type="button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <h2 className="profile__subtitle">{currentUser.about}</h2>
          <button
            className="button button_type_add profile__button"
            type="button"
            onClick={props.onAddPlace}
          ></button>
        </section>

        <section className="elements">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Main;