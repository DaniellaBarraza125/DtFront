import axios from "axios";
const API_URL = "https://e-learning-expeirence.onrender.com/meetings";

const getMeetingByUser = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(API_URL + "/", {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};

const meetingService = {
    getMeetingByUser,
};

export default meetingService;
