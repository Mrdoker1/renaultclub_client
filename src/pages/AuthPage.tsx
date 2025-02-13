import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Box, Button, Input, Heading, VStack, Text, useToast, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import PasswordInput from "../components/PasswordInput";
import renaultImage from "../assets/renault.png";

const RegisterForm = ({ setError, setSuccess }: { setError: (message: string) => void, setSuccess: (message: string) => void }) => {
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
      setSuccess("Регистрация успешна! Письмо с подтверждением отправлено на ваш email.");
      toast({ title: "Регистрация успешна!", position: 'top-right', description: "Письмо с подтверждением отправлено на ваш email.", status: "success", duration: 5000, isClosable: true });
      navigate("/auth");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        toast({ title: "Ошибка регистрации!", position: 'top-right', description: error.message, status: "error", duration: 5000, isClosable: true });
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack gap={4}>
      <Heading as="h2" size="lg">Регистрация</Heading>
      <Input placeholder="Имя пользователя" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <Input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <PasswordInput placeholder="Пароль" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <Button onClick={handleRegister} colorScheme="yellow" isLoading={loading} width="100%" isDisabled={!isFormValid}>Зарегистрироваться</Button>
    </VStack>
  );
};

const LoginForm = ({ setError }: { setError: (message: string) => void }) => {
  const { login } = useAuthStore();
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
        setError(error.message);
        toast({ title: "Ошибка входа!", position: 'top-right', description: error.message, status: "error", duration: 5000, isClosable: true });
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack gap={4}>
      <Heading as="h2" size="lg">Вход</Heading>
      <Input placeholder="Имя пользователя" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <PasswordInput placeholder="Пароль" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <Button onClick={handleLogin} colorScheme="yellow" isLoading={loading} width="100%" isDisabled={!isFormValid}>Войти</Button>
    </VStack>
  );
};

const AuthPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSetError = (message: string) => {
    setError(message);
    setSuccess("");
  };

  const handleSetSuccess = (message: string) => {
    setSuccess(message);
    setError("");
  };

  return (
    <Box display="flex" height="100%" width="100%" justifyContent="center" alignItems="center" bg="black" color="white">
      <Box flex="1" display={{ base: "none", md: "flex" }} bgImage="url('https://i.postimg.cc/S4wzDjYm/image-16.jpg')" bgSize="cover" bgPosition="center" width="100%" height="100%" alignItems="center" justifyContent="center">
        <img src={renaultImage} alt="Renault" style={{ width: "100%", height: "auto", maxWidth:"500px" }} />
      </Box>
      <Box p={8} flex="1">
        <Box maxWidth="500px">
          <Box p={12} display={{ base: "flex", md: "none" }}>
            <img src={renaultImage} alt="Renault" style={{ width: "100%", height: "auto", maxWidth:"500px" }} />
          </Box>
          <Tabs isFitted colorScheme='yellow'>
            <TabList mb="1em">
              <Tab>Вход</Tab>
              <Tab>Регистрация</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <LoginForm setError={handleSetError} />
              </TabPanel>
              <TabPanel>
                <RegisterForm setError={handleSetError} setSuccess={handleSetSuccess} />
              </TabPanel>
            </TabPanels>
          </Tabs>
          {error && <Text color="red.500">{error}</Text>}
          {success && <Text color="green.500">{success}</Text>}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthPage;
