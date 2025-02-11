import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { logout, isAuthenticated, user, fetchUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && isAuthenticated) {
      fetchUser();
    }
  }, [user, isAuthenticated, fetchUser]);

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return (
    <div className="page-container">
      <h2>Профиль</h2>
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
