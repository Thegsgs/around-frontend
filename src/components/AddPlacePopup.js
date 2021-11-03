import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  function handleTitleChange(evt) {
    setTitle(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddCard(title, link);
  }

  return (
    <PopupWithForm
      name="add"
      title="New Place"
      buttonText={props.buttonText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="title-input"
        type="text"
        name="name-input"
        placeholder="Title"
        required
        minLength="1"
        maxLength="30"
        onChange={handleTitleChange}
      />
      <span className="popup__error popup__error_type_title-input" />
      <input
        className="popup__input"
        id="url-input-add"
        type="url"
        name="link-input"
        placeholder="Image link"
        required
        onChange={handleLinkChange}
      />
      <span className="popup__error popup__error_type_url-input-add" />
    </PopupWithForm>
  );
}
