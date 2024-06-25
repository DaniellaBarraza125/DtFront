// CheckoutForm.jsx
import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: name,
      },
    });

    if (error) {
      console.error(error);
    } else {
      console.log(paymentMethod);
      // Lógica adicional para manejar el pago
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} mt={8} borderWidth={1} borderRadius="md" boxShadow="lg" maxWidth="400px" mx="auto">
      <FormControl mb={4}>
        <FormLabel>Nombre Completo</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre Completo"
          required
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Detalles de la Tarjeta</FormLabel>
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
      </FormControl>
      <Button type="submit" colorScheme="teal" isDisabled={!stripe}>
        Pagar
      </Button>
    </Box>
  );
};

export default CheckoutForm;
