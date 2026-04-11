import React, { useEffect } from 'react'
import Home from './Components/Home/Home'
import AOS from 'aos'
import 'aos/dist/aos.css'

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div>
      <Home/>
    </div>
  )
}

export default App