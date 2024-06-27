import React, { useState, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { getUsersByRole } from '../../features/auth/authSlice';

const Buttons = ({ options }) => {
    const [activeButton, setActiveButton] = useState('user');
    const [selectedOption, setSelectedOption] = useState('user');
    const dispatch = useDispatch();

    const handleClick = (value) => {
        console.log('value', value);
        setSelectedOption(value);
        dispatch(getUsersByRole(value));
        setActiveButton(value)
    };

    return (
        <Box backgroundColor='white' display='flex' justifyContent='space-around' padding={1} marginBottom='4' borderRadius='100' borderWidth='2px' borderColor='#0F8BA0' marginX="2">
        {options.map((option, i) => (
            <Button
                key={i}
                value={option.value}
                width='50%'
                borderRadius='100'
                bg={activeButton === option.value ? '#0F8BA0' : 'transparent'}
                color={activeButton === option.value ? 'white' : '#191919'}
                _active={{
                    bg: activeButton.button === option.value ? '#0F8BA0' : 'transparent',
                    color: activeButton === option.value ? 'white' : '#191919',
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
