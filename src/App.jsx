import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Register from './components/Register/Register'
import { ChakraProvider } from "@chakra-ui/react";
import Schedule from "./components/Schedule/Schedule";
import EventDetail from "./components/EventDetail/EventDetail";
import Stepper from "./components/Stepper/Stepper";
import PersonalInfo from "./components/PersonalInfo/PersonalInfo";
import theme from "./themes/chakraTheme";
import Footer from "./components/Footer/Footer";
import Users from "./components/Users/Users";
import CheckoutForm from './components/CheckoutForm/CheckoutForm';
import AddPartner from "./components/AddPartner/AddPartner";
import AddEvent from "./components/AddEvent/AddEvent";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js"
import Event from "./components/Event/Event";
import Products from "./components/Products/Products";



// Carga tu clave pública de Stripe
const stripePromise = loadStripe('pk_test_51PU6292MuIxm52bYvsBX37uZbLNzlaon35wbfpENgxW1ybFytd7Vdz7Pqp2bCvSfPYlcCBNZMBZxvQqtla0GLGV5006fBkWG84');

function App() {
  return (
    <>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/register' element={<Register />} />
          <Route path="/schedule" element={<Schedule/>} />
          <Route path="/eventDetail/:id" element={<EventDetail/>} />
          <Route path="/stepper" element={<Stepper/>} />
          <Route path="/personalInfo" element={<PersonalInfo/>} />
          <Route path="/users" element={<Users/>}/>
          <Route path="/footer" element={<Footer/>} />
          <Route path="/addPartner" element={<AddPartner />} />
          <Route path="/addEvent" element={<AddEvent />} />
          <Route path="/products" element={<Products />} />
          <Route path="/checkoutForm" element={
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          } />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
