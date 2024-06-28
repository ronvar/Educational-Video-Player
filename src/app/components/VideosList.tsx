import {
  Box,
  Button,
  Center,
  Group,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import useUserVideos from "../hooks/useUserVideos";
import VideoCell from "./VideoCell";
import { FetchedVideoType } from "@/types/apiResponses.types";
import CreateNewVideoModal from "../modals/createNewVideoModal";
import { useCallback, useState } from "react";
import { IconUpload } from "@tabler/icons-react";
import useScreenSize from "../hooks/useScreenSize";

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
  const { isMobile, isTablet } = useScreenSize();
  const { userVideos, loadingUserVideos, setSelectedUserVideo } =
    useUserVideos();
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

  const numColumns = isMobile ? 1 : isTablet ? 2 : 3;

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
      {!loadingUserVideos && !userVideos.length && (
        <Center h={"60vh"}>
          <Stack justify="center" align="center">
            <Text size={36} weight={600}>
              Oops, you dont have any videos yet!
            </Text>
            <Text size={18} color="gray">
              Click the button above to upload your first video
            </Text>
          </Stack>
        </Center>
      )}
      <ScrollArea.Autosize mah={"calc(100vh - 230px)"} w={"100%"}>
        <SimpleGrid cols={numColumns} spacing={"md"}>
          {userVideos.map((video) => (
            <VideoCell key={video.id} video={video} onClick={onVideoClick} />
          ))}
        </SimpleGrid>
      </ScrollArea.Autosize>
    </Box>
  );
};

export default VideosList;
