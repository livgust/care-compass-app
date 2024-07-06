import { Content, User } from "@/lib/types";
import { Card, Title, Text } from "@mantine/core";
import { format } from "date-fns";

export default function ContentView({ post }: { post: Content }) {
  const author = post.user_created as User;
  const authorName =
    [author.first_name, author.last_name].filter((item) => item).join(" ") ||
    "Unknown";
  return (
    <Card shadow="sm" padding="xl">
      <Title>{post.title}</Title>
      <Text size="sm" c="dimmed">
        Authored {format(post.date_created, "PPP")} by {authorName}
      </Text>
      <div dangerouslySetInnerHTML={{ __html: post.article }} />
    </Card>
  );
}
