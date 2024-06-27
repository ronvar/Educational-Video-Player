import { FetchedVideoCommentType } from "@/types/apiResponses.types";
import { formatDateString } from "@/utils/formatting";
import { Box, Group, Stack, Text } from "@mantine/core";

type CommentProps = {
  comment: FetchedVideoCommentType;
};

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <Box p={"sm"} w={"100%"}>
      <Stack spacing={2}>
        <Group spacing={"xs"} noWrap>
          <Text weight={500}>@{comment.user_id}</Text>
          <Text size={"xs"} color={"#777777"}>
            {formatDateString(comment.created_at)}
          </Text>
        </Group>
        <Text>{comment.content}</Text>
      </Stack>
    </Box>
  );
};

export default Comment;
