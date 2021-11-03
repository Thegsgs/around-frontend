import { useContext, useState, useEffect, useRef } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
    avatarRef.current.value = "";
  }

  useEffect(() => {
    setAvatar(avatar);
  }, [currentUser]);

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
      <span className="popup__error popup__error_type_url-input-profile"></span>
    </PopupWithForm>
  );
}
