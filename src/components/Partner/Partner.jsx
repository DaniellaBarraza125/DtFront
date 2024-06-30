import React from 'react';
import { Box, Flex, Text, Heading, Divider, Tag, Container } from '@chakra-ui/react';

const Partner = ({ partner }) => {
  return (
    <Container marginTop={5}>
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} mb={4}>
        <Box flex="1" paddingLeft={3}>
          <Heading as="h3" size="sm" mb={2}>
            {partner.nombre_empresa}
          </Heading>
        </Box>
        <Box display="flex" justifyContent='space-between' padding='3'alignContent='center'>
          <Text>{partner.industria}</Text>
        
          <Text fontWeight='bold'color={'gray'}>{partner.tipo_partnership}</Text>
        </Box>
    </Box>
    </Container>
  );
};

export default Partner;
