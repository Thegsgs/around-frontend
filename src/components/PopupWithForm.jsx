import { useEffect } from "react";
import addPath from "../images/add-icon.svg";

export default function PopupWithForm(props) {
  useEffect(() => {
    document.addEventListener("keydown", props.onClose);
  }, []);

  return (
    <>
      <div
        className={`popup popup_type_${props.name} ${
          props.isOpen ? "popup_opened" : ""
        }`}
        onClick={props.onClose}
      >
        <div className="popup__container">
          <button
            type="button"
            className="popup__close"
            onClick={props.onClose}
          >
            <img className="popup__close-icon" src={addPath} alt="close icon" />
          </button>
          <h2 className="popup__title">{props.title}</h2>
          <form
            className="popup__form"
            method="POST"
            name={`${props.name}-form`}
            noValidate
          >
            {props.children}
          </form>
        </div>
      </div>
    </>
  );
}
