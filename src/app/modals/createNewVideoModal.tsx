// create a mantime modal that takes in a title, video url, and description. the title should be limited
// to 30 characters, the video url should be a valid url, and the description should be limited to 1000
// characters. the modal should have a submit button that calls the createVideo function from the
// userData/videos service. the modal should also have a cancel button that closes the modal. the modal
// should have a loading state that displays a loading spinner when the createVideo function is being
// called. the modal should also have a success state that displays a success message when the createVideo
// function is successful. the modal should have an error state that displays an error message when the
// createVideo function fails

import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import useUserVideos from "../hooks/useUserVideos";

type CreateNewVideoModalProps = {
  opened: boolean;
  onClose: () => void;
};

const CreateNewVideoModal: React.FC<CreateNewVideoModalProps> = ({
  opened,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const theme = useMantineTheme();
  const { createUserVideo } = useUserVideos();

  // clear error after 5 seconds
  useEffect(() => {
    if (error) {
      setTimeout(() => setError(""), 5000);
    }
  }, [error]);

  const onCloseModal = useCallback(() => {
    setTitle("");
    setVideoUrl("");
    setDescription("");
    onClose();
  }, [onClose]);

  const onTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // limit title to 30 characters
      if (event.currentTarget.value.length > 30) {
        return;
      }
      setTitle(event.currentTarget.value);
    },
    []
  );

  const onVideoUrlChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setVideoUrl(event.currentTarget.value);
    },
    []
  );

  const onDescriptionChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // limit description to 1000 characters
      if (event.currentTarget.value.length > 1000) {
        return;
      }
      setDescription(event.currentTarget.value);
    },
    []
  );

  // clear success after 5 seconds and close modal
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess("");
        onCloseModal();
      }, 5000);
    }
  }, [success, onCloseModal]);

  const onCreateVieo = useCallback(async () => {
    if (!title || !videoUrl || !description) {
      setError("All fields are required");
      return;
    }

    if (!videoUrl.includes("http")) {
      setError("Invalid video URL");
      return;
    }

    setLoading(true);
    const success = await createUserVideo(
      title.trim(),
      description.trim(),
      videoUrl.trim()
    );

    if (success) {
      setSuccess("Video created successfully");
    } else {
      setError("Failed to create video. Please try again");
    }

    setLoading(false);
  }, [createUserVideo, description, title, videoUrl]);

  return (
    <Modal
      opened={opened}
      size={600}
      radius={"lg"}
      title="Create A New Video"
      onClose={onCloseModal}
      centered
    >
      <Stack spacing={16}>
        <TextInput
          label="Title"
          placeholder="Enter video title"
          value={title}
          onChange={onTitleChange}
          required
          maxLength={30}
        />
        <TextInput
          label="Video URL"
          placeholder="Enter video URL"
          value={videoUrl}
          onChange={onVideoUrlChange}
          required
        />
        <TextInput
          label="Description"
          placeholder="Enter video description"
          value={description}
          onChange={onDescriptionChange}
          maxLength={1000}
        />
        <Group position="right">
          <Button onClick={onCloseModal} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={onCreateVieo}
            loading={loading}
            style={{ marginRight: theme.spacing.xs }}
          >
            Create Video
          </Button>
        </Group>
        {error && (
          <Text color="red" style={{ marginTop: theme.spacing.xs }}>
            {error}
          </Text>
        )}
        {success && (
          <Text color="green" style={{ marginTop: theme.spacing.xs }}>
            {success}
          </Text>
        )}
      </Stack>
    </Modal>
  );
};

export default CreateNewVideoModal;
