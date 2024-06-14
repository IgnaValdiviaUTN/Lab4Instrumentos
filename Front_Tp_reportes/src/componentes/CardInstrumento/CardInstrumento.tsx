import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useCarrito } from '../../hooks/useCarrito';
import Instrumento from '../../entidades/Instrumento';
import { CarritoContextProvider } from '../../context/CarritoContext';
//import { useState } from 'react';

type CardInstrumentoParametros = {
  id:number;
	instrumento:string ;
	//marca:string ;
	//modelo:string ;
  imagen:string ;
	precio:number;
	costoEnvio:string ;
	cantidadVendida:number;
	//descripcion:string ;

  //initialHayStock:boolean;
  //isProductInCart?:boolean;
  instrumentoObject:Instrumento;
}

function CardInstrumento(args: CardInstrumentoParametros) {
  /*
  const [contador, incrementarCantidad] = useState(0);
  const text = args.initialHayStock ? 'Comprar' : 'Sin Stock';
  const buttonClassName = args.initialHayStock ? 'btn btn-primary' : 'btn btn-primary buttonSinStock';

  const handleClick = () => {
    args.initialHayStock ? incrementarCantidad((contador) => contador + 1) : 0;
  }*/

  const {cart, addCarrito, removeCarrito, removeItemCarrito } = useCarrito()

  const verificaInstrumentoEnCarrito = (product:Instrumento) => {
    return cart.some(item => item.instrumento.id === product.id)
  }

  const isInstrumentoInCarrito = verificaInstrumentoEnCarrito(args.instrumentoObject)

  const costoEnvio = (args.costoEnvio === "G") ? 'Envió gratis a todo el país' : 'Costo de envio: $' + args.costoEnvio;
  const colorText = (args.costoEnvio === "G") ? 'green' : 'orange';

  return (
    <>
    <CarritoContextProvider>
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={args.imagen} style={{padding:'5px'}}></Card.Img>
      <Card.Body>
        <Card.Title>{args.instrumento}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">${args.precio}</Card.Subtitle>
        <Card.Text style={{color:colorText}}>{costoEnvio}</Card.Text>
        <Card.Text>vendidos: {args.cantidadVendida}</Card.Text>
        <a href={`detalle/${args.id}`}>
        <Button variant="primary">Ver Detalle</Button>{' '}
        </a>
      <hr />
      <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
        <div>
          <Button variant='outline-danger' onClick={() => removeItemCarrito(args.instrumentoObject)}>
            -
          </Button>
        </div>
        <Button  variant='outline-info' onClick={() => { isInstrumentoInCarrito ? removeCarrito(args.instrumentoObject) : addCarrito(args.instrumentoObject) }} >
                  {
                    isInstrumentoInCarrito ? 'Quitar' : 'Añadir'
                  }
            </Button>
        <div>

             <Button variant='outline-success' onClick={() => addCarrito(args.instrumentoObject)}>
              +
             </Button>
  

        </div>
      </div>
      </Card.Body>
    </Card>
    </CarritoContextProvider>
    </>
  )
}
export default CardInstrumento;
