import React, { useEffect, useState } from 'react';
import { Box, Container, FormControl, Heading, Select} from '@chakra-ui/react';
import Event from '../Event/Event';
import { useDispatch, useSelector } from 'react-redux';
import { getAll, getByDate, getBySala } from '../../features/events/eventSlice';
import Footer from '../Footer/Footer';
import Buttons from '../Buttons/Buttons';
import Tags from '../Tags/Tags';

const Schedule = ({hideFooter}) => {
	const { isLoading, events } = useSelector((state) => state.event);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getByDate('2024-05-15'));
	}, [dispatch]);

	console.log('events', events);


	const handleSalaChange = (e) => {
		if(e.target.value == 'todas'){
			dispatch(getByDate('2024-05-15'));
		} else {
			const sala = e.target.value;
			dispatch(getBySala(sala));
		}
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
        <Box height="100vh">
            <Container maxW='md'   overflow="hidden" display="flex" flexDirection="column" width='375px' >
            <Box padding={3}>
                    <Heading size='md'>PROGRAMACIÓN</Heading>
                </Box>
                <Box position="sticky" top="0" zIndex="1" backgroundColor="white" width='343px'>
                    <Buttons options={options}/>
                    <Box marginBottom={4}>
                        <FormControl isRequired mt={4}>
                            <Select
                                name='sala'
                                onChange={handleSalaChange}
                            >
                                <option value='todas'>Todas</option>
                                <option value='1'>Sala Principal - La font blanca</option>
                                <option value='2'>Sala 2</option>
                            </Select>
                        </FormControl>
                    </Box>
                    <Tags tags={tags}/>
                </Box>
                <Box flex="1" overflowY="auto"width='100%'>
				{isLoading ? (
					<p>Loading...</p>
				) : (
					<>
						{events.map((event, i) => (
							<Event key={i} event={event} />
						))}
					</>
				)}
                </Box>

            </Container>          
				<Footer hideFooter={hideFooter}/>

        </Box>
    );
};

export default Schedule;
