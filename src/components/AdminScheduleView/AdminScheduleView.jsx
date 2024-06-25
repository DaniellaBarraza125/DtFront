import { Box, Container, Grid, GridItem, Heading, Flex, Divider, Center } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../features/events/eventSlice';
import Event from '../Event/Event';
import Buttons from '../Buttons/Buttons';

const AdminScheduleView = () => {
    const { eventIsLoading, events } = useSelector((state) => state.event);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAll());
    }, [dispatch]);

    const options = [
        { value: '2024-05-23', label: 'Día 23' },
        { value: '2024-05-24', label: 'Día 24' }
    ];

    if (eventIsLoading) {
        return <h1>Cargando eventos...</h1>;
    }

    return (
        <Flex justifyContent="center" p={4} bg="#e0e8f9" height="100vh">
            <Container maxW="80%" borderRadius="md" overflow="hidden">
                <Grid templateRows="auto 1fr" height="96%">
                    <GridItem position="sticky" top="0" zIndex="1">
                        <Flex>
                        <Box backgroundColor='secondary.white' display="flex" borderTopRadius='20px' justifyContent="flex-start" alignItems="center" py={2}>
                            <Box  paddingTop='5' paddingLeft='5' paddingRight='5' width='20vw'borderTopRadius ='20px' border='5px'>
                                <Buttons options={options} />
                            </Box>
                        </Box>
                    </Flex>        
                    </GridItem>
                
                    <GridItem bg='secondary.white'flex="1" display="flex" flexDirection="row" paddingTop='5'overflowY="hidden" width="100%" borderBottomRadius='20px' borderRightRadius='20px'>
                        <Box width="50%" display="flex" flexDirection="column">
                            <Box position="sticky" top="0" zIndex="1">
                                <Box alignItems="center" maxW="md" paddingTop="5" paddingBottom="1">
                                    <Center>
                                    <Heading size="md">Sala Principal - La font blanca</Heading>
                                    </Center>
                                    <Divider mb={4} />
                                </Box>
                            </Box>
                            <Box flex="1" overflowY="auto" padding={4}>
                                {events.map((event, i) => (
                                    <Event key={i} event={event} />
                                ))}
                            </Box>
                        </Box>
                        <Box width="50%" display="flex" flexDirection="column">
                            <Box position="sticky" top="0" zIndex="1">
                                <Box alignItems="center" maxW="md" paddingTop="5" paddingBottom="1">
                                    <Center>
                                    <Heading size="md">Sala Workshop - La Alcazaba</Heading>
                                    </Center>
                                    <Divider mb={4} />
                                </Box>
                            </Box>
                            <Box flex="1" overflowY="auto" padding={4}>
                                {events.map((event, i) => (
                                    <Event key={i} event={event} />
                                ))}
                            </Box>
                        </Box>
                    </GridItem>
                </Grid>
            </Container>
        </Flex>
    );
};

export default AdminScheduleView;
