import React from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <div>
      <Router>
        <Header/>
        <Routes>

        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App
