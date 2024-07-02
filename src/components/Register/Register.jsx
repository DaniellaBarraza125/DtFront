import { useState } from 'react';

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    Box,
    InputGroup,
    InputRightElement,
    Container,
    Checkbox,
    CheckboxGroup,
    Stack,
    Select,
    StepSeparator
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { register } from '../../features/auth/authSlice';
import Stepper from '../Stepper/Stepper';

const Register = () => {
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
        console.log(`Name: ${name}, Value: ${value}`);
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleCheckboxChange = (group, value) => {
        setFormValues(prevValues => {
            const newValues = prevValues[group].includes(value)
                ? prevValues[group].filter(i => i !== value)
                : [...prevValues[group], value];
            console.log(`${group}: ${newValues}`);
            return {
                ...prevValues,
                [group]: newValues,
                otherObjective: value === 'Otro' && !prevValues.objectives.includes('Otro') ? '' : prevValues.otherObjective
            };
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

        console.log("Data submitted:", formValues);
        dispatch(register(formValues));

        setFormValues(initialFormValues);
        setErrors({
            objectives: false,
            interests: false
        });
    };

    const interestsOptions = [
        { id: 1, label: 'Interés 1' },
        { id: 2, label: 'Interés 2' },
        { id: 3, label: 'Interés 3' },
        { id: 4, label: 'Interés 4' },
        { id: 5, label: 'Interés 5' },
        { id: 6, label: 'Interés 6' },
    ];

    const objectiveOptions = [
        { id: "obj1", label: 'Objetivo 1' },
        { id: "obj2", label: 'Objetivo 2' },
        { id: "obj3", label: 'Objetivo 3' },
        { id: "obj4", label: 'Otro' }
    ];
    
    return (
        <Container maxW="container.md" p={4}>
            <Stepper/>
            <Box as='form' onSubmit={handleSubmit} borderWidth="1px" borderRadius="lg" p={4}>
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

                <FormControl isRequired mt={4}>
                    <FormLabel>Tu empresa</FormLabel>
                    <Input
                        name='company'
                        value={formValues.company}
                        onChange={handleChange}
                        placeholder='Tu empresa'
                    />
                </FormControl>

                <FormControl isRequired mt={4}>
                    <FormLabel>Tu sector</FormLabel>
                    <Select
                        name='sector'
                        value={formValues.sector}
                        onChange={handleChange}
                        placeholder='Seleccione su sector'
                    >
                        <option value='Sector 1'>Sector 1</option>
                        <option value='Sector 2'>Sector 2</option>
                        <option value='Sector 3'>Sector 3</option>
                        <option value='Sector 4'>Sector 4</option>
                        <option value='Sector 5'>Sector 5</option>
                    </Select>
                </FormControl>

                <FormControl mt={4} isInvalid={errors.objectives}>
                    <FormLabel>Objetivos</FormLabel>
                    <CheckboxGroup colorScheme='teal'>
                        <Stack>
                            {objectiveOptions.map((objective) => (
                                <Checkbox
                                    key={objective.id}
                                    id={objective.id}
                                    name='objectives'
                                    value={objective.label}
                                    isChecked={formValues.objectives.includes(objective.label)}
                                    onChange={() => handleCheckboxChange('objectives', objective.label)}
                                >
                                    {objective.label}
                                </Checkbox>
                            ))}
                        </Stack>
                    </CheckboxGroup>
                    {formValues.objectives.includes('Otro') && (
                        <Input
                            mt={2}
                            name='otherObjective'
                            value={formValues.otherObjective}
                            onChange={handleChange}
                            placeholder='Especifique otro objetivo'
                        />
                    )}
                    {errors.objectives && (
                        <FormErrorMessage>Debe seleccionar al menos un objetivo.</FormErrorMessage>
                    )}
                </FormControl>

                <FormControl isRequired mt={4}>
                    <FormLabel>Experiencia</FormLabel>
                    <Input
                        type='number'
                        name='experience'
                        value={formValues.experience}
                        onChange={handleChange}
                        placeholder='Experiencia'
                    />
                </FormControl>

                <FormControl isRequired mt={4}>
                    <FormLabel>Tipo de cliente</FormLabel>
                    <Input
                        name='clientType'
                        value={formValues.clientType}
                        onChange={handleChange}
                        placeholder='Tipo de cliente'
                    />
                </FormControl>

                <FormControl mt={4} isInvalid={errors.interests}>
                    <FormLabel>Intereses</FormLabel>
                    <CheckboxGroup colorScheme='teal'>
                        <Stack>
                            {interestsOptions.map((interest) => (
                                <Checkbox
                                    key={interest.id}
                                    id={interest.id}
                                    name='interests'
                                    value={interest.label}
                                    isChecked={formValues.interests.includes(interest.label)}
                                    onChange={() => handleCheckboxChange('interests', interest.label)}
                                >
                                    {interest.label}
                                </Checkbox>
                            ))}
                        </Stack>
                    </CheckboxGroup>
                    {errors.interests && (
                        <FormErrorMessage>Debe seleccionar al menos un interés.</FormErrorMessage>
                    )}
                </FormControl>

                <Button
                    mt={4}
                    colorScheme='teal'
                    type='submit'
                >
                    Enviar
                </Button>
            </Box>
        </Container>
    );
};

export default Register;
