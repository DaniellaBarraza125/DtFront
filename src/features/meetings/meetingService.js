import axios from "axios";
const API_URL = "http://localhost:3000/meetings";

const getMeetingByUser = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(API_URL + "/byUser", {
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
