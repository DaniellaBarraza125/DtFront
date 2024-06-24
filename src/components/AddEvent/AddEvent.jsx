import { Box, Button, FormControl, FormLabel, Input, Select, VStack, HStack, Heading, Textarea } from '@chakra-ui/react';

// Función para generar las opciones de tiempo en formato 12 horas
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
          <Input type="text" placeholder="Ejemplo" />
        </FormControl>
        <FormControl id="description">
          <FormLabel>Descripción</FormLabel>
          <Textarea placeholder="Descripción" />
        </FormControl>
        <FormControl id="responsible">
          <FormLabel>Encargado?? Responsable??</FormLabel>
          <Input type="text" placeholder="Ejemplo" />
        </FormControl>
        <HStack spacing="4" width="full">
          <FormControl id="start-time">
            <FormLabel>Inicio</FormLabel>
            <Select placeholder="Hora de inicio">
              {generateTimeOptions()}
            </Select>
          </FormControl>
          <FormControl id="end-time">
            <FormLabel>Fin</FormLabel>
            <Select placeholder="Hora de fin">
              {generateTimeOptions()}
            </Select>
          </FormControl>
        </HStack>
        <FormControl id="room">
          <FormLabel>Sala</FormLabel>
          <Select placeholder="Selecciona una sala">
            <option value="meeting-room-1">Meeting Room 1</option>
            <option value="meeting-room-2">Meeting Room 2</option>
          </Select>
        </FormControl>
        <Button colorScheme="teal" size="md" width="auto" alignSelf="center">
          Añadir
        </Button>
      </VStack>
    </Box>
  );
};

export default AddEvent;
