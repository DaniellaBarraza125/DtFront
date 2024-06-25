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

  return (
    <Box maxW="md" mx="auto" mt={5} p={4} borderWidth={1} borderRadius="lg">
      <form onSubmit={onSubmit}>
        <VStack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Insert your email"
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
          </FormControl>
          <Button type="submit" colorScheme="blue" mt={3}>
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
