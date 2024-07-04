import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUsersByid } from '../../features/auth/authSlice';
import { createMeeting } from '../../features/meetings/meetingSlice';
import { Box, Container, Heading, ModalCloseButton , Text, Button, Center, Image, Tag, ModalHeader, ModalBody, Select, ModalFooter, useDisclosure, Modal, ModalOverlay, ModalContent, Flex, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import Footer from '../Footer/Footer';

const linkedIn = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.868 2.625H4.13203C3.3 2.625 2.625 3.3 2.625 4.13203V19.868C2.625 20.7 3.3 21.375 4.13203 21.375H19.868C20.7 21.375 21.375 20.7 21.375 19.868V4.13203C21.375 3.3 20.7 2.625 19.868 2.625ZM19.868 19.875C9.37266 19.8727 4.125 19.8703 4.125 19.868C4.12734 9.37266 4.12969 4.125 4.13203 4.125C14.6273 4.12734 19.875 4.12969 19.875 4.13203C19.8727 14.6273 19.8703 19.875 19.868 19.875ZM5.40469 9.65391H8.18672V18.6023H5.40469V9.65391ZM6.79688 8.43047C7.68516 8.43047 8.40937 7.70859 8.40937 6.81797C8.40937 6.60621 8.36767 6.39653 8.28663 6.20089C8.2056 6.00525 8.08682 5.82749 7.93709 5.67776C7.78735 5.52802 7.60959 5.40925 7.41395 5.32821C7.21831 5.24718 7.00863 5.20547 6.79688 5.20547C6.58512 5.20547 6.37544 5.24718 6.1798 5.32821C5.98416 5.40925 5.8064 5.52802 5.65667 5.67776C5.50693 5.82749 5.38815 6.00525 5.30712 6.20089C5.22608 6.39653 5.18437 6.60621 5.18437 6.81797C5.18203 7.70859 5.90391 8.43047 6.79688 8.43047ZM12.7102 14.175C12.7102 13.0078 12.9328 11.8781 14.3789 11.8781C15.8039 11.8781 15.825 13.2117 15.825 14.25V18.6023H18.6047V13.6945C18.6047 11.2852 18.0844 9.43125 15.2695 9.43125C13.9172 9.43125 13.0102 10.1742 12.6375 10.8773H12.6V9.65391H9.93047V18.6023H12.7102V14.175Z" fill="#191919"/>
    </svg>
);

const mail = (
    <svg width="20" height="20" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2C20 0.9 19.1 0 18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2ZM18 2L10 7L2 2H18ZM18 14H2V4L10 9L18 4V14Z" fill="#191919"/>
    </svg>
);

const UserDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { userDetail, isLoading, user } = useSelector((state) => state.auth);
    const userId = user.id;
    const { msg, error } = useSelector((state) => state.meeting);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDay, setSelectedDay] = useState('');

    const handleOneToOne = () => {
        onOpen();
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };

    const handleDayChange = (e) => {
        setSelectedDay(e.target.value);
    };

    const handleSubmit = () => {
        const [hour, minute] = selectedTime.split(':').map(Number);
        const endHour = hour + Math.floor((minute + 15) / 60);
        const endMinute = (minute + 15) % 60;
        const horaFin = `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;

        const formData = {
            hora_inicio: selectedTime,
            partner_id: userDetail.id,
            hora_fin: `${selectedDay} ${horaFin}`,
            fecha: selectedDay,
        };
        dispatch(createMeeting(formData));
        onClose();
    };

    useEffect(() => {
        if (id) {
            dispatch(getUsersByid(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (msg) {
            toast({
                title: "Éxito",
                position: 'top-right',
                description: msg,
                status: "success",
                duration: 5000,
                isClosable: true,
                containerStyle: {
                    zIndex: 9,  
                    bg: 'white',
                 
            },
            
            });
        }
        if (error) {
            toast({
                title: "Error",
                description: error,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }, [msg, error, toast]);

    if (!userDetail) {
        return null;
    }
    const intereses = JSON.parse(userDetail.interes);

    const events = userDetail?.Events?.filter(event => event.tipo_evento === 'Conference');
    const speaker = userDetail?.rol === 'speaker';

    return (
        <>
            {isLoading ? (
                <div>cargando...</div>
            ) : (
                <Box>
                    <Container width='100vw' height='100vh' padding='5'>
                        <Box height='69vh'>
                            <Box>
                                <Center>
                                    <Image
                                        borderRadius='10px'
                                        objectFit="cover"
                                        width="343px"
                                        height="250px"
                                        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                                        alt="Caffe Latte"
                                    />
                                </Center>
                            </Box>
                            <Box paddingTop='4' textAlign='justify'>
                                <Heading size='20px'>{userDetail?.nombre} <strong>{userDetail?.apellido}</strong></Heading>
                            </Box>
                            <Box paddingTop='1' paddingBottom='2' textAlign='justify'>
                                <Text fontSize='14px'>{userDetail?.puesto_trabajo} de <strong>{userDetail?.nombre_empresa}</strong></Text>
                            </Box>
                            <Box padding="10px">
                                <Box display="flex" alignItems="center" justifyContent="start" mb="8px">
                                    <Box mr="10px">
                                        {linkedIn}
                                    </Box>
                                    <Text fontSize="14px">{userDetail?.linkedIn?.split('://')[1]}</Text>
                                </Box>
                                <Box display="flex" alignItems="center" justifyContent="start">
                                    <Box ml='2px' mr="10px">
                                        {mail}
                                    </Box>
                                    <Text fontSize="14px">{userDetail?.email}</Text>
                                </Box>
                            </Box>
                            <Box paddingTop='1' paddingBottom='2' textAlign='justify'>
                                <Heading size='16px'>Intereses</Heading>
                                <Box paddingTop='5' display='flex' flexWrap='wrap' justifyContent='space-evenly'>
                                    {intereses.map((interes, index) => (
                                        <Tag
                                            key={index}
                                            size='sm'
                                            w='143px'
                                            variant='outline'
                                            display='flex'
                                            justifyContent='center'
                                            colorScheme='gray'
                                            h='20px'
                                            px='8px'
                                            borderRadius='20px'
                                            marginBottom='4px' 
                                        >
                                            {interes}
                                        </Tag>
                                    ))}
                                </Box>
                            </Box>
                            {events && events.length > 0 && (
                                <Box className='BoxPonencia' paddingTop='1' paddingBottom='4' textAlign='justify'>
                                    <Heading size='16px'>Ponencia</Heading>
                                    <Text fontSize="14px">
                                        {events.map(filteredEvent => (
                                            <span key={filteredEvent.id}>
                                                <strong>{filteredEvent.titulo}:</strong>
                                                <br />
                                                {filteredEvent.descripcion}
                                                <br />
                                            </span>
                                        ))}
                                    </Text>
                                </Box>
                            )}
                        </Box>
                        <Center>
                            {speaker && (
                                <Box mt='30px' justifyContent='center' display='flex' paddingRight='16px' paddingLeft='16px' bottom='0'>
                                    <Button onClick={handleOneToOne} w='343px' h='48px' fontSize='16px' fontWeight='600' color='white' borderRadius='80px' bg='#0F8BA0'>
                                        Agendar one to one
                                    </Button>
                                </Box>
                            )}
                        </Center>
                    </Container>
                    <Footer />
                </Box>
            )}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Agendar One to One</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex justify="space-between">
                            <FormControl>
                                <FormLabel>Seleccionar hora</FormLabel>
                                <Select placeholder="Seleccionar hora" onChange={handleTimeChange}>
                                    <option value="10:00">10:00</option>
                                    <option value="11:00">11:00</option>
                                    <option value="12:00">12:00</option>
                                    <option value="13:00">13:00</option>
                                    <option value="14:00">14:00</option>
                                </Select>
                            </FormControl>
                            <FormControl ml={2}>
                                <FormLabel>Seleccionar día</FormLabel>
                                <Select placeholder="Seleccionar día" onChange={handleDayChange}>
                                    <option value="2024-06-24">24 de Junio</option>
                                    <option value="2024-06-25">25 de Junio</option>
                                </Select>
                            </FormControl>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                            Agendar
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UserDetail;