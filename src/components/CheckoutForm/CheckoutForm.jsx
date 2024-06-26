import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, FormControl, FormLabel, Text } from '@chakra-ui/react';
import axios from 'axios';

const CheckoutForm = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    try {
      const { id } = paymentMethod;
      const response = await axios.post('http://localhost:3000/checkout', {
        id,
        amount: product.prices[0].unit_amount,
      });

      if (response.data.msg === 'Successful payment') {
        setSuccess(true);
        setProcessing(false);
      } else {
        setError('Payment failed');
        setProcessing(false);
      }
    } catch (error) {
      setError('Payment failed');
      setProcessing(false);
    }
  };

  return (
    <Box maxW="lg" mx="auto" p={6} borderWidth="1px" borderRadius="lg" marginTop={50}>
      <Text as="h1" fontSize="xl" mb={4}>Verifica tu producto:</Text>
      {product && (
        <Box mb={4}>
          <Text as="h2" fontSize="lg" fontWeight="bold">{product.name}</Text>
          <Text>{product.description}</Text>
          <Text>Precio: {(product.prices[0].unit_amount / 100).toFixed(2)} {product.prices[0].currency.toUpperCase()}</Text>
        </Box>
      )}
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Detalles de la tarjeta</FormLabel>
          <Box borderWidth="1px" borderRadius="lg" p={4}>
            <CardElement options={{
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
        <Button type="submit" colorScheme="blue" isLoading={processing} loadingText="Processing..." disabled={!stripe || processing || success}>
          {processing ? 'Processing...' : 'Pagar'}
        </Button>
      </form>
      {error && <Text color="red">{error}</Text>}
      {success && <Text color="green">Pago realizado con éxito</Text>}
    </Box>
  );
};

export default CheckoutForm;
