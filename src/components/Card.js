import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import likePath from "../images/button-like.svg";
import trashPath from "../images/trash.svg";

export default function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((like) => like._id === currentUser._id);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLike() {
    props.onLikeClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="element">
      <div className="element__image-container">
        <button
          className={
            isOwn ? "element__button-delete" : "element__button-delete_hidden"
          }
        >
          <img
            className="element__delete-icon"
            src={trashPath}
            alt={props.card.name}
            onClick={handleDeleteClick}
          />
        </button>
        <img
          className="element__image"
          src={props.card.link}
          onClick={handleClick}
          alt={props.card.name}
        />
      </div>
      <div className="element__text-container">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-container">
          <button
            className={
              isLiked
                ? "element__button-like element__button-like_active"
                : "element__button-like"
            }
            type="button"
            onClick={handleLike}
          >
            <img
              className="element__like-icon"
              src={likePath}
              alt="like icon"
            />
          </button>
          <p className="element__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}
