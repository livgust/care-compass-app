import SignOutButton from "@/components/SignOutButton";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Anchor, Button, Flex, Group, Text, Title } from "@mantine/core";
import { IconBuildingCommunity } from "@tabler/icons-react";

export async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <Flex justify="space-between">
      <Anchor href="/" underline="never">
        <Group>
          <IconBuildingCommunity size={40} stroke={1.5} />
          <Title>It Takes a Village</Title>
        </Group>
      </Anchor>
      <Group>
        {session ? (
          <>
            <Text>Welcome, {session.user?.name}!</Text>
            <SignOutButton />
          </>
        ) : (
          <>
            <Link href="/login">
              <Button>Log In</Button>
            </Link>
            <Link href="/register">
              <Button>Create Account</Button>
            </Link>
          </>
        )}
      </Group>
    </Flex>
  );
}
