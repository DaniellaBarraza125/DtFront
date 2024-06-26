import { Card, CardBody, Text, Stack, Heading, Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Event = ({ event }) => {
  const { eventIsLoading } = useSelector((state) => state.event);

  if (eventIsLoading) {
    return <h1>wait</h1>;
  }

  const bdhour = event.hora_inicio;
  const [hour, minute] = bdhour.split(':');
  const formattedHour = `${hour}:${minute}`;
console.log(event);
  return (
    <>
      <Box position='relative'>
        <Flex alignItems='center' maxW='md'>
          <Text flexShrink={0} px='4'>
            {formattedHour}
          </Text>
          <Box flex='1'>
            <Box h='1px' bg='primary.50' mt='-1px' />
          </Box>
        </Flex>
      </Box>
      <Stack maxW='md'>
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
