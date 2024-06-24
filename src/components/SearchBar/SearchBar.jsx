import { Search2Icon} from '@chakra-ui/icons'
import { Button, Container, HStack, Input, InputGroup, InputRightElement, Tag } from '@chakra-ui/react'
import React from 'react'

const SearchBar = () => {
    const handleClick = () => {
        console.log('Buscando evento')
    }
    
    return (
    <Container maxW='md' padding='4'>
               

        {/* <InputGroup size='sm'>
            <Input placeholder="Buscar evento" />
            <InputRightElement>
                <Button colorScheme="blue" size="sm"  h='1.5rem'  onClick={handleClick} ><Search2Icon/></Button>
            </InputRightElement>
        </InputGroup>
        <HStack spacing={4}paddingTop='4' justifyContent='space-between'textAlign='center'>
            {['tag1', 'tag2', 'tag3', 'tag4'].map((tag) => (
                <Tag alignItems='center'justifyContent='center' size='sm' width='20'key={tag} variant='solid' colorScheme='blue'>
                {tag}
                </Tag>
            ))}
        </HStack> */}
    </Container>
    )
}

export default SearchBar