import React from "react";
import { Button as AntButton } from "antd";

function Button({ 
  onClick, 
  text = "Submit", 
  type = "primary",
  style = {}   
}) {
  return (
    <AntButton 
      type={type}
      onClick={onClick}
      style={{
        fontSize: 16,
        fontWeight: "bold",
        padding: "10px 20px",
        height: "40px",
        display: "inline-block",
        visibility: "visible !important",
        opacity: "1 !important",
        pointerEvents: "auto",
        cursor: "pointer",
        backgroundColor: type === "primary" ? "#1890ff !important" : undefined,
        color: type === "primary" ? "#fff !important" : undefined,
        border: type === "primary" ? "1px solid #1890ff !important" : undefined,
        ...style
      }}
    >
      {text}
    </AntButton>
  );
}

export default Button;