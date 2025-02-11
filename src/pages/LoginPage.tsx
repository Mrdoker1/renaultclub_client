import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = async () => {
    try {
      await login(form.username, form.password);
      navigate("/profile");
    } catch (error) {
      alert("Ошибка входа!");
    }
  };

  return (
    <div className="page-container">
      <h2>Вход</h2>
      <input type="text" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="Пароль" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
};

export default LoginPage;
