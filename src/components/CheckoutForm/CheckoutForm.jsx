import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { updateUser } from '../../features/auth/authSlice';

const CheckoutForm = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fullName, setFullName] = useState(''); 
  const [cardElement, setCardElement] = useState(''); 
  const dispatch = useDispatch();


  const imageUrl = "https://img.freepik.com/fotos-premium/mano-portatil-persona-escribiendo-correo-electronico-o-mensaje-negocios-marketing-redes-sociales-o-redes_590464-269480.jpg?w=900";

  const navigate = useNavigate()

const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: fullName,
      },
    });

    if (error) {
        setError(error.message);
        setProcessing(false);
        return;
    }

    try {
        const { id } = paymentMethod;
        const response = await axios.post('https://e-learning-experience.onrender.com/checkout', {
            id,
            amount: product.prices[0].unit_amount,
        });

        if (response.data.msg === 'Successful payment') {
            setSuccess(true);
            setProcessing(false);

            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            setError('Payment failed');
            setProcessing(false);
        }
    
    } catch (error) {
      setError('Payment failed');
      setProcessing(false);
    }
    const user = JSON.parse(localStorage.getItem('user'));
      dispatch(updateUser({id:user.id, pagado: 1}))
};



  const formCompleted = fullName !== "" && cardElement !== "";

  return (
    <Box maxW="lg" mx="auto" p={6} borderWidth="1px" borderRadius="lg" marginTop={50}>
      <Text as="h1" fontSize="xl" mb={4} fontFamily="Montserrat" fontWeight="medium" fontStyle="normal">Verifica tu producto:</Text>
      {product && (
        <Box mb={4}>
          <img src={imageUrl} alt="Product" />
          <Text as="h2" fontSize="lg" fontWeight="bold" fontFamily="Montserrat" marginTop="30px">{product.name}</Text>
          <Text fontFamily="Montserrat" >{product.description}</Text>
          <Text fontFamily="Montserrat" >Precio: {(product.prices[0].unit_amount / 100).toFixed(2)} {product.prices[0].currency.toUpperCase()}</Text>
        </Box>
      )}
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel fontFamily="Montserrat">Nombre completo</FormLabel>
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            fontFamily="Montserrat"
            fontSize="16px"
            fontWeight="400"
            lineHeight="19.5px"
            placeholder="Ingrese su nombre completo"
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel fontFamily="Montserrat">Detalles de la tarjeta</FormLabel>
          <Box borderWidth="1px" borderRadius="lg" p={4}>
            <CardElement value={cardElement} onChange={(e) => setCardElement(e.target.value)} options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }} />
          </Box>
        </FormControl>
        <Button  
          borderRadius="full" 
          width="100%"
          size="md" 
          type="submit" 
          colorScheme="blue" 
          isLoading={processing} 
          loadingText="Processing..." 
          disabled={!formCompleted || !stripe || processing || success}>
          {processing ? 'Processing...' : 'Pagar'}
        </Button>
      </form>
      {error && <Text color="red">{error}</Text>}
      {success && <Text color="green">Pago realizado con éxito</Text>}
    </Box>
  );
};

export default CheckoutForm;
