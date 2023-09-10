"use client";
import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
const AuthButton = ({ className, setUser }) => {
  const { data: session } = useSession();
  useEffect(() => setUser && setUser(session.user), []);

  if (session && session.user) {
    return (
      // <p className="text-sky-600">{session.user.name}</p>
      <button onClick={() => signOut()} className={className}>
        Sign Out
      </button>
    );
  }
  return (
    <button onClick={() => signIn()} className="text-green-600 ml-auto">
      Sign In
    </button>
  );
};

export default AuthButton;
