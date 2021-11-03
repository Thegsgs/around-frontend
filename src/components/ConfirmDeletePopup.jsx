import PopupWithForm from "./PopupWithForm";

export default function ConfirmDeletePopup(props) {
  function handleConfirm(card) {
    props.onConfirm(card);
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Are you sure?"
      buttonText={props.buttonText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleConfirm}
    ></PopupWithForm>
  );
}
