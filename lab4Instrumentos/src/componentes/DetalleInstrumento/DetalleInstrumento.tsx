import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Instrumento from "../../entidades/Instrumento";
import { getInstrumentoXIdFecth } from "../../servicios/ApiJson";
import { Button, Card } from "react-bootstrap";
import Menu from "../Menu/Menu";


const DetalleInstrumento = () => {
    const {id} = useParams();
    const [instrumento,setInstrumento] = useState<Instrumento>();

    const getInstrumento = async() =>{
        const instrumentoSelect:Instrumento = await getInstrumentoXIdFecth(Number(id));
        console.log(instrumentoSelect);
        setInstrumento(instrumentoSelect);
    }
    useEffect(()=>{
        getInstrumento();
    },[]);

    const costoEnvio = (instrumento?.costoEnvio === "0.00") ? 'Envió gratis a todo el país' : 'Costo de envio: $' + instrumento?.costoEnvio;
    const colorText = (instrumento?.costoEnvio === "0.00") ? 'green' : 'orange';

    const handlePDF = (instrumento) => {
      window.open(`http://localhost:8080/instrumento/generarPDF/${instrumento.id}`, "_blank");
    };

  return (
    <>
    <Menu></Menu>
    <div style={{width:'100vw',height:'100vh'}}>
    <div className="row p-5" style={{gap:'15px',display:'flex', justifyContent:'space-evenly',  }}>
        <Card style={{width:'45%', display:'flex',alignItems:'center',gap:'15px'}}>
        <Card.Img variant="top" src={instrumento?.imagen} style={{maxWidth:'250px'}}/>
        <Card.Body>
          <Card.Text>
            Descripción:
            <br></br>
            {instrumento?.descripcion}
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: '45%' }}>
      <Card.Body style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly'}}>
        <Card.Text>vendidos: {instrumento?.cantidadVendida}</Card.Text>
        <Card.Title>{instrumento?.instrumento}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">${instrumento?.precio}</Card.Subtitle>
        <Card.Text>Marca: {instrumento?.marca}</Card.Text>
        <Card.Text>Modelo: {instrumento?.modelo}</Card.Text>
        <Card.Text style={{color:colorText}}>{costoEnvio}</Card.Text>
        <div>
          <Button variant="danger" onClick={() => handlePDF(instrumento)}>Descargar PDF</Button>
        </div>
      </Card.Body>
    </Card>

      </div>
      </div>
    </>
  )
}

export default DetalleInstrumento
