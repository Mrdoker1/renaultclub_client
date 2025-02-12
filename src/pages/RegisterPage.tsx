import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, Heading, VStack, useToast } from "@chakra-ui/react";

const RegisterPage = () => {
  const { register } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleRegister = async () => {
    setLoading(true);
    try {
      await register(form.username, form.email, form.password);
      toast({ title: "Регистрация успешна!", status: "success", duration: 5000, isClosable: true });
      navigate("/auth");
    } catch (error) {
      toast({
        title: "Ошибка регистрации!",
        description: error instanceof Error ? error.message : "Unknown error",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="page-container" p={4}>
      <VStack gap={4}>
        <Heading as="h2" size="lg">Регистрация</Heading>
        <Input placeholder="Имя пользователя" onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <Input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input type="password" placeholder="Пароль" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Button onClick={handleRegister} colorScheme="blue" isLoading={loading}>Зарегистрироваться</Button>
      </VStack>
    </Box>
  );
};

export default RegisterPage;
