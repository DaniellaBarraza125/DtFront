import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Center, Flex, Heading, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { getById, subscribeEvent, unsubscribeEvent } from '../../features/events/eventSlice';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Footer/Footer';
import { TimeIcon } from '@chakra-ui/icons';
import { MdOutlinePlace } from 'react-icons/md';

const EventDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { event, isLoading, eventError } = useSelector((state) => state.event);
    const [includeUser, setIncludeUser] = useState(false);

    const includesUser = () => {
        const asistentes = event.asistentes || [];
        const user = JSON.parse(localStorage.getItem('user')) || null;
        if (user) {
            const isUserIncluded = asistentes.includes(user.id);
            setIncludeUser(isUserIncluded);
        }
    }

    const subscribeOrNot = (eventId) => {
        if (includeUser) {
            dispatch(unsubscribeEvent(eventId));
        } else {
            dispatch(subscribeEvent(eventId));
        }
    }

    useEffect(() => {
        if (id) {
            dispatch(getById(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (event) {
            includesUser();
        }
    }, [event]);

    if (eventError) {
        return <div>Error: {eventError}</div>;
    }

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (!event) {
        return <div>No se encontró el evento</div>;
    }

    return (
        <>
            <Container width='100vw' height='100vh' padding='5'>
                <Box height='69vh'>
                    <Box paddingTop='4' paddingBottom='4' textAlign='justify'>
                        <Heading size='xl'>{event.titulo}</Heading>
                    </Box>
                    <Box paddingTop='1' paddingBottom='4' textAlign='justify'>
                        <Text>
                            {event.User.nombre} {event.User.apellido}
                        </Text>
                        <Text>
                            {event.User.puesto_trabajo}, {event.User.nombre_empresa}
                        </Text>
                    </Box>
                    <Box paddingTop='4' paddingBottom='4' textAlign='justify'>
                        <Text>{event.descripcion}</Text>
                    </Box>
                    <Box paddingTop='4' paddingBottom='4'>
                        <Flex alignItems='justify' gap='4'>
                            <TimeIcon /> <Text fontSize='sm'>{event.duracion_min} minutos</Text>
                        </Flex>
                        <Flex alignItems='justify' gap='4'>
                            <MdOutlinePlace />
                            <Text fontSize='sm'>{event.sala}</Text>
                        </Flex>
                    </Box>
                    <Box paddingTop='4' w='100%' paddingBottom='4'>
                        <Text>{event.tema}</Text>
                    </Box>
                </Box>
                <Center>
                    {!includeUser ? (
                        <Box w='100%' justifyContent='center' display='flex' paddingTop='4' paddingBottom='4' bottom='0'>
                            <Button w='90%' border='1px' onClick={() => subscribeOrNot(event.id)}>
                                Me interesa
                            </Button>
                        </Box>
                    ) : (
                        <Box w='100%' justifyContent='center' display='flex' paddingTop='4' paddingBottom='4' bottom='0'>
                            <Button w='90%' border='1px' onClick={() => subscribeOrNot(event.id)}>
                                Ya no me interesa
                            </Button>
                        </Box>
                    )}
                </Center>
            </Container>
            <Footer />
        </>
    );
};

export default EventDetail;
