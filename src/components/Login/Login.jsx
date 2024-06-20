import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'



const Login = () => {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    })
    const {email,password} = formData
    const {message,isSuccess,isError} = useSelector((state)=>state.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        if(isSuccess){
           
            navigate("/profile")
        }
       
        dispatch(reset())
    },[isSuccess,message,isError])

    const onChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(login(formData))
    }
  return (
    <form onSubmit={onSubmit}>
        <input type="email" name="email" value={email} onChange={onChange} placeholder='Insert your email'/>
        <input type="password" name="password" value={password} onChange={onChange} placeholder='Insert your password'/>
        <button type="submit">Login</button>
    </form>
  )
}
export default Login