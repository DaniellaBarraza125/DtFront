import { Navigate } from "react-router-dom";

const AdminZone = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.rol);
  return user.rol == 'admin' ? children : <Navigate to="/" />;
};

export default AdminZone;
