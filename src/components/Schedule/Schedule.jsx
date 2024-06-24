import React, { useEffect, useState } from 'react';
import { Box, Container, FormControl, Select, Tag, Text } from '@chakra-ui/react';
import SearchBar from '../SearchBar/SearchBar';
import Event from '../Event/Event';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../features/events/eventSlice';
import Footer from '../Footer/Footer';
import Buttons from '../Buttons/Buttons';

const Schedule = () => {
    const { eventIsLoading, events } = useSelector((state) => state.event);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAll());
    }, []);

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

    return (
        <>
            <SearchBar />
            <Container maxW='md' paddingTop='1'>
                <Buttons/>
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
                <Box  marginBottom={4} display='flex' justifyContent='space-around'>
                    <Tag fontSize='10px' padding={2} width='20%' justifyContent='space-between' bg='none' border='2px'>
                        <Text  isTruncated maxWidth='70%'>Todas</Text>  
                        <Text>10</Text>
                    </Tag>
                    <Tag fontSize='10px' padding={2} width='20%' justifyContent='space-between' bg='none' border='2px'>
                        <Text isTruncated  maxWidth='70%'>One to One</Text>  
                        <Text>1</Text>
                    </Tag>
                    <Tag fontSize='10px' padding={2} width='20%' justifyContent='space-between' bg='none' border='2px'>
                        <Text isTruncated maxWidth='70%'>Matches</Text>  
                        <Text>5</Text>
                    </Tag>
                </Box>
                {events.map((event, i) => (
                    <Event key={i} event={event} />
                ))}
               
                </Container>          
                <Footer/>
        </>
    );
};

export default Schedule;
