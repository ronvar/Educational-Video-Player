import {
  Box,
  Button,
  Group,
  ScrollArea,
  SimpleGrid,
  Stack,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import useUserVideos from "../hooks/useUserVideos";
import VideoCell from "./VideoCell";
import { FetchedVideoType } from "@/types/apiResponses.types";
import CreateNewVideoModal from "../modals/createNewVideoModal";
import { useCallback, useState } from "react";
import { IconUpload } from "@tabler/icons-react";

const useStyles = createStyles((theme) => {
  const primaryColor = theme.colors.blue[6];

  return {
    button: {
      backgroundColor: "transparent",
      border: `1px solid ${primaryColor}`,
      borderRadius: 8,
      color: primaryColor,
      transition: "background-color 150ms ease, color 150ms ease",
      "&:hover": {
        backgroundColor: primaryColor,
        color: "white",
      },
    },
  };
});

const VideosList = () => {
  const { classes } = useStyles();
  const { userVideos, setSelectedUserVideo } = useUserVideos();
  const [createNewVideoModalOpened, setCreateNewVideoModalOpened] =
    useState(false);

  const onVideoClick = (video: FetchedVideoType) => {
    setSelectedUserVideo(video);
  };

  const onCloseCreateNewVideoModal = useCallback(() => {
    setCreateNewVideoModalOpened(false);
  }, []);

  const onUploadNewVideo = useCallback(() => {
    setCreateNewVideoModalOpened(true);
  }, []);

  return (
    <Box w={"100%"} h={"100%"} p={"md"}>
      <CreateNewVideoModal
        opened={createNewVideoModalOpened}
        onClose={onCloseCreateNewVideoModal}
      />
      <Group position="right" pb={"md"}>
        <Button
          className={classes.button}
          onClick={onUploadNewVideo}
          leftIcon={<IconUpload size={16} />}
        >
          Create New Video
        </Button>
      </Group>
      <ScrollArea.Autosize mah={"calc(100vh - 230px)"} w={"100%"}>
        <SimpleGrid cols={2} spacing={"md"}>
          {userVideos.map((video) => (
            <VideoCell key={video.id} video={video} onClick={onVideoClick} />
          ))}
        </SimpleGrid>
      </ScrollArea.Autosize>
    </Box>
  );
};

export default VideosList;
