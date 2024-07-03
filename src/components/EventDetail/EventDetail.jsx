import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Center, Flex, Heading, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { getById, subscribeEvent, unsubscribeEvent } from '../../features/events/eventSlice';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Footer/Footer';
import { TimeIcon } from '@chakra-ui/icons';
import { MdOutlinePlace } from 'react-icons/md';

const EventDetail = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { event, isLoading, eventError } = useSelector((state) => state.event);
	const [includeUser, setIncludeUser] = useState(false);

	const includesUser = () => {
		const asistentes = event.asistentes || [];
		const user = JSON.parse(localStorage.getItem('user')) || null;
		if (user) {
			const isUserIncluded = asistentes.includes(user.id);
			setIncludeUser(isUserIncluded);
		}
	};

	const subscribeOrNot = (eventId) => {
		if (includeUser) {
			dispatch(unsubscribeEvent(eventId));
		} else {
			dispatch(subscribeEvent(eventId));
		}
	};

	useEffect(() => {
		if (id) {
			dispatch(getById(id));
		}
	}, [id, dispatch]);

	useEffect(() => {
		if (event) {
			includesUser();
		}
	}, [event]);

	if (eventError) {
		return <div>Error: {eventError}</div>;
	}

	if (isLoading) {
		return <div>Cargando...</div>;
	}

	if (!event) {
		return <div>No se encontró el evento</div>;
	}

	return (
		<>
			<Container width='100vw' height='100vh' padding='5'>
				<Box height='69vh'>
					<Box paddingTop='4' paddingBottom='4' textAlign='justify'>
						<Heading color='#0F8BA0' size='xl'>
							{event.titulo}
						</Heading>
					</Box>
					<Box paddingTop='1' paddingBottom='4' textAlign='justify'>
						<Text as='b'>
							{event.User?.nombre} {event.User?.apellido}
						</Text>
						<Text as='b'>
							{event.User?.puesto_trabajo}, {event.User?.nombre_empresa}
						</Text>
					</Box>
					<Box paddingTop='4' paddingBottom='4' textAlign='justify'>
						<Text>{event.descripcion}</Text>
					</Box>
					<Box paddingTop='4' paddingBottom='4'>
						<Flex alignItems='center' gap='4' >
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4C7.121 4 3 8.121 3 13C3 17.879 7.121 22 12 22C16.879 22 21 17.879 21 13C21 8.121 16.879 4 12 4ZM12 20C8.206 20 5 16.794 5 13C5 9.206 8.206 6 12 6C15.794 6 19 9.206 19 13C19 16.794 15.794 20 12 20Z" fill="#656565"/>
<path d="M13 12V8.00002H11V14H17V12H13ZM17.284 3.70702L18.696 2.29102L21.706 5.29102L20.293 6.70802L17.284 3.70702ZM6.69804 3.70702L3.70804 6.70602L2.29004 5.29402L5.28004 2.29402L6.69804 3.70702Z" fill="#656565"/>
</svg>

							<Text fontSize='sm'>{event.duracion_min} minutos</Text>
						</Flex>
					</Box>
					<Box paddingTop='4' w='100%' paddingBottom='4'>
						<Text>{event.tema}</Text>
					</Box>
				</Box>
				<Center>
					{!includeUser ? (
						<Box w='100%' justifyContent='center' display='flex' paddingTop='4' paddingBottom='4' bottom='0'>
							<Button width='343px' height='48px' borderRadius='100' backgroundColor='#0F8BA0' color='white' onClick={() => subscribeOrNot(event.id)}>
								Me interesa
							</Button>
						</Box>
					) : (
						<Box w='100%' justifyContent='center' display='flex' paddingTop='4' paddingBottom='4' bottom='0'>
							<Button width='343px' height='48px' borderRadius='100' backgroundColor='#0F8BA0' color='white' onClick={() => subscribeOrNot(event.id)}>
								Ya no me interesa
							</Button>
						</Box>
					)}
				</Center>
			</Container>
			<Footer />
		</>
	);
};

export default EventDetail;
