import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const { logout, isAuthenticated, user, fetchUser } = useAuthStore();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user && isAuthenticated) {
      fetchUser().catch((err) => {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.message);
        } else {
          setError("Ошибка загрузки данных пользователя!");
        }
      });
    }
  }, [user, isAuthenticated, fetchUser]);

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return (
    <div className="page-container">
      <h2>Профиль</h2>
      {error && <p className="error-message">{error}</p>}
      {user ? (
        <>
          <p><strong>Имя пользователя:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </>
      ) : (
        <p>Загрузка данных...</p>
      )}
      <button onClick={() => { logout(); navigate("/login"); }} className="button">
        Выйти
      </button>
    </div>
  );
};

export default ProfilePage;
