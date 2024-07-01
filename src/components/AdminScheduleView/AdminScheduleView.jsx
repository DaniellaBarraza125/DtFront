import { Box, Grid, GridItem, Heading, Flex, Divider, Center, IconButton, Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure, Text, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByDate } from '../../features/events/eventSlice';
import Event from '../Event/Event';
import Buttons from '../Buttons/Buttons';
import { AddIcon } from '@chakra-ui/icons';
import AddEvent from '../AddEvent/AddEvent';
import Tags from '../Tags/Tags';

const AdminScheduleView = () => {
    const { eventIsLoading, events } = useSelector((state) => state.event);
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const options = [
        { value: '2024-04-20', label: '23 de Mayo' },
        { value: '2024-05-15', label: '24 de Mayo' }
    ];

    const [activeDate, setActiveDate] = useState(options[0].value);

    useEffect(() => {
        dispatch(getByDate(activeDate));
    }, [dispatch, activeDate]);

    const handleButtonClick = (value) => {
        setActiveDate(value);
        dispatch(getByDate(value));
    };

    if (eventIsLoading) {
        return <h1>Cargando eventos...</h1>;
    }

    const eventosSalaPrincipal = events.filter(event => event.sala === 'Sala A');
    const eventosSalaWorkshop = events.filter(event => event.sala === 'Sala B');
    const tags = [
        { label: 'Todas', count: 10 },
        { label: 'One to One', count: 1 },
        { label: 'Matches', count: 5 },
    ]; 

    return (
        <Flex justifyContent="center">
            <Box borderRadius="1em" width="69vw" overflow="hidden">
                <Grid templateRows="auto 1fr" >
                    <Box>
                        <Box className='buttonsZone' position="relative" zIndex="2">
                            <Grid templateColumns="1fr 4fr 1fr" borderRadius="1em" position="sticky" top="0" zIndex="1" alignItems="end" justifyContent="center" height="12vh">
                                <GridItem display="flex" justifyContent="center" alignItems="center">
                                    <Box height='5vh' position='relative' zIndex={3} bg='#ededed' paddingTop="1em" paddingLeft="1em" paddingRight="1em" borderTopRadius='1.5em' width="100%">
                                        <Box marginLeft='15px'>
                                            <Buttons options={options} onClick={handleButtonClick} />
                                        </Box>
                                    </Box>
                                </GridItem>
                                <GridItem className='empty' display="flex" justifyContent="center" alignSelf='center' width='100%' height='25%' bg='white' borderLeftRadius='1.5em' borderRightRadius='1.5em' borderBottomRadius='5em' position='sticky' marginTop='10vh'>
                                    <Box textAlign="center"></Box>
                                </GridItem>
                                <GridItem display="flex" justifyContent="center" alignItems="center" bg='#ededed' width="100%" borderTopRadius="1.5em">
                                    <Box display="flex" justifyContent="center" alignItems="center" height='5vh' paddingTop="1em" paddingLeft="1em" paddingRight="1em">
                                        <Button
                                            fontSize='14px'
                                            color="#0F8BA0"
                                            bg="transparent"
                                            border="1px solid #0F8BA0"
                                            borderRadius="55px"
                                            height='3vh'
                                        >
                                            Añadir Ponencia
                                        </Button>
                                    </Box>
                                </GridItem>
                                <GridItem colSpan={3}>
                                    <Box className='fondo' bg='#ededed' width='100%' height='3vh' marginTop='-0.6vh'></Box>
                                    <Box className='fondo' bg='#ededed' height='3vh' marginTop='-0.6vh' w='100%' marginBottom='5px'>
                                        <Box width='300px' marginLeft='15px'>
                                            <Tags tags={tags} tagHoverColor="#0F8BA0" />
                                        </Box>
                                    </Box>
                                </GridItem>
                            </Grid>
                        </Box>
                        <Box height='615px' className='salas' marginTop={6}>
                            <GridItem bg='#ededed' flex="1" display="flex" flexDirection="row" overflow="hidden" width="100%" justifyContent='space-around' paddingBottom='15px'>
                                <Box bg='white' width='31vw' height='70vh' borderRadius='15px' margin='15px 1px' display="flex" flexDirection="column" alignItems="center" paddingX="1.5vw" paddingBottom='3vh' paddingTop='3vh'>
                                    <Box position="sticky" top="0" zIndex="1" width="100%">
                                        <Box display="flex" flexDirection="column" alignItems="center" borderBottom='1px black' width="100%" paddingTop="1.25em">
                                            <Center>
                                                <Heading size="md" paddingBottom="0.5em">Sala Principal - La font blanca</Heading>
                                            </Center>
                                            <Divider mb="1em" width="85%" />
                                            </Box>
                                    </Box>
                                    <Box flex="1" overflowY="scroll" paddingX='1em' width="100%" css={{
                                        '&::-webkit-scrollbar': {
                                            width: '0.5em',
                                        },
                                        '&::-webkit-scrollbar-track': {
                                            background: 'transparent',
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            background: '#C4C4C4',
                                            borderRadius: '1em',
                                        },
                                        '&::-webkit-scrollbar-thumb:hover': {
                                            background: '#A0A0A0',
                                        },
                                        '&::-webkit-scrollbar-button': {
                                            display: 'none',
                                        },
                                    }}>
                                        {eventosSalaPrincipal.map((event, i) => (
                                            <Event key={i} event={event} />
                                        ))}
                                    </Box>
                                </Box>
                                {eventosSalaWorkshop.length > 0 && (
                                    <Box bg='white' width='31vw' height='70vh' borderRadius='15px' margin='15px 1px' display="flex" flexDirection="column" alignItems="center" paddingX="1.5vw" paddingBottom='3vh' paddingTop='3vh'>
                                        <Box position="sticky" top="0" zIndex="1" width="100%">
                                            <Box display="flex" flexDirection="column" borderBottom='1px black' alignItems="center" width="100%" paddingTop="10px">
                                                <Center>
                                                    <Heading size="md" paddingBottom="0.5em">Sala Workshop - La Alcazaba</Heading>
                                                </Center>
                                                <Divider mb="1em" width="85%"  />
                                            </Box>
                                        </Box>
                                        <Box flex="1" overflowY="scroll" paddingX='1em' width="100%" css={{
                                            '&::-webkit-scrollbar': {
                                                width: '0.5em',
                                            },
                                            '&::-webkit-scrollbar-track': {
                                                background: 'transparent',
                                            },
                                            '&::-webkit-scrollbar-thumb': {
                                                background: '#C4C4C4',
                                                borderRadius: '1em',
                                            },
                                            '&::-webkit-scrollbar-thumb:hover': {
                                                background: '#A0A0A0',
                                            },
                                            '&::-webkit-scrollbar-button': {
                                                display: 'none',
                                            },
                                        }}>
                                            {eventosSalaWorkshop.map((event, i) => (
                                                <Event key={i} event={event} />
                                            ))}
                                        </Box>
                                    </Box>
                                )}
                            </GridItem>
                        </Box>
                    </Box>
                </Grid>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <AddEvent />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default AdminScheduleView;
