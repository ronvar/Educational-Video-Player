import {
  Anchor,
  AppShell,
  Box,
  Center,
  Group,
  Header,
  Image,
  Text,
  createStyles,
} from "@mantine/core";
import { useShallowEffect, useToggle } from "@mantine/hooks";
import { useState } from "react";
import useUserVideos from "../hooks/useUserVideos";
import GlobalModals from "./GlobalModals";
import VideosList from "./VideosList";
import { IconUser, IconUserFilled } from "@tabler/icons-react";

const useStyles = createStyles((theme) => {
  const defaultColor = theme.colors.blue[6];
  return {
    genericHeader: {
      display: "flex",
      alignItems: "center",
      height: "100%",
      justifyContent: "space-between",
      paddingRight: 20,
      paddingLeft: 20,
    },
    userInfo: {
      display: "flex",
      alignItems: "center",
      border: `1px solid ${defaultColor}`,
      borderRadius: 8,
      padding: "5px 10px",
      color: defaultColor,
    },
  };
});

const GenericHeader = () => {
  const { classes } = useStyles();

  const { userId } = useUserVideos();

  return (
    <Header height={88} p={"md"}>
      <div className={classes.genericHeader}>
        <Anchor href="/">
          <Image
            src={"/FULL_LOGO_DARK.png"}
            height={40}
            alt="logo"
            draggable={false}
          />
        </Anchor>
        {!!userId && (
          <Box className={classes.userInfo}>
            <Group spacing={2} align="center" noWrap>
              <IconUserFilled size={12} />
              <Text size="sm" weight={500}>
                {userId}
              </Text>
            </Group>
          </Box>
        )}
      </div>
    </Header>
  );
};

const HomePage: React.FC = () => {
  const [ready, setReady] = useState(false);

  useShallowEffect(() => {
    setReady(true);
  }, []);

  useUserVideos(ready);

  return (
    <AppShell header={<GenericHeader />} padding="md">
      <GlobalModals />
      <Center>
        <VideosList />
      </Center>
    </AppShell>
  );
};

export default HomePage;
