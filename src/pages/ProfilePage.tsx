import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading, Text, VStack, useToast } from "@chakra-ui/react";

const ProfilePage = () => {
  const { logout, isAuthenticated, user, fetchUser } = useAuthStore();
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

  if (!isAuthenticated) {
    navigate("/auth");
    return null;
  }

  return (
    <Box className="page-container" p={4}>
      <VStack gap={4}>
        <Heading as="h2" size="lg">Профиль</Heading>
        {error && <Text color="red.500">{error}</Text>}
        {user ? (
          <>
            <Text><strong>Имя пользователя:</strong> {user.username}</Text>
            <Text><strong>Email:</strong> {user.email}</Text>
          </>
        ) : (
          <Text>Загрузка данных...</Text>
        )}
        <Button style={{ borderRadius:'0' }} onClick={() => { logout(); navigate("/auth"); }} colorScheme="yellow">
          Выйти
        </Button>
      </VStack>
    </Box>
  );
};

export default ProfilePage;
