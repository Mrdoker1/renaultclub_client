import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useMockAuthStore } from "../store/mockAuthStore";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, Heading, VStack, useToast } from "@chakra-ui/react";

const LoginPage = () => {
  const useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true';
  const authStore = useAuthStore();
  const mockAuthStore = useMockAuthStore();
  const { login } = useMockData ? mockAuthStore : authStore;
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const isFormValid = form.username && form.password;

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(form.username, form.password);
      navigate("/account");
    } catch (error) {
      if (error instanceof Error) {
        toast({ title: "Ошибка входа!", position: 'top-right', description: error.message, status: "error", duration: 5000, isClosable: true });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" height="100%" width="100%" p={0}>
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="lg">Вход</Heading>
        <Input placeholder="Имя пользователя" onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <Input type="password" placeholder="Пароль" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Button onClick={handleLogin} borderRadius={0} colorScheme="yellow" isLoading={loading} isDisabled={!isFormValid}>Войти</Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;
