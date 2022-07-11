import React from 'react';
import closeIcon from '../../images/Close_Icon.svg'

function PopupWithForm(props) {

  return (
    <section className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <button className="button button_add-photo button_type_resert popup__button popup__button_type_cancel" type="reset" onClick={props.onClose}>
        <img className="button__icon" alt="Иконка закрытия попапа" src={closeIcon} />
      </button>
      <form className="popup__form" name={props.name} noValidate onSubmit={props.onSubmit}>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <button className="button button_type_submit popup__button popup__button_type_save button_submit_photo"
          type="submit">{props.isLoadingData ? props.loadingButtonText : props.buttonText}</button>
      </form>
    </section>
  )
}

export default PopupWithForm;