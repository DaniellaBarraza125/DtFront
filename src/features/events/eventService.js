import axios from "axios";
const API_URL = "https://e-learning-expeirence.onrender.com/events";

const createEvent = async (event) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(API_URL + "/" ,event, {
        headers: {
            Authorization: token,
        }});
    
    return res.data;
};

const getAll = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(API_URL + "/", {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};
const getById = async (id) => {
    const token = localStorage.getItem("token");
    const res = await axios.get(API_URL + "/id/" + id, {
        headers: {
            Authorization: token,
        },
    });
    console.log("res", res.data);
    return res.data;
};
const getByDate = async (date) => {
    const token = localStorage.getItem("token");
    const res = await axios.get(API_URL + "/fecha/"+ date,{
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};
const subscribeEvent = async (eventId) => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    const res = await axios.put(API_URL + "/subscribe/" + eventId,{}, {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};
const unsubscribeEvent = async (eventId) => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    const res = await axios.put(API_URL + "/unsubscribe/" + eventId,{}, {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};
const getBySala = async (sala) => {
    const token = localStorage.getItem('token');
    const res = await axios.get(API_URL + '/sala/' + sala, {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
}

const eventService = {
    getAll,
    getById,
    getByDate,
    createEvent,
    subscribeEvent,
    unsubscribeEvent,
    getBySala,
};

export default eventService;
