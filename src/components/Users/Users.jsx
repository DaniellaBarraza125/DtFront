import React, { useEffect, useState } from 'react';
import { UserCard } from '../UserCard/UserCard';
import { Box, Container, Button, Text, useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../features/auth/authSlice';
import Buttons from '../Buttons/Buttons';
import Footer from '../Footer/Footer';
import AddPartner from '../AddPartner/AddPartner';

const Users = ({ propUsers, hideButtons, hideFooter, height, deleteButton, editButton }) => {
    const dispatch = useDispatch();
    const { users: stateUsers, isLoading, user } = useSelector((state) => state.auth);
	const { isOpen, onOpen, onClose } = useDisclosure();
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [noMeetings, setNoMeetings] = useState(false);
    const [selectedTag, setSelectedTag] = useState('all');

    const options = [
        { value: 'user', label: 'Asistentes' },
        { value: 'speaker', label: 'Partners' },
    ];

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

    const handleTagClick = (tagValue) => {
        setSelectedTag(tagValue);
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

    const tags = [
        { label: 'Todas', value: 'all', count: users.length },
        { label: 'One to One', value: 'oneToOne', count: user.meetings ? users.filter((u) => user.meetings.some((meeting) => meeting.userId === u.id)).length : 0 },
        { label: 'Matches', value: 'matches', count: users.filter((u) => u.tag === 'matches').length },
    ];

    return (
        <Box height={height ? height : '100vh'} display='flex' flexDirection='column' marginTop={5} width='100%' onClick={onOpen}>
            <Container flex='1' display='flex' flexDirection='column' overflow='hidden'>
                <Box></Box>
                <Box position='sticky' top='0' zIndex='1' backgroundColor='white' >
                    {!hideButtons && <Buttons options={options} />}
                </Box>
                <Box margin='10px' width='305px' height='27px' alignContent='center'>
                    <Box display="flex" justifyContent="space-around" marginBottom="20px"paddingTop='20px'>
                        {tags.map((tag, index) => (
                            <Button
                                key={index}
                                fontSize="10px"
                                h="15px"
                                alignItems="center"
                                paddingY="8px"
                                paddingX="8px"
                                bg={selectedTag === tag.value ? '#0F8BA0' : 'none'}
                                color={selectedTag === tag.value ? 'white' : 'black'}
                                border="1px"
                                borderColor={selectedTag === tag.value ? '#0F8BA0' : 'black'}
                                borderRadius="80px"
                                _hover={{ bg: '#0F8BA0', color: 'white', borderColor: '#0F8BA0' }}
                                _active={{ bg: '#0F8BA0', color: 'white', borderColor: '#0F8BA0' }}
                                onClick={() => handleTagClick(tag.value)}
                            >
                                <Text isTruncated minWidth="70%">{tag.label}</Text>
                                {tag.count && <Text ml="5px">{tag.count}</Text>}
                            </Button>
                        ))}
                    </Box>
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
                                        <UserCard key={i} user={user} editButton={editButton ? true: false}/>
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
