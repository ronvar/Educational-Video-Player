import { FetchedVideoCommentType } from "@/types/apiResponses.types";
import React, { useCallback } from "react";
import useUserVideos from "../hooks/useUserVideos";
import {
  Box,
  Grid,
  Group,
  ScrollArea,
  Stack,
  TextInput,
  Textarea,
  createStyles,
} from "@mantine/core";
import Comment from "./Comment";

type CommentsSectionProps = {
  videoId: string;
  comments: FetchedVideoCommentType[] | null;
};

const useStyles = createStyles((theme) => ({
  grid: {
    borderBottom: `1px solid ${theme.colors.gray[3]}`,
  },
}));

const CommentsSection: React.FC<CommentsSectionProps> = ({
  videoId,
  comments,
}) => {
  const { classes } = useStyles();
  const { userId, addUserComment } = useUserVideos();
  const [newComment, setNewComment] = React.useState("");
  const [commentUserId, setCommentUserId] = React.useState<string>("");

  const handleCommentChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNewComment(event.currentTarget.value);
    },
    []
  );

  const handleUserNameChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCommentUserId(event.currentTarget.value);
    },
    []
  );

  const standardizeCommentUserId = useCallback(() => {
    // user id should be lowercase snake case and contain only letters
    const standardUserId = commentUserId
      .toLowerCase()
      .replace(/[^a-zA-Z]/g, "_");

    return standardUserId;
  }, [commentUserId]);

  const handleCommentSubmit = useCallback(async () => {
    if (newComment === "") {
      return;
    }

    const newCommentUserId = standardizeCommentUserId();
    await addUserComment(videoId, newComment, newCommentUserId);
    setNewComment("");
  }, [addUserComment, newComment, standardizeCommentUserId, videoId]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCommentSubmit();
    }
  };

  return (
    <Box w={"100%"}>
      <Stack spacing={"xs"}>
        <Grid className={classes.grid} gutter={"xs"}>
          <Grid.Col span={3}>
            <Textarea
              placeholder={`Username: ${userId}`}
              maxLength={20}
              value={commentUserId}
              onChange={handleUserNameChange}
              onKeyDown={handleKeyDown}
              maxRows={1}
              styles={(theme) => ({
                input: {
                  border: "transparent",
                  borderRadius: 0,
                },
              })}
            />
          </Grid.Col>
          <Grid.Col span={9}>
            <Textarea
              styles={(theme) => ({
                input: {
                  border: "transparent",
                  borderRadius: 0,
                },
              })}
              placeholder="Add a comment..."
              value={newComment}
              onChange={handleCommentChange}
              maxRows={4}
              minRows={1}
              onKeyDown={handleKeyDown}
            />
          </Grid.Col>
        </Grid>
        <ScrollArea.Autosize mah={170}>
          <Stack spacing={"xs"}></Stack>
          {comments?.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ScrollArea.Autosize>
      </Stack>
    </Box>
  );
};

export default CommentsSection;
