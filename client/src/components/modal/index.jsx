import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import './modal.css';

// ***************************************

const modalRoot = document.querySelector('#modal-root');
// const modalRoot = document.querySelector('.arena___root');

// ***************************************

export default class Modal extends Component {
  //
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = (event) => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  onClose = () => {
    alert('Modal closed, thank you');
  };

  render() {
    const { winner } = this.props;

    return createPortal(
      <div className="modal-overlay" onClick={this.handleBackdropClick}>
        <div className="modal-root">
          <div className="modal-header">
            <span>Game over</span>
            <div className="close-btn" onClick={this.props.onClose}>
              ×
            </div>
          </div>
          <div className="modal-body">{winner} wins</div>
        </div>
      </div>,
      modalRoot
    );
  }
}
