import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RegistrationForm from "./form";
import authOptions from "../api/auth/[...nextauth]/options";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div>
      <RegistrationForm />
    </div>
  );
}
