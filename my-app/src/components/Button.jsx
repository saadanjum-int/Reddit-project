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
      style={style}
    >
      {text}
    </AntButton>
  );
}

export default Button;