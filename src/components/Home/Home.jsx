import { Button } from '@chakra-ui/react';
import img_home from "../../assets/Images/img_home.png"
import "./Home.scss";


const handleRegisterClick = () => {
  window.location.href = '/register';
};

const Home = () => {
  return (
    <>
    <div className="home_container">
      <h2 className='sammoo'>SAMMOO</h2>
      <h3 className='title_home'>E - LEARNING EXPERIENCE 2025</h3>
      <p className='info_home'>VI Encuentro de innovación educativa en Universidades, Adminitración Pública y Grandes Coorporaciones</p>
      <p className='date_home'>23 y 24 de Mayo</p>
      <p className='place_home'>EL PUIG, VALENCIA</p>
      <p className='adress_home'>Huerto de Santa María</p>
      <div className='btn_container_home'>
        <Button className="btn_home" type="submit" colorScheme="teal" mt={4} borderRadius="80px" onClick={handleRegisterClick}>
            Inscripciones abiertas
        </Button>
      </div>
    </div>
    <img className="home-image" src={ img_home }/>
    <div className='footer_home'>
      <div className='card_home'>
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <path d="M14.56 9.94L12.5 9L14.56 8.06L15.5 6L16.44 8.06L18.5 9L16.44 9.94L15.5 12L14.56 9.94ZM4.5 14L5.44 11.94L7.5 11L5.44 10.06L4.5 8L3.56 10.06L1.5 11L3.56 11.94L4.5 14ZM9 9L10.09 6.59L12.5 5.5L10.09 4.41L9 2L7.91 4.41L5.5 5.5L7.91 6.59L9 9ZM5 20.5L11 14.49L15 18.49L23.5 8.93L22.09 7.52L15 15.49L11 11.49L3.5 19L5 20.5Z" fill="#FBFBFB"/>
      </svg>
        <p className='info_card_home'>3ª Edición del premio Digit</p>
      </div>
      <div className='card_home'>
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <path d="M21.34 4.22C21.29 4.1 21.23 3.99 21.16 3.88C21.02 3.67 20.83 3.48 20.62 3.34C20.51 3.27 20.4 3.21 20.28 3.16C20.04 3.06 19.78 3 19.5 3H18.5V1H16.5V3H8.5V1H6.5V3H5.5C5.08 3 4.7 3.13 4.38 3.34C4.17 3.48 3.98 3.67 3.84 3.88C3.77 3.99 3.71 4.1 3.66 4.22C3.56 4.46 3.5 4.72 3.5 5V19C3.5 19.5304 3.71071 20.0391 4.08579 20.4142C4.46086 20.7893 4.96957 21 5.5 21H19.5C19.78 21 20.04 20.94 20.28 20.84C20.4 20.79 20.51 20.73 20.62 20.66C20.83 20.52 21.02 20.33 21.16 20.12C21.37 19.8 21.5 19.41 21.5 19V5C21.5 4.72 21.44 4.46 21.34 4.22ZM5.5 19V5H19.5V19H5.5ZM12.5 12.88C10.47 12.88 6.5 13.96 6.5 16.46V18H18.5V16.47C18.5 13.96 14.53 12.88 12.5 12.88ZM8.81 16C9.5 15.44 11.19 14.88 12.5 14.88C13.81 14.88 15.51 15.44 16.19 16H8.81ZM12.5 12C14.15 12 15.5 10.65 15.5 9C15.5 7.35 14.15 6 12.5 6C10.85 6 9.5 7.35 9.5 9C9.5 10.65 10.85 12 12.5 12ZM12.5 8C13.05 8 13.5 8.45 13.5 9C13.5 9.55 13.05 10 12.5 10C11.95 10 11.5 9.55 11.5 9C11.5 8.45 11.95 8 12.5 8Z" fill="white"/>
      </svg>
      <p className='info_card_home'>Entrevistas One to One</p>
      </div>
      <div className='card_home'>
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <path d="M16.5 4C16.5 2.9 17.4 2 18.5 2C19.6 2 20.5 2.9 20.5 4C20.5 5.1 19.6 6 18.5 6C17.4 6 16.5 5.1 16.5 4ZM21.28 7.58C20.4031 7.19739 19.4567 6.99993 18.5 7C17.83 7 17.19 7.1 16.58 7.28C17.16 7.83 17.5 8.6 17.5 9.43V10H22.5V9.43C22.5 8.62 22.02 7.9 21.28 7.58ZM6.5 6C7.6 6 8.5 5.1 8.5 4C8.5 2.9 7.6 2 6.5 2C5.4 2 4.5 2.9 4.5 4C4.5 5.1 5.4 6 6.5 6ZM8.42 7.28C7.81 7.1 7.17 7 6.5 7C5.51 7 4.57 7.21 3.72 7.58C3.35771 7.73485 3.04892 7.99277 2.83202 8.32168C2.61511 8.6506 2.49966 9.03601 2.5 9.43V10H7.5V9.43C7.5 8.6 7.84 7.83 8.42 7.28ZM10.5 4C10.5 2.9 11.4 2 12.5 2C13.6 2 14.5 2.9 14.5 4C14.5 5.1 13.6 6 12.5 6C11.4 6 10.5 5.1 10.5 4ZM16.5 10H8.5V9.43C8.5 8.62 8.98 7.9 9.72 7.58C10.5969 7.19731 11.5433 6.99978 12.5 6.99978C13.4567 6.99978 14.4031 7.19731 15.28 7.58C15.6423 7.73485 15.9511 7.99277 16.168 8.32168C16.3849 8.6506 16.5003 9.03601 16.5 9.43V10ZM15.5 16C15.5 14.9 16.4 14 17.5 14C18.6 14 19.5 14.9 19.5 16C19.5 17.1 18.6 18 17.5 18C16.4 18 15.5 17.1 15.5 16ZM21.5 22H13.5V21.43C13.5 20.62 13.98 19.9 14.72 19.58C15.5969 19.1973 16.5433 18.9998 17.5 18.9998C18.4567 18.9998 19.4031 19.1973 20.28 19.58C20.6423 19.7349 20.9511 19.9928 21.168 20.3217C21.3849 20.6506 21.5003 21.036 21.5 21.43V22ZM5.5 16C5.5 14.9 6.4 14 7.5 14C8.6 14 9.5 14.9 9.5 16C9.5 17.1 8.6 18 7.5 18C6.4 18 5.5 17.1 5.5 16ZM11.5 22H3.5V21.43C3.5 20.62 3.98 19.9 4.72 19.58C5.59685 19.1973 6.54328 18.9998 7.5 18.9998C8.45673 18.9998 9.40315 19.1973 10.28 19.58C10.6423 19.7349 10.9511 19.9928 11.168 20.3217C11.3849 20.6506 11.5003 21.036 11.5 21.43V22ZM13.25 13V11H11.75V13H9.5L12.5 16L15.5 13H13.25Z" fill="white"/>
      </svg>
      <p className='info_card_home'>Networking y colaboración</p>
      </div>
    </div>
    </>
  )
}

export default Home