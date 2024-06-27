import axios from "axios";
const API_URL = "http://localhost:3000/partners";

const getAllPartners = async () => {
    const res = await axios.get(API_URL + "/");
    return res.data;
};
const getPartnerById = async (id) => {
    const res = await axios.get(API_URL + "/id/" + id);
    return res.data;
};

const partnerService = {
    getAllPartners,
    getPartnerById,
};

export default partnerService;
