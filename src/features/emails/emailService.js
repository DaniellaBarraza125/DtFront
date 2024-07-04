import axios from "axios";
const API_URL = "https://e-learning-experience.onrender.com/emails";

const sendSummary = async () => {
    const res = await axios.get(API_URL + "/summary");
    return res.data;
};
const sendTo = async () => {
    const res = await axios.get(API_URL + "/sendto");
    return res.data;
};

const emailService = {
    sendSummary,
    sendTo,
};

export default emailService;
