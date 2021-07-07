import React from "react";

const LoadingBox = (props) => {
  return (
    <div className={`alert alert-${props.variant || "info"} loading`}>
      {props.children}
    </div>
  );
};

export default LoadingBox;
