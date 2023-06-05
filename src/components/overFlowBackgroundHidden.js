import React, { useEffect } from "react";

const OverFlowBackgroundHidden = (condition) => {
  const BackgroundOverFlow = () => {
    useEffect(() => {
      if (condition) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
    }, [condition]);
  };

  return BackgroundOverFlow;
};

export default OverFlowBackgroundHidden;
