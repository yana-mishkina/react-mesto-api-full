import React from 'react';
import closeIcon from '../../images/Close_Icon.svg'

function ImagePopup(props) {

  return (
    <section className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <button className="button button_viewing button_type_resert popup__button" type="reset" onClick={props.onClose}>
        <img className="button__icon" alt="Иконка закрытия попапа" src={closeIcon} />
      </button>
      <figure className="popup__photo-container">
        <img className="popup__photo" alt={props.card.name} src={props.card.link} />
        <figcaption className="popup__photo-title">{props.card.name}</figcaption>
      </figure>
    </section>
  )
}

export default ImagePopup;