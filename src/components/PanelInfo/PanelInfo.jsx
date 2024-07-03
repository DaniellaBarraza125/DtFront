import { Card, CardBody, Box, Text, Heading, Center, Grid, GridItem } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../features/auth/authSlice';
import { getAllPartners } from '../../features/partner/partnerSlice';

const PanelInfo = () => {
	const dispatch = useDispatch();
	const { users, isLoading, error } = useSelector((state) => state.auth);
  

	useEffect(() => {
		dispatch(getUsers());
		dispatch(getAllPartners());
	}, [dispatch]);

	if (error) {
		return <p>Error: {error}</p>;
	}

	return (
		<Box margin='10'>
			<Grid templateColumns='repeat(3, 1fr)' gap={6}>
				<GridItem>
					<Card width='20vw' maxW='350px'>
						<CardBody>
							<Center>
								<Heading size='xs'>Número de partners</Heading>
							</Center>
							<Box padding={4}>
								<Center>{isLoading ? <p>Loading...</p> : <Text>{users.filter(user => user.rol == 'partner').length}</Text>}</Center>
							</Box>
						</CardBody>
					</Card>
				</GridItem>
				<GridItem>
					<Card>
						<CardBody>
							<Center>
								<Heading size='xs'>Número de asistentes</Heading>
							</Center>
							<Box padding={4}>
              <Center>{isLoading ? <p>Loading...</p> : <Text>{users.filter(user => user.rol == 'user').length}</Text>}</Center>
							</Box>
						</CardBody>
					</Card>
				</GridItem>
				<GridItem>
					<Card>
						<CardBody>
            <Center>
								<Heading size='xs'>Número de ponentes</Heading>
							</Center>							<Box padding={4}>
              <Center>{isLoading ? <p>Loading...</p> : <Text>{users.filter(user => user.rol == 'speaker').length}</Text>}</Center>
							</Box>
						</CardBody>
					</Card>
				</GridItem>
			</Grid>
		</Box>
	);
};

export default PanelInfo;
