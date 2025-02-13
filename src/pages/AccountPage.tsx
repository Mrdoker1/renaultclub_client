import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, useToast } from "@chakra-ui/react";
import ProfilePage from "./ProfilePage";
import RVinPage from "./RVinPage";

const AccountPage = () => {
  const { logout, isAuthenticated, user, fetchUser } = useAuthStore();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!user && isAuthenticated) {
      fetchUser().catch((error) => {
        if (error instanceof Error) {
          toast({ title: "Ошибка", position: 'top-right', description: error.message, status: "error", duration: 5000, isClosable: true });
        } else {
          toast({ title: "Ошибка", position: 'top-right', description: "Ошибка загрузки данных пользователя!", status: "error", duration: 5000, isClosable: true });
        }
      });
    }
  }, [user, isAuthenticated, fetchUser, toast]);

  if (!isAuthenticated) {
    navigate("/auth");
    return null;
  }

  return (
    <Box display="flex" height="100%" width="100%" flexDirection="column" p={0}>
      <Box p={16} height="140px" width="100%" bgImage="url('https://i.postimg.cc/dtWcSvdS/image-31.png')" bgSize="cover" bgPosition="center" display="flex" alignItems="center" justifyContent="space-between">
        <Heading as="h1" size="lg" color="white">Профиль</Heading>
        <Button onClick={() => { logout(); navigate("/auth"); }} colorScheme="yellow">Выйти</Button>
      </Box>
      <Tabs paddingLeft={16} paddingRight={16} colorScheme="yellow" mt={8}>
        <TabList>
          <Tab>Об аккаунте</Tab>
          <Tab>Поиск по VIN</Tab>
        </TabList>
        <TabPanels mt={8}>
          <TabPanel p={0}>
            <ProfilePage />
          </TabPanel>
          <TabPanel p={0}>
            <RVinPage />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AccountPage;
