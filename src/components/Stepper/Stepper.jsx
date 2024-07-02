import React, { useState } from 'react';
import axios from 'axios';
import { Box, Stepper as ChakraStepper,HStack,Tag,TagLabel,TagLeftIcon,TagRightIcon,TagCloseButton,Step,StepIndicator,StepStatus,StepIcon,StepNumber,StepTitle,StepDescription,StepSeparator,Container,Button,FormControl,FormLabel,FormErrorMessage, Input,InputGroup,InputLeftElement,InputRightElement,Checkbox,CheckboxGroup,Stack,Select,useToast,Wrap,WrapItem} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { register } from '../../features/auth/authSlice';
import { LuImagePlus } from "react-icons/lu";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Logotipo from "../../assets/Images/Logotipo.png"
import Products from '../Products/Products';
import "./Stepper.scss";

const steps = [
    { title: 'Cuenta'},
    { title: 'Datos personales'},
    { title: 'Empresa' },
    { title: 'Extras' },
    { title: 'Extras' },
    { title: 'Extras' },



];

const Stepper = () => {
    const initialFormValues = {
        
        email: '',
        password: '',
        nombre: '',
        apellido: '',
        pais: '',
        direccion: '',
        codigo_postal: '',
        poblacion: '',
        provincia: '',
        telefono: '',
        image_path:'',
        nombre_empresa: '',
        puesto_trabajo: '',
        linkedin: '',
        interest: [],
        allergen: [],
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

    const handleLoginClick = () => {
        window.location.href = '/login';
      };

      const handleInteresChange = (value) => {
        setFormValues((prevState) => ({
            ...prevState,
            interest: prevState.interest.includes(value)
                ? prevState.interest.filter((interest) => interest !== value)
                : [...prevState.interest, value]
        }));
    };

    const handleAllergenChange = (value) => {
        setFormValues((prevState) => ({
            ...prevState,
            allergen: prevState.allergen.includes(value)
                ? prevState.allergen.filter((allergen) => allergen !== value)
                : [...prevState.allergen, value]
        }));
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
                interest: interestsError
            });
            return;
        }

        setIsSubmitting(true); 
        console.log("Data to be submitted:", formValues); 

        dispatch(register(formValues));

        setFormValues(initialFormValues);
        setErrors({
            objectives: false,
            interest: false
        });
        setIsSubmitting(false); 
    };

    const interesOptions = [
        'Accesibilidad', 'Analítica', 'Antiplagio', 'Certificación', 'Contenidos',
        'Generación de vídeo', 'Gestión de la formación', 'Herramientas del autor',
        'Inteligencia artificial', 'Laboratorios Virtuales', 'LMS Educativo', 
        'LMS Corporativo', 'Proctoring', 'Repositorio digital', 'Sistema de Gestión', 
        'Videoconferencia'
      ];

    const allergenOptions = [
        'Leche', 'Huevos', 'Pescado', 'Mariscos', 'Frutos secos', 'Cacahuetes', 'Trigo',
        'Soja', 'Sésamo', 'Mostaza', 'Apio', 'Sulfitos', 'Lupino', 'Altramuz'
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
                //isValid = formValues.interest.length > 0;
                break;
            case 4:
                
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
                    {activeStep > 0 && (
                        <>
                            <ChakraStepper className='stepper' size='sm' index={activeStep} gap='0' colorScheme='teal'>
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
                        </>
                    )}
                </Box>
            </Container>

            <Container maxW="container.md" p={4} display={activeStep === 0 ? 'block' : 'none'}>
                <Box>
                    <div className='container_login'>
                        <p className='info_login'>¿Ya tienes una cuenta?</p>
                        <button className='btn_login_register' onClick={handleLoginClick}>Iniciar Sesión</button>
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
                            placeholder='Ejemplo'
                        />
                    </FormControl>

                    <FormControl isRequired mt={4}>
                        <FormLabel>Apellidos</FormLabel>
                        <Input
                            name='apellido'
                            value={formValues.apellido}
                            onChange={handleChange}
                            placeholder='Ejemplo'
                        />
                    </FormControl>

                    <FormControl isRequired mt={4}>
                        <FormLabel>País</FormLabel>
                        <div className='container_work'>
                        <select className='select_work' name='pais'
                            value={formValues.pais}
                            onChange={handleChange}>
                            <option value=""></option>    
                            <option value="España">España</option>
                            <option value="Francia">Francia</option>
                            <option value="UK">UK</option>
                            <option value="Alemania">Alemania</option>
                            <option value="Canada">Canada</option>
                        </select>
                        </div>
                    </FormControl>

                    <FormControl isRequired mt={4}>
                        <FormLabel>Dirección</FormLabel>
                        <Input
                            name='direccion'
                            value={formValues.direccion}
                            onChange={handleChange}
                            placeholder='Ejemplo'
                        />
                    </FormControl>
                    
                    <FormControl isRequired mt={4}>
                        <FormLabel>Código postal / ZIP</FormLabel>
                        <Input
                            name='codigo_postal'
                            value={formValues.codigo_postal}
                            onChange={handleChange}
                            placeholder='Ejemplo'
                        />
                    </FormControl>

                    <FormControl isRequired mt={4}>
                        <FormLabel>Población</FormLabel>
                        <Input
                            name='poblacion'
                            value={formValues.poblacion}
                            onChange={handleChange}
                            placeholder='Ejemplo'
                        />
                    </FormControl>

                    <FormControl isRequired mt={4}>
                        <FormLabel>Provincia</FormLabel>
                        <Input
                            name='provincia'
                            value={formValues.provincia}
                            onChange={handleChange}
                            placeholder='Ejemplo'
                        />
                    </FormControl>

                    <FormControl isRequired mt={4}>
                        <FormLabel>Teléfono</FormLabel>
                        <Input
                            name='telefono'
                            value={formValues.telefono}
                            onChange={handleChange}
                            placeholder='Ejemplo'
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
                        <div className='container_work'>
                        <select className='select_work' name='puesto_trabajo'
                            value={formValues.puesto_trabajo}
                            onChange={handleChange}>
                            <option value=""></option>    
                            <option value="Productor de Multimedia Educativa">Productor de Multimedia Educativa</option>
                            <option value="Desarrollador de Contenidos de e-Learning">Desarrollador de Contenidos de e-Learning</option>
                            <option value="Coordinador de Programas de e-Learning">Coordinador de Programas de e-Learning</option>
                            <option value="Analista de Datos Educativos">Analista de Datos Educativos</option>
                            <option value="Tutor o Facilitador de e-Learning">Tutor o Facilitador de e-Learning</option>
                            <option value="Consultor de e-Learning">Consultor de e-Learning</option>
                            <option value="Especialista en LMS">Especialista en LMS</option>
                            <option value="Diseñador Gráfico para e-Learning">Diseñador Gráfico para e-Learning</option>
                            <option value="Especialista en Evaluación y Certificación en Línea">Especialista en Evaluación y Certificación en Línea</option>
                            <option value="Diseñador Instruccional">Diseñador Instruccional</option>
                        </select>
                        </div>
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
                    <FormControl>
                        <FormLabel>Intereses</FormLabel>
                        <Wrap>
                            {interesOptions.map((interes) => (
                                <WrapItem key={interes}>
                                    <Tag
                                        size="lg"
                                        borderRadius="full"
                                        variant={formValues.interest.includes(interes) ? "solid" : "outline"}
                                        colorScheme={formValues.interest.includes(interes) ? "teal" : "gray"}
                                        onClick={() => handleInteresChange(interes)}
                                        cursor="pointer"
                                    >
                                        <TagLabel>{interes}</TagLabel>
                                    </Tag>
                                </WrapItem>
                            ))}
                        </Wrap>
                    </FormControl>
                </Box>
            </Container>
 
            <Container maxW="container.md" p={4} display={activeStep === 4 ? 'block' : 'none'}>
                <Box>    
                <FormControl>
                        <FormLabel>Alergenos</FormLabel>
                        <Wrap>
                            {allergenOptions.map((allergen) => (
                                <WrapItem key={allergen}>
                                    <Tag
                                        size="lg"
                                        borderRadius="full"
                                        variant={formValues.allergen.includes(allergen) ? "solid" : "outline"}
                                        colorScheme={formValues.allergen.includes(allergen) ? "teal" : "gray"}
                                        onClick={() => handleAllergenChange(allergen)}
                                        cursor="pointer"
                                    >
                                        <TagLabel>{allergen}</TagLabel>
                                    </Tag>
                                </WrapItem>
                            ))}
                        </Wrap>
                    </FormControl>                
                </Box>
            </Container>

            <Container maxW="container.md" p={4} display={activeStep === 5 ? 'block' : 'none'}>
                <Box>    
                <Products />               
                </Box>
            </Container>

            <Box className='btn_container' mt={4} display="flex" justifyContent="flex-center">
                <Button className='btn_next' colorScheme="teal" onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext} disabled={isSubmitting} isLoading={activeStep === steps.length - 1 && isSubmitting} borderRadius="80px">
                    {activeStep === 0 ? 'Crear cuenta' : activeStep === steps.length - 1 ? 'Enviar' : 'Siguiente'}
                </Button>                
                {activeStep > 0 && (
                    <Button className='btn_back' mr={4} onClick={handlePrev} borderRadius="80px">
                        Anterior
                    </Button>
                )}
            </Box>
        </>
    );
};

export default Stepper;
