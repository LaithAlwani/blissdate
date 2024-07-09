import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav>
      <div className="logo">
        <h3>Date Bliss</h3>
      </div>
      <SignedOut>
        <SignInButton className="btn" />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  )
}
