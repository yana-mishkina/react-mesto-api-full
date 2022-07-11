import React from 'react';
import iconOk from '../../images/icon_status_ok.svg';
import iconError from '../../images/icon_error.svg';
import closeIcon from '../../images/Close_Icon.svg'

function InfoTooltip(props) {

  return (
    <section className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <button className="button button_add-photo button_type_resert popup__button popup__button_type_cancel" type="reset" onClick={props.onClose}>
        <img className="button__icon" alt="Иконка закрытия попапа" src={closeIcon} />
      </button>
      <div className="popup__container">
        <img className="popup__route-icon" src={props.isSuccessAction ? iconOk : iconError} alt="Иконка статуса" />
        <p className="popup__status">{props.isSuccessAction ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
      </div>
    </section>
  )
}

export default InfoTooltip;