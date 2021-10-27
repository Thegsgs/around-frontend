import React, { useState } from "react";
import "../index.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";
import ImagePopup from "./ImagePopup.jsx";
import PopupWithForm from "./PopupWithForm.jsx";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setTimeout(function () {
      setSelectedCard({});
    }, 300);
  }

  return (
    <div className="page">
      <Header />

      <Main
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      ></ImagePopup>

      <PopupWithForm
        name="edit"
        title="Edit profile"
        buttonText="Save"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input"
          id="name-input"
          type="text"
          name="name-input"
          placeholder="Name"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="popup__error popup__error_type_name-input"></span>
        <input
          className="popup__input"
          id="job-input"
          type="text"
          name="job-input"
          placeholder="About me"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="popup__error popup__error_type_job-input"></span>
      </PopupWithForm>

      <PopupWithForm
        name="add"
        title="New Place"
        buttonText="Save"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
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
        />
        <span className="popup__error popup__error_type_title-input"></span>
        <input
          className="popup__input"
          id="url-input-add"
          type="url"
          name="link-input"
          placeholder="Image link"
          required
        />
        <span className="popup__error popup__error_type_url-input-add"></span>
      </PopupWithForm>

      <PopupWithForm
        name="confirm"
        title="Are you sure?"
        buttonText="Yes"
        isOpen={false}
        onClose={closeAllPopups}
      ></PopupWithForm>

      <PopupWithForm
        name="profile-picture"
        title="Update profile picture"
        buttonText="Save"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input"
          id="url-input-profile"
          type="url"
          name="url-input"
          placeholder="Image link"
          required
        />
        <span className="popup__error popup__error_type_url-input-profile"></span>
      </PopupWithForm>
    </div>
  );
}
