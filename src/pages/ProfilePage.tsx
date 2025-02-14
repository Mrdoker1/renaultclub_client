import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useMockAuthStore } from "../store/mockAuthStore";
import { useNavigate } from "react-router-dom";
import { Box, Text, VStack, useToast } from "@chakra-ui/react";

const ProfilePage = () => {
  const useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true';
  const authStore = useAuthStore();
  const mockAuthStore = useMockAuthStore();
  const { isAuthenticated, user, fetchUser } = useMockData ? mockAuthStore : authStore;
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (!user && isAuthenticated) {
      fetchUser().catch((error) => {
        if (error instanceof Error) {
          setError(error.message);
          toast({ title: "Ошибка", position: 'top-right', description: error.message, status: "error", duration: 5000, isClosable: true });
        } else {
          setError("Сервер не отвечает");
          toast({ title: "Ошибка", position: 'top-right', description: "Ошибка загрузки данных пользователя!", status: "error", duration: 5000, isClosable: true });
        }
      });
    }
  }, [user, isAuthenticated, fetchUser, toast]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box display="flex" height="100%" width="100%" p={0}>
      <VStack spacing={4} align="stretch">
        {error && <Text color="red.500">{error}</Text>}
        {user ? (
          <>
            <Box>
              <Text><strong>Имя пользователя:</strong></Text>
              <Text>{user.username}</Text>
            </Box>
            <Box>
              <Text><strong>Email:</strong></Text>
              <Text>{user.email}</Text>
            </Box>
          </>
        ) : (
          <Text>Загрузка данных...</Text>
        )}
      </VStack>
    </Box>
  );
};

export default ProfilePage;
