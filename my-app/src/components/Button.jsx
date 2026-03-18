import React from "react";
import { Button as AntButton } from "antd";

function Button({ onClick, text = "Submit", type = "primary" , }) {
  return (
    <AntButton type={type} onClick={onClick}>
      {text}
    </AntButton>
  );
}

export default Button;