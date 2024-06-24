import React, { useState, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';

const Buttons = ({ options }) => {
    const [activeButton, setActiveButton] = useState(options.length > 0 ? options[0].value : null);

    const handleClick = (value) => {
        setActiveButton(value === activeButton ? null : value);
    };

    useEffect(() => {
        setActiveButton(options.length > 0 ? options[0].value : null);
    }, [options]);

    return (
        <Box backgroundColor='azulito' display='flex' justifyContent='space-around' padding={1} marginBottom='4' borderRadius='100'>
            {options.map((option) => (
                <Button
                    key={option.value}
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
