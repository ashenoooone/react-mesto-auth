import React from "react";
function ImagePopup({ card, onClose }) {
  return (
    <div
      className={
        card
          ? "popup popup_type_zoomed-card popup_active"
          : "popup popup_type_zoomed-card"
      }
      onClick={onClose}
    >
      <figure className="zoomed-card">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <img src={card?.src} alt={card?.name} className="zoomed-card__image" />
        <figcaption className="zoomed-card__title">{card?.name}</figcaption>
      </figure>
    </div>
  );
}
export default ImagePopup;
