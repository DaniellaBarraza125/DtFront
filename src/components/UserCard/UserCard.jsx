import { Card, CardBody, Text, Stack, Heading, StackDivider, Divider, Box, Flex, Avatar, Image } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const UserCard = ({user}) => {
  console.log(user);
  return (
    <>

    <Stack maxW='md' > 
        <Card borderRadius='15' margin='4' border='2px'  overflow='hidden' variant='outline'>
          <Stack>
            <Link to={`/eventDetail/${user.id}`}>  
              <CardBody display='flex' direction='row' key={user.id}>
              <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                alt='Caffe Latte'
              />
                <Heading fontSize='large'>{user?.nombre} {user?.apellido}</Heading>
                <Text fontSize='sm' py='2'>{user.puesto_trabajo}</Text>
                <Text fontSize='sm' py='2'>{user.nombre_empresa}</Text>
              </CardBody>
            </Link>
          </Stack>
        </Card>
    </Stack>
    </>
  )
}

export default UserCard

