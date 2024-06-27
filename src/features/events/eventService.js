import axios from "axios";
const API_URL = "http://localhost:3000/events";

const createEvent = async () => {
    const res = await axios.post(API_URL + "/");
    return res.data;
}

const getAll = async () => {
    const res = await axios.get(API_URL + "/");
    return res.data;
};
const getById = async (id) => {
    const res = await axios.get(API_URL + "/id/" + id);
    return res.data;
};
const getByDate = async (date) => {
    const res = await axios.get(API_URL + "/date", date);
    return res.data;
};

const eventService = {
    getAll,
    getById,
    getByDate,
    createEvent
};

export default eventService;
