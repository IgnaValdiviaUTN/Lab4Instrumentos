import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Roles } from "../../entidades/Roles";
import Usuario from "../../entidades/Usuario";
import { verificarUsuario } from "../../servicios/ApiJson";
import { Button, Form } from "react-bootstrap";


function Login() {

    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<Usuario>(new Usuario());
    const [txtValidacion, setTxtValidacion] = useState<string>("");


    const login = async () => {
        if(usuario?.nombreUsuario == undefined || usuario?.nombreUsuario === ""){
            setTxtValidacion("Ingrese el nombre de usuario");
            return;
        }
        if(usuario?.clave == undefined || usuario?.clave === ""){
            setTxtValidacion("Ingrese la clave");
            return;
        }
        usuario.rol = Roles.USER;
        
        try {
            const usuarioVerficado = await verificarUsuario(usuario);
     
                if(usuarioVerficado){
                    console.log(usuarioVerficado);
                    localStorage.setItem('usuario', JSON.stringify(usuarioVerficado));
                    navigate('/home', {
                        replace: true,
                        state: {
                            logged: true,
                            usuario: usuario
                        },
                    });
                }      
        } catch (error) {
            setTxtValidacion("Usuario y/o clave incorrectas");
                    return;
        }
       
    }


    return (
        <>
        <div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <div style={{border:'1px solid grey', padding:'30px', borderRadius:'5px'}}>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Usuario</Form.Label>
                <Form.Control type="text" placeholder="Ingrese usuario" defaultValue={usuario?.nombreUsuario} onChange={e => usuario.nombreUsuario = String(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter") login();}}/>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Ingrese contraseña" defaultValue={usuario?.clave} onChange={e => usuario.clave = String(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter") login();}} />
            </Form.Group>
            <div>
                <p style={{ color: 'red', lineHeight : 5, padding: 5 }}>{txtValidacion}</p>
            </div>
            <Button variant="primary" onClick={login}>
                Ingresar
            </Button>
        </Form>
        </div>
        </div>
        </>
        )

}

export default Login