import {
  CreateVideoBodyType,
  FetchedCommentsResponseType,
  FetchedSingleVideoResponseType,
  FetchedVideoCommentType,
  FetchedVideoType,
  FetchedVideosResponseType,
} from "@/types/apiResponses.types";
import apiWrapper from "@/utils/api";

export const getUserVideos = async (
  user_id: string
): Promise<FetchedVideoType[]> => {
  const url = `/videos?user_id=${user_id}`;
  try {
    const response = await apiWrapper.get<FetchedVideosResponseType>(url);

    return response.videos || [];
  } catch (err) {
    console.error("error fetching user videos", err);
    return [];
  }
};

export const getSingleVideo = async (
  video_id: string
): Promise<FetchedVideoType> => {
  const url = `/videos/single?video_id=${video_id}`;
  try {
    const response = await apiWrapper.get<FetchedSingleVideoResponseType>(url);
    return response.video || {};
  } catch (err) {
    console.error("error fetching single video", err);
    return {} as FetchedVideoType;
  }
};

export const createNewVideo = async (
  user_id: string,
  title: string,
  description: string,
  video_url: string
): Promise<boolean> => {
  const url = "/videos";
  try {
    const body: CreateVideoBodyType = {
      user_id,
      description,
      video_url,
      title,
    };

    await apiWrapper.post(url, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return true;
  } catch (err) {
    console.error("error creating new video", err);
    return false;
  }
};

export const editVideo = async (
  video_id: string,
  title: string,
  description: string
): Promise<boolean> => {
  const url = "/videos";
  try {
    const body = {
      video_id,
      title,
      description,
    };

    await apiWrapper.put(url, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return true;
  } catch (err) {
    console.error("error editing video", err);
    return false;
  }
};

export const createComment = async (
  video_id: string,
  content: string,
  user_id: string
): Promise<boolean> => {
  const url = "/videos/comments";
  try {
    const body = {
      video_id,
      content,
      user_id,
    };

    await apiWrapper.post(url, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return true;
  } catch (err) {
    console.error("error creating comment", err);
    return false;
  }
};

export const getVideoComments = async (
  video_id: string
): Promise<FetchedVideoCommentType[]> => {
  const url = `/videos/comments?video_id=${video_id}`;
  try {
    const response = await apiWrapper.get<FetchedCommentsResponseType>(url);
    return response.comments || [];
  } catch (err) {
    console.error("error fetching video comments", err);
    return [];
  }
};
