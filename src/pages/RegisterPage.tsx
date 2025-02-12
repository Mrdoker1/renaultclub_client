import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { register } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleRegister = async () => {
    try {
      await register(form.username, form.email, form.password);
      alert("Регистрация успешна!");
      navigate("/login");
    } catch {
      alert("Ошибка регистрации!");
    }
  };

  return (
    <div className="page-container">
      <h2>Регистрация</h2>
      <input type="text" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Пароль" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleRegister}>Зарегистрироваться</button>
    </div>
  );
};

export default RegisterPage;
