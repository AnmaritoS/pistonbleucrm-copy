"use client";
import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
const AuthButton = (props) => {
  const { data: session } = useSession();

  if (session && session.user) {
    console.log("props", props);
    // setUser(session.user);
    return (
      // <p className="text-sky-600">{session.user.name}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    );
  }
  return (
    <button onClick={() => signIn()} className="text-green-600 ml-auto">
      Sign In
    </button>
  );
};

export default AuthButton;
