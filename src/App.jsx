
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import Register from './components/Register/Register'
import { ChakraProvider } from '@chakra-ui/react'

function App() {


  return (
    <>
    <ChakraProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register />} />
    </Routes>
    </BrowserRouter>
    </ChakraProvider>
    </>
  )
}

export default App
