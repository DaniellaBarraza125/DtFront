import { Box, Button, FormControl, FormLabel, Input, Select, VStack, HStack, Heading, Textarea } from '@chakra-ui/react';
import { useState } from 'react';

const generateTimeOptions = () => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const suffix = i < 12 ? 'am' : 'pm';
    const time = `${hour.toString().padStart(2, '0')}:00${suffix}`;
    times.push(
      <option key={time} value={time}>
        {time}
      </option>
    );
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleAddEvent = () => {
    // aquí va la lógica que queramos ejecutar al hacer clic en el botón
    console.log('Evento añadido:', formData);
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
        <HStack spacing="4" width="full">
          <FormControl id="start-time">
            <FormLabel>Inicio</FormLabel>
            <Select placeholder="Hora de inicio" value={formData.startTime} onChange={handleChange}>
              {generateTimeOptions()}
            </Select>
          </FormControl>
          <FormControl id="end-time">
            <FormLabel>Fin</FormLabel>
            <Select placeholder="Hora de fin" value={formData.endTime} onChange={handleChange}>
              {generateTimeOptions()}
            </Select>
          </FormControl>
        </HStack>
        <FormControl id="room">
          <FormLabel>Sala</FormLabel>
          <Select placeholder="Selecciona una sala" value={formData.room} onChange={handleChange}>
            <option value="meeting-room-1">Meeting Room 1</option>
            <option value="meeting-room-2">Meeting Room 2</option>
          </Select>
        </FormControl>
        <Button colorScheme="teal" size="md" width="auto" alignSelf="center" onClick={handleAddEvent}>
          Añadir
        </Button>
      </VStack>
    </Box>
  );
};

export default AddEvent;
