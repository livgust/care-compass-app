import { Card, CardSection, Image, Stack, Text, Title } from "@mantine/core";

export default function AboutUs() {
  return (
    <Card shadow="sm" padding="xl">
      <CardSection>
        <Image h={220} src="/jonas-jacobsson-d2dbqAIX6Ws-unsplash-lg.jpg" />
      </CardSection>
      <Stack mt="lg">
        <Title>About It Takes a Village</Title>
        <Text>
          It Takes a Village is a resource site created by a group of moms with
          disabled children based in the Boston area. &quot;Care momagers,&quot; if you
          will. And though we are all in the same boat and in the same area, we
          quickly learned that each of us had unique and helpful knowledge that
          the others did not. Whether that was knowing about nursing, or
          insurance, or the best doctor for a certain issue - you name it,
          someone had insight.
        </Text>
        <Text>
          And so we wondered how we could ensure that disabled people and their
          families and caregivers had access to this knowledge if they weren&apos;t
          so lucky to know us? And to go even further, how could we allow people
          who <em>we</em> didn&apos;t know, who had expertise, to share as well?
        </Text>
        <Text>
          Enter It Takes a Village. Browse our resource articles and blog posts,
          even if you don&apos;t want to make an account. Or once you do make an
          account, submit a post either simply telling your story or sharing
          helpful information you know. You never know who may need it as we all
          navigate this medical maze. Because who hasn&apos;t been told at least
          once, &quot;It takes a village&quot;?
        </Text>
        <Text>With love,</Text>
        <Title size="h4" order={6}>
          - the founding Villagers
        </Title>
      </Stack>
    </Card>
  );
}
