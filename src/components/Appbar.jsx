import React from "react";
import AuthButton from "./AuthButton";

const Appbar = () => {
  return (
    <div className="flex gap-4 p-4 bg-blue-600">
      <AuthButton />
    </div>
  );
};

export default Appbar;
