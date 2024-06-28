import { Card, CardBody, Text, Stack, Heading, StackDivider, Divider, Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Event = ({ event }) => {

  const bdhour = event.hora_inicio;
  console.log('bdhour', bdhour);
  const [hour, minute] = bdhour.split(':');
  console.log('hour', hour);
  console.log('minute', minute);
  const formattedHour = `${hour}:${minute}`;

  return (
    <>
    <Box position='relative'>
      <Flex alignItems='center'>
        <Text flexShrink={0} px='4'>
          {formattedHour}
        </Text>
        <Divider flex='1' ml='4' borderColor='primary.50' />
      </Flex>
    </Box>
    <Stack maxW='md' > 
        <Card borderRadius='15' margin='2' border='2px' direction={{ base: 'row', sm: 'row' }} overflow='hidden' variant='outline'>
          <Stack>
            <Link to={`/eventDetail/${event.id}`}>  
              <CardBody key={event.id}>
                <Heading fontSize='large'>{event.titulo}</Heading>
                <Text fontSize='sm' py='2'>{event.descripcion}</Text>
                <Text fontSize='sm' py='2'>{event.hora}</Text>
                <Text py='2'>Ponente: {event.User?.nombre}</Text> 
              </CardBody>
            </Link>
          </Stack>
        </Card>
    </Stack>
    </>
  );
}

export default Event;
