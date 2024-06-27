import { Box, Button, FormControl, FormLabel, Input, Select, VStack, HStack, Heading, Textarea, RadioGroup, Radio, Tag, TagLabel, Wrap, WrapItem } from '@chakra-ui/react';
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

  for (let i = 9 * 12; i <= 24 * 12; i++) { // Cambiado a intervalos de 5 minutos
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

const interesOptions = [
  'Accesibilidad', 'Analítica', 'Antiplagio', 'Certificación', 'Contenidos',
  'Generación de vídeo', 'Gestión de la formación', 'Herramientas del autor',
  'Inteligencia artificial', 'Laboratorios Virtuales', 'LMS Educativo', 
  'LMS Corporativo', 'Proctoring', 'Repositorio digital', 'Sistema de Gestión', 
  'Videoconferencia'
];

const AddWorkshop = () => {
  const [formData, setFormData] = useState({
    tipo_evento: "Ponencia",
    userId: "",
    titulo: "",
    descripcion: "",
    interes: "Accesibilidad",
    sala: "",
    hora_inicio: "",
    hora_fin: "",
    tematica: "",
    duracion_minutos: 0,
    fecha: "",
    numero_asistentes: 0
  });

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(id)
    setFormData({ ...formData, [id]: value });
    
  };

  const handleInterestChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      interes: prevState.interes.includes(value) 
        ? prevState.interes.filter((interest) => interest !== value) 
        : [...prevState.interes, value]
    }));
  };

  const handleAddEvent = () => {
    const updatedEvents = [...events, formData];
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setFormData({
       tipo_evento: "Ponencia",
    userId: "",
    titulo: "",
    descripcion: "",
    interes: "Accesibilidad",
    sala: "",
    hora_inicio: "",
    hora_fin: "",
    tematica: "",
    duracion_minutos: 0,
    fecha: "",
    numero_asistentes: 0
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
        Añade un evento
      </Heading>
      <VStack spacing="4">
        <FormControl id="eventType">
          <FormLabel>Tipo de evento</FormLabel>
          <RadioGroup onChange={(value) => handleChange({ target: { id: 'eventType', value } })} value={formData.eventType}>
            <HStack spacing="4">
              <Radio value="Ponencia">Ponencia</Radio>
              <Radio value="Taller">Taller</Radio>
              <Radio value="Comida">Comida</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Ponente</FormLabel>
          <Input type="text"  id="userId" placeholder="Ejemplo" value={formData.speaker} onChange={handleChange} />
        </FormControl>
        <FormControl >
          <FormLabel>Título</FormLabel>
          <Input type="text" id="titulo" placeholder="Ejemplo" value={formData.title} onChange={handleChange} />
        </FormControl>
        <FormControl >
          <FormLabel>Descripción</FormLabel>
          <Textarea id="descripcion" placeholder="Descripción" value={formData.description} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Intereses</FormLabel>
          <Wrap>
            {interesOptions.map((interest) => (
              <WrapItem key={interest}>
                <Tag
                  size="lg"
                  borderRadius="full"
                  variant={formData.interes.includes(interest) ? "solid" : "outline"}
                  colorScheme={formData.interes.includes(interest) ? "teal" : "gray"}
                  onClick={() => handleInterestChange(interest)}
                  cursor="pointer"
                >
                  <TagLabel>{interest}</TagLabel>
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </FormControl>
        <FormControl id="room">
          <FormLabel>Sala</FormLabel>
          <Select placeholder="Selecciona una sala" value={formData.room} onChange={handleChange}>
            <option value="Sala principal - La font blanca">Sala principal - La font blanca</option>
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

export default AddWorkshop;
