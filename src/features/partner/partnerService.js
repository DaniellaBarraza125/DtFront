import axios from "axios";
const API_URL = "http://localhost:3000/partners";

const getAllPartners = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(API_URL + "/", {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};
const getPartnerById = async (id) => {
    const res = await axios.get(API_URL + "/id/" + id);
    return res.data;
};
const addPartner = async (partner) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(API_URL, partner,{
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};

const partnerService = {
    getAllPartners,
    getPartnerById,
    addPartner,
};

export default partnerService;
