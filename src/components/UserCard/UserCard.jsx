import { Card, CardBody, Text, Stack, Heading, StackDivider, Divider, Box, Flex, Avatar } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const UserCard = ({user}) => {
  console.log(user);
  return (
    <>

    <Stack maxW='md' > 
        <Card borderRadius='15' margin='4' border='2px' direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
          <Stack>
            <Link to={`/eventDetail/${user.id}`}>  
              <CardBody key={user.id}>
                <Avatar shape='square' size='lg' name={user.nombre} src={user.foto} />
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

