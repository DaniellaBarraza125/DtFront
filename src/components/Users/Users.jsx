import React, { useEffect, useState } from 'react';
import { UserCard } from '../UserCard/UserCard';
import { Box, Container } from '@chakra-ui/react';
import Tags from '../Tags/Tags';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../features/auth/authSlice';
import Buttons from '../Buttons/Buttons';
import Footer from '../Footer/Footer';

const Users = ({ propUsers, hideButtons, hideFooter }) => {
    const dispatch = useDispatch();
    const { users: stateUsers, isLoading, user } = useSelector((state) => state.auth);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [noMeetings, setNoMeetings] = useState(false);

    useEffect(() => {
        if (!propUsers) {
            dispatch(getUsers());
        }
    }, [dispatch, propUsers]);

    useEffect(() => {
        setFilteredUsers(propUsers || stateUsers);
    }, [propUsers, stateUsers]);

    if (!stateUsers || !user) {
        return <p>Loading...</p>;
    }

    const users = propUsers || stateUsers;

    const tags = [
        { label: 'Todas', value: 'all' },
        { label: 'One to One', value: 'oneToOne' },
        { label: 'Matches', value: 'matches' },
    ];

    const options = [
        { value: 'user', label: 'Asistentes' },
        { value: 'speaker', label: 'Partners' },
    ];

    const handleTagClick = (tagValue) => {
        setNoMeetings(false);
        if (tagValue === 'all') {
            setFilteredUsers(users);
        } else if (tagValue === 'oneToOne') {
            if (user.meetings && user.meetings.length > 0) {
                const filtered = users.filter((u) => 
                    user.meetings.some((meeting) => meeting.userId === u.id)
                );
                if (filtered.length > 0) {
                    setFilteredUsers(filtered);
                } else {
                    setNoMeetings(true);
                    setFilteredUsers([]);
                }
            } else {
                setNoMeetings(true);
                setFilteredUsers([]);
            }
        } else if (tagValue === 'matches') {
            const filtered = users.filter((u) => u.tag === tagValue);
            setFilteredUsers(filtered);
        }
    };

    const matches = stateUsers.filter((stateUser) => {
        const match = stateUser.cluster === parseInt(user.cluster, 10);

        return match;
    });


    return (
        <Box height='100vh' display='flex' flexDirection='column' marginTop={5} width='100%'>
            <Container flex='1' display='flex' flexDirection='column' overflow='hidden'>
                <Box></Box>

                <Box position='sticky' top='0' zIndex='1' backgroundColor='white'>
                    {!hideButtons && <Buttons options={options} />}
                </Box>
                <Box margin='10px' width='305px' height='27px' alignContent='center'>
                    <Tags tags={tags} onClick={handleTagClick} />
                </Box>
                <Box width='100%' flex='1' overflowY='auto' paddingTop='2'>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {noMeetings ? (
                                <p>No tienes agendados One to One</p>
                            ) : (
                                <>
                                    {filteredUsers.map((user, i) => (
                                        <UserCard key={i} user={user} />
                                    ))}
                                    {matches.map((match, i) => (
                                        <UserCard key={i} user={match} />
                                    ))}
                                </>
                            )}
                        </>
                    )}
                </Box>
            </Container>
                <Footer hideFooter={hideFooter} />
        </Box>
    );
};

export default Users;
