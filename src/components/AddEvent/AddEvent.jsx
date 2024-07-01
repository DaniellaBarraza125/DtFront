import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  HStack,
  Heading,
  Textarea,
  RadioGroup,
  Radio,
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createEvent } from "../../features/events/eventSlice";

const generateTimeOptions = (events, room) => {
  const times = [];
  const reservedTimes = [];

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  events.forEach(event => {
    if (event.sala === room) {
      const start = timeToMinutes(event.hora_inicio);
      const end = timeToMinutes(event.hora_fin);
      for (let t = start; t < end; t += 5) { 
        reservedTimes.push(t);
      }
    }
  });

  for (let i = 9 * 60; i <= 24 * 60; i += 5) { 
    const hour = Math.floor(i / 60);
    const minute = i % 60;
    const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    
    if (!reservedTimes.includes(i)) {
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

const AddEvent = () => {
  const dispatch = useDispatch(); 

  const { id } = JSON.parse(localStorage.getItem("user"))

  const [formData, setFormData] = useState({
    tipo_evento: "Ponencia",
    userId: id,
    titulo: "",
    descripcion: "",
    interes: [],
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
    setFormData({ ...formData, [id]: value });
  };

  const handleInteresChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      interes: prevState.interes.includes(value) 
        ? prevState.interes.filter((interes) => interes !== value) 
        : [...prevState.interes, value]
    }));
  };

  const calculateDuration = (startTime, endTime) => {
    const timeToMinutes = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };
    const start = timeToMinutes(startTime);
    const end = timeToMinutes(endTime);
    return end > start ? end - start : 0;
  };
  

  useEffect(() => {
    if (formData.hora_inicio && formData.hora_fin) {
      const duration = calculateDuration(formData.hora_inicio, formData.hora_fin);
      setFormData(prevState => ({
        ...prevState,
        duracion_minutos: duration,
      }));
    }
  }, [formData.hora_inicio, formData.hora_fin]);

  const handleAddEvent = async () => {
    try {
      await dispatch(createEvent(formData));
      
      const newEvent = {
        ...formData,
        startTime: formData.hora_inicio,
        endTime: formData.hora_fin,
        room: formData.sala
      };
  
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
  
      setFormData({
        tipo_evento: "Ponencia",
        userId: id,
        titulo: "",
        descripcion: "",
        interes: [],
        sala: "",
        hora_inicio: "",
        hora_fin: "",
        tematica: "",
        duracion_minutos: 0,
        fecha: "",
        numero_asistentes: 0
      });
    } catch (error) {
      console.error("Error al añadir evento", error);
    }
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
        <FormControl id="tipo_evento">
          <FormLabel>Tipo de evento</FormLabel>
          <RadioGroup onChange={(value) => handleChange({ target: { id: 'tipo_evento', value } })} value={formData.tipo_evento}>
            <HStack spacing="4">
              <Radio value="Ponencia">Ponencia</Radio>
              <Radio value="Taller">Taller</Radio>
              <Radio value="Comida">Comida</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        
        
        {formData.tipo_evento !== "Comida" && (
          <>
            <FormControl>
              <FormLabel>Título</FormLabel>
              <Input type="text" id='titulo' placeholder="Tu título" value={formData.titulo} onChange={handleChange} />
            </FormControl>
          
            <FormControl>
              <FormLabel>Temática</FormLabel>
              <Input type="text" id='tematica' placeholder="Tu temática" value={formData.tematica} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Intereses</FormLabel>
              <Wrap>
                {interesOptions.map((interes) => (
                  <WrapItem key={interes}>
                    <Tag
                      size="lg"
                      borderRadius="full"
                      variant={formData.interes.includes(interes) ? "solid" : "outline"}
                      colorScheme={formData.interes.includes(interes) ? "teal" : "gray"}
                      onClick={() => handleInteresChange(interes)}
                      cursor="pointer"
                    >
                      <TagLabel>{interes}</TagLabel>
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </FormControl>
          </>
        )}
        
        <FormControl>
          <FormLabel>Descripción</FormLabel>
          <Textarea id="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} />
        </FormControl>

        <FormControl id="sala">
          <FormLabel>Sala</FormLabel>
          <Select placeholder="Selecciona una sala" value={formData.sala} onChange={handleChange}>
            <option value="1">Sala principal - La font blanca</option>
            <option value="2">Sala secundaria - Sala Workshop</option>
          </Select>
        </FormControl>
        <HStack spacing="4" width="full">
          <FormControl id="hora_inicio" isDisabled={!formData.sala}>
            <FormLabel>Inicio</FormLabel>
            <Select placeholder="Hora de inicio" value={formData.hora_inicio} onChange={handleChange}>
              {generateTimeOptions(events, formData.sala)}
            </Select>
          </FormControl>
          <FormControl id="hora_fin" isDisabled={!formData.sala}>
            <FormLabel>Fin</FormLabel>
            <Select placeholder="Hora de fin" value={formData.hora_fin} onChange={handleChange}>
              {generateTimeOptions(events, formData.sala)}
            </Select>
          </FormControl>
        </HStack>
       
        <FormControl>
          <FormLabel>Fecha</FormLabel>
          <Input type="date" id="fecha" placeholder="Fecha" value={formData.fecha} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Duración (minutos)</FormLabel>
          <Input type="number" id="duracion_minutos" placeholder="Duración" value={formData.duracion_minutos} onChange={handleChange} readOnly />
        </FormControl>
        <FormControl>
          <FormLabel>Número de asistentes</FormLabel>
          <Input type="number" id="numero_asistentes" placeholder="Número de asistentes" value={formData.numero_asistentes} onChange={handleChange} />
        </FormControl>
        <Button onClick={handleAddEvent} colorScheme="teal" size="lg" width="full">
          Añadir Evento
        </Button>
      </VStack>
    </Box>
  );
};

export default AddEvent;
