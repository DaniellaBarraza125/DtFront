import { Card, CardBody, Text, Stack, Heading, Divider, Box, Image, Container, Center, Tag, Button, Modal, ModalContent, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AddPartner from '../AddPartner/AddPartner';

export const UserCard = ({ user, editButton }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState(null);
	const dispatch = useDispatch();

  const handleOpenModal = (id) => {
		onOpen();
    setId(id)
	};

  return (
    <>
      <Container maxW="md" spacing={4}>
      {editButton && <Button onClick={()=> handleOpenModal(user.id)}>Edit</Button>}
      <Center>      
          <Divider flex='1' ml='4' borderColor='primary.50' paddingBottom='5' w='90%'/>
        </Center>
        <Link to={`/userdetail/${user.id}`}>
          <Container padding='0' paddingTop='5' height='20vh' display='flex' justifyContent='space-between' alignContent='center'>
            <Box display="flex" direction="row" key={user.id}>
              <Box mr={4}>
                <Image
                  borderRadius='10px'
                  objectFit="cover"
                  width="100%"
                  height="14vh"
                  src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                  alt="Caffe Latte"
                />
              </Box>
              <Box display='flex' justifyContent='center' flexDirection='column'>
                <Heading fontSize="md">{user?.nombre} {user?.apellido}</Heading>
                <Text fontSize="sm" py="2">{user.puesto_trabajo}</Text>
                <Box className='Tags'>
                <Tag variant='outline' fontSize="sm" py="2" borderRadius={12}>{user.nombre_empresa}</Tag>
                </Box>
              </Box>
            </Box>
        
          </Container>
        </Link>
        <Modal isOpen={isOpen} onClose={onClose}>
				<ModalContent maxW='md' mx='auto' mt='10' p='6' borderWidth='1px' borderRadius='lg' boxShadow='lg'>
					<ModalBody display={'flex'} flexDirection={'column'}>
						<ModalCloseButton />
						{<AddPartner admin={true} id={id}/>}
					</ModalBody>
				</ModalContent>
			</Modal>
      </Container>
    </>
  );
}

export default UserCard;
