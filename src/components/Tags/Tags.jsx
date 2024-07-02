import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

const Tags = ({ tags, onClick }) => {
    return (
        <Box margin={1} display='flex' height='1vh' justifyContent='space-around'>
            {tags.map((tag, index) => (
                <Button 
                    key={index} 
                    fontSize='10px' 
                    h='15px' 
                    alignItems='center' 
                    paddingY='8px' 
                    paddingX='8px' 
                    bg='none' 
                    border='1px' 
                    borderRadius='80px'
                    _hover={{ bg: '#0F8BA0', color: 'white', borderColor: '#0F8BA0' }}
                    _active={{ bg: '#0F8BA0', color: 'white', borderColor: '#0F8BA0' }}
                    onClick={() => onClick(tag.value)}
                >
                    <Text isTruncated minWidth='70%'>{tag.label}</Text> 
                    {tag.count && <Text ml='5px'>{tag.count}</Text>}
                </Button>
            ))}
        </Box>
    );
};

export default Tags;
