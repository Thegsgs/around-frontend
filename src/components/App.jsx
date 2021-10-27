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
  const [selectedCard, setSelectedCard] = useState(false);

  function HandleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function HandleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function HandleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function HandleCardClick(card) {
    setSelectedCard(card);
  }

  function CloseAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
  }

  return (
    <div className="page">
      <Header />

      <Main
        onEditProfileClick={HandleEditProfileClick}
        onAddPlaceClick={HandleAddPlaceClick}
        onEditAvatarClick={HandleEditAvatarClick}
        onCardClick={HandleCardClick}
      />
      <Footer />

      <ImagePopup card={selectedCard} onClose={CloseAllPopups}></ImagePopup>

      <PopupWithForm
        name="edit"
        title="Edit profile"
        isOpen={isEditProfilePopupOpen}
        onClose={CloseAllPopups}
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
        <button type="submit" className="popup__submit">
          Save
        </button>
      </PopupWithForm>

      <PopupWithForm
        name="add"
        title="New Place"
        isOpen={isAddPlacePopupOpen}
        onClose={CloseAllPopups}
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
        <button type="submit" className="popup__submit">
          Save
        </button>
      </PopupWithForm>

      <PopupWithForm
        name="confirm"
        title="Are you sure?"
        isOpen={false}
        onClose={CloseAllPopups}
      >
        <button type="submit" className="popup__submit">
          Yes
        </button>
      </PopupWithForm>

      <PopupWithForm
        name="profile-picture"
        title="Update profile picture"
        isOpen={isEditAvatarPopupOpen}
        onClose={CloseAllPopups}
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
        <button type="submit" className="popup__submit">
          Save
        </button>
      </PopupWithForm>

      <script src="./index.js" type="text/html"></script>
    </div>
  );
}
