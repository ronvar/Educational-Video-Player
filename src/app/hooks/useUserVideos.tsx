import { useAtom } from "jotai";
import {
  userVideosAtom,
  userIdAtom,
  loadingUserVideosAtom,
  selectedUserVideoAtom,
  selectedVideoCommentsAtom,
} from "../atoms/userAtoms";
import { createComment, createNewVideo, getUserVideos, getVideoComments } from "../services/userData/videos";
import isEqual from "lodash.isequal";
import { useCallback, useEffect } from "react";
import profanityCheck from "leo-profanity";

const useUserVideos = (fetchData?: boolean) => {
  const [userId] = useAtom(userIdAtom);
  const [userVideos, setUserVideos] = useAtom(userVideosAtom);
  const [loadingUserVideos, setLoadingUserVideos] = useAtom(
    loadingUserVideosAtom
  );

  const [selectedUserVideo, setSelectedUserVideo] = useAtom(
    selectedUserVideoAtom
  );
  const [selectedVideoComments, setSelectedVideoComments] = useAtom(
    selectedVideoCommentsAtom
  );

  const fetchUserVideos = useCallback(async () => {
    if (!userId || userId === "" || loadingUserVideos) {
      return;
    }
    setLoadingUserVideos(true);
    const videos = await getUserVideos(userId);

    if (!isEqual(videos, userVideos)) {
      setUserVideos(videos);
    }

    setLoadingUserVideos(false);
  }, [
    userId,
    loadingUserVideos,
    setLoadingUserVideos,
    userVideos,
    setUserVideos,
  ]);

  const fetchVideoComments = useCallback(
    async (videoId: string) => {
      if (!videoId) {
        return setSelectedVideoComments(null);
      }
      const comments = await getVideoComments(videoId);
      comments.forEach((comment) => {
        comment.content = profanityCheck.clean(comment.content);
      });
      setSelectedVideoComments(comments);
    },
    [setSelectedVideoComments]
  );

  const createUserVideo = useCallback(async (title: string, description: string, vieoUrl: string) => {
    if (!title || !description || !vieoUrl) {
      return;
    }

    // call create video service
    const success = await createNewVideo(userId, title, description, vieoUrl);
    if (success) {
      // fetch user videos
      fetchUserVideos();
      return true;
    }
    return false;
  }, [fetchUserVideos, userId]);

  const addUserComment = useCallback(async (videoId: string, content: string, commentUserId?: string) => {
    const cleanedComment = profanityCheck.clean(content);
    if (!cleanedComment || !selectedUserVideo) {
      return;
    }

    const success = await createComment(videoId, cleanedComment, commentUserId || userId);
    if (success) {
      fetchVideoComments(videoId);
      fetchUserVideos();
      return true;
    }
    return false;
  }, [fetchVideoComments, fetchUserVideos, selectedUserVideo, userId]);



  // fetch user videos once userId is available
  useEffect(() => {
    if (fetchData && !!userId) {
      fetchUserVideos();
    }
  }, [fetchData, userId]);

  // fetch selected user comments when selected video changes
  useEffect(() => {
    if (!selectedUserVideo) {
      return setSelectedVideoComments(null);
    }
    fetchVideoComments(selectedUserVideo.id);
    1;
  }, [fetchVideoComments, selectedUserVideo, setSelectedVideoComments]);

  return {
    userId,
    userVideos,
    loadingUserVideos,
    selectedUserVideo,
    selectedVideoComments,
    setSelectedUserVideo,
    fetchUserVideos,
    createUserVideo,
    addUserComment,
  };
};

export default useUserVideos;
