import React, { useEffect, useState } from 'react';
import { Accordion, Box, Button, Center, Container, Flex, FormControl, Select, Tag, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import Event from '../Event/Event';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../features/events/eventSlice';
import theme from '../../themes/chakraTheme';
import Footer from '../Footer/Footer';

const Schedule = () => {
    const { eventIsLoading, events } = useSelector((state) => state.event);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAll());
    }, []);

    const [isButtonActive, setIsButtonActive] = useState(false);
    const [selectedSala, setSelectedSala] = useState('');

    const handleClick = () => {
        console.log('Buscando evento');
        setIsButtonActive(!isButtonActive);
    };

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
                <Box backgroundColor='azulito' display='flex' justifyContent='space-around' padding={1} marginBottom='4' borderRadius='100'>
                    <Button
                        width='50%'
                        borderRadius='100'
                        bg={isButtonActive ? 'white' : 'transparent'}
                        color={isButtonActive ? 'primary.50' : 'white'}
                        _active={{
                            bg: 'white',
                            transform: 'scale(0.98)',
                        }}
                        onClick={handleClick}
                    >
                        23 de Mayo
                    </Button>
                    <Button
                        width='50%'
                        borderRadius='100'
                        bg={isButtonActive ? 'transparent' : 'white'}
                        color={isButtonActive ? 'white' : 'black'}
                        onClick={handleClick}
                    >
                        24 de Mayo
                    </Button>
                </Box>
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
