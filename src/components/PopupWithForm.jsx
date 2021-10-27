import addPath from "../images/add-icon.svg";

export default function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={props.onClose}>
          <img className="popup__close-icon" src={addPath} alt="close icon" />
        </button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" method="POST" name={`${props.name}-form`}>
          {props.children}
          <button type="submit" className="popup__submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
