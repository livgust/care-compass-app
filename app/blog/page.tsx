import ContentView from "@/components/ContentView";
import directus from "@/lib/directus";
import { Content } from "@/lib/types";
import { readItems } from "@directus/sdk";
import { Card, CardSection, Image, Stack, Title } from "@mantine/core";

export default async function Blog() {
  const blogPosts = (await directus.request(
    readItems("Content", {
      fields: ["*,user_created.*,topics.Topic_id.*,locations.Location_id.*"],
      filter: {
        topics: { Topic_id: { name: { _eq: "Blog" } } },
      },
      sort: ["-date_created"],
    }),
  )) as Content[];
  return (
    <Stack>
      <Card shadow="sm" padding="xl">
        <CardSection>
          <Image
            src="/jess-bailey-q10VITrVYUM-unsplash-lg.jpg"
            h={220}
            alt="blog"
          />
        </CardSection>
        <Title mt="lg">Blog</Title>
      </Card>
      {blogPosts.map((post) => (
        <ContentView post={post} key={post.id} />
      ))}
    </Stack>
  );
}
