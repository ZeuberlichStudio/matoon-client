import React from 'react';

const Button = ({ text, onClick, className, id }) => (
    <button {...{ className, id, onClick }}><span>{text}</span></button>  
);

export default Button;