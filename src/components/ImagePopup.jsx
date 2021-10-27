import addPath from "../images/add-icon.svg";
import { useEffect } from "react";

export default function ImagePopup(props) {
  useEffect(() => {
    document.addEventListener("keydown", props.onClose);
  }, []);

  return (
    <div
      className={`popup image-popup ${props.isOpen ? "popup_opened" : ""}`}
      onClick={props.onClose}
    >
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