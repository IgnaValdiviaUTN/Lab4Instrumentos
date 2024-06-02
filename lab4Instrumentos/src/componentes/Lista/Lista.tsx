import  { useEffect, useState } from 'react'
import { getInstrumentosFetchJSON } from '../../servicios/ApiJson';
import Instrumento from '../../entidades/Instrumento';
import CardInstrumento from '../CardInstrumento/CardInstrumento';
import Menu from '../Menu/Menu';
import Carrito from '../Carrito/Carrito';
import { CarritoContextProvider } from '../../context/CarritoContext';

function Lista() {
    const [cards,setCards] = useState<Instrumento[]>([])

    const getInstrumentos = async () =>{
        let datos:Instrumento[] = await getInstrumentosFetchJSON();
        setCards(datos);
    }

    useEffect(() =>{
        getInstrumentos();
    },[]);

  return (
    <>
    <CarritoContextProvider>
        <Menu></Menu>
        <div style={{ display:'flex' , flexDirection:'row', flexWrap:'nowrap'}}>
            <div className='row' style={{ display:'flex' , flexDirection:'row', flexWrap:'wrap', justifyContent:'space-around', gap:'25px', padding:'25px' }}>
                {cards.map((instrumento:Instrumento) =>
                <CardInstrumento instrumentoObject={instrumento} id={instrumento.id} instrumento={instrumento.instrumento} imagen={instrumento.imagen} precio={instrumento.precio} costoEnvio={instrumento.costoEnvio} cantidadVendida ={instrumento.cantidadVendida}></CardInstrumento>
                )}
            </div>
            <div style={{width:'1000px', padding:'20px' , borderLeft:'1px solid grey'}}>
                <Carrito></Carrito>
            </div>
        </div>
        </CarritoContextProvider>
    </>
  )
}
export default Lista;
