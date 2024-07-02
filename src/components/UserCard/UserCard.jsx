import { Card, CardBody, Text, Stack, Heading, Divider, Box, Image, Container, Center, Tag } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export const UserCard = ({ user }) => {
  return (
    <>
      <Container maxW="md" spacing={4}> 
      
    
        <Link to={`/userdetail/${user.id}`}>
        
          <Container  paddingX='0' paddingY='16px' display='flex' justifyContent='space-between' alignContent='center' borderTop='#718096 1px solid' >
            <Box display="flex" direction="row" w='343px' key={user.id} height='108px' >
              <Box mr={4}>
                <Image
                  borderRadius='10px'
                  objectFit="cover"
                  width="95px"
                  minW='95px'git 
                  height="108px"
                  src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                  alt="Caffe Latte"
                />
              </Box>
              <Box display='flex' justifyContent='center' flexDirection='column'>
                <Heading fontSize="14px">{user?.nombre} {user?.apellido}</Heading>
                <Text fontSize="12px" py="2">{user.puesto_trabajo}</Text>
                <Box className='Tags'>
                <Tag variant='outline' fontSize="12px" py="2" height='20px' borderRadius={12}>{user.nombre_empresa}</Tag>
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
