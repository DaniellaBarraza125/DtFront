import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom';

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

      <CardBody key={event.id}>
      <Link to={`/eventDetail/${event.id}`}> go </Link>
        <Accordion allowToggle>
            <AccordionItem>
                  <Box as='span' flex='1' textAlign='left'>
                 <AccordionButton>
                    <Heading size='sm'>{event.titulo}</Heading>
                  <AccordionIcon />
                </AccordionButton>
                  </Box>

              <AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </AccordionPanel>
            </AccordionItem>
        </Accordion>

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