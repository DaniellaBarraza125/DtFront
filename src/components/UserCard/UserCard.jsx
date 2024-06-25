import { Card, CardBody, Text, Stack, Heading, Divider, Box, Image, Container, Center } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export const UserCard = ({ user }) => {
  console.log(user);
  return (
    <>
    
      <Container maxW="md" spacing={4}> 
      
      <Center>      
          <Divider flex='1' ml='4' borderColor='primary.50' paddingBottom='5'/>
        </Center>
        <Link to={`/eventDetail/${user.id}`}>
          <Container paddingTop='5' height='20vh' display='flex' justifyContent='space-between' alignContent='center'>
            <Box display="flex" direction="row" key={user.id}>
              <Box mr={4}>
                <Image
                  objectFit="cover"
                  width="30vw"
                  height="100%"
                  src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                  alt="Caffe Latte"
                />
              </Box>
              <Box display='flex' justifyContent='center' flexDirection='column'>
                <Heading fontSize="large">{user?.nombre} {user?.apellido}</Heading>
                <Text fontSize="sm" py="2">{user.puesto_trabajo}</Text>
                <Text fontSize="sm" py="2">{user.nombre_empresa}</Text>
              </Box>
            </Box>
          </Container>
        </Link>
      </Container>
    </>
  );
}

export default UserCard;
