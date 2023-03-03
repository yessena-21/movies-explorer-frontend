import React from 'react';
import './ErrorMessage.css';

function ErrorMessage({isActive, errorText }) {
    return(
        <div className={`error-message  ${
            isActive ? 'error-message_active' : ''
          }`}>
            <span className='error-message__text'>{errorText}</span>
        </div>
    )
}

export default ErrorMessage;