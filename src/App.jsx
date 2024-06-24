import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Register from './components/Register/Register'
import { ChakraProvider } from "@chakra-ui/react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './components/CheckoutForm/CheckoutForm';
import AddPartner from "./components/AddPartner/AddPartner";
import AddEvent from "./components/AddEvent/AddEvent";


// Carga tu clave pública de Stripe
const stripePromise = loadStripe('pk_test_51PU6292MuIxm52bYvsBX37uZbLNzlaon35wbfpENgxW1ybFytd7Vdz7Pqp2bCvSfPYlcCBNZMBZxvQqtla0GLGV5006fBkWG84');

function App() {
  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addPartner" element={<AddPartner />} />
            <Route path="/addEvent" element={<AddEvent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/register' element={<Register />} />   
            <Route 
              path='/checkout' 
              element={
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              } 
            />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
