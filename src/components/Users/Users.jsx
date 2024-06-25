import React, { useEffect } from 'react'
import { UserCard } from '../UserCard/UserCard'
import Buttons from '../Buttons/Buttons'
import { Box, Container } from '@chakra-ui/react';
import Tags from '../Tags/Tags';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../features/auth/authSlice';
import Footer from '../Footer/Footer';

const Users = () => {
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const { users, isLoading } = useSelector((state) => state.auth);

    const options = [
        { value: 'asistentes', label: 'Asistentes' },
        { value: 'partners', label: 'Partners' }
    ]; 

    const tags = [
        { label: 'Todas', count: 10 },
        { label: 'One to One', count: 1 },
        { label: 'Matches', count: 5 }
    ];

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <Box height="100vh" display="flex" flexDirection="column">
            <Container maxW='md' flex="1" display="flex" flexDirection="column" overflow="hidden">
                <Box position="sticky" top="0" zIndex="1" backgroundColor="white">
                    <Buttons options={options} />
                    <Tags tags={tags} />
                </Box>
                <Box flex="1" overflowY="auto" paddingTop="2">
                    {users.map((user, i) => (
                        <UserCard key={i} user={user} />
                    ))}
                </Box>
            </Container>
            <Footer />
        </Box>
    )
}

export default Users;
