import axios from "axios";
const API_URL = "https://e-learning-experience.onrender.com/meetings";

const getMeetingByUser = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(API_URL + "/byUser", {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};
const createMeeting = async (formData) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(API_URL + "/", formData, {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};

const meetingService = {
    getMeetingByUser,
    createMeeting,
};

export default meetingService;
