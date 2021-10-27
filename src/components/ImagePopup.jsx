import addPath from "../images/add-icon.svg";

export default function ImagePopup(props) {
  return (
    <div className={`popup image-popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="image-popup__container">
        <button className="popup__close" onClick={props.onClose}>
          <img className="popup__close-icon" src={addPath} alt="close icon" />
        </button>
        <img
          className="image-popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <p className="image-popup__text">{props.card.name}</p>
      </div>
    </div>
  );
}
