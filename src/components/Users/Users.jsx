import React, { useEffect } from 'react'
import { UserCard } from '../UserCard/UserCard'
import Buttons from '../Buttons/Buttons'
import { Container } from '@chakra-ui/react';
import Tags from '../Tags/Tags';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../features/auth/authSlice';
import Footer from '../Footer/Footer';

const Users = () => {
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const { users, isLoading } = useSelector((state) => state.auth);
    const options = [
        { value: 'asistentes', label: 'Asistentes' },
        { value: 'partners', label: 'Partners' }
        ]; 
        const tags = [
            { label: 'Todas', count: 10 },
            { label: 'One to One', count: 1 },
            { label: 'Matches', count: 5 }
        ];
        if (isLoading) {<p>Loading...</p>}

    return (
        <>
        <Container paddingTop='1'>
            <Buttons options={options}/>
            <Tags tags={tags}/>
            {users.map((user, i) => (
                <UserCard key={i} user={user}/>
            ))}
        <Footer/>
        </Container>
        </>
    )
}

export default Users