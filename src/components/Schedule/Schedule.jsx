import React from 'react';
import { Container } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import Event from '../Event/Event';

const events = [
    {
        id: 1,
        titulo: "Introducción a la Programación",
        ponente: "Juan Pérez",
        hora: "10:00 AM",
        tema: "Programación Básica"
    },
    {
        id: 2,
        titulo: "Desarrollo Web Avanzado",
        ponente: "María García",
        hora: "11:30 AM",
        tema: "Desarrollo Web"
    },
    {
        id: 3,
        titulo: "Inteligencia Artificial y Machine Learning",
        ponente: "Carlos Rodríguez",
        hora: "2:00 PM",
        tema: "IA y Machine Learning"
    },
    {
        id: 4,
        titulo: "Desarrollo de Aplicaciones Móviles",
        ponente: "Lucía Martínez",
        hora: "3:30 PM",
        tema: "Aplicaciones Móviles"
    },
    {
        id: 5,
        titulo: "Ciberseguridad en la Era Digital",
        ponente: "Ana López",
        hora: "5:00 PM",
        tema: "Ciberseguridad"
    }
];

const Schedule = () => {
    return (
        <>
            <SearchBar />
            <Container  maxW='md' padding='4'>
                {events.map((event, i) => (
                    
                        <Event key={i} event={event} />
                    
                ))}
            </Container>
        </>
    );
};

export default Schedule;
