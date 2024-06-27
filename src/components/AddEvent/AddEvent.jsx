import { Box, Button, FormControl, FormLabel, Input, Select, VStack, HStack, Heading, Textarea } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const generateTimeOptions = (events, room) => {
  const times = [];
  const reservedTimes = [];

  const timeToMinutes = (time) => {
    const [hourMinute, suffix] = time.split(/(am|pm)/);
    let [hours, minutes] = hourMinute.split(':').map(Number);
    if (suffix === 'pm' && hours !== 12) hours += 12;
    if (suffix === 'am' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  events.forEach(event => {
    if (event.room === room) {
      const start = timeToMinutes(event.startTime);
      const end = timeToMinutes(event.endTime);
      for (let t = start; t < end; t += 5) { 
        reservedTimes.push(t);
      }
    }
  });

  for (let i = 9 * 12; i <= 24 * 12; i++) { 
    const hour = Math.floor(i / 12);
    const minute = (i % 12) * 5;
    const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
    const minuteFormatted = minute.toString().padStart(2, '0');
    const suffix = hour < 12 || hour === 24 ? 'am' : 'pm';
    const time = `${hourFormatted.toString().padStart(2, '0')}:${minuteFormatted}${suffix}`;
    const minutesSinceMidnight = hour * 60 + minute;

    if (!reservedTimes.includes(minutesSinceMidnight)) {
      times.push(
        <option key={time} value={time}>
          {time}
        </option>
      );
    }
  }
  return times;
};

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    responsible: '',
    startTime: '',
    endTime: '',
    room: ''
  });

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleAddEvent = () => {
    const updatedEvents = [...events, formData];
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setFormData({
      title: '',
      description: '',
      responsible: '',
      startTime: '',
      endTime: '',
      room: ''
    });
  };

  return (
    <Box 
      maxW="md" 
      mx="auto" 
      mt="10" 
      p="6" 
      borderWidth="1px" 
      borderRadius="lg" 
      boxShadow="lg"
    >
      <Heading as="h2" size="md" mb="6" textAlign="center">
        Añade un nuevo evento
      </Heading>
      <VStack spacing="4">
        <FormControl id="title">
          <FormLabel>Título</FormLabel>
          <Input type="text" placeholder="Ejemplo" value={formData.title} onChange={handleChange} />
        </FormControl>
        <FormControl id="description">
          <FormLabel>Descripción</FormLabel>
          <Textarea placeholder="Descripción" value={formData.description} onChange={handleChange} />
        </FormControl>
        <FormControl id="responsible">
          <FormLabel>Encargado</FormLabel>
          <Input type="text" placeholder="Ejemplo" value={formData.responsible} onChange={handleChange} />
        </FormControl>
        <FormControl id="room">
          <FormLabel>Sala</FormLabel>
          <Select placeholder="Selecciona una sala" value={formData.room} onChange={handleChange}>
            <option value="meeting-room-1">Meeting Room 1</option>
            <option value="meeting-room-2">Meeting Room 2</option>
          </Select>
        </FormControl>
        <HStack spacing="4" width="full">
          <FormControl id="startTime" isDisabled={!formData.room}>
            <FormLabel>Inicio</FormLabel>
            <Select placeholder="Hora de inicio" value={formData.startTime} onChange={handleChange}>
              {generateTimeOptions(events, formData.room)}
            </Select>
          </FormControl>
          <FormControl id="endTime" isDisabled={!formData.room}>
            <FormLabel>Fin</FormLabel>
            <Select placeholder="Hora de fin" value={formData.endTime} onChange={handleChange}>
              {generateTimeOptions(events, formData.room)}
            </Select>
          </FormControl>
        </HStack>
        <Button colorScheme="teal" size="md" width="auto" alignSelf="center" onClick={handleAddEvent}>
          Añadir
        </Button>
      </VStack>
    </Box>
  );
};

export default AddEvent;
