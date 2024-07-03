import React, { useEffect, useState } from 'react';
import { UserCard } from '../UserCard/UserCard';
import { Box, Container, Button, Text, useDisclosure, Center } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../features/auth/authSlice';
import { getMeetingByUser } from '../../features/meetings/meetingSlice';
import Buttons from '../Buttons/Buttons';
import Footer from '../Footer/Footer';

const Users = ({ propUsers, hideButtons, hideFooter, height, deleteButton, editButton }) => {
    const dispatch = useDispatch();
    const { users: stateUsers, isLoading, user } = useSelector((state) => state.auth);
    const { meetings } = useSelector((state) => state.meeting);

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
            dispatch(getMeetingByUser());
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
            if (meetings?.length === 0) {
                setNoMeetings(true);
                setFilteredUsers([]);
            } else {
                const oneToOneUsers = meetings?.map(meeting => meeting.Partner?.User).filter(user => user); 
                setFilteredUsers(oneToOneUsers);
            }
        } else if (tagValue === 'matches') {
            const filtered = users.filter((u) => u.tag === tagValue);
            setFilteredUsers(filtered);
        }
    };

    const matches = stateUsers.filter((stateUser) => {
        const match = stateUser.cluster == parseInt(user.cluster);
        return match;
    });

    const oneToOneUsers = meetings?.map(meeting => meeting.Partner?.User).filter(user => user);  
    console.log(oneToOneUsers);

    const tags = [
        { label: 'Todas', value: 'all', count: users?.length },
        { label: 'One to One', value: 'oneToOne', count: meetings?.length },
        { label: 'Matches', value: 'matches', count: matches?.length },
    ];

    return (
        <Box height={height ? height : '100vh'} display='flex' flexDirection='column'  width='100%' onClick={onOpen}>
            <Container flex='1' display='flex' flexDirection='column' overflow='hidden'>
                <Box></Box>

                <Box position='sticky' top='0' zIndex='1' backgroundColor='white'>
                    {!hideButtons && <Buttons options={options} />}
                </Box>
                <Box margin='10px' width='100%' height='27px' alignContent='center'>
                    <Box display="flex" justifyContent="space-around"  paddingY='7px'>
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
                                {tag.count !== undefined && <Text ml="5px">{tag.count}</Text>}
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
                                    {selectedTag === 'oneToOne' ? (
                                        <>
                                            {meetings?.map((meeting, i) => meeting.Partner?.User && (
                                                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} key={i}>
                                                    <UserCard user={meeting.Partner.User} />
                                                    <Box mt={1} ml='40px' pb='15px'>
                                                        <Text fontSize='sm' fontWeight='bold' color='gray.700'>
                                                            Fecha:
                                                            <Text as='span' fontWeight='normal' color='gray.600' ml={1}>
                                                                {new Date(meeting.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'long' })}
                                                            </Text>
                                                        </Text>
                                                        <Box display='flex' alignItems='center' mt={2}>
                                                            <Text fontSize='sm' fontWeight='bold' color='gray.700' mr={4}>
                                                                Hora de Inicio:
                                                                <Text as='span' fontWeight='normal' color='gray.600' ml={1}>
                                                                    {meeting.hora_inicio.slice(0, 5)}
                                                                </Text>
                                                            </Text>
                                                            <Text fontSize='sm' fontWeight='bold' color='gray.700'>
                                                                Duración:
                                                                <Text as='span' fontWeight='normal' color='gray.600' ml={1}>
                                                                    {(() => {
                                                                        const start = new Date(`1970-01-01T${meeting.hora_inicio}Z`);
                                                                        const end = new Date(`1970-01-01T${meeting.hora_fin}Z`);
                                                                        const diffMs = end - start;
                                                                        const diffMins = Math.floor(diffMs / 60000);
                                                                        const hours = Math.floor(diffMins / 60);
                                                                        const minutes = diffMins % 60;
                                                                        return ` ${minutes}m`;
                                                                    })()}
                                                                </Text>
                                                            </Text>
                                                        </Box>
                                                    </Box>


                                                </Box>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            {filteredUsers?.map((user, i) => (
                                                <UserCard key={i} user={user} editButton={editButton ? true: false}/>
                                            ))}
                                            {matches?.map((match, i) => (
                                                <UserCard key={i} user={user} />
                                            ))}
                                            {selectedTag === 'matches' && matches?.map((match, i) => (
                                                <UserCard key={i} user={match} />
                                            ))}
                                        </>
                                    )}
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

