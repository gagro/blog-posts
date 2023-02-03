import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Image from "next/image";

import logo from "../../public/favicon.ico";

const Header: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <header className="mb-3 flex flex-grow flex-row items-center justify-between bg-white p-3 shadow-xl">
      <Link href="/">
        <Image src={logo} alt="Logo" height={40} width={40} />
      </Link>
      {sessionData ? (
        <div>
          <Link href="/my-posts">My posts</Link>
          <Link href="/new-post" className="ml-2">
            New post
          </Link>
          <button
            className="ml-2"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign out
          </button>
        </div>
      ) : (
        <div>
          <Link href="/register">Register</Link>
          <Link className="ml-2" href="/login">
            Sign in
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
