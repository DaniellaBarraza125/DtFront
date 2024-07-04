import axios from "axios";
const API_URL = "http://localhost:3000/events";

const createFeedback = async (feedback) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(API_URL + "/", feedback, {
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
    return res.data;
};

const feedbackService = {
    createFeedback,
    getById,
};

export default feedbackService;
