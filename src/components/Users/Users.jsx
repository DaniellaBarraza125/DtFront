import React, { useEffect, useState } from 'react';
import { UserCard } from '../UserCard/UserCard';
import Buttons from '../Buttons/Buttons';
import { Container } from '@chakra-ui/react';
import Tags from '../Tags/Tags';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, getUsersByRole } from '../../features/auth/authSlice';
import Footer from '../Footer/Footer';

const Users = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUsersByRole('user'));
	}, [dispatch]);

	const { users, isLoading } = useSelector((state) => state.auth);
	const options = [
		{ value: 'user', label: 'Asistentes' },
		{ value: 'speaker', label: 'Partners' },
	];
	const tags = [
		{ label: 'Todas', count: 10 },
		{ label: 'One to One', count: 1 },
		{ label: 'Matches', count: 5 },
	];

	return (
        <>
		<Container top='0'  height="100vh" w='100%' m='0' padding='0' marginTop='6'>
			<Buttons options={options} />
            <Tags tags={tags} />
            {isLoading ? <p>Loading...</p> : (
                <>
                {users.map((user, i) => (
                    <UserCard key={i} user={user} />
                ))}
                </>
            )}
			<Footer />
		</Container>
        </>
	);
};

export default Users;
