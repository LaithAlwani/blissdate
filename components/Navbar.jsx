"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/lib/context";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav>
      <div className="logo">
        <Link href="/">
          <Image src="/dating-128.png" fill />
        </Link>
      </div>
      <SignedOut>
        <SignInButton className="btn" />
      </SignedOut>
      <SignedIn>
        <div
          className={`mobile-nav-btn ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="burger-icon"></div>
        </div>
        <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
          <div className="nav-links" onClick={() => setIsMenuOpen(false)}>
            <NavLinks />
          </div>
        </div>
      </SignedIn>
    </nav>
  );
}

const NavLinks = () => {
  const {currentUser} = useAppContext()

  return (
    <>
      <ActiveLink name="Home" path="/" />
      {currentUser && <ActiveLink name="Profile" path={`/users/${currentUser._id}`} />}
      <ActiveLink name="Dashboard" path="/dashboard" />
      <ActiveLink name="Chats" path="/chats" />
      <ActiveLink name="About" path="/about" />
      <SignOutButton className="btn" />
    </>
  );
};

const ActiveLink = ({ name, path }) => {
  const pathname = usePathname();
  const active = pathname === path ? "active" : "";

  return (
    <Link href={path} className={`${active}`}>
      {name}
    </Link>
  );
};
