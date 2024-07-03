import axios from "axios";
const API_URL = "http://localhost:3000https://e-learning-experience.onrender.com/emails";

const sendSummary = async () => {
    const res = await axios.get(API_URL + "/summary");
    return res.data;
};

const emailService = {
    sendSummary
};

export default emailService;
