import React from 'react';
import img from './errorMessage.jpg';
import './errorMessage.scss';

const ErrorMessage = () => {
  return(
      <>
        <img className="error__img" src={img} alt="error" />
        <span className="error__text">Some error...</span>
      </>
  )
};

export default ErrorMessage;