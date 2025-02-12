import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import axios from "axios";

const RegisterForm = ({ setError, setSuccess }: { setError: (message: string) => void, setSuccess: (message: string) => void }) => {
  const { register } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleRegister = async () => {
    try {
      await register(form.username, form.email, form.password);
      setSuccess("Регистрация успешна! Письмо с подтверждением отправлено на ваш email.");
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message);
      } else {
        setError("Ошибка регистрации!");
      }
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <input type="text" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Пароль" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleRegister}>Зарегистрироваться</button>
    </div>
  );
};

const LoginForm = ({ setError }: { setError: (message: string) => void }) => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = async () => {
    try {
      await login(form.username, form.password);
      navigate("/profile");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message);
      } else {
        setError("Ошибка входа!");
      }
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <input type="text" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="Пароль" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
};

const AuthPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="page-container">
      {isLogin ? <LoginForm setError={setError} /> : <RegisterForm setError={setError} setSuccess={setSuccess} />}
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Перейти к регистрации" : "Перейти к входу"}
      </button>
    </div>
  );
};

export default AuthPage;
