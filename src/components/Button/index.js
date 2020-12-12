import React from "react";

const Button = ({ onClick, title, loading }) => {
  if (loading) {
    return <button className="btn disable">Loading...</button>;
  }

  return (
    <div>
      <button className="btn" onClick={onClick}>
        {title}
      </button>
    </div>
  );
};

export default Button;
