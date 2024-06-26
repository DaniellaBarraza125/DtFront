import axios from "axios";

const API_URL = "http://localhost:3000/users";

const login = async (user) => {
    console.log("service", user);
    const res = await axios.post(API_URL + "/login", user);
    if (res.data) {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data.user));//-------------repetido en slice
        localStorage.setItem("token", res.data.token);
    }
    return res.data;
};

const register = async (userData) => {
    console.log(userData);
    const res = await axios.post(API_URL + "/", userData);
    return res.data;
};

const logout = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.delete(API_URL + "/logout", {
        headers: {
            Authorization: token,
        },
    });
    if (res.data) {
        localStorage.clear();
    }
    return res.data;
};
const getUsers = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(API_URL + "/", {
        headers: {
            Authorization: token,
        },
    });

    return res.data;
};

const authService = {
    login,
    logout,
    register,
    getUsers,
};

export default authService;
