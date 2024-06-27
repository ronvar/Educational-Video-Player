import { FetchedVideoCommentType } from "@/types/apiResponses.types";
import React, { useCallback } from "react";
import useUserVideos from "../hooks/useUserVideos";
import { Box, ScrollArea, Stack, Textarea, createStyles } from "@mantine/core";
import Comment from "./Comment";

const useStyles = createStyles((theme) => {
    const defaultColor = theme.colors.gray[6];

    return {
        textArea: {
            "input": {
                border: "transparent",
                borderBottom: `1px solid ${defaultColor}`,
            }
            // should only have a border on the bottom
        }
    }
})

type CommentsSectionProps = {
  videoId: string;
  comments: FetchedVideoCommentType[] | null;
};

const CommentsSection: React.FC<CommentsSectionProps> = ({
  videoId,
  comments,
}) => {
    const { classes } = useStyles();
  const { addUserComment } = useUserVideos();
  const [newComment, setNewComment] = React.useState("");

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewComment(event.currentTarget.value);
  };

  const handleCommentSubmit = useCallback(async () => {
    if (newComment === "") {
      return;
    }

    await addUserComment(videoId, newComment);
    setNewComment("");
  }, [addUserComment, newComment, videoId]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
        event.preventDefault();
      handleCommentSubmit();
    }
  }

  return (
    <Box w={"100%"}>
      <Stack spacing={"xs"}>
        <Textarea
            styles={(theme) => ({
                input: {
                    border: "transparent",
                    borderBottom: `1px solid ${theme.colors.gray[6]}`,
                    borderRadius: 0,
                }
            })}
          placeholder="Add a comment..."
          value={newComment}
          onChange={handleCommentChange}
          maxRows={4}
          minRows={1}
          onKeyDown={handleKeyDown}
        />
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
