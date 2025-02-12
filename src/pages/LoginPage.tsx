import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, Heading, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";

const LoginPage = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(form.username, form.password);
      navigate("/profile");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast({ title: "Ошибка входа!", description: error.response.data.message, status: "error", duration: 5000, isClosable: true });
      } else {
        toast({ title: "Ошибка входа!", description: (error instanceof Error ? error.message : "Unknown error"), status: "error", duration: 5000, isClosable: true });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="page-container" p={4}>
      <VStack gap={4}>
        <Heading as="h2" size="lg">Вход</Heading>
        <Input placeholder="Имя пользователя" onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <Input type="password" placeholder="Пароль" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Button onClick={handleLogin} colorScheme="blue" isLoading={loading}>Войти</Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;
