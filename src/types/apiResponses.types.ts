export type FetchedVideoType = {
  created_at: string;
  video_url: string;
  user_id: string;
  description: string;
  title: string;
  num_comments: number;
  id: string;
};

export type FetchedVideosResponseType = {
  videos: FetchedVideoType[];
};

export type FetchedSingleVideoResponseType = {
  video: FetchedVideoType;
};

export type FetchedVideoCommentType = {
  created_at: string;
  content: string;
  user_id: string;
  video_id: string;
  id: string;
};

export type FetchedCommentsResponseType = {
  comments: FetchedVideoCommentType[];
};

export type CreateVideoBodyType = {
  user_id: string;
  description: string;
  video_url: string;
  title: string;
};

export type CreateCommentBodyType = {
  video_id: string;
  content: string;
  user_id: string;
};

export type EditVideoBodyType = {
  video_id: string;
  title: string;
  description: string;
};
