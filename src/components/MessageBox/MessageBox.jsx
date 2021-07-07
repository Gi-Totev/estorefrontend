import React from "react";

const MessageBox = ({ children, variant }) => {
  return <div className={`alert-${variant}`}>{children}</div>;
};

export default MessageBox;
