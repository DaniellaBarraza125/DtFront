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
const getPartnerByIdUser = async (id) => {
    const token = localStorage.getItem("token");
    const res = await axios.get(API_URL + "/id/" + id,{
        headers: {
            Authorization: token,
        },
    });
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
const updatePartner = async (partner) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(API_URL + "/id/" + partner.id, partner,{
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};

const partnerService = {
    getAllPartners,
    getPartnerByIdUser,
    addPartner,
    updatePartner,
};

export default partnerService;
