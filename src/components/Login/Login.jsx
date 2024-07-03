import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login,reset  } from '../../features/auth/authSlice';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  FormErrorMessage,
  useToast
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
  const toast = useToast();
  const navigate = useNavigate();

  const { msg, isError,isSuccess,isLoading  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: msg,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-left"
      });
      navigate("/schedule");
      dispatch(reset());
    }

    if (isError) {
      toast({
        title: "Error",
        description: msg,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left"
      });
      dispatch(reset());
    }
  }, [isSuccess, isError, msg, toast, navigate, dispatch]);

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
      <form onSubmit={onSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired isInvalid={!validateEmail(email) && email !== ''}>
            <FormLabel>Correo</FormLabel>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="ejemplo@gmail.com"
            />
            {!validateEmail(email) && email !== '' && (
              <FormErrorMessage>Debe ingresar un correo electrónico válido.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Insert your password"
            />
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
