import React, { useEffect } from 'react';
import { UserCard } from '../UserCard/UserCard';
import { Box, Container, Heading } from '@chakra-ui/react';
import Tags from '../Tags/Tags';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../features/auth/authSlice';
import Buttons from '../Buttons/Buttons';
import Footer from '../Footer/Footer';

const Users = ({ propUsers, hideButtons, hideFooter }) => {
	const dispatch = useDispatch();
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
		<Box height='100vh' display='flex' flexDirection='column' marginTop={5} width='100%'>
			<Container flex='1' display='flex' flexDirection='column' overflow='hidden'>
				<Box></Box>

				<Box position='sticky' top='0' zIndex='1' backgroundColor='white'>
					{!hideButtons && <Buttons options={options} />}
				</Box>
				<Box  margin='10px' width='305px' height='27px'alignContent='center'
				>
					<Tags tags={tags} />
				</Box>
				<Box width='100%' flex='1' overflowY='auto' paddingTop='2'>
					{isLoading ? (
						<p>Loading...</p>
					) : (
						<>
							{users.map((user, i) => (
								<UserCard key={i} user={user} />
							))}
						</>
					)}
				</Box>
				<Footer hideFooter={hideFooter}/>
		
			</Container>
		</Box>
	);
};

export default Users;
