"use client";
import { useAppContext } from "@/lib/context";
import styles from "./page.module.css";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  const { currentUser } = useAppContext();

  return (
    <>
      {currentUser ? (
        <h1>{currentUser.username || currentUser.first_name}</h1>
      ) : (
        <SignInButton className="btn" />
      )}
    </>
  );
}
