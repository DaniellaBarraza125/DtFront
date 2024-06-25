import { Box, Button, FormControl, FormLabel, Input, Select, VStack, Heading } from '@chakra-ui/react';

const AddPartner = () => {
  return (
    <Box 
      maxW="md" 
      mx="auto" 
      mt="10" 
      p="6" 
      borderWidth="1px" 
      borderRadius="lg" 
      boxShadow="lg"
    >
      <Heading as="h2" size="md" mb="6" textAlign="center">
        Añade un nuevo partner
      </Heading>
      <VStack spacing="4">
        <FormControl id="company-name">
          <FormLabel>Nombre Empresa</FormLabel>
          <Input type="text" placeholder="Ejemplo" />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Correo</FormLabel>
          <Input type="email" placeholder="Ejemplo" />
        </FormControl>
        <FormControl id="sector">
          <FormLabel>Sector</FormLabel>
          <Input type="text" placeholder="Ejemplo" />
        </FormControl>
        <FormControl id="category">
          <FormLabel>Categoría</FormLabel>
          <Select placeholder="Selecciona una opción">
            <option value="platinum">Platinum</option>
            <option value="golden">Golden</option>
            <option value="silver">Silver</option>
          </Select>
        </FormControl>
        <Button colorScheme="teal" size="md" width="auto">
          Guardar
        </Button>
      </VStack>
    </Box>
  );
};

export default AddPartner;
