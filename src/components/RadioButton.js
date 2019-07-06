import React from "react";

function RadioButton({ id, className, onClick, children }) {
  return (
    <label id={id} className={className} onClick={onClick}>
      <div className="radioCircle" />
      {children}
    </label>
  );
}

export default RadioButton;
