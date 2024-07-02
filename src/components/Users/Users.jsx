import React, { useEffect } from 'react';
import { UserCard } from '../UserCard/UserCard';
import { Box, Button, Container, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, useDisclosure } from '@chakra-ui/react';
import Tags from '../Tags/Tags';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../features/auth/authSlice';
import Buttons from '../Buttons/Buttons';
import Footer from '../Footer/Footer';
import AddPartner from '../AddPartner/AddPartner';

const Users = ({ propUsers, hideButtons, hideFooter, height, deleteButton }) => {
	const dispatch = useDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { users: stateUsers, isLoading } = useSelector((state) => state.auth);

	useEffect(() => {
		if (!propUsers) {
			dispatch(getUsers());
		}
	}, [dispatch, propUsers]);

	const users = propUsers || stateUsers;

	const tags = [
		{ label: 'Todas', count: 10 },
		{ label: 'platinum', count: 1 },
		{ label: 'Gold', count: 5 },
	];

	const options = [
		{ value: 'user', label: 'Asistentes' },
		{ value: 'speaker', label: 'Partners' },
	];

	return (
		<Box height={height ? height : '100vh'} display='flex' flexDirection='column' marginTop={5} width='100%' onClick={onOpen}>
			<Container flex='1' display='flex' flexDirection='column' overflow='hidden'>
				<Box></Box>

				<Box position='sticky' top='0' zIndex='1' backgroundColor='white'>
					{!hideButtons && <Buttons options={options} />}
				</Box>
				<Box  width='305px' height='27px'alignContent='center'
				>
					<Tags tags={tags} />
				</Box>
				<Box width='100%' flex='1' overflowY='auto' paddingTop='2'>
					{isLoading ? (
						<p>Loading...</p>
					) : (
						<>
							{users.map((user) => (
								<>
								<UserCard key={user.id} user={user} />
								</>
							))}
						</>
					)}
				</Box>
				<Footer hideFooter={hideFooter}/>
			</Container>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalContent maxW='md' mx='auto' mt='10' p='6' borderWidth='1px' borderRadius='lg' boxShadow='lg'>
					<ModalBody>
						<ModalCloseButton />
						<AddPartner />
					</ModalBody>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default Users;
