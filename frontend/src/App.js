import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Add from './Add/Add'
import Edit from './pages/Edit'
import H3C from './pages/H3C'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='add' element={<Add />} />
          <Route path='edit' element={<Edit />} />
          <Route path='h3c' element={<H3C />} />
          <Route path='lhr' element={<H3C />} />
          <Route path='isb' element={<H3C />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
