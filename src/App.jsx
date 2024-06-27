import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import { ChakraProvider } from "@chakra-ui/react";
import Schedule from "./components/Schedule/Schedule";
import EventDetail from "./components/EventDetail/EventDetail";
import Stepper from "./components/Stepper/Stepper";
import PersonalInfo from "./components/PersonalInfo/PersonalInfo";
import theme from "./themes/chakraTheme";
import Footer from "./components/Footer/Footer";
import Users from "./components/Users/Users";
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './components/CheckoutForm/CheckoutForm';
import AddPartner from "./components/AddPartner/AddPartner";
import AddEvent from "./components/AddEvent/AddEvent";
import { Elements } from "@stripe/react-stripe-js";
import PanelAdmin from "./components/PanelAdmin/PanelAdmin";
import PrivateZone from "./guards/PrivateZone";
import AdminZone from "./guards/AdminZone";
import NotFound from "./components/NotFound/NotFound";


// Carga tu clave pública de Stripe
const stripePromise = loadStripe('pk_test_51PU6292MuIxm52bYvsBX37uZbLNzlaon35wbfpENgxW1ybFytd7Vdz7Pqp2bCvSfPYlcCBNZMBZxvQqtla0GLGV5006fBkWG84');

function Layout({ children }) {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/register' && <Header />}
      {children}
    </>
  );
}

function App() {
  return (
    <>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<PrivateZone><Profile /></PrivateZone>} />
          <Route path='/register' element={<Stepper/>} />
          <Route path="/schedule" element={<PrivateZone><Schedule/></PrivateZone>} />
          <Route path="/eventDetail/:id" element={<PrivateZone><EventDetail/></PrivateZone>} />
          <Route path="/personalInfo" element={<PrivateZone><PersonalInfo/></PrivateZone>} />
          <Route path="/users" element={<PrivateZone><Users/></PrivateZone>}/>
          <Route path="/footer" element={<Footer/>} />
          <Route path="/addPartner" element={<PrivateZone><AddPartner /></PrivateZone>} />
          <Route path="/addEvent" element={<PrivateZone><AddEvent /></PrivateZone>} />
          <Route path="*" element={<NotFound />} />
          <Route path="/checkoutForm" element={
            <PrivateZone><Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements></PrivateZone>
          } />
          <Route path='/paneladmin' element={<AdminZone><PanelAdmin/></AdminZone>} />
          </Routes>
          </Layout>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
