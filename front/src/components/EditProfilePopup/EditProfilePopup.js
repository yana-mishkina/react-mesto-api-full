import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      loadingButtonText="Сохранение..."
      isLoadingData={props.isLoadingData}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__field popup__field_value_name"
        id="name-input"
        name="name"
        maxLength="40"
        minLength="2"
        required
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="popup__field-error name-input-error"></span>
      <input
        type="text"
        className="popup__field popup__field_value_job"
        id="job-input"
        name="job"
        maxLength="200"
        minLength="2"
        required
        value={description || ""}
        onChange={handleDescriptionChange}
      />
      <span className="popup__field-error job-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;