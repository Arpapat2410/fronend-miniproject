const getLocalRefreshToken = () =>{
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken; // ?. = เพื่อให้โค๊ดรันได้ต่อโดยโปรเเกรมไม่หยุด ต่อให้ user จะหาไม่เจอ
}

//ดึง Access Token จาก Local Storage โดยใช้ localStorage.getItem และคืนค่าด้วย return user?.accessToken;
const getLocalAccessToken = () =>{
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.accessToken;
}

//กำหนดค่า Access Token ใน Local Storage โดยอ่านข้อมูล user จาก Local Storage, กำหนดค่า accessToken, และบันทึกค่า user ลงใน Local Storage ใหม่.
const setLocalAccessToken = (token) =>{
    const user = JSON.parse(localStorage.getItem("user"));
    user.accessToken =  token;
    localStorage.setItem('user', JSON.stringify(user));
}

// ดึงข้อมูลผู้ใช้จาก Local Storage โดยใช้ localStorage.getItem และคืนค่า
const getUser = () =>{
   return JSON.parse(localStorage.getItem("user"));
};

//กำหนดข้อมูลผู้ใช้ใน Local Storage โดยใช้ localStorage.setItem และบันทึกข้อมูล user ใหม่.
const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};

//ลบข้อมูลผู้ใช้จาก Local Storage 
const removeUser = () => {
    localStorage.removeItem("user")
};
const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    setLocalAccessToken,
    getUser,
    setUser,
    removeUser,
}
export default TokenService;