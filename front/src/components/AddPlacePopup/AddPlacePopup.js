import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup(props) {
  const [cardPhoto, setCardPhoto] = React.useState("");
  const [cardTitle, setCardTitle] = React.useState("");

  React.useEffect(() => {
    setCardTitle("");
    setCardPhoto("");
  }, [props.isOpen]);

  function handleCardPhotoChange(e) {
    setCardPhoto(e.target.value);
  }

  function handleCardTitleChange(e) {
    setCardTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: cardTitle,
      link: cardPhoto,
    });
  }

  return (
    <PopupWithForm
      name="add-photo"
      title="Новое место"
      buttonText="Создать"
      loadingButtonText="Сохранение..."
      isLoadingData={props.isLoadingData}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Название"
        className="popup__field popup__field_value_place-title"
        id="place-input"
        name="name"
        maxLength="30"
        minLength="2"
        required
        onChange={handleCardTitleChange}
        value={cardTitle || ""}
      />
      <span className="popup__field-error place-input-error"></span>
      <input
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__field popup__field_value_link"
        id="link-input"
        name="link"
        required
        onChange={handleCardPhotoChange}
        value={cardPhoto || ""}
      />
      <span className="popup__field-error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
