import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const imageUrl = "https://img.freepik.com/fotos-premium/mano-portatil-persona-escribiendo-correo-electronico-o-mensaje-negocios-marketing-redes-sociales-o-redes_590464-269480.jpg?w=900";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/products', {
          headers: {
            Authorization: token,
          },
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBuyClick = (product) => {
    navigate('/checkoutForm', { state: { product } });
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const filterProducts = () => {
    if (category === 'empresas privadas') {
      return products.filter(product => product.name.toLowerCase().includes('privadas'));
    } else if (category === 'administración pública') {
      return products.filter(product => product.name.toLowerCase().includes('pública'));
    } else {
      return products;
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const filteredProducts = filterProducts();

  return (
    <Container maxW="container.md" centerContent mt={8} mb={8}>
      <Heading as="h1" mb={4} textAlign="center">Selecciona TU ENTRADA</Heading>
      <Box mb={4} w="100%">
        <Text
          fontFamily="Montserrat"
          fontSize="16px"
          fontWeight="400"
          lineHeight="19.5px"
          textAlign="left"
          color="#919191"
          mb={2}
        >
          Elige el tipo de entrada que mejor se adapte a tus necesidades y prepárate para descubrir las últimas novedades:
        </Text>
        <Select placeholder="Selecciona la categoría" value={category} onChange={handleCategoryChange}>
          <option value="">Todas</option>
          <option value="empresas privadas">Empresas Privadas</option>
          <option value="administración pública">Administración Pública</option>
        </Select>
      </Box>
      <VStack spacing={4} align="stretch" w="100%">
        {filteredProducts.map(product => (
          <Box
            key={product.id}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
            w="100%"
          >
            <HStack spacing={4}>
              <Image src={imageUrl} alt="Product" boxSize="150px" objectFit="cover" />
              <VStack align="start">
                <Heading as="h2" size="md" fontFamily="Montserrat" fontSize="16px" fontWeight="400" lineHeight="19.5px">
                  {product.name}
                </Heading>
                <Text fontFamily="Montserrat" fontSize="16px" fontWeight="400" lineHeight="19.5px">
                  {product.description}
                </Text>
                {product.prices.map(price => (
                  <Text key={price.id} fontFamily="Montserrat" fontSize="16px" fontWeight="400" lineHeight="19.5px">
                    Precio: {(price.unit_amount / 100).toFixed(2)} {price.currency.toUpperCase()}
                  </Text>
                ))}
                <Button fontFamily="Montserrat" fontSize="16px" fontWeight="400" lineHeight="19.5px" colorScheme="blue" onClick={() => handleBuyClick(product)}>
                  Comprar
                </Button>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Products;
