import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Lista from './componentes/Lista/Lista.tsx'
import DetalleInstrumento from './componentes/DetalleInstrumento/DetalleInstrumento.tsx'
import Home from './componentes/Home/Home.tsx'
import DondeEstamos from './componentes/DondeEstamos/DondeEstamos.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route index element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/productos' element={<Lista/>}/>
      <Route path='/dondeEstamos' element={<DondeEstamos/>}/>
      <Route path='/detalle'>
        <Route path=':id' element={<DetalleInstrumento/>}/>
      </Route>
      <Route path='*' element={<Lista/>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
