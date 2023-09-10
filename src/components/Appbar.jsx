import React from "react";
import SigninButton from "./SigninButton";

const Appbar = () => {
  return (
    <div className="flex gap-4 p-4 bg-blue-600">
      <SigninButton />
    </div>
  );
};

export default Appbar;
