	import React, { useState } from 'react';
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
		Text,
		useDisclosure,
	} from '@chakra-ui/react';
	import PanelInfo from '../PanelInfo/PanelInfo';
	import Users from '../Users/Users';
	import Partners from '../Partners/Partners';
	import AddPartner from '../AddPartner/AddPartner';

	const PanelAdmin = ({ hideFooter }) => {
		const { users } = useSelector((state) => state.auth);
		const {partners} = useSelector((state) => state.partner);
		const { isOpen, onOpen, onClose } = useDisclosure();
		const [componentToRender, setComponentToRender] = useState(null);

		const handleOpenModal = (component) => {
			setComponentToRender(component);
			onOpen();
		};

		// console.log(users);
		const asistentes = users.filter((user) => user.rol === 'user');
		const ponentes = users.filter((user) => user.rol === 'speaker');
		// const partners = users.filter((user) => user.rol === 'partner');
		console.log( "ponentes",ponentes);

		const renderComponent = () => {
		switch (componentToRender) {
		case 'partner':
			return <AddPartner />;
		case 'enviar':
			return (
			<Box>
				<Text>Enviar contenido</Text>
			</Box>
			);
		default:
			return null;
		}
	};

	return (
		<Box className='panelAdmin' height='90vh' display='flex' flexDirection='column' alignItems='center' paddingX='3rem'>
		<Box className='infoPanel'>
			<PanelInfo />
		</Box>
		<Box  flex='1' marginTop='-20px'display='flex' flexDirection='column' justifyContent='space-between' overflow='hidden' width='100%' height='100%'>
			<Box flex='1' display='flex' justifyContent='center' overflow='hidden' width='100%' height='100%'>
			<Box className='componentes' bg='#fbfbfb' borderRadius='20px' p={4} m={2} width='70%' boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)' height='98%'>
				<Flex direction='column'>
				<Box padding='16px' display='flex' flexDirection='column' alignItems='left' mb={1}>
					<Heading as='h2' size='md' textAlign='left' color='primary.50' mb={2}>
					Partners
					</Heading>
					<Box width='100%'>
					<Divider borderColor='black' />
					</Box>
				</Box>
				<Box display='flex' flexDirection='column' alignItems='end'>
					<>
					<Partners hideFooter={true} height='60vh' />
					<Button
						width='216px'
						height='10px'
						padding='30px'
						borderRadius='80'
						backgroundColor='#0F8BA0'
						color='white'
						position='relative'
						bottom='2.5rem'
						right='0'
						onClick={() => handleOpenModal('partner')}
						_hover={{ bg: '#0F8BA0' }}
					>
						Añadir
					</Button>
					</>
				</Box>
				</Flex>
			</Box>
			<Box className='componentes' bg='#fbfbfb' borderRadius='20px' p={4} m={2} width='70%' boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)' height='98%'>
				<Flex direction='column'>
				<Box padding='16px' display='flex' flexDirection='column' alignItems='left' mb={1}>
					<Heading as='h2' size='md' textAlign='left' color='primary.50' mb={2}>
					Asistentes
					</Heading>
					<Box width='100%'>
					<Divider borderColor='black' />
					</Box>
				</Box>
				<Box display='flex' flexDirection='column' alignItems='end'>
					{asistentes.length > 0 ? (
					<>
						<Users hideButtons={true} propUsers={asistentes} hideFooter={true} height='60vh' />
						<Button
						width='216px'
						height='10px'
						padding='30px'
						borderRadius='80'
						backgroundColor='#0F8BA0'
						_hover={{ bg: '#0F8BA0' }}
						color='white'
						position='relative'
						bottom='2.5rem'
						right='0'
						onClick={() => handleOpenModal('enviar')}
						>
						Enviar contenido
						</Button>
					</>
					) : (
					<Box textAlign='center' width='100%'>
						No hay asistentes disponibles.
					</Box>
					)}
				</Box>
				</Flex>
			</Box>
			<Box className='componentes' bg='#fbfbfb' borderRadius='20px' p={4} m={2} width='70%' boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)' height='98%'>
				<Flex direction='column'>
				<Box padding='16px' display='flex' flexDirection='column' alignItems='left' mb={1} height='20%'>
					<Heading as='h2' size='md' textAlign='left' color='primary.50' mb={2}>
					Ponentes
					</Heading>
					<Box width='100%'>
					<Divider borderColor='black' />
					</Box>
				</Box>
				<Box height='30%'>
					{ponentes.length > 0 ? (
					<Users hideButtons={true} propUsers={ponentes} hideFooter={true} height='60vh' deleteButton={true} />
					) : (
					<Box textAlign='center' width='100%'>
						No hay ponentes disponibles.
					</Box>
					)}
				</Box>
				</Flex>
			</Box>
			</Box>
			<Box className="zonaInf">
			</Box>
		</Box>
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalContent maxW='md' mx='auto' mt='10' p='6' borderWidth='1px' borderRadius='lg' boxShadow='lg'>
			<ModalBody>
				<ModalCloseButton />
				{renderComponent()}
			</ModalBody>
			</ModalContent>
		</Modal>
		</Box>
	);
	
	};

	export default PanelAdmin;
