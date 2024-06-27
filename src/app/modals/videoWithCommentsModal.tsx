import { Group, Modal, Stack, Text } from "@mantine/core";
import useUserVideos from "../hooks/useUserVideos";
import { useCallback } from "react";
import VideoPlayer from "../components/VideoPlayer";
import { IconPointFilled } from "@tabler/icons-react";
import { formatDateString } from "@/utils/formatting";
import CommentsSection from "../components/CommentsSection";

const VideoWithCommentsModal = () => {
  const { selectedUserVideo, selectedVideoComments, setSelectedUserVideo } =
    useUserVideos();

  const onClose = useCallback(() => {
    setSelectedUserVideo(null);
  }, [setSelectedUserVideo]);

  const videoId = selectedUserVideo?.id || "";
  const videoUrl = selectedUserVideo?.video_url || "";
  const title = selectedUserVideo?.title || "";
  const numComments = selectedVideoComments?.length || selectedUserVideo?.num_comments || 0;
  const createdAt = selectedUserVideo?.created_at || "";

  return (
    <Modal
      opened={selectedUserVideo !== null}
      onClose={onClose}
      radius={"md"}
      size={600}
      centered
    >
      <Stack w={"100%"} spacing={"md"}>
        <VideoPlayer src={videoUrl} fullPlayer />
        <Stack spacing={3}>
          <Text size="xl" weight={600} truncate>
            {title}{" "}
          </Text>
          <Group spacing={4} noWrap>
            <Text size={"xs"} color="#777777">
              {numComments} {numComments === 1 ? "comment" : "comments"}
            </Text>
            <IconPointFilled size={8} color="#777777" />
            <Text size={"xs"} color="#777777" span>
              {formatDateString(createdAt)}
            </Text>
          </Group>
        </Stack>
        <CommentsSection videoId={videoId} comments={selectedVideoComments} />
      </Stack>
    </Modal>
  );
};

export default VideoWithCommentsModal;
