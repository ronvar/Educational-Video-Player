import "video-react/dist/video-react.css";
import "./customVideoStyles.css";
import { Box, createStyles } from "@mantine/core";
import React, { memo } from "react";
import {
  Player,
  ControlBar,
  BigPlayButton,
  PlaybackRateMenuButton,
  VolumeMenuButton,
} from "video-react";

const useStyles = createStyles(() => ({
  videoPlayer: {
    width: "100%",
    height: "100%",
    position: "relative",
    borderRadius: 12,
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
  }
}));

type VideoPlayerProps = {
  src: string;
  fullPlayer?: boolean;
};
const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, fullPlayer }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.videoPlayer}>
      <Player src={src} autoPlay={fullPlayer}>
        <BigPlayButton position={fullPlayer ? "center" : "left"} />
        {fullPlayer && <ControlBar>
          <PlaybackRateMenuButton rates={[2, 1.5, 1, 0.5]} />
          <VolumeMenuButton vertical />
        </ControlBar>}
      </Player>
      {!fullPlayer && <Box className={classes.overlay} />}
    </Box>
  );
};

export default memo(VideoPlayer);
