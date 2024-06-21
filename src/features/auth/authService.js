import axios from "axios"

const API_URL = "http://localhost:3002/users"


const login = async (user)=>{
  const res = await axios.post(API_URL + "/login", user)
  if (res.data) {
    console.log(res.data)
    localStorage.setItem("user", JSON.stringify(res.data.user))
    localStorage.setItem("token", res.data.token)
  }
  return res.data
}

const logout = async () => {
  const token = localStorage.getItem("token")
  const res = await axios.delete(API_URL + "/logout", {
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
  logout
  
}


export default authService