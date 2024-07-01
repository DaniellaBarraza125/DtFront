import { Box, Container, Grid, GridItem, Heading, Flex, Divider, Center, IconButton, Modal, ModalOverlay, ModalContent, ModalBody, ModalFooter, useDisclosure, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByDate } from '../../features/events/eventSlice';
import Event from '../Event/Event';
import Buttons from '../Buttons/Buttons';
import { AddIcon } from '@chakra-ui/icons';
import AddEvent from '../AddEvent/AddEvent';

const AdminScheduleView = () => {
    const { eventIsLoading, events } = useSelector((state) => state.event);
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const options = [
        { value: { "fecha": '2024-04-20 00:00:00' }, label: 'Día 21' },
        { value: { 'fecha': '2024-05-15 00:00:00' }, label: 'Día 20' }
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

    return (
        <Flex justifyContent="center" p="3vh" height="90vh">
            <Box borderRadius="1em"  width="65vw" heigth="70vh" overflow="hidden">
                <Grid templateRows="auto 1fr" height="100%">
                    <Box>
                        <Box className='buttonsZone' position="relative" zIndex="2">
                            <Grid templateColumns="1fr 4fr 1fr" borderRadius="1em" position="sticky" top="0" zIndex="1" alignItems="end" justifyContent="center" height="12vh">
                                <GridItem display="flex" justifyContent="center" alignItems="center">
                                    <Box height='5vh' position='relative' zIndex={3} bg='lightgray' paddingTop="1em" paddingLeft="1em" paddingRight="1em" borderTopRadius='1.5em' width="100%">
                                        <Buttons options={options} onClick={handleButtonClick} />
                                    </Box>
                                </GridItem>
                                <GridItem className='empty' display="flex" justifyContent="center" alignSelf='center' width='100%' height='25%' bg='white' borderLeftRadius='1.5em' borderRightRadius='1.5em' borderBottomRadius='5em' position='sticky' marginTop='10vh'>
                                    <Box textAlign="center"></Box>
                                </GridItem>
                                <GridItem display="flex" justifyContent="center" alignItems="center" bg='lightgray' width="100%" borderTopRadius="1.5em" >
                                    <Box display="flex" justifyContent="center" alignItems="center" height='5vh' paddingTop="1em" paddingLeft="1em" paddingRight="1em">
                                        <IconButton
                                            icon={<AddIcon />}
                                            backgroundColor="white"
                                            borderRadius="50%"
                                            boxShadow="md"
                                            size='xs'
                                            onClick={onOpen}
                                            marginRight='0.5em'
                                        />
                                        <Text>Añadir</Text>
                                    </Box>
                                </GridItem>
                                <GridItem colSpan={3}>
                                    <Box className='fondo' bg='lightgray' width='100%' height='3vh' marginTop='-0.6vh'>
                                    </Box>
                                </GridItem>
                            </Grid>
                        </Box>
                        <Box className='salas' >
                            <GridItem height='75vh' bg='lightgray' flex="1" display="flex" borderBottomRadius='25px' flexDirection="row" overflowY="hidden" width="100%" justifyContent='space-around'>
                                <Box  bg='white'  width='25vw' height='70vh' borderRadius='25px' margin='15px 1px'display="flex" flexDirection="column" alignItems="center">
                                    <Box position="sticky" top="0" zIndex="1" width="100%">
                                        <Box display="flex" flexDirection="column" alignItems="center" width="100%" paddingTop="1.25em">
                                            <Center>
                                                <Heading size="md">Sala Principal - La font blanca</Heading>
                                            </Center>
                                            <Divider mb="1em" />
                                        </Box>
                                    </Box>
                                    <Box flex="1" overflowY="auto" padding="1em" width="100%">
                                        {eventosSalaPrincipal.map((event, i) => (
                                            <Event key={i} event={event} />
                                        ))}
                                    </Box>
                                </Box>
                                {eventosSalaWorkshop.length > 0 && (
                                    <Box bg='white'  width='25vw' height='70vh' borderRadius='25px' margin='15px 1px' display="flex" flexDirection="column" alignItems="center">
                                        <Box position="sticky" top="0" zIndex="1" width="100%">
                                            <Box display="flex" flexDirection="column" alignItems="center" width="100%" paddingTop="1.25em" paddingBottom="0.25em">
                                                <Center>
                                                    <Heading size="md">Sala Workshop - La Alcazaba</Heading>
                                                </Center>
                                                <Divider mb="1em" />
                                            </Box>
                                        </Box>
                                        <Box flex="1" overflowY="auto" padding="1em" width="100%">
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
                    <ModalFooter />
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default AdminScheduleView;
