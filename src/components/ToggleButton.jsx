import React from "react";

const ToggleButton = ({ label, isActive, onClick, color }) => {
  return (
      <button
          className="toggle"
          style={{
            backgroundColor: isActive ? color : "#555",
          }}
          onClick={onClick}
      >
        {typeof label === "string" ? label : <span className="icon-container">{label}</span>}
      </button>
  );
};

export default ToggleButton;
