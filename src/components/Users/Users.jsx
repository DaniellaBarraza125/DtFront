import React from 'react'
import { UserCard } from '../UserCard/UserCard'
import Buttons from '../Buttons/Buttons'
import { Container } from '@chakra-ui/react';
import Tags from '../Tags/Tags';

const Users = () => {
    const options = [
        { value: 'asistentes', label: 'Asistentes' },
        { value: 'partners', label: 'Partners' }
        ]; 
        const tags = [
            { label: 'Todas', count: 10 },
            { label: 'One to One', count: 1 },
            { label: 'Matches', count: 5 }
        ];
    return (
        <Container paddingTop='1'>
            <Buttons options={options}/>
            <Tags tags={tags}/>
            <UserCard/>
        </Container>
    )
}

export default Users