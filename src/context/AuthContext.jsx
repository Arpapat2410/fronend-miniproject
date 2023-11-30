import { useContext, createContext, useState, useEffect } from "react";
import authService from "../service/auth.service";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    // ใช้ useState เพื่อสร้าง state user และ setUser ซึ่งเริ่มต้นด้วยค่าที่ได้จาก getUser ซึ่งเป็นฟังก์ชันที่ดึงข้อมูลผู้ใช้จาก localStorage.
    const [user, setUser] = useState(getUser);
    // ฟังก์ชัน login ที่ใช้ในการกำหนดค่า state user เมื่อมีการ login.
    const login = (user) => setUser(user);
    //ฟังก์ชัน logout ที่ใช้ในการทำการ logout โดยเรียกใช้ authService.logout() และกำหนด state user เป็น null
    const logout = () => {
        authService.logout();
        setUser(null);
    }

    //ฟังก์ชัน logout ที่ใช้ในการทำการ logout โดยเรียกใช้ authService.logout() และกำหนด state user เป็น null
    function getUser() {
        const temp = localStorage.getItem("user")
        const savedUser = JSON.parse(temp)
        return savedUser || null
    }

    // เพื่อติดตามการเปลี่ยนแปลงของ user และบันทึกข้อมูลผู้ใช้ลงใน localStorage เมื่อมีการเปลี่ยนแปลง
    useEffect(() => {
        const temp = JSON.stringify(user)
        localStorage.setItem("user", temp);
    }, [user])

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);