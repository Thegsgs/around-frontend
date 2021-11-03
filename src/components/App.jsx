import React, { useEffect, useState } from "react";
import "../index.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";
import ImagePopup from "./ImagePopup.jsx";
import FormValidator from "../utils/FormValidator.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ConfirmDeletePopup from "./ConfirmDeletePopup";

export const validationObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  popupError: ".popup__error",
  errorType: ".popup__error_type_",
};

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deleteCard, setDeleteCard] = useState({});
  const [editButtonText, setEditButtonText] = useState("Save");
  const [addButtonText, setAddButtonText] = useState("Save");
  const [avatarButtonText, setAvatarButtonText] = useState("Save");
  const [confirmButtonText, setConfrimButtonText] = useState("Yes");

  useEffect(() => {
    api.getUserInfo().then((userInfo) => {
      setCurrentUser(userInfo);
    });
    api.getInitialCards().then((cardData) => setCards(cardData));

    const formList = document.querySelectorAll(validationObject.formSelector);
    formList.forEach((formElement) => {
      new FormValidator(validationObject, formElement).enableValidation();
    });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    if (!isLiked) {
      api.addLike(card._id).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
    } else {
      api.removeLike(card._id).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
    }
  }

  function handleUpdateUser({ name, about }) {
    setEditButtonText("Saving...");
    api.uploadUserInfo({ name: name, job: about }).then(() => {
      setEditButtonText("Save");
      closeAllPopups();
      setCurrentUser({ name: name, about: about, avatar: currentUser.avatar });
    });
  }

  function handleUpdateAvatar(newAvatar) {
    setAvatarButtonText("Saving...");
    api.uploadProfileImg(newAvatar).then(() => {
      setAvatarButtonText("Save");
      setCurrentUser({
        name: currentUser.name,
        about: currentUser.about,
        avatar: newAvatar,
      });
      closeAllPopups();
    });
  }

  function handleCardDelete() {
    setConfrimButtonText("Deleting...");
    api.deleteCard(deleteCard._id).then(() => {
      setConfrimButtonText("Yes");
      setCards(
        cards.filter((currentCard) => currentCard._id !== deleteCard._id)
      );
      setDeleteCard({});
      closeAllPopups();
    });
  }

  function handleAddPlaceSubmit(title, link) {
    setAddButtonText("Saving...");
    api.uploadCard(title, link).then((newCard) => {
      setAddButtonText("Save");
      setCards([newCard, ...cards]);
      closeAllPopups();
    });
  }

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

  function handleDeleteClick(card) {
    setIsConfirmDeletePopupOpen(true);
    setDeleteCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setTimeout(function () {
      setSelectedCard({});
    }, 300);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteClick}
          cards={cards}
        />
        <Footer />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        ></ImagePopup>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonText={editButtonText}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
          buttonText={addButtonText}
        />

        <ConfirmDeletePopup
          onClose={closeAllPopups}
          isOpen={isConfirmDeletePopupOpen}
          onConfirm={handleCardDelete}
          buttonText={confirmButtonText}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonText={avatarButtonText}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}
