
import React from 'react'
import Event from '../Event/Event'
const events = [
    {
        titulo: "Introducción a la Programación",
        ponente: "Juan Pérez",
        hora: "10:00 AM",
        tema: "Programación Básica"
    },
    {
        titulo: "Desarrollo Web Avanzado",
        ponente: "María García",
        hora: "11:30 AM",
        tema: "Desarrollo Web"
    },
    {
        titulo: "Inteligencia Artificial y Machine Learning",
        ponente: "Carlos Rodríguez",
        hora: "2:00 PM",
        tema: "IA y Machine Learning"
    },
    {
        titulo: "Desarrollo de Aplicaciones Móviles",
        ponente: "Lucía Martínez",
        hora: "3:30 PM",
        tema: "Aplicaciones Móviles"
    },
    {
        titulo: "Ciberseguridad en la Era Digital",
        ponente: "Ana López",
        hora: "5:00 PM",
        tema: "Ciberseguridad"
    }
];
import { Container } from '@chakra-ui/react'

const Schedule = () => {
  return (
    <Container maxW='md' padding='4'>
        {events.map((event, index) => (<Event key={index} event = {event}/>))}
        
    </Container>
  )
}

export default Schedule