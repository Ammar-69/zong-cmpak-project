import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Add from './pages/Add/Add'
import Edit from './pages/Edit'
import H3C from './pages/H3C'
import Login from './pages/Login/Login'
import { useState, createContext } from 'react'

const AuthContext = createContext()

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='add' element={<Add />} />
            <Route path='edit' element={<Edit />} />
            <Route path='h3c' element={<H3C />} />
            <Route path='lhr' element={<H3C />} />
            <Route path='isb' element={<H3C />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  )
}

export { AuthContext }

export default App
