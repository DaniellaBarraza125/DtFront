import React, { useEffect } from 'react';
import { Container } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import Event from '../Event/Event';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../features/events/eventSlice';



const Schedule = () => {

    const {eventIsLoading, events} = useSelector((state) => state.event);
    const dispatch = useDispatch();

// console.log(events);
    useEffect(() => {
        dispatch(getAll());
    }, []);


if (eventIsLoading) {
    return <h1>Cargando eventos...</h1>;
  }

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
