import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import "./Login.scss";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();


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
    navigate('/schedule');
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

  return (
    <Box maxW="md" mx="auto" mt={5} p={4}>
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
          <Button className="btn_login" type="submit" colorScheme="teal" mt={4} borderRadius="80px" >
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
