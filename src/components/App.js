import React, { useEffect, useState } from "react";
import "../index.css";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import FormValidator from "../utils/FormValidator.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Api from "../utils/api.js";
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
const UntilPopupFades = 300;

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
  const [cardToDelete, setCardToDelete] = useState({});
  const [editButtonText, setEditButtonText] = useState("Save");
  const [addButtonText, setAddButtonText] = useState("Save");
  const [avatarButtonText, setAvatarButtonText] = useState("Save");
  const [confirmButtonText, setConfrimButtonText] = useState("Yes");

  useEffect(() => {
    Api.getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => console.log(`Error...: ${err}`));
    Api.getInitialCards()
      .then((cardData) => setCards(cardData))
      .catch((err) => console.log(`Error...: ${err}`));

    const formList = document.querySelectorAll(validationObject.formSelector);
    formList.forEach((formElement) => {
      new FormValidator(validationObject, formElement).enableValidation();
    });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    if (!isLiked) {
      Api.addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(`Error...: ${err}`));
    } else {
      Api.removeLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(`Error...: ${err}`));
    }
  }

  function handleUpdateUser({ name, about }) {
    setEditButtonText("Saving...");
    Api.uploadUserInfo({ name: name, job: about })
      .then(() => {
        setCurrentUser({
          name: name,
          about: about,
          avatar: currentUser.avatar,
        });
      })
      .catch((err) => console.log(`Error...: ${err}`))
      .finally(() => {
        setEditButtonText("Save");
        closeAllPopups();
      });
  }

  function handleUpdateAvatar(newAvatar) {
    setAvatarButtonText("Saving...");
    Api.uploadProfileImg(newAvatar)
      .then(() => {
        setCurrentUser({
          name: currentUser.name,
          about: currentUser.about,
          avatar: newAvatar,
        });
      })
      .catch((err) => console.log(`Error...: ${err}`))
      .finally(() => {
        setAvatarButtonText("Save");
        closeAllPopups();
      });
  }

  function handleCardDelete() {
    setConfrimButtonText("Deleting...");
    Api.deleteCard(cardToDelete._id)
      .then(() => {
        setCards(
          cards.filter((currentCard) => currentCard._id !== cardToDelete._id)
        );
        setCardToDelete({});
        closeAllPopups();
      })
      .catch((err) => console.log(`Error...: ${err}`))
      .finally(() => {
        setConfrimButtonText("Save");
        closeAllPopups();
      });
  }

  function handleAddPlaceSubmit(title, link) {
    setAddButtonText("Saving...");
    Api.uploadCard(title, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => console.log(`Error...: ${err}`))
      .finally(() => {
        setAddButtonText("Save");
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
    setCardToDelete(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setTimeout(function () {
      setSelectedCard({});
    }, UntilPopupFades);
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
