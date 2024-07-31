'use client'
import { useAppContext } from "@/lib/context";
import styles from "./page.module.css";


export default function Home() {
  const {currentUser} = useAppContext();
  
  return (
    <>
      <h1>{currentUser && currentUser.username}</h1>
    </>
  );
}
