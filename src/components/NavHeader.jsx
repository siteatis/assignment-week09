import Link from "next/link";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function NavHeader() {
  const userName = (await currentUser())?.username;
  // TODO: Check: can get username by: useUser(C) or: currentUser(S) (from "".../server")?
  return (
    <>
      <nav className="flex justify-evenly items-center border-1">
        <Link href={"/"} className="link1 p-3 m-2">
          Welcome
        </Link>
        <Link href={"/feed"} className="link1 p-3 m-2">
          {/* TODO! */}
          Feed
        </Link>
        <div className="flex sm:flex-col border-1 hover:text-black/70 hover:border-3">
          <SignedOut>
            <Link href="/signin" className="link1">
              Log In
            </Link>
            <Link href="/signup" className="link1">
              Create Account
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
            <p>{`Logged in as ${userName}`}</p>
            <Link href={`/user/${userName}`} className="link1">
              My Profile
            </Link>
          </SignedIn>
        </div>
      </nav>
    </>
  );
}
