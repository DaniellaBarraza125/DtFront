import React, { useEffect } from 'react';
import { UserCard } from '../UserCard/UserCard';
import { Box, Container, Heading } from '@chakra-ui/react';
import Tags from '../Tags/Tags';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../features/auth/authSlice';
import Buttons from '../Buttons/Buttons';
import Footer from '../Footer/Footer';

const Users = ({ propUsers, hideButtons }) => {
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
        { label: 'One to One', count: 1 },
        { label: 'Matches', count: 5 }
    ];

    if (isLoading) {
        return <p>Loading...</p>;
    }
    const options = [
        { value: 'Asistentes', label: 'Asistentes' },
        { value: 'Partners', label: 'Partners' }
    ];

    return (
        <Box height='65vh' display="flex" flexDirection="column" marginTop={5} width='100%'>
            <Container flex="1" display="flex" flexDirection="column" overflow="hidden" >
       
                <Box position="sticky" top="0" zIndex="1" backgroundColor="white">
                   {!hideButtons && <Buttons options={options}/>}
                </Box>
                <Box>
                    <Tags tags={tags} />
                </Box>
                <Box width='100%' flex="1" overflowY="auto" paddingTop="2">
                    {users.map((user, i) => (
                        <UserCard key={i} user={user} />
                    ))}
                </Box>
                <Footer />
            </Container>
        </Box>
    );
}

export default Users;
