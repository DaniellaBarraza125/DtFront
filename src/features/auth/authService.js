import axios from "axios";

const API_URL = "https://e-learning-experience.onrender.com/users";
console.log(API_URL);
const login = async (user) => {
    const res = await axios.post(API_URL + "/login", user);
    if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
    }
    return res.data;
};

const register = async (userData) => {
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
    console.log('Logging out')
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
const getUsersByRole = async (role) => {
    const token = localStorage.getItem("token");

    const res = await axios.get(API_URL + "/role/" + role, {
        headers: {
            Authorization: token,
        },
    });

    return res.data;
};
const getUsersByid = async (id) => {
    const token = localStorage.getItem("token");
    const res = await axios.get(API_URL + "/id/" + id, {
        headers: {
            Authorization: token,
        },
    });

    return res.data;
};
const updateUser = async (user) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(API_URL + "/id/" + user.id, user, {
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
    getUsersByRole,
    getUsersByid,
    updateUser,
};

export default authService;
