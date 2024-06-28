import React, { useState } from 'react';
import { Box, Stepper as ChakraStepper,Step,StepIndicator,StepStatus,StepIcon,StepNumber,StepTitle,StepDescription,StepSeparator,Container,Button,FormControl,FormLabel,FormErrorMessage, Input,InputGroup,InputLeftElement,InputRightElement,Checkbox,CheckboxGroup,Stack,Select,useToast} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { register } from '../../features/auth/authSlice';
import { LuImagePlus } from "react-icons/lu";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Logotipo from "../../assets/Images/Logotipo.png"
import "./Stepper.scss";

const steps = [
    { title: 'Cuenta'},
    { title: 'Datos personales'},
    { title: 'Empresa' },
    { title: 'Extras' },
];

const Stepper = () => {
    const initialFormValues = {
        
        email: '',
        password: '',
        nombre: '',
        apellido: '',
        image_path:'',
        nombre_empresa: '',
        puesto_trabajo: '',
        linkedin: '',
        interests: [],
        
        pais: '',
        objectives: [],
        otherObjective: '',
        clientType: '',
    };

    const [formValues, setFormValues] = useState(initialFormValues);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({
        objectives: false,
        interests: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const activeStepText = steps[activeStep].title;
    const toast = useToast();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });

        if (name === 'email') {
            setErrors(prevErrors => ({
                ...prevErrors,
                email: false
            }));
        }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleCheckboxChange = (group, value) => {
        setFormValues(prevValues => {
            const newValues = prevValues[group].includes(value)
                ? prevValues[group].filter(i => i !== value)
                : [...prevValues[group], value];
            return {
                ...prevValues,
                [group]: newValues,
                otherObjective: value === 'Otro' && !prevValues.objectives.includes('Otro') ? '' : prevValues.otherObjective
            };
        });
    };

    const handlePasswordVisibility = () => setShowPassword(!showPassword);

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

        setIsSubmitting(true); 
        console.log("Data to be submitted:", formValues); 

        dispatch(register(formValues));

        setFormValues(initialFormValues);
        setErrors({
            objectives: false,
            interests: false
        });
        setIsSubmitting(false); 
    };

    const interestsOptions = [
        { id: 1, label: 'Interés 1' },
    ];

    const objectiveOptions = [
        { id: "obj1", label: 'Objetivo 1' },
        { id: "obj4", label: 'Otro' }
    ];

    const handleNext = () => {
        let isValid = true;

        switch (activeStep) {
            case 0:
                isValid = formValues.email !== '' && formValues.password !== '';
                if (isValid && !validateEmail(formValues.email)) {
                    isValid = false;
                }
                break;
            case 1:
                isValid = formValues.nombre !== '' && formValues.apellido !== '' && formValues.image_path !== '';
                break;
            case 2:
                isValid = formValues.nombre_empresa !== '' && formValues.puesto_trabajo !== '' && formValues.linkedin !=='';
                break;
            case 3:
                isValid = formValues.objectives.length > 0 && (formValues.objectives.includes('Otro') ? formValues.otherObjective !== '' : true) && formValues.experience !== '' && formValues.clientType !== '' && formValues.interests.length > 0;
                break;
            default:
                break;
        }

        if (isValid) {
            setActiveStep(prevStep => prevStep + 1);
        } else {
            showIncompleteFieldsError();
        }
    };

    const handlePrev = () => {
        setActiveStep(prevStep => prevStep - 1);
    };

    const showIncompleteFieldsError = () => {
        toast({
            title: "Campos incompletos",
            description: "Debe completar todos los campos obligatorios para continuar.",
            status: "error",
            duration: 4000,
            isClosable: true,
        });
    };

    return (
        <>
            <Container maxW="container.sm" mt={4}>
                <Box>
                    <ChakraStepper className='stepper' size='sm' index={activeStep} gap='0'>
                        {steps.map((step, index) => (
                            <Step key={index} gap='0'>
                                <StepIndicator>
                                    <StepStatus complete={<StepIcon />} />
                                </StepIndicator>
                                <StepSeparator _horizontal={{ ml: '0' }} />
                            </Step>
                        ))}
                    </ChakraStepper>
                    <Box>
                        {activeStepText}
                    </Box>
                </Box>
            </Container>

            <Container maxW="container.md" p={4} display={activeStep === 0 ? 'block' : 'none'}>
                <Box>
                    <div className='container_login'>
                        <p className='info_login'>¿Ya tienes una cuenta?</p>
                        <button className='btn_login'>Iniciar Sesión</button>
                    </div>
                    <div className='spam'>
                        <img className="spam-image" src={ Logotipo }/>
                        <p className='spam_info'>Descubre las últimas innovaciones en tecnología educativa.</p>
                    </div>
                    <h2 className='title_info'>Crea tu cuenta</h2>
                    <FormControl isRequired>
                        <FormLabel className='label '>Correo</FormLabel>
                        <Input
                            type='email'
                            name='email'
                            value={formValues.email}
                            onChange={handleChange}
                            placeholder='ejemplo@gmail.com'
                        />
                        {!validateEmail(formValues.email) && formValues.email !== '' && (
                            <FormErrorMessage>Debe ingresar un correo electrónico válido.</FormErrorMessage>
                        )}
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
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    
                </Box>
            </Container>

            <Container maxW="container.md" p={4} display={activeStep === 1 ? 'block' : 'none'}>
                <Box>
                <h2 className='title_info'>Personaliza tu cuenta</h2>
                <p className='info'>Ayúdanos a ofrecerte una experiencia unica y a sacar el mayor partido a nuestro evento.</p>
                <FormControl isRequired mt={4}>
                        <FormLabel>Nombre</FormLabel>
                        <Input
                            name='nombre'
                            value={formValues.nombre}
                            onChange={handleChange}
                            placeholder='Ramón'
                        />
                    </FormControl>

                    <FormControl isRequired mt={4}>
                        <FormLabel>Apellidos</FormLabel>
                        <Input
                            name='apellido'
                            value={formValues.apellido}
                            onChange={handleChange}
                            placeholder='Sánchez'
                        />
                    </FormControl>
                    
                    <FormControl isRequired mt={4}>
                        <FormLabel>Añadir foto</FormLabel>
                        <InputGroup>
                        <Input
                            name='image_path'
                            value={formValues.image_path}
                            onChange={handleChange}
                            placeholder=''
                            height="80px"
                        />
                        <Box
                            position="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                            pointerEvents="none"
                            color="gray.400"
                        >
                            <LuImagePlus />
                        </Box>                       
                    </InputGroup>
                    </FormControl>

                </Box>
            </Container>

            <Container maxW="container.md" p={4} display={activeStep === 2 ? 'block' : 'none'}>
                <Box>
                    <h2 className='title_info'>Personaliza tu cuenta</h2>
                    <p className='info'>Indica la empresa a la que representas y tu puesto para ayudarte a sacar el máximo partido al networking.</p>

                    <FormControl isRequired mt={4}>
                        <FormLabel>Empresa</FormLabel>
                        <Input
                            name='nombre_empresa'
                            value={formValues.company}
                            onChange={handleChange}
                            placeholder='Tu empresa'
                        />
                    </FormControl>

                    <FormControl isRequired mt={4}>
                        <FormLabel>Puesto de trabajo</FormLabel>
                        <Input
                            name='puesto_trabajo'
                            value={formValues.puesto_trabajo}
                            onChange={handleChange}
                            placeholder='ejemplo'
                        />
                    </FormControl>

                    <FormControl isRequired mt={4}>
                        <FormLabel>Linkedin</FormLabel>
                        <Input
                            name='linkedin'
                            value={formValues.linkedin}
                            onChange={handleChange}
                            placeholder='Ejemplo'
                        />
                    </FormControl>
                </Box>
            </Container>

            <Container maxW="container.md" p={4} display={activeStep === 3 ? 'block' : 'none'}>
                <Box>
                    
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
                    
                </Box>
            </Container>
            <Box className='btn_container' mt={4} display="flex" justifyContent="flex-center">
                <Button className='btn_next' colorScheme="teal" onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext} disabled={isSubmitting} isLoading={activeStep === steps.length - 1 && isSubmitting}>
                    {activeStep === steps.length - 1 ? 'Enviar' : 'Siguiente'}
                </Button>                
                {activeStep > 0 && (
                    <Button className='btn_back' mr={4} onClick={handlePrev}>
                        Anterior
                    </Button>
                )}
            </Box>
        </>
    );
};

export default Stepper;
