import React, { useState, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';

const Buttons = ({ options, onClick }) => {
    const [activeButton, setActiveButton] = useState(options[0].value);

    const handleClick = (value) => {
        setActiveButton(value);
        if (onClick) {
            onClick(value);
        }
    };

    useEffect(() => {
        setActiveButton(options[0].value);
    }, [options]);

    return (
        <Box backgroundColor='azulito' display='flex' justifyContent='space-around' padding={1} marginBottom='4' borderRadius='100'>
            {options.map((option) => (
                <Button
                    key={option.value.fecha}
                    value={option.value}
                    width='50%'
                    borderRadius='100'
                    bg={activeButton === option.value ? 'white' : 'transparent'}
                    color={activeButton === option.value ? 'primary.50' : 'white'}
                    _active={{
                        bg: 'white',
                        transform: 'scale(0.98)',
                    }}
                    onClick={() => handleClick(option.value)}
                >
                    {option.label}
                </Button>
            ))}
        </Box>
    );
};

export default Buttons;
