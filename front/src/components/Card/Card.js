import React from "react";
import deleteCardLogo from "../../images/Trash_button.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="element">
      <img
        className="element__photo"
        alt={props.card.name}
        src={props.card.link}
        onClick={handleCardClick}
      />
      <h2 className="element__title">{props.card.name}</h2>
      <div className="element__likes">
        <button
          className={`"button button_type_like element__button" ${
            isLiked ? "" : "element__button_disabled"
          }`}
          type="button"
          onClick={handleLikeClick}
        ></button>
        <span className="element__like-count">{props.card.likes.length}</span>
      </div>
      <button
        className={`"button button_type_delete element__button" ${
          isOwn ? "" : "button_hidden"
        }`}
        type="reset"
        onClick={handleDeleteClick}
      >
        <img
          className="button__icon button__icon_type_delete"
          alt="Иконка удаления фото"
          src={deleteCardLogo}
        />
      </button>
    </div>
  );
}

export default Card;
