import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function DeleteConfirmPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete();
  }

  return (
    <PopupWithForm
      name="delete-confirm"
      title="Вы уверены?"
      buttonText="Да"
      loadingButtonText="Удаление..."
      isLoadingData={props.isLoadingData}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );

}

export default DeleteConfirmPopup;