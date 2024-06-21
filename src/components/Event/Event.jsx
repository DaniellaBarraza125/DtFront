import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const Event = ({event}) => {
    console.log(event);
  return (
    <Card
    direction={{ base: 'row', sm: 'row' }}
    overflow='hidden'
    variant='outline'
  >
    {/* <Image
      objectFit='cover'
      maxW={{ base: '100%', sm: '200px' }}
      src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
      alt='Caffe Latte'
    /> */}
  
    <Stack>
      <CardBody>
        <Heading size='s'>{event.titulo}</Heading>
        <Text fontSize='sm' py='2'>{event.tema}</Text>
        <Text fontSize='sm' py='2'>{event.hora}</Text>
        <Text py='2'>Ponente: {event.ponente}
      </Text> 
    
      </CardBody>

    </Stack>
  </Card>
  )
}

export default Event