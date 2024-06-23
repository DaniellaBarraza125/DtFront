import React from 'react';
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text, IconButton, Container } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const events = [
    {
        id: 1,
        titulo: "Introducción a la Programación",
        ponente: "Juan Pérez",
        hora: "10:00 AM",
        tema: "Programación Básica"
    },
    {
        id: 2,
        titulo: "Desarrollo Web Avanzado",
        ponente: "María García",
        hora: "11:30 AM",
        tema: "Desarrollo Web"
    },
    {
        id: 3,
        titulo: "Inteligencia Artificial y Machine Learning",
        ponente: "Carlos Rodríguez",
        hora: "2:00 PM",
        tema: "IA y Machine Learning"
    },
    {
        id: 4,
        titulo: "Desarrollo de Aplicaciones Móviles",
        ponente: "Lucía Martínez",
        hora: "3:30 PM",
        tema: "Aplicaciones Móviles"
    },
    {
        id: 5,
        titulo: "Ciberseguridad en la Era Digital",
        ponente: "Ana López",
        hora: "5:00 PM",
        tema: "Ciberseguridad"
    }
];

const EventDetail = () => {
    const { id } = useParams();

    // esto imita el axios  de getEventById asi no hago back
    const event = events.find(event => event.id === parseInt(id));

    if (!event) {
        return <div>Evento no encontrado</div>;
    }

    return (
        <Container maxW='md' padding='4'>   
        <Card maxW='md'>
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name={event.ponente} src='https://bit.ly/sage-adebayo' />
                        <Box>
                            <Heading size='sm'>{event.ponente}</Heading>
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
