import React from 'react';
import { Box, Tag, Text } from '@chakra-ui/react';

const Tags = ({ tags }) => {
    return (
        <Box margin={1} display='flex' height='2vh'justifyContent='space-around'>
            {tags.map((tag, index) => (
                <Tag key={index} fontSize='10px' padding='6px 8px' width='20%' alignItems='center' justifyContent='space-between' bg='none' border='1px' borderRadius='80px'>
                    <Text isTruncated maxWidth='70%'>{tag.label}</Text>
                    <Text>{tag.count}</Text>
                </Tag>
            ))}
        </Box>
    );
};

export default Tags;
