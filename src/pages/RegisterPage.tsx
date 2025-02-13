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

  const isFormValid = form.username && form.email && form.password;

  const handleRegister = async () => {
    setLoading(true);
    try {
      await register(form.username, form.email, form.password);
      toast({ title: "Регистрация успешна!", position: 'top-right', status: "success", duration: 5000, isClosable: true });
      navigate("/auth");
    } catch (error) {
      if (error instanceof Error) {
        toast({ title: "Ошибка регистрации!", position: 'top-right', description: error.message, status: "error", duration: 5000, isClosable: true });
      } else {
        toast({ title: "Ошибка регистрации!", position: 'top-right', description: "Сервер не отвечает", status: "error", duration: 5000, isClosable: true });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" height="100%" width="100%" p={0}>
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="lg">Регистрация</Heading>
        <Input placeholder="Имя пользователя" onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <Input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input type="password" placeholder="Пароль" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Button onClick={handleRegister} colorScheme="yellow" isLoading={loading} isDisabled={!isFormValid}>Зарегистрироваться</Button>
      </VStack>
    </Box>
  );
};

export default RegisterPage;
