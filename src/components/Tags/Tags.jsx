import React from 'react';
import { Box, Tag, Text } from '@chakra-ui/react';

const Tags = ({ tags }) => {
    return (
        <Box marginBottom={4} display='flex' justifyContent='space-around'>
            {tags.map((tag, index) => (
                <Tag key={index} fontSize='10px' padding={2} width='20%' justifyContent='space-between' bg='none' border='2px'>
                    <Text isTruncated maxWidth='70%'>{tag.label}</Text>
                    <Text>{tag.count}</Text>
                </Tag>
            ))}
        </Box>
    );
};

export default Tags;
