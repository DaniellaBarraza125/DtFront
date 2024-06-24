import React, { useEffect, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';


const Buttons = () => {

    const { eventIsLoading } = useSelector((state) => state.event);
    const dispatch = useDispatch();

   
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
  )
}

export default Buttons