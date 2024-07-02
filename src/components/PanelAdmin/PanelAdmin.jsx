import React from 'react';
import { useSelector } from 'react-redux';
import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import PanelInfo from '../PanelInfo/PanelInfo';
import Users from '../Users/Users';
import Partners from '../Partners/Partners';
import AddPartner from '../AddPartner/AddPartner';

const PanelAdmin = () => {
    const { users } = useSelector((state) => state.auth);

	// console.log(users);
	const asistentes = users.filter((user) => user.rol === 'user');
	const ponentes = users.filter((user) => user.rol === 'speaker');
	const partners = users.filter((user) => user.rol === 'partner');
    console.log( ponentes);

    return (
        <Box className='panelAdmin' height="90vh" display="flex" flexDirection="column" alignItems="center" padding={5}>
            <Box className='infoPanel' >
                <PanelInfo />
            </Box>
            <Box flex="1" display='flex' justifyContent='center' overflow="hidden" width='100%'>
            <Box className='componentes' bg='#f8f8f8' borderRadius='20px' p={4} m={2} width='70%'>
                    <Flex direction="column">
                        <Box padding='16px'  display="flex" flexDirection="column" alignItems="left" mb={1}>
                            <Heading as="h2" size="md" textAlign='left' color="primary.50" mb={2}>Partners</Heading>
                            <Box width="100%">
                                <Divider borderColor="black" />
                            </Box>
                        </Box>
                        <Box overflowY="scroll" paddingX='1em' width="100%" css={{
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
                            <Partners  />
                        </Box>
                    </Flex>
                </Box>
                <Box className='componentes' bg='#f8f8f8' borderRadius='20px' p={4} m={2} width='70%' >
                    <Flex direction="column">
                        <Box  padding='16px'  display="flex" flexDirection="column" alignItems="left" mb={1}>
                            <Heading as="h2" size="md" textAlign="left" color="primary.50" mb={2}>Asistentes</Heading>
                            <Box width="100%">
                                <Divider borderColor="black" />
                            </Box>
                        </Box>
                        <Box >
                            {asistentes.length > 0 ? (
                                <Users hideButtons={true} users={asistentes} hideFooter={true}/>
                            ) : (
                                <Box textAlign="center" width="100%">No hay asistentes disponibles.</Box>
                            )}
                        </Box>
                    </Flex>
                </Box>
                <Box className='componentes' bg='#f8f8f8' borderRadius='20px' p={4} m={2} width='70%'>
                    <Flex direction="column">
                        <Box padding='16px'  display="flex" flexDirection="column" alignItems="left" mb={1}>
                            <Heading as="h2" size="md" textAlign="left" color="primary.50" mb={2}>Ponentes</Heading>
                            <Box width="100%">
                                <Divider borderColor="black" />
                            </Box>
                        </Box>
                        <Box >
                            {ponentes.length > 0 ? (
                                <Users hideButtons={true}  users={ponentes} hideFooter={true}/>
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
