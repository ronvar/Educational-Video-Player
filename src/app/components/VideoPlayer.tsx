import "video-react/dist/video-react.css";
import "./customVideoStyles.css";
import { Box, createStyles } from "@mantine/core";
import React, { memo, useState } from "react";
import ReactPlayer from "react-player";

const useStyles = createStyles(() => ({
  videoContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    borderRadius: 12,
    paddingTop: '56.25%', // 16:9 aspect ratio
  },
  videoPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 2,
    backgroundColor: "transparent",
    cursor: "pointer",
  },
}));

type VideoPlayerProps = {
  src: string;
  fullPlayer?: boolean;
};
const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, fullPlayer }) => {
  const { classes } = useStyles();
  const [isPlaying, setIsPlaying] = useState(fullPlayer);
  const [volume, setVolume] = useState(0.5);

  const onPlayClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Box className={classes.videoContainer}>
      <ReactPlayer
        className={classes.videoPlayer}
        url={src}
        controls={fullPlayer}
        playing={isPlaying}
        volume={volume}
        width="100%"
        height="100%"
        pip={false}
      />
      {!fullPlayer && <Box className={classes.overlay} />}
    </Box>
  );
};

export default memo(VideoPlayer);
