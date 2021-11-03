import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
    avatarRef.current.value = "";
  }

  return (
    <PopupWithForm
      name="profile-picture"
      title="Update profile picture"
      buttonText={props.buttonText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="url-input-profile"
        type="url"
        name="url-input"
        placeholder="Image link"
        required
        ref={avatarRef}
      />
      <span className="popup__error popup__error_type_url-input-profile" />
    </PopupWithForm>
  );
}
