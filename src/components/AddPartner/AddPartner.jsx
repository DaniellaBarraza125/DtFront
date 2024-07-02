import { Flex, Box, Icon, Button, FormControl, FormLabel, Input, Select, VStack, Heading } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, getUsersByid } from '../../features/auth/authSlice';
import { addPartner, getPartnerById } from '../../features/partner/partnerSlice';

const AddPartner = ({ admin, id: idUser }) => {
	const { users, user, userDetail } = useSelector((state) => state.auth);
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredOptions, setFilteredOptions] = useState(users);
	const [id, setId] = useState(idUser);
	const dispatch = useDispatch();
	let editUser = {};
	useEffect(() => {
		setId(idUser);
		console.log('id', id);
		if (admin) {
			console.log('id en if', id);
			console.log('id', id);
			console.log('users', users);
			editUser = users.find((user) => user.id === id);
			console.log('edituser', editUser);
		}
	}, [dispatch]);

	console.log('admin', admin);
	const initialValues = {
		nombre_empresa: '',
		tipo_partnership: '',
		numero_meetings: 0,
		eventos_participados: 0,
		industria: '',
		importe_pagado: '',
		user_id: 0,
		pagado: 0,
	};
	const [formData, setFormData] = useState(initialValues);
	console.log('formdata', formData);

	useEffect(() => {
		setFormData(editUser);
	}, [useState]);

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormData({ ...formData, [id]: value });
	};

	const handleSavePartner = () => {
		const { numero_meetings, eventos_participados, importe_pagado } = formData;
		const numeroMeetingsToInt = parseInt(numero_meetings);
		const eventosParticipadosToInt = parseInt(eventos_participados);
		const importePagadoFormat = importe_pagado + '€';
		dispatch(
			addPartner({
				...formData,
				numero_meetings: numeroMeetingsToInt,
				eventos_participados: eventosParticipadosToInt,
				importe_pagado: importePagadoFormat,
			})
		);
		setFormData(initialValues);
		setSearchTerm('');
	};

	const handleKeyUp = async (event) => {
		if (event.key === 'Enter') {
			if (event.target.value.trim() !== '') {
				setFilteredOptions(users);
			}
			const searchValue = event.target.value.trim().toLowerCase();
			setSearchTerm(searchValue);
			const regex = new RegExp(searchValue, 'i');

			const filtered = users.filter((user) => {
				return typeof user.nombre === 'string' && regex.test(user.nombre);
			});
			setFilteredOptions(filtered);
		}
	};

	return (
		<>
			<Heading as='h2' size='md' mb='6' textAlign='center'>
				{admin ? 'Edita el partner' : 'Añade un nuevo partner'}
			</Heading>
			<VStack spacing='4'>
				<FormControl id='nombre_empresa' isRequired>
					<FormLabel>Nombre Empresa</FormLabel>
					<Input type='text' placeholder='Nombre Empresa' value={formData.nombre_empresa} onChange={handleChange} />
				</FormControl>
				<FormControl id='numero_meetings' isRequired>
					<FormLabel>Numero One to One disponibles</FormLabel>
					<Input type='text' placeholder='One to One disponibles' value={formData.numero_meetings} onChange={handleChange} />
				</FormControl>
				<FormControl id='eventos_participados' isRequired>
					<FormLabel>Numero de eventos en los que ha participado</FormLabel>
					<Input type='text' placeholder='Numero de eventos' value={formData.eventos_participados} onChange={handleChange} />
				</FormControl>
				<FormControl id='industria' isRequired>
					<FormLabel>Industria</FormLabel>
					<Input type='text' placeholder='Industria' value={formData.industria} onChange={handleChange} />
				</FormControl>
				<FormControl id='tipo_partnership' isRequired>
					<FormLabel>Tipo de partnership</FormLabel>
					<Select placeholder='Selecciona una opción' value={formData.tipo_partnership} onChange={handleChange}>
						<option value='platinum'>Platinum</option>
						<option value='golden'>Golden</option>
						<option value='silver'>Silver</option>
					</Select>
				</FormControl>
				<FormControl id='importe_pagado' isRequired>
					<FormLabel>Importe pagado</FormLabel>
					<Input type='text' placeholder='Importe pagado' value={formData.importe_pagado} onChange={handleChange} />
				</FormControl>
				<FormControl id='pagado' isRequired>
					<FormLabel>Pagado</FormLabel>
					<Select placeholder='Seleccione una opción' value={formData.pagado} onChange={handleChange}>
						<option value={1}>Pagado</option>
						<option value={0}>No pagado</option>
					</Select>
				</FormControl>
				<FormControl id='user_id' isRequired>
					<FormLabel>Representante</FormLabel>
					<Input
						type='text'
						placeholder='Pulsa Enter para buscar'
						value={searchTerm}
						onKeyUp={handleKeyUp}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<Select
						placeholder={formData.user_id != 0 ? formData.nombre + ' ' + formData.apellido : 'Selecciona una opción'}
						value={formData.user_id != 0 ? formData.user_id : 'Selecciona una opción'}
						onChange={handleChange}
					>
						{filteredOptions.map((user) => (
							<option key={user.id} value={user.id}>
								{user.nombre} {user.apellido}
							</option>
						))}
					</Select>
				</FormControl>
        {admin ? (<Button colorScheme='teal' size='md' width='auto' onClick={handleSavePartner}>
					Edita el partner
				</Button>) : (<Button colorScheme='teal' size='md' width='auto' onClick={handleSavePartner}>
					Añadir
				</Button>)}
				
			</VStack>
		</>
	);
};

export default AddPartner;
