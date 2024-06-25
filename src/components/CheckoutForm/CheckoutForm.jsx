import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    // Aquí podrías enviar el paymentMethod.id a tu servidor para crear un PaymentIntent
    console.log(paymentMethod.id);

    setLoading(false);
    alert('Información de pago enviada. Este es un entorno de prueba.');
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        Pagar
      </button>
    </form>
  );
};

export default CheckoutForm;
