import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

type CardInstrumentoParametros = {
    id:string ;
	instrumento:string ;
	//marca:string ;
	//modelo:string ;
    imagen:string ;
	precio:string ;
	costoEnvio:string ;
	cantidadVendida:string ;
	//descripcion:string ;
}

function CardInstrumento(args: CardInstrumentoParametros) {
    const costoEnvio = (args.costoEnvio === "G") ? 'Envió gratis a todo el país' : 'Costo de envio: $' + args.costoEnvio;
    const colorText = (args.costoEnvio === "G") ? 'green' : 'orange';
  return (
    <>
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={`img/${args.imagen}`} style={{padding:'5px'}}></Card.Img>
      <Card.Body>
        <Card.Title>{args.instrumento}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">${args.precio}</Card.Subtitle>
        <Card.Text style={{color:colorText}}>{costoEnvio}</Card.Text>
        <Card.Text>vendidos: {args.cantidadVendida}</Card.Text>
        <a href={`detalle/${args.id}`}>
        <Button variant="primary">Ver Detalle</Button>{' '}
        </a>
      </Card.Body>
    </Card>

    </>
  )
}
export default CardInstrumento;
