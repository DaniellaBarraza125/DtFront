import React, { useState, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { getUsersByRole } from '../../features/auth/authSlice';
import { getByDate } from '../../features/events/eventSlice';

const Buttons = ({ options }) => {
    const [activeButton, setActiveButton] = useState(options[0].value);
    const [selectedOption, setSelectedOption] = useState('');
    const dispatch = useDispatch();

    const handleClick = (value) => {
        console.log('value', value);
        setSelectedOption(value);
        setActiveButton(value)
        switch (true) {
            case value == 'user':
                dispatch(getUsersByRole('user'));
                break;
            case value == 'speaker':
                dispatch(getUsersByRole('speaker'));
                break;
            case value == '2024-04-20':
                console.log('2024-04-20 switch');
                dispatch(getByDate('2024-04-20'));
                break;
            case value == '2024-05-15':
                console.log('2024-05-15 switch');
                dispatch(getByDate('2024-05-15'));
                break;
        
            default:
                break;
        }
    };

    return (
        <Box backgroundColor='white' display='flex' justifyContent='space-around' padding={1} marginBottom='4' borderRadius='100' borderWidth='2px' borderColor='#0F8BA0' marginX="2">
        {options.map((option, i) => (
            <Button
                key={i}
                value={option.value}
                width='50%'
                borderRadius='100'
                backgroundColor={activeButton === option.value ? '#0F8BA0' : 'transparent'}
                color={activeButton === option.value ? 'white' : '#191919'}
                // variant={activeButton === option.value ? 'solid' : 'outline'}
                onClick={() => handleClick(option.value)}
            >
                {option.label}
            </Button>
        ))}
    </Box>
    );
};

export default Buttons;
