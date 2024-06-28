import React, { useEffect, useState } from 'react';
import { Box, Container, FormControl, Heading, Select, Tag, Text } from '@chakra-ui/react';
import SearchBar from '../SearchBar/SearchBar';
import Event from '../Event/Event';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../features/events/eventSlice';
import Footer from '../Footer/Footer';
import Buttons from '../Buttons/Buttons';
import Tags from '../Tags/Tags';

const Schedule = () => {
    const { eventIsLoading, events } = useSelector((state) => state.event);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAll());
    }, [dispatch]);

    const [selectedSala, setSelectedSala] = useState('');

    const handleSalaChange = (e) => {
        const sala = e.target.value;
        setSelectedSala(sala);
        getBySala(sala);
    };

    const getBySala = (sala) => {
        console.log(`Sala seleccionada: ${sala}`);
    };

    if (eventIsLoading) {
        return <h1>Cargando eventos...</h1>;
    }

    const options = [
        { value: '2024-05-23', label: '23 de Mayo' },
        { value: '2024-05-24', label: '24 de Mayo' }
    ];

    const tags = [
        { label: 'Todas', count: 10 },
        { label: 'One to One', count: 1 },
        { label: 'Matches', count: 5 }
    ];

    return (
        <>
            <Container maxW='md' height="100vh" overflow="hidden" display="flex" flexDirection="column" width='375px' >
            <Box padding={3}>
                    <Heading size='md'>PROGRAMACIÓN</Heading>
                </Box>
                <Box position="sticky" top="0" zIndex="1" backgroundColor="white" width='343px'>
                    <Buttons options={options}/>
                    <Box marginBottom={4}>
                        <FormControl isRequired mt={4}>
                            <Select
                                name='sala'
                                onChange={handleSalaChange}
                            >
                                <option value='sala1'>Sala Principal - La font blanca</option>
                                <option value='sala2'>Sala 2</option>
                            </Select>
                        </FormControl>
                    </Box>
                    <Tags tags={tags}/>
                </Box>
                <Box flex="1" overflowY="auto"width='100%'>
                    {events.map((event, i) => (
                        <Event key={i} event={event} />
                    ))}
                </Box>
            </Container>          
            <Footer/>
        </>
    );
};

export default Schedule;
