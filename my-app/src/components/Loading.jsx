// Loading.js
import React from "react";
import { Spin } from "antd";

function Loading({ tip = "Loading...", height = "auto", size = "default", padding = "16px" }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: height,
        padding: padding,
        width: "100%"
      }}
    >
      <Spin tip={tip} size={size} />
    </div>
  );
}
export default Loading;