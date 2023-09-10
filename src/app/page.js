"use client";
import Shell from "@/components/Shell";
import Board from "../components/Board";
import Appbar from "../components/Appbar";
import Shell from "../components/Shell";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <Shell>
        <Appbar />
        <Board />
      <Shell/>
    );
  }
  return <Appbar />;

}
