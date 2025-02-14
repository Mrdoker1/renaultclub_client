import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useMockAuthStore } from "../store/mockAuthStore";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, useToast, useMediaQuery } from "@chakra-ui/react";
import ProfilePage from "./ProfilePage";
import RVinPage from "./RVinPage";

const AccountPage = () => {
  const useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true';
  const mockAuthStore = useMockAuthStore();
  const authStore = useAuthStore();
  const { logout, isAuthenticated, user, fetchUser } = useMockData ? mockAuthStore : authStore;
  const navigate = useNavigate();
  const toast = useToast();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

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
    return null;
  }

  return (
    <Box display="flex" height="100%" width="100%" flexDirection="column" p={0}>
      <Box 
        p={isMobile ? 4 : 16} 
        height="140px" 
        width="100%" 
        bgImage="url('https://i.postimg.cc/dtWcSvdS/image-31.png')" 
        bgSize="cover" 
        bgPosition="center" 
        display="flex" 
        alignItems="center" 
        justifyContent="space-between"
      >
        <Heading as="h1" size="lg" color="white">Профиль</Heading>
        <Button onClick={() => { logout(); navigate("/auth"); }} colorScheme="yellow">Выйти</Button>
      </Box>
      <Tabs 
        variant={isMobile ? "soft-rounded" : "line"}
        paddingLeft={isMobile ? 4 : 16} 
        paddingRight={isMobile ? 4 : 16} 
        colorScheme="yellow" 
        mt={8}
        orientation={isMobile ? "vertical" : "horizontal"}
      >
        <TabList marginRight={isMobile ? 4 : 0}>
          <Tab>Об аккаунте</Tab>
          <Tab>Поиск по VIN</Tab>
        </TabList>
        <TabPanels mt={isMobile ? 0 : 8}>
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
