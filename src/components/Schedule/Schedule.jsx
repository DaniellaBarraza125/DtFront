import React, { useEffect, useState } from 'react';
import { Box, Container, FormControl, Select } from '@chakra-ui/react';
import SearchBar from '../SearchBar/SearchBar';
import Event from '../Event/Event';
import { useDispatch, useSelector } from 'react-redux';
import { getAll, getByDate } from '../../features/events/eventSlice';
import Footer from '../Footer/Footer';
import Buttons from '../Buttons/Buttons';
import Tags from '../Tags/Tags';

const Schedule = () => {
	const { isLoading, events } = useSelector((state) => state.event);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getByDate('2024-05-15'));
	}, [dispatch]);

	console.log('events', events);

	const [selectedSala, setSelectedSala] = useState('');

	const handleSalaChange = (e) => {
		const sala = e.target.value;
		setSelectedSala(sala);
		getBySala(sala);
	};

	const getBySala = (sala) => {
		console.log(`Sala seleccionada: ${sala}`);
	};

	const options = [
		{ value: '2024-05-15', label: '25 de Junio' },
		{ value: '2024-04-20', label: '26 de Junio' },
	];

	const tags = [
		{ label: 'Todas', count: 10 },
		{ label: 'One to One', count: 1 },
		{ label: 'Matches', count: 5 },
	];

	return (
		<>
			<Container top='0' height='100vh' w='100%' m='0' padding='0' marginTop='6'>
				<Buttons options={options} />
				<Box marginBottom={4}>
					<FormControl isRequired mt={4}>
						<Select name='sala' onChange={handleSalaChange}>
							<option value='sala1'>Sala Principal - La font blanca</option>
							<option value='sala2'>Sala 2</option>
						</Select>
					</FormControl>
				</Box>

				<Tags tags={tags} />
				{isLoading ? (
					<p>Loading...</p>
				) : (
					<>
						{events.map((event, i) => (
							<Event key={i} event={event} />
						))}
					</>
				)}
			</Container>
			<Footer />
		</>
	);
};

export default Schedule;
