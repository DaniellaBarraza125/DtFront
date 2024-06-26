import { Box, Container, Grid, GridItem, Heading, Flex, Divider, Center, Button, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Stack, Text } from '@chakra-ui/react';
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
        console.log("Selected data:", value);
        setActiveDate(value);
        dispatch(getByDate(value));
    };

    if (eventIsLoading) {
        return <h1>Cargando eventos...</h1>;
    }

    const eventosSalaPrincipal = events.filter(event => event.sala === 'Sala A');
    const eventosSalaWorkshop = events.filter(event => event.sala === 'Sala B');

    return (
        <Flex justifyContent="center" p={6} bg="#e0e8f9" height="98vh">
            <Container maxW="80%" borderRadius="md" overflow="hidden">
                <Grid templateRows="auto 1fr" height="96%">
                    <GridItem position="sticky" top="0" zIndex="1" justifyContent='space-between'>
                        <Flex justifyContent='space-between' alignItems='center'>
                            <Box backgroundColor='secondary.white' display="flex" borderTopRadius='20px' justifyContent="flex-start" alignItems="center" paddingTop={2} paddingBottom={0}>
                                <Box paddingTop='5' paddingLeft='5' paddingRight='5' width='20vw' borderTopRadius='20px' border='5px' marginBottom={0} paddingBottom={0}>
                                    <Buttons options={options} onClick={handleButtonClick} />
                                </Box>
                            </Box>
                            <Flex alignItems="center" marginLeft={2}>
                                <IconButton
                                    icon={<AddIcon />}
                                    backgroundColor="white"
                                    borderRadius="50%"
                                    boxShadow="md"
                                    onClick={onOpen}
                                />
                                <Text marginLeft={2}>Añadir Evento</Text>
                            </Flex>
                        </Flex>        
                    </GridItem>
                
                    <GridItem bg='secondary.white' flex="1" display="flex" flexDirection="row" paddingTop='1' marginTop={0} overflowY="hidden" width="100%" borderBottomRadius='20px' borderRightRadius='20px'>
                        <Box className='dia1' width="50%" display="flex" flexDirection="column" alignItems="center">
                            <Box position="sticky" top="0" zIndex="1" width="100%">
                                <Box display="flex" flexDirection="column" alignItems="center" width="100%" paddingTop="5" paddingBottom="1">
                                    <Center>
                                        <Heading size="md">Sala Principal - La font blanca</Heading>
                                    </Center>
                                    <Divider mb={4} />
                                </Box>
                            </Box>
                            <Box flex="1" overflowY="auto" padding={4} width="100%">
                                {eventosSalaPrincipal.map((event, i) => (
                                    <Event key={i} event={event} />
                                ))}
                            </Box>
                        </Box>
                        {eventosSalaWorkshop.length > 0 && (
                            <Box className='dia2' width="50%" display="flex" flexDirection="column" alignItems="center">
                                <Box position="sticky" top="0" zIndex="1" width="100%">
                                    <Box display="flex" flexDirection="column" alignItems="center" width="100%" paddingTop="5" paddingBottom="1">
                                        <Center>
                                            <Heading size="md">Sala Workshop - La Alcazaba</Heading>
                                        </Center>
                                        <Divider mb={4} />
                                    </Box>
                                </Box>
                                <Box flex="1" overflowY="auto" padding={4} width="100%">
                                    {eventosSalaWorkshop.map((event, i) => (
                                        <Event key={i} event={event} />
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </GridItem>
                    <GridItem>
                        <Flex justify="flex-end" mt={4}>
                            <Button colorScheme="teal" size="lg">Publicar actualizaciones</Button>
                        </Flex>
                    </GridItem>
                </Grid>
            </Container>
            
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <AddEvent/>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default AdminScheduleView;
