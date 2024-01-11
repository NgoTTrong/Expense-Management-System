import React from "react";
import { Spinner } from "zmp-ui";
import logo from "../../static/images/logo.png";
const LoadingModal = () => {
  return (
    <section className="w-screen h-screen fixed z-[10000] top-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
      <Spinner logo={logo} />
    </section>
  );
};

export default LoadingModal;
