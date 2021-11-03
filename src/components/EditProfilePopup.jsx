import { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.description);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name="edit"
      title="Edit profile"
      buttonText={props.buttonText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="name-input"
        type="text"
        name="name"
        placeholder="Name"
        required
        minLength="2"
        maxLength="40"
        onChange={handleNameChange}
      />
      <span className="popup__error popup__error_type_name-input"></span>
      <input
        className="popup__input"
        id="job-input"
        type="text"
        name="job"
        placeholder="About me"
        required
        minLength="2"
        maxLength="200"
        onChange={handleDescriptionChange}
      />
      <span className="popup__error popup__error_type_job-input"></span>
    </PopupWithForm>
  );
}
