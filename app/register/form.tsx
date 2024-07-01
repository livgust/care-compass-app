"use client";
import AuthForm from "@/components/AuthForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegistrationForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const handleFormSubmit = async (data: {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
  }) => {
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        ...data,
      }),
    });
    if (response.status === 201) {
      router.push("/");
      router.refresh();
    } else {
      response.status === 409
        ? setError("A user with this email already exists.")
        : null;
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      <AuthForm
        title="Register"
        onSubmit={handleFormSubmit}
        buttonText="Register"
        linkDescription="Already have an account?"
        linkText="Log in"
        linkHref="/login"
      />
    </>
  );
}
