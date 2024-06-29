import SignOutButton from "@/components/SignOutButton";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";

export async function Header() {
  const session = await getServerSession(authOptions);
  if (session) {
    return (
      <div>
        Hi {session.user?.name}! <SignOutButton />
      </div>
    );
  } else {
    return (
      <div>
        <Link href="/login">Log In</Link>
      </div>
    );
  }
}
