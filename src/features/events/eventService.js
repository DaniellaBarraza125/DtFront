import axios from "axios";
const API_URL = "http://localhost:3000/events";

const getAll = async () => {
    const res = await axios.get(API_URL + "/");
    return res.data;
};
const getById = async (id) => {
    const res = await axios.get(API_URL + "/id/" + id);
    return res.data;
};

const eventService = {
    getAll,
    getById,
};

export default eventService;
