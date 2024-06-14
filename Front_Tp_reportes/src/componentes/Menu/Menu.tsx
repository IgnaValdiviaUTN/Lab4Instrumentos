import { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Usuario from '../../entidades/Usuario';
import { useNavigate } from 'react-router-dom';
import { Roles } from '../../entidades/Roles';

const Menu = () => {

  const navigate = useNavigate();

    
  const cerrarSesion = async () => {
      localStorage.setItem('usuario', "");
      localStorage.removeItem('usuario');
      navigate('/login', {
              replace: true,
              state: {
                  logged: false
              },
      });
  }

  const [jsonUsuario, setJSONUsuario] = useState<any>(localStorage.getItem('usuario'));
  const usuarioLogueado:Usuario = JSON.parse(jsonUsuario) as Usuario;

  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">Musical Hendrix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/dondeEstamos">Donde Estamos</Nav.Link>
            <Nav.Link href="/productos">Productos</Nav.Link>
            <Nav.Link href="/grilla">Grilla</Nav.Link>
          </Nav>
          {
            (usuarioLogueado?.rol == Roles.ADMIN || usuarioLogueado?.rol == Roles.USER ) ?
              (<NavDropdown title={usuarioLogueado.nombreUsuario} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={cerrarSesion}>Cerrar Sesión</NavDropdown.Item>
            </NavDropdown>) : ''
            
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Menu
