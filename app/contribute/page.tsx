import {
  Anchor,
  Card,
  CardSection,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";

export default async function Contribute() {
  return (
    <Stack>
      <Card shadow="sm" padding="xl">
        <CardSection>
          <Image
            src="/unseen-studio-s9CC2SKySJM-unsplash.jpg"
            h={220}
            alt="contribute"
          />
        </CardSection>
        <Title mt="lg">Contribute</Title>
        <Text mt="lg">
          Have knowledge or a story to share?{" "}
          <Anchor href="mailto:liv.gust@gmail.com">
            Email us at liv.gust@gmail.com!
          </Anchor>
        </Text>
      </Card>
    </Stack>
  );
}
