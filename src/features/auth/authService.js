import axios from "axios"

const API_URL = "http://localhost:3000"


const login = async (user)=>{
    console.log("service", user)
  const res = await axios.post(API_URL + "/users/login", user)
  if (res.data) {
    console.log(res.data)
    localStorage.setItem("user", JSON.stringify(res.data.user))
    localStorage.setItem("token", res.data.token)
  }
  return res.data
}


const register = async (userData) => {
    const res = await axios.post(API_URL + "/", userData);
    return res.data;
};

const logout = async () => {
  const token = localStorage.getItem("token")
  const res = await axios.delete(API_URL + "/users/logout", {
    headers: {
      Authorization: token 
    }
  })
  if (res.data) {
    localStorage.clear()
  }
  return res.data
}






const authService = {
  login,
  logout,
  register
  
}


export default authService