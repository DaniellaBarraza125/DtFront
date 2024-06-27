import { Box, Button, FormControl, FormLabel, Input, Select, VStack, Heading } from '@chakra-ui/react';
import { useState } from 'react';

const AddPartner = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    sector: '',
    category: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSavePartner = () => {
    // aquí va la lógica que queramos ejecutar al hacer clic en el botón
    console.log('Partner guardado:', formData);
  };

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
        <FormControl id="companyName">
          <FormLabel>Nombre Empresa</FormLabel>
          <Input type="text" placeholder="Ejemplo" value={formData.companyName} onChange={handleChange} />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Correo</FormLabel>
          <Input type="email" placeholder="Ejemplo" value={formData.email} onChange={handleChange} />
        </FormControl>
        <FormControl id="sector">
          <FormLabel>Sector</FormLabel>
          <Input type="text" placeholder="Ejemplo" value={formData.sector} onChange={handleChange} />
        </FormControl>
        <FormControl id="category">
          <FormLabel>Categoría</FormLabel>
          <Select placeholder="Selecciona una opción" value={formData.category} onChange={handleChange}>
            <option value="platinum">Platinum</option>
            <option value="golden">Golden</option>
            <option value="silver">Silver</option>
          </Select>
        </FormControl>
        <Button colorScheme="teal" size="md" width="auto" onClick={handleSavePartner}>
          Guardar
        </Button>
      </VStack>
    </Box>
  );
};

export default AddPartner;
