import ContentView from "@/components/ContentView";
import directus from "@/lib/directus";
import { Content } from "@/lib/types";
import { readItems } from "@directus/sdk";
import { Card, CardSection, Image, Stack, Text, Title } from "@mantine/core";
import { format } from "date-fns";

export default async function Blog() {
  const blogPosts = (await directus.request(
    readItems("Content", {
      fields: ["*,user_created.*,topics.Topic_id.*,locations.Location_id.*"],
      filter: {
        topics: { Topic_id: { name: { _eq: "Newly Diagnosed" } } },
      },
      sort: ["-date_created"],
    }),
  )) as Content[];
  return (
    <Stack>
      <Card shadow="sm" padding="xl">
        <CardSection>
          <Image
            src="/priscilla-du-preez-aPa843frIzI-unsplash-lg.jpg"
            h={220}
            alt="blog"
          />
        </CardSection>
        <Title mt="lg">Stories of the newly diagnosed and their families</Title>
      </Card>
      {blogPosts.map((post) => (
        <ContentView post={post} key={post.id} />
      ))}
    </Stack>
  );
}
