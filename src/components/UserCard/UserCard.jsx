import { Card, CardBody, Text, Stack, Heading, Divider, Box, Image, Container, Center, Tag } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export const UserCard = ({ user }) => {
  return (
    <>
      <Container maxW="md" spacing={4}> 
        <Center>      
          <Divider flex='1' ml='4' borderColor='primary.50' paddingBottom='1'/>
        </Center>
        <Link to={`/eventDetail/${user.id}`}>
          <Container paddingTop='1' height='18vh' display='flex' justifyContent='center' alignItems='center'>
            <Box display="flex" direction="row" justifyContent='space-evenly' width='90%' alignItems="center" key={user.id}>
              <Box width='20vw'mr={4}maxWidth='100px'>
                <Image
                  borderRadius='10px'
                  objectFit="cover"
                  width="100%"
                  height="14vh"
                  src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                  alt="User Avatar"
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
      </Container>
    </>
  );
}

export default UserCard;
