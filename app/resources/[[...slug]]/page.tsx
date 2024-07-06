import ContentView from "@/components/ContentView";
import { CustomTree } from "@/components/CustomTree";
import directus from "@/lib/directus";
import { Content, Topic, Location } from "@/lib/types";
import { readItems } from "@directus/sdk";
import {
  Anchor,
  Card,
  Grid,
  GridCol,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { format } from "date-fns";

type NestedItem = { value: string; label: string; children: NestedItem[] };

function treeifyTopics(topics: Topic[], parentId: number | null): NestedItem[] {
  let topicsWithParent: Topic[] = [];
  let topicsWithoutParent: Topic[] = [];
  topics.forEach((topic) => {
    if (parentId === null && !topic.parent.length) {
      topicsWithParent.push(topic);
    } else if (parentId && topic.parent[0]?.related_Topic_id === parentId) {
      topicsWithParent.push(topic);
    } else {
      topicsWithoutParent.push(topic);
    }
  });
  return topicsWithParent.map((topic) => ({
    value: topic.id.toString(),
    label: topic.name,
    children: treeifyTopics(topicsWithoutParent, topic.id),
  }));
}

function treeifyLocations(
  locations: Location[],
  parentId: number | null,
): NestedItem[] {
  let locationsWithParent: Location[] = [];
  let locationsWithoutParent: Location[] = [];
  locations.forEach((location) => {
    if (parentId === null && !location.parent_location.length) {
      locationsWithParent.push(location);
    } else if (
      parentId &&
      location.parent_location[0]?.related_Location_id === parentId
    ) {
      locationsWithParent.push(location);
    } else {
      locationsWithoutParent.push(location);
    }
  });
  return locationsWithParent.map((location) => ({
    value: location.id.toString(),
    label: location.name,
    children: treeifyLocations(locationsWithoutParent, location.id),
  }));
}
export default async function ResourceNavigator({
  params,
}: {
  params: { slug?: string[] };
}) {
  const { slug } = params;
  const [type, identifier] = slug || [undefined, undefined];

  const [topicId] =
    type === "topic" && identifier
      ? decodeURI(identifier).split("-")
      : [undefined];

  const [locationId] =
    type === "location" && identifier
      ? decodeURI(identifier).split("-")
      : [undefined];

  const allTopics = (await directus.request(
    readItems("Topic", {
      fields: ["*,parent.related_Topic_id"],
      sort: ["name"],
    }),
  )) as Topic[];

  const allLocations = (await directus.request(
    readItems("Location", {
      fields: ["*,parent_location.related_Location_id"],
      sort: ["name"],
    }),
  )) as Location[];

  const parentIds: number[] = [];

  if (topicId) {
    let currentTopicId: number | null = +topicId;
    while (currentTopicId) {
      let currentTopic = allTopics.find((topic) => topic.id === currentTopicId);
      if (currentTopic?.parent.length) {
        let parentTopicId = currentTopic.parent[0].related_Topic_id as number;
        parentIds.push(parentTopicId);
        currentTopicId = parentTopicId;
      } else {
        currentTopicId = null;
      }
    }
  } else if (locationId) {
    let currentLocationId: number | null = +locationId;
    while (currentLocationId) {
      let currentLocation = allLocations.find(
        (location) => location.id === currentLocationId,
      );
      if (currentLocation?.parent_location.length) {
        let parentLocationId = currentLocation.parent_location[0]
          .related_Location_id as number;
        parentIds.push(parentLocationId);
        currentLocationId = parentLocationId;
      } else {
        currentLocationId = null;
      }
    }
  }
  const topicTree = treeifyTopics(allTopics, null);
  const locationTree = treeifyLocations(allLocations, null);

  const content = topicId
    ? ((await directus.request(
        readItems("Content", {
          fields: [
            "*,user_created.*,topics.Topic_id.name,locations.Location_id.name",
          ],
          filter: {
            _or: [
              { topics: { Topic_id: +topicId } },
              {
                topics: {
                  Topic_id: { parent: { related_Topic_id: +topicId } },
                },
              },
              {
                topics: {
                  Topic_id: {
                    parent: {
                      related_Topic_id: {
                        parent: { related_Topic_id: +topicId },
                      },
                    },
                  },
                },
              },
              {
                topics: {
                  Topic_id: {
                    parent: {
                      related_Topic_id: {
                        parent: {
                          related_Topic_id: {
                            parent: { related_Topic_id: +topicId },
                          },
                        },
                      },
                    },
                  },
                },
              },
            ],
          },
          sort: ["-date_created"],
        }),
      )) as Content[])
    : locationId
      ? ((await directus.request(
          readItems("Content", {
            fields: [
              "*,user_created.*,topics.Topic_id.name,locations.Location_id.name",
            ],
            filter: {
              _or: [
                { locations: { Location_id: +locationId } },
                {
                  locations: {
                    Location_id: {
                      parent_location: { related_Location_id: +locationId },
                    },
                  },
                },
                {
                  locations: {
                    Location_id: {
                      parent_location: {
                        related_Location_id: {
                          parent_location: { related_Location_id: +locationId },
                        },
                      },
                    },
                  },
                },
                {
                  locations: {
                    Location_id: {
                      parent_location: {
                        related_Location_id: {
                          parent_location: {
                            related_Location_id: {
                              parent_location: {
                                related_Location_id: +locationId,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              ],
            },
            sort: ["-date_created"],
          }),
        )) as Content[])
      : [];

  return (
    <Grid>
      <GridCol span={{ xs: 12, sm: 4 }}>
        <Card shadow="sm" padding="xl" mih={{ sm: 500 }}>
          <CustomTree
            data={topicTree}
            hrefBase="/resources/topic"
            selectedId={topicId ? +topicId : undefined}
            openedParentIds={topicId ? parentIds : undefined}
          />
          <CustomTree
            data={locationTree}
            hrefBase="/resources/location"
            selectedId={locationId ? +locationId : undefined}
            openedParentIds={locationId ? parentIds : undefined}
          />
        </Card>
      </GridCol>
      <GridCol span={{ xs: 12, sm: 8 }}>
        <ScrollArea>
          <Stack>
            {!(topicId || locationId) && (
              <Card shadow="sm" padding="xl">
                <Text>Choose a topic to start browsing.</Text>
              </Card>
            )}
            {(topicId || locationId) && !content.length && (
              <Card shadow="sm" padding="xl">
                <Title>No results</Title>
                <Text mt="lg">
                  Looks like we don&apos;t have any resources for that topic
                  yet. Would you like to{" "}
                  <Anchor href="/contribute">
                    contribute some knowledge of your own
                  </Anchor>
                  ?
                </Text>
              </Card>
            )}
            {content.map((post) => (
              <ContentView post={post} key={post.id} />
            ))}
          </Stack>
        </ScrollArea>
      </GridCol>
    </Grid>
  );
}
