import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useCarrito } from "../../hooks/useCarrito"
import DetallePedido from "../../entidades/DetallePedido";
import { Button, Card } from "react-bootstrap";
import PreferenceMP from "../../entidades/PreferenceMP";
import { useState } from "react";
import { createPreferenceMP } from "../../servicios/ApiJson";



type Carrito = {
   detallePedido: DetallePedido;
}

function CartItem ({ detallePedido }:Carrito) {
    return (
        
        <div key={detallePedido.id}>
            <Card style={{ width: '18rem', padding:'10px', marginBottom:'15px' }}>
                <Card.Img variant="top" src={detallePedido.instrumento.imagen} style={{padding:'5px', width:'150px'}}></Card.Img>
                <Card.Body>
                    <Card.Title><strong>{detallePedido.instrumento.instrumento}</strong> - ${detallePedido.instrumento.precio}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"><b>{detallePedido.cantidad} {detallePedido.cantidad == 1 ? 'unidad' : 'unidades'} </b></Card.Subtitle>
                </Card.Body>
            </Card>
        </div>   
    )
}


const Carrito = () => {

    const { cart, limpiarCarrito, crearDetallePedido } = useCarrito();
    const total = cart.reduce((total, detalle) => total + detalle.instrumento.precio * detalle.cantidad, 0);

    const [idPreference, setIdPreference] = useState<string>('');
    //MI CREDENCIAL - TEST-f08f2d01-1222-43e9-a16c-5404897b393a
    initMercadoPago('TEST-3c3ecd60-bab2-4ea9-b504-5c6ecdb5e8a5', { locale: 'es-AR' });

  const handleGuardarCarrito = async () => {
    console.log(cart)
    try {
      if(total > 0){
        let idPedido = await crearDetallePedido();
      alert(" El pedido con id: " + idPedido +" se concretó correctamente!");


        const response:PreferenceMP = await createPreferenceMP(idPedido);
        console.log("Preference id: " + response.id);
        if(response)
            setIdPreference(response.id);
    }else{
        alert("Agregue al menos un instrumento al carrito");
    }
    } catch (error) {
      console.error('Error al guardar el carrito:', error);
    }
  };

  
  return (
    <div>
        <label className='cart-button'>
        <i>Instrumentos del Pedido</i>
      </label>
      <hr></hr>
      {total === 0 ? (<p className="text-danger">Sin instrumentos en el carrito.</p>) : ''}
      
      <aside className='cart'>
        <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
            <div>
            {cart.map((detalle, index) => ( <CartItem detallePedido={detalle} key={index} />))}
            </div>
        </div>
        <div style={{textAlign:'center', fontSize:'16px', fontWeight:'bold'}}>
            <p>Total: ${total}</p>
        </div>
        <hr></hr>
        <div style={{display:'flex', flexDirection:'row', gap:'10px', justifyContent:'space-between'}}>
        <Button onClick={limpiarCarrito} variant="danger">
            Vaciar
        </Button>
        <Button onClick={handleGuardarCarrito}>
            Finalizar Pedido
        </Button>
        </div>
        <div>
          {(idPreference) ? (<Wallet initialization={{ preferenceId: idPreference, redirectMode:"blank" }} customization={{  texts:{ valueProp: 'smart_option'}}} />) : '' }
        </div>
      </aside>
    </div>
  )
}

export default Carrito
