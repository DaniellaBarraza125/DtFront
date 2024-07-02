import { Card, CardBody, Text, Stack, Heading, Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Event = ({ event }) => {

  const bdhour = event.hora_inicio;
  const [hour, minute] = bdhour.split(':');

  const formattedHour = `${hour}:${minute}`;

  return (
    <>
      <Box position='relative'width='80vw'  maxW='95%'paddingTop='10px'marginBottom='10px' >
        <Flex alignItems='center' maxW='md'>
          <Text flexShrink={0} px='4'>
            {formattedHour}
          </Text>
          <Box flex='1'>
            <Box h='1px' bg='primary.50' mt='-1px' mb='1px'/>
          </Box>
        </Flex>
      </Box>
      <Stack width='100%' minW='311px'>
        <Card borderRadius='15'   border='1px solid #E2E8F0' direction={{ base: 'row', sm: 'row' }} overflow='hidden' variant='outline' padding='5px' >
          <Stack>
            <Link to={`/eventDetail/${event.id}`}>
              <CardBody key={event.id}>
                <Heading fontSize='14px'>{event.titulo || 'Sin título'}</Heading>
                <Text fontSize='12px' py='2'>{event.User?.nombre} {event.User?.apellido } 
                  <br></br>{event.descripcion || 'Sin descripción'}</Text>  
              </CardBody>
            </Link>
          </Stack>
        </Card>
        <Box>

        </Box>
      </Stack>
    </>
  );
};

export default Event;
