import axios from "axios";
const API_URL = "https://e-learning-expeirence.onrender.com/emails";

const sendSummary = async () => {
    const res = await axios.get(API_URL + "/summary");
    return res.data;
};

const emailService = {
    sendSummary
};

export default emailService;
