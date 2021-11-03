import React, { useContext } from "react";
import addPath from "../images/add-icon.svg";
import editPath from "../images/edit-icon.svg";
import Card from "./Card.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__img-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Profile"
          />
          <div
            className="profile__avatar-overlay"
            onClick={props.onEditAvatarClick}
          ></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__button-edit"
            onClick={props.onEditProfileClick}
          >
            <img
              className="profile__icon-edit"
              src={editPath}
              alt="edit icon"
            />
          </button>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__button-add"
          onClick={props.onAddPlaceClick}
        >
          <img className="profile__icon-add" src={addPath} alt="add icon" />
        </button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onLikeClick={props.onCardLike}
            onCardDelete={props.onCardDelete}
          ></Card>
        ))}
      </section>
    </main>
  );
}
