import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  //ใช้ Hook useAuthContext เพื่อดึงข้อมูลผู้ใช้ (user) จาก Context API ที่ใช้เก็บข้อมูลการตรวจสอบตัวตน.
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/signin" />;
  }
  if (!user.roles.include("ROLES_ADMIN")) return <Navigate to="/Notallow"></Navigate>
  return children;
};
export default AdminRoute;
