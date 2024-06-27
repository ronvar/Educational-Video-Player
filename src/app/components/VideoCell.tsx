import { FetchedVideoType } from "@/types/apiResponses.types";
import { Box, Divider, Group, Stack, Text, createStyles } from "@mantine/core";
import VideoPlayer from "./VideoPlayer";
import { formatDateString } from "@/utils/formatting";
import { IconPointFilled } from "@tabler/icons-react";
import { useCallback } from "react";

const useStyles = createStyles((theme) => {
    return {
        videoCell: {
        display: "flex",
        alignItems: "center",
        padding: 20,
        border: `1px solid ${theme.colors.gray[2]}`,
        borderRadius: 10,
        cursor: "pointer",
        transition: "background-color 100ms ease",
        "&:hover": {
            backgroundColor: theme.colors.gray[1],
        },
        },
    };
});

type VideoCellProps = {
  video: FetchedVideoType;
  onClick: (video: FetchedVideoType) => void;
};

const VideoCell: React.FC<VideoCellProps> = ({ video, onClick }) => {
  const { classes } = useStyles();

  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    onClick(video);
  }, [onClick, video])

  return (
    <Box className={classes.videoCell} onClick={handleClick}>
      <Box w={"100%"}>
        <Stack spacing={"sm"}>
          <VideoPlayer src={video.video_url} />
          <Stack spacing={3}>
            <Text size="xl" weight={600} truncate>
              {video.title}{" "}
            </Text>
            <Group spacing={4} noWrap>
            <Text size={"xs"} color="#777777">
              {video.num_comments} {video.num_comments === 1 ? "comment" : "comments"}
            </Text>
            <IconPointFilled size={8} color="#777777" />
            <Text size={"xs"} color="#777777" span>
                {formatDateString(video.created_at)}
              </Text>
            </Group>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default VideoCell;
