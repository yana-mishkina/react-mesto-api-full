import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup(props) {

  const ref = React.useRef(null);


  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: ref.current.value
    });
  } 

  React.useEffect(() => {
    ref.current.value = '';
}, [props.isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Обновить"
      loadingButtonText="Сохранение..."
      isLoadingData={props.isLoadingData}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        placeholder="Ссылка на фото"
        className="popup__field popup__field_value_link popup__field_type_edit-avatar"
        id="link-input-avatar"
        name="avatar"
        required
        ref={ref}
      />
      <span className="popup__field-error link-input-avatar-error"></span>
    </PopupWithForm>
  );

}

export default EditAvatarPopup;