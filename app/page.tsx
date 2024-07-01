import {
  Card,
  CardSection,
  Grid,
  GridCol,
  Image,
  SimpleGrid,
  Title,
} from "@mantine/core";

function HomeCard(props: { title: string; imgSrc: string; href: string }) {
  const { title, imgSrc, href } = props;
  return (
    <Card shadow="sm" padding="xl" component="a" href={href}>
      <CardSection>
        <Image src={imgSrc} h={160} alt={title} />
      </CardSection>
      <Title size="h2" order={2} mt="md">
        {title}
      </Title>
    </Card>
  );
}

export default function Home() {
  return (
    <Grid>
      <GridCol span={{ base: 0, sm: 1, lg: 2, xl: 3 }} />

      <GridCol span={{ base: 12, sm: 10, lg: 8, xl: 6 }}>
        <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>
          <HomeCard
            imgSrc="/jess-bailey-q10VITrVYUM-unsplash.jpg"
            title="Blog"
            href="/blog"
          />
          <HomeCard
            imgSrc="/tom-hermans-9BoqXzEeQqM-unsplash.jpg"
            title="Navigate our resources"
            href="/resources"
          />
          <HomeCard
            imgSrc="/priscilla-du-preez-aPa843frIzI-unsplash.jpg"
            title="Newly Diagnosed"
            href="/newly-diagnosed"
          />
          <HomeCard
            imgSrc="/robinson-recalde-sT0n-Ie8OKo-unsplash.jpg"
            title="Featured"
            href="/featured"
          />
          <HomeCard
            imgSrc="/jonas-jacobsson-d2dbqAIX6Ws-unsplash.jpg"
            title="About Us"
            href="/about"
          />
          <HomeCard
            imgSrc="/unseen-studio-s9CC2SKySJM-unsplash.jpg"
            title="Contribute"
            href="/contribute"
          />
        </SimpleGrid>
      </GridCol>
      <GridCol span={{ base: 0, sm: 1, lg: 2, xl: 3 }} />
    </Grid>
  );
}
