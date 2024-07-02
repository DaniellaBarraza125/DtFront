import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import Logotipo from "../../assets/Images/Logotipo.png"
import "./Login.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;
  const dispatch = useDispatch();


  console.log(formData)
 

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    
    e.preventDefault();
    dispatch(login(formData));
  
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

  return (
    <Box maxW="md" mx="auto" mt={5} p={4}>
      <div className='spam'>
        <img className="spam-image" src={ Logotipo }/>
        <p className='spam_info'>Descubre las últimas innovaciones en tecnología educativa.</p>
      </div>
      <h2 className='title_info'>Crea tu cuenta</h2>
      <form onSubmit={onSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Correo</FormLabel>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="ejemplo@gmail.com"
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Insert your password"
            />
            {!validateEmail(formData.email) && formData.email !== '' && (
              <FormErrorMessage>Debe ingresar un correo electrónico válido.</FormErrorMessage>
            )}
          </FormControl>
          <Button className="btn_login" type="submit" colorScheme="teal" mt={4} borderRadius="80px">
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
