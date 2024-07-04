import React, { useEffect, useState } from 'react';
import { Box, Button, Container, FormControl, Heading, Select, Text } from '@chakra-ui/react';
import Event from '../Event/Event';
import { useDispatch, useSelector } from 'react-redux';
import { getAll, getByDate, getBySala } from '../../features/events/eventSlice';
import Footer from '../Footer/Footer';
import Buttons from '../Buttons/Buttons';
import Tags from '../Tags/Tags';
import { getMeetingByUser } from '../../features/meetings/meetingSlice';
import { getUsersByid } from '../../features/auth/authSlice';

const Schedule = ({ hideFooter, propEvents }) => {
	const { isLoading, events: eventState } = useSelector((state) => state.event);
	const { meetings } = useSelector((state) => state.meeting);
	const { users: stateUsers, isLoading: isLoadingAuth, user: userState } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [selectedTag, setSelectedTag] = useState('todas');
	const [noMeetings, setNoMeetings] = useState(false);
	const [filteredEvents, setFilteredEvents] = useState([]);
	const [matchesCount, setMatchesCount] = useState(0);

	const events = eventState;

	const user = JSON.parse(localStorage.getItem('user'));
	useEffect(() => {
		dispatch(getByDate('2025-06-25'));
		dispatch(getMeetingByUser());
		dispatch(getUsersByid(user.id));
	}, [dispatch]);

	useEffect(() => {
		setFilteredEvents(events);
		const intereses = JSON.parse(user.interes);
		const matches = intereses.reduce((acc, interes) => {
		  const match = events.filter(event => {
			const eventInteres = String(event.interes).trim().toLowerCase();
			const interesNormalized = String(interes).trim().toLowerCase();
			return eventInteres === interesNormalized;
		  });
		  return acc.concat(match);
		}, []);
	
		setMatchesCount(matches.length);
	  }, [events]);

	const handleSalaChange = (e) => {
		if (e.target.value == 'todas') {
			dispatch(getByDate('2025-06-25'));
		} else {
			const sala = e.target.value;
			dispatch(getBySala(sala));
		}
	};

	const options = [
		{ value: '2025-06-25', label: '25 de Junio' },
		{ value: '2025-06-26', label: '26 de Junio' },
	];

	const tags = [
		{ label: 'Todas', value: 'todas', count: events.length },
		{ label: 'One to One', value: 'oneToOne', count: meetings == undefined ? 0 : meetings.length },
		{ label: 'Matches', value: 'matches', count: matchesCount },
	];

	const handleTagClick = (tagValue) => {
		setSelectedTag(tagValue);
		setNoMeetings(false);
		if (tagValue === 'todas') {
			setFilteredEvents(events);
		} else if (tagValue === 'oneToOne') {
			if (meetings && meetings.length > 0) {
				const filtered = meetings;
				if (filtered.length > 0) {
					setFilteredEvents(filtered);
				} else {
					setNoMeetings(true);
					setFilteredEvents([]);
				}
			} else {
				setNoMeetings(true);
				setFilteredEvents([]);
			}
		} else if (tagValue === 'matches') {
			const intereses = JSON.parse(user.interes);
			const filtered = intereses.reduce((acc, interes) => {
				const matches = events.filter(event => {
				  const eventInteres = String(event.interes).trim().toLowerCase();
				  const interesNormalized = String(interes).trim().toLowerCase();
				  return eventInteres === interesNormalized;
				});
				return acc.concat(matches);
			  }, []);
			setFilteredEvents(filtered);
		}
	};

	return (
		<Box height='100vh'>
			<Container maxW='md' overflow='hidden' display='flex' flexDirection='column' width='375px'>
				<Box padding={3}>
					<Heading size='md'>PROGRAMACIÓN</Heading>
				</Box>
				<Box position='sticky' top='0' zIndex='1' backgroundColor='white' width='343px'>
					<Buttons options={options} />
					<Box marginBottom={4}>
						<FormControl isRequired mt={4}>
							<Select name='sala' onChange={handleSalaChange}>
								<option value='todas'>Todas</option>
								<option value='1'>Sala Principal - La font blanca</option>
								<option value='2'>Sala 2</option>
							</Select>
						</FormControl>
					</Box>
					<Box display='flex' justifyContent='space-between' marginX='20px'>					
						{tags.map((tag, index) => (
						<Button
							key={index}
							fontSize='10px'
							h='15px'
							alignItems='center'
							paddingY='8px'
							paddingX='8px'
							bg={selectedTag === tag.value ? '#0F8BA0' : 'none'}
							color={selectedTag === tag.value ? 'white' : 'black'}
							border='1px'
							borderColor={selectedTag === tag.value ? '#0F8BA0' : 'black'}
							borderRadius='80px'
							_hover={{ bg: '#0F8BA0', color: 'white', borderColor: '#0F8BA0' }}
							_active={{ bg: '#0F8BA0', color: 'white', borderColor: '#0F8BA0' }}
							onClick={() => handleTagClick(tag.value)}
						>
							<Text isTruncated minWidth='70%'>
								{tag.label}
							</Text>
							{tag.count && <Text ml='5px'>{tag.count}</Text>}
						</Button>
					))}
					</Box>

				</Box>
				<Box flex='1' overflowY='auto' width='100%'>
					{isLoading ? (
						<p>Loading...</p>
					) : (
						<>
							{filteredEvents.map((event, i) => (
								<Event key={i} event={event} />
							))}
						</>
					)}
				</Box>
			</Container>
			<Footer hideFooter={hideFooter} />
		</Box>
	);
};

export default Schedule;
