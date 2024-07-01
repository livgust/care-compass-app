"use client";
import {
  Group,
  Tree,
  TreeNodeData,
  ActionIcon,
  Anchor,
  useTree,
} from "@mantine/core";
import { IconChevronRight, IconChevronDown } from "@tabler/icons-react";

export function CustomTree(props: {
  data: TreeNodeData[];
  hrefBase: string;
  selectedId?: number;
  openedParentIds?: number[];
}) {
  const { data, hrefBase, selectedId, openedParentIds } = props;
  const tree = useTree({
    initialSelectedState: selectedId ? [selectedId.toString()] : undefined,
    initialExpandedState: openedParentIds
      ? Object.fromEntries(openedParentIds.map((id) => [id, true]))
      : undefined,
  });
  return (
    <Tree
      data={data}
      tree={tree}
      renderNode={({ node, expanded, hasChildren, elementProps }) => {
        const { onClick, ...rest } = elementProps;
        return (
          <Group gap={5} {...rest}>
            {hasChildren ? (
              expanded ? (
                <ActionIcon variant="transparent" onClick={onClick}>
                  <IconChevronDown />
                </ActionIcon>
              ) : (
                <ActionIcon variant="transparent" onClick={onClick}>
                  <IconChevronRight />
                </ActionIcon>
              )
            ) : (
              <></>
            )}
            <Anchor
              href={`${hrefBase}/${encodeURI(`${node.value}-${node.label}`)}`}
              underline={+node.value === selectedId ? "always" : "hover"}
            >
              {node.label}
            </Anchor>
          </Group>
        );
      }}
    />
  );
}
