import React from 'react';
import { ModalStyle } from './Modal.style';
function Modal({ title, message, accept, cancel, titleColor }) {
  return (
    <ModalStyle>
      <div className="box">
        <h4 style={{ color: titleColor }}>{title}</h4>
        <h5>{message}</h5>
        <div className="actionContainer">
          <button className="accept" onClick={accept}>
            Yes
          </button>
          <button className="cancel" onClick={() => cancel(false)}>
            Cancel
          </button>
        </div>
      </div>
    </ModalStyle>
  );
}

export default Modal;
