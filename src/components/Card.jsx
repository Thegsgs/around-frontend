import likePath from "../images/button-like.svg";
import trashPath from "../images/trash.svg";

export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <article className="element">
      <div className="element__image-container">
        <button className="element__button-delete">
          <img
            className="element__delete-icon"
            src={trashPath}
            alt={props.card.name}
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
          <button type="button" className="element__button-like">
            <img
              className="element__icon-like"
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
