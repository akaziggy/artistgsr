import React from "react";

const ToggleButton = ({ label, isActive, onClick, color }) => {
  return (
      <button
          className="toggle-button"
          style={{
            backgroundColor: isActive ? color : "#555",
            textAlign: "center",
            border: "none",
            padding: "8px 5px",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            color: "white",
            fontWeight: "bold",
          }}
          onClick={onClick}
          role="button"
          aria-pressed={isActive}
      >
        {typeof label === "string" ? label : <span className="icon-container">{label}</span>}
      </button>
  );
};

export default ToggleButton;