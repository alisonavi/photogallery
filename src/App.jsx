import './App.scss'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './MainPages/Home'
import ErrorPage from './MainPages/ErrorPage'
import Login from './MainPages/Login'
import Profile from './MainPages/Profile'
import Navbar from './MainPages/Navbar'
import HomeDescription from './MainPages/HomeDescription'
import Folders from './MainPages/Folders'
function App() {

  return (
    <div className='app'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomeDescription />} />
          <Route path="/login" element={<Login />} />
          <Route path='/profile/' element={<Profile />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/folders/:foldername' element={<Folders />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
