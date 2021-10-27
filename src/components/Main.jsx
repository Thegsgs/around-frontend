import React, { useState, useEffect } from "react";
import { api } from "../utils/api.js";
import addPath from "../images/add-icon.svg";
import editPath from "../images/edit-icon.svg";
import avatarPath from "../images/jacques.jpg";
import Card from "./Card.jsx";

export default function Main(props) {
  const [userName, setUserName] = useState("Simon");
  const [userDescription, setUserDescription] = useState("Developer");
  const [userAvatar, setUserAvatar] = useState(`${avatarPath}`);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cardsData);
      })
      .catch((error) => console.log(`Error, ${error}`));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__img-container">
          <img
            className="profile__avatar"
            src={userAvatar}
            alt="Profile picture"
          />
          <div
            className="profile__avatar-overlay"
            onClick={props.onEditAvatarClick}
          ></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
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
          <p className="profile__job">{userDescription}</p>
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
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
          ></Card>
        ))}
      </section>
    </main>
  );
}
