import { useState } from 'react';
import {    FormControl,    FormLabel,    FormErrorMessage,    Input,    Button,    Box,    InputGroup,    InputRightElement,} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { register } from '../../features/auth/authSlice';

const PersonalInfo = () => {

    const initialFormValues = {
        email: '',
        name: '',
        lastName: '',
        password: '',
        country: '',
        company: '',
        sector: '',
        objectives: [],
        otherObjective: '',
        experience: 0,
        clientType: '',
        interests: []
    };

    const [formValues, setFormValues] = useState(initialFormValues);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({
        objectives: false,
        interests: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };


    const handlePasswordVisibility = () => setShowPassword(!showPassword);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const objectivesError = formValues.objectives.length === 0;
        const interestsError = formValues.interests.length === 0;

        if (objectivesError || interestsError) {
            setErrors({
                objectives: objectivesError,
                interests: interestsError
            });
            return;
        }

        dispatch(register(formValues));

        setFormValues(initialFormValues);
        setErrors({
            objectives: false,
            interests: false
        });
    };


    return (
        <Box borderWidth="1px" borderRadius="lg" p={4}>
           <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type='email'
                        name='email'
                        value={formValues.email}
                        onChange={handleChange}
                        placeholder='Ingrese su correo'
                    />
                    {!formValues.email && (
                        <FormErrorMessage>Debe ingresar un correo válido.</FormErrorMessage>
                    )}
                </FormControl>

                <FormControl isRequired mt={4}>
                    <FormLabel>Nombre</FormLabel>
                    <Input
                        name='name'
                        value={formValues.name}
                        onChange={handleChange}
                        placeholder='Nombre'
                    />
                </FormControl>

                <FormControl isRequired mt={4}>
                    <FormLabel>Apellido</FormLabel>
                    <Input
                        name='lastName'
                        value={formValues.lastName}
                        onChange={handleChange}
                        placeholder='Apellido'
                    />
                </FormControl>

                <FormControl isRequired mt={4}>
                    <FormLabel>Contraseña</FormLabel>
                    <InputGroup>
                        <Input
                            pr='4.5rem'
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            value={formValues.password}
                            onChange={handleChange}
                            placeholder='Ingrese su contraseña'
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handlePasswordVisibility}>
                                {showPassword ? 'Ocultar' : 'Mostrar'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                <FormControl isRequired mt={4}>
                    <FormLabel>País/Región</FormLabel>
                    <Input
                        name='country'
                        value={formValues.country}
                        onChange={handleChange}
                        placeholder='País/Región'
                    />
                </FormControl>

              


        </Box>
    );
};

export default PersonalInfo;
