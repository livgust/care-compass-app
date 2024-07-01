"use client";
import { Button } from "@mantine/core";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <Button variant="fileed" onClick={() => signOut()}>
      Log Out
    </Button>
  );
}
