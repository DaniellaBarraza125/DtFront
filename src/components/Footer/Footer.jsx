import { CalendarIcon } from '@chakra-ui/icons';
import { Box, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { PiUsers } from 'react-icons/pi';

const Footer = () => {
    return (
        <Box width='100%' position='fixed' bottom='0' bg='secondary.white' p={2}>
        <Flex justify='space-around' align='center'>
            <Button mx={2}>
            <CalendarIcon />
            </Button>
            <Button mx={2}>
            <PiUsers />
            </Button>
        </Flex>
        </Box>
    );
}

export default Footer;
