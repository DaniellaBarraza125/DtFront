import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Divider, Flex, Heading } from '@chakra-ui/react';
import PanelInfo from '../PanelInfo/PanelInfo';
import Users from '../Users/Users';
import Partners from '../Partners/Partners';

const PanelAdmin = () => {
    const { users } = useSelector((state) => state.auth);

    const asistentes = users.filter(user => user.rol === 'Manager');
    const ponentes = users.filter(user => user.rol === 'Developer');

    return (
        <Box className='panelAdmin' height="90vh" display="flex" flexDirection="column" alignItems="center" padding={5}>
            <Box className='infoPanel' >
                <PanelInfo />
            </Box>
            <Box flex="1" display='flex' justifyContent='center' overflow="hidden" width='100%'>
            <Box className='componentes' bg='#f8f8f8' borderRadius='20px' p={4} m={2} width='70%'>
                    <Flex direction="column">
                        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                            <Heading as="h2" size="md" textAlign="center" color="primary.50" mb={2}>Partners</Heading>
                            <Box width="80%">
                                <Divider borderColor="black" />
                            </Box>
                        </Box>
                        <Box>
                            <Partners/>
                        </Box>
                    </Flex>
                </Box>
                <Box className='componentes' bg='#f8f8f8' borderRadius='20px' p={4} m={2} width='70%'>
                    <Flex direction="column">
                        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                            <Heading as="h2" size="md" textAlign="center" color="primary.50" mb={2}>Asistentes</Heading>
                            <Box width="80%">
                                <Divider borderColor="black" />
                            </Box>
                        </Box>
                        <Box >
                            {asistentes.length > 0 ? (
                                <Users users={asistentes} />
                            ) : (
                                <Box textAlign="center" width="100%">No hay asistentes disponibles.</Box>
                            )}
                        </Box>
                    </Flex>
                </Box>
                <Box className='componentes' bg='#f8f8f8' borderRadius='20px' p={4} m={2} width='70%'>
                    <Flex direction="column">
                        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                            <Heading as="h2" size="md" textAlign="center" color="primary.50" mb={2}>Ponentes</Heading>
                            <Box width="80%">
                                <Divider borderColor="black" />
                            </Box>
                        </Box>
                        <Box >
                            {ponentes.length > 0 ? (
                                <Users users={ponentes} />
                            ) : (
                                <Box textAlign="center" width="100%">No hay ponentes disponibles.</Box>
                            )}
                        </Box>
                    </Flex>
                </Box>
            
            </Box>
        </Box>
    );
}

export default PanelAdmin;
