import React, { useEffect } from 'react';
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text, IconButton, Container } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { getById } from '../../features/events/eventSlice';
import { useDispatch, useSelector } from 'react-redux';

const EventDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { event, eventIsLoading, eventError } = useSelector((state) => state.event);

    useEffect(() => {
        if (id) {
            dispatch(getById(id));
            return () => {
                dispatch(reset());
            };
        }
    }, [id, dispatch]);

    if (eventIsLoading) {
        return <div>cargando...</div>;
    }

    if (eventError) {
        return <div>Error: {eventError}</div>;
    }

    if (!event) {
        return <div>No se encontró el evento</div>;
    }

    return (
        <Container maxW='md' padding='4'>
            <Card maxW='md'>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name={event.User?.nombre} src='https://bit.ly/sage-adebayo' />
                            <Box>
                                <Heading size='sm'>{event.User?.nombre}</Heading>
                                <Text>{event.titulo}</Text>
                            </Box>
                        </Flex>
                        <IconButton
                            variant='ghost'
                            colorScheme='gray'
                            aria-label='See menu'
                            icon={<i className="fas fa-ellipsis-h"></i>}
                        />
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Text fontSize='sm'>{event.hora}</Text>
                    <Text>{event.tema}</Text>
                </CardBody>
                <CardFooter
                    justify='space-between'
                    flexWrap='wrap'
                    sx={{
                        '& > button': {
                            minW: '125px',
                        },
                    }}
                >
                    <Button flex='1' variant='ghost'>Like</Button>
                    <Button flex='1' variant='ghost'>Comment</Button>
                    <Button flex='1' variant='ghost'>Share</Button>
                </CardFooter>
            </Card>
        </Container>
    );
};

export default EventDetail;
