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
  Checkbox,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createEvent } from "../../features/events/eventSlice";

const generateTimeOptions = (events, room) => {
  const times = [];
  const reservedTimes = [];

  const timeToMinutes = (time) => {
    const [hourMinute, suffix] = time.split(/(am|pm)/);
    let [hours, minutes] = hourMinute.split(":").map(Number);
    if (suffix === "pm" && hours !== 12) hours += 12;
    if (suffix === "am" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  events.forEach((event) => {
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
    const minuteFormatted = minute.toString().padStart(2, "0");
    const suffix = hour < 12 || hour === 24 ? "am" : "pm";
    const time = `${hourFormatted
      .toString()
      .padStart(2, "0")}:${minuteFormatted}${suffix}`;
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

const interestsList = [
  "Accesibilidad",
  "Analítica",
  "Antiplagio",
  "Certificación",
  "Contenidos",
  "Generación de vídeo",
  "Gestión de la formación",
  "Herramientas del autor",
  "Inteligencia artificial",
  "Laboratorios Virtuales",
  "LMS Educativo",
  "LMS Corporativo",
  "Proctoring",
  "Repositorio digital",
  "Sistema de Gestión",
  "Videoconferencia",
];

const PonenciaWorkshopForm = ({
  formData,
  handleChange,
  generateTimeOptions,
  events,
  handleInterestChange,
}) => (
  <>
    <FormControl id="ponente">
      <FormLabel>Ponente</FormLabel>
      <Input
        type="text"
        placeholder="Ejemplo"
        value={formData.ponente}
        onChange={handleChange}
      />
    </FormControl>
    <FormControl id="title">
      <FormLabel>Título</FormLabel>
      <Input
        type="text"
        placeholder="Ejemplo"
        value={formData.title}
        onChange={handleChange}
      />
    </FormControl>
    <FormControl id="description">
      <FormLabel>Descripción</FormLabel>
      <Textarea
        placeholder="Descripción"
        value={formData.description}
        onChange={handleChange}
      />
    </FormControl>
    <FormControl id="interests">
      <FormLabel>Intereses</FormLabel>
      <Wrap spacing={2}>
        {interestsList.map((interest) => (
          <WrapItem key={interest}>
            <Checkbox
              value={interest}
              isChecked={formData.interests.includes(interest)}
              onChange={handleInterestChange}
            >
              {interest}
            </Checkbox>
          </WrapItem>
        ))}
      </Wrap>
    </FormControl>
    <FormControl id="room">
      <FormLabel>Sala</FormLabel>
      <Select
        placeholder="Selecciona una sala"
        value={formData.room}
        onChange={handleChange}
      >
        <option value="Sala principal - La font blanca">
          Sala principal - La font blanca
        </option>
        <option value="Sala secundaria - Workshop">
          Sala secundaria - Workshop
        </option>
      </Select>
    </FormControl>
    <HStack spacing="4" width="full">
      <FormControl id="startTime" isDisabled={!formData.room}>
        <FormLabel>Inicio</FormLabel>
        <Select
          placeholder="Hora de inicio"
          value={formData.startTime}
          onChange={handleChange}
        >
          {generateTimeOptions(events, formData.room)}
        </Select>
      </FormControl>
      <FormControl id="endTime" isDisabled={!formData.room}>
        <FormLabel>Fin</FormLabel>
        <Select
          placeholder="Hora de fin"
          value={formData.endTime}
          onChange={handleChange}
        >
          {generateTimeOptions(events, formData.room)}
        </Select>
      </FormControl>
    </HStack>
  </>
);

const ComidaForm = ({
  formData,
  handleChange,
  generateTimeOptions,
  events,
}) => (
  <>
    <FormControl id="title">
      <FormLabel>Título</FormLabel>
      <Input
        type="text"
        placeholder="Ejemplo"
        value={formData.title}
        onChange={handleChange}
      />
    </FormControl>
    <FormControl id="description">
      <FormLabel>Descripción</FormLabel>
      <Textarea
        placeholder="Descripción"
        value={formData.description}
        onChange={handleChange}
      />
    </FormControl>
    <FormControl id="room">
      <FormLabel>Sala</FormLabel>
      <Select
        placeholder="Selecciona una sala"
        value={formData.room}
        onChange={handleChange}
      >
        <option value="Sala principal - La font blanca">
          Sala principal - La font blanca
        </option>
        <option value="Sala secundaria - Workshop">
          Sala secundaria - Workshop
        </option>
      </Select>
    </FormControl>
    <HStack spacing="4" width="full">
      <FormControl id="startTime" isDisabled={!formData.room}>
        <FormLabel>Inicio</FormLabel>
        <Select
          placeholder="Hora de inicio"
          value={formData.startTime}
          onChange={handleChange}
        >
          {generateTimeOptions(events, formData.room)}
        </Select>
      </FormControl>
      <FormControl id="endTime" isDisabled={!formData.room}>
        <FormLabel>Fin</FormLabel>
        <Select
          placeholder="Hora de fin"
          value={formData.endTime}
          onChange={handleChange}
        >
          {generateTimeOptions(events, formData.room)}
        </Select>
      </FormControl>
    </HStack>
  </>
);

const AddEvent = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    eventType: "Ponencia",
    ponente: "",
    title: "",
    description: "",
    interests: [],
    room: "",
    startTime: "",
    endTime: "",
  });

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  

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
          <RadioGroup
            onChange={handleEventTypeChange}
            value={formData.eventType}
          >
            <HStack spacing="4">
              <Radio value="Ponencia">Ponencia</Radio>
              <Radio value="Workshop">Workshop</Radio>
              <Radio value="Comida">Comida</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        {formData.eventType === "Comida" ? (
          <ComidaForm
            formData={formData}
            handleChange={handleChange}
            generateTimeOptions={generateTimeOptions}
            events={events}
          />
        ) : (
          <PonenciaWorkshopForm
            formData={formData}
            handleChange={handleChange}
            generateTimeOptions={generateTimeOptions}
            events={events}
            handleInterestChange={handleInterestChange}
          />
        )}

        <Button
          colorScheme="teal"
          size="md"
          width="auto"
          alignSelf="center"
          onClick={handleAddEvent}
        >
          Añadir
        </Button>
      </VStack>
    </Box>
  );
};

export default AddEvent;
