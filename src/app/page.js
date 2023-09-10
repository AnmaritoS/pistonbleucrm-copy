"use client";
import Board from "../components/Board";
import Appbar from "../components/Appbar";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <>
        <Appbar />
        <Board />
      </>
    );
  }
  return <Appbar />;
}
