import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  Center,
} from '@chakra-ui/react';
import { createFeedback } from '../../features/feedback/feedbackSlice';
import { getAll } from '../../features/events/eventSlice';
import { useDispatch, useSelector } from 'react-redux';

const Feedback = () => {
  const [ratings, setRatings] = useState({});
  const [improvement, setImprovement] = useState('');
  const dispatch = useDispatch();
  const { events } = useSelector(state => state.event);
  const { user, token } = useSelector((state) => state.auth);
  
  const { id } = JSON.parse(localStorage.getItem("user"));
  
  useEffect((id) => {
    dispatch(getAll(id));
  }, [dispatch, user, token]);

  const userEvents = events.filter(event => event.userId === id);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userFeedback = {
      ratings,
      improvement,
    };

    dispatch(createFeedback(userFeedback));
  };

  const handleRatingChange = (eventId, newRating) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [eventId]: newRating,
    }));
  };

  const renderRadioButtons = (eventId) => (
    <RadioGroup
      onChange={(value) => handleRatingChange(eventId, value)}
      value={ratings[eventId] || '0'}
    >
      <Stack direction="row" justify="center" spacing={5}>
        {[1, 2, 3, 4, 5].map((value, index) => (
          <Box key={value} textAlign="center">
            <Center
              as="label"
              w="50px"
              h="50px"
              borderWidth="2px"
              borderRadius="md"
              cursor="pointer"
              _checked={{
                bg: '#0F8BA0',
                color: 'white',
                borderColor: '#0F8BA0',
              }}
              _focus={{
                boxShadow: 'outline',
              }}
              _hover={{
                bg: '#0F8BA0',
                color: 'white',
                borderColor: '#0F8BA0',
              }}
              borderColor={ratings[eventId] === value.toString() ? '#0F8BA0' : 'gray.200'}
              bg={ratings[eventId] === value.toString() ? '#0F8BA0' : 'transparent'}
              color={ratings[eventId] === value.toString() ? 'white' : 'black'}
            >
              <Radio
                value={value.toString()}
                display="none"
              />
              {value}
            </Center>
            {index === 0 && (
              <Text fontSize="xs" mt={2}>
                Poco<br />interesante
              </Text>
            )}
            {index === 4 && (
              <Text fontSize="xs" mt={2}>
                Muy<br />interesante
              </Text>
            )}
          </Box>
        ))}
      </Stack>
    </RadioGroup>
  );

  return (
    <Container maxW="container.md" py={8}>
      <Box textAlign="center" mb={6}>
        <Heading as="h2" size="lg" mb={4}>
          Tu opinión nos ayuda a crecer
        </Heading>
        <Text
          fontFamily="Montserrat"
          fontSize="16px"
          fontWeight="400"
          lineHeight="19.5px"
          textAlign="center"
          color="#919191"
        >
          ¡Tu feedback es lo que nos ayuda a mejorar! Comparte con nosotros tus
          impresiones y sugerencias.
        </Text>
      </Box>

      {userEvents.map((event) => (
        <Box key={event.id} mb={6} textAlign="center">
          <Heading as="h3" size="md" mb={2}>
            {event.titulo}
          </Heading>
          <Text mb={4}>
            {event.userId}
          </Text>
          {renderRadioButtons(event.id)}
        </Box>
      ))}

      <Box as="form" onSubmit={handleSubmit} textAlign="center">
        <Text mb={2}>¿Hay algo que podríamos mejorar?</Text>
        <Textarea
          value={improvement}
          onChange={(e) => setImprovement(e.target.value)}
          placeholder="Descripción"
          mb={4}
          width="100%"
        />
        <Button
          colorScheme="teal"
          type="submit"
          width="343px"
          height="48px"
          padding="0px 16px"
          gap="8px"
          borderRadius="30px"
          opacity="1"
        >
          Enviar
        </Button>
      </Box>
    </Container>
  );
};

export default Feedback;
