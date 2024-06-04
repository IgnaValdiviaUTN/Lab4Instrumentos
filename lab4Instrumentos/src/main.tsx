import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loader from './componentes/Menu/Loader.tsx'
import Login from './componentes/Login/Login.tsx'
import { RutaPrivada } from './acceso/RutaPrivada.tsx'
import { Roles } from './entidades/Roles.ts'
import RolUsuario from './acceso/RolAcceso.tsx'
import Charts from './componentes/Charts/Charts.tsx'


const Home = lazy(() => import('./componentes/Home/Home.tsx'));
const Grilla = lazy(() => import('./componentes/Grilla/Grilla.tsx'));
const Formulario = lazy(() => import('./componentes/Formulario/Formulario.tsx'));
const Lista = lazy(() => import('./componentes/Lista/Lista.tsx'));
const DondeEstamos = lazy(() => import('./componentes/DondeEstamos/DondeEstamos.tsx'));
const DetalleInstrumento = lazy(() => import('./componentes/DetalleInstrumento/DetalleInstrumento.tsx'));
const TestLoad = lazy(() => import('./componentes/Menu/TestLoad.tsx'));


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<Loader/>}>
      <BrowserRouter>
      <Routes>
        <Route path='*' element={<Login/>}/>
        <Route index element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/productos' element={<Lista/>}/>
        <Route path='/dondeEstamos' element={<DondeEstamos/>}/>
        <Route path='/loader' element={<TestLoad/>}/>
        <Route path='/login' element={<Login/>}/>

        <Route path='/grilla' element={<RutaPrivada><Grilla/></RutaPrivada> }/>

        <Route>
          <Route path='/dashboard' element={<Charts/>}/>
        </Route>

        <Route element={<RolUsuario rol={Roles.ADMIN} />}>
          <Route path='/formulario/:id' element={<RutaPrivada><Formulario/></RutaPrivada>}/>
        </Route>

        <Route path='/detalle' element={<RolUsuario rol={Roles.ADMIN} />}>
          <Route path=':id' element={<DetalleInstrumento/>}/>
        </Route>
        
        
      </Routes>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
)
