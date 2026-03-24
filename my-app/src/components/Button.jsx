import React from "react";
import { Button as AntButton } from "antd";

function Button({
  onClick,
  text = "Add Subreddit",
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
        opacity: 1,
        visibility: "visible",
        pointerEvents: "auto",
        cursor: "pointer",

        // Primary button colors
        backgroundColor:
          type === "primary" ? "#1890ff" : undefined,
        color:
          type === "primary" ? "#fff" : undefined,
        border:
          type === "primary"
            ? "1px solid #1890ff"
            : undefined,

        ...style
      }}
    >
      {text}
    </AntButton>
  );
}

export default Button;