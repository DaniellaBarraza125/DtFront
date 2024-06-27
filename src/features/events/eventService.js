import axios from "axios";
const API_URL = "http://localhost:3000/events";

const getAll = async () => {
    const res = await axios.get(API_URL + "/", {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};
const getById = async (id) => {
    const token = localStorage.getItem("token");
    const res = await axios.get(API_URL + "/id/" + id,{
        headers: {
            Authorization: token,
        },
    });
    console.log("res", res.data);
    return res.data;
};
const getByDate = async (date) => {
    console.log(date);
    const res = await axios.get(API_URL + "/date", date,{
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};

const eventService = {
    getAll,
    getById,
    getByDate,
};

export default eventService;
