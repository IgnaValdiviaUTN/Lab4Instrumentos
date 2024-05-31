import  { useEffect, useState } from 'react'
import { getInstrumentosJSON } from '../../servicios/ApiJson';
import Instrumento from '../../entidades/Instrumento';
import CardInstrumento from '../CardInstrumento/CardInstrumento';

function Lista() {
    const [cards,setCards] = useState<Instrumento[]>([])

    const getInstrumentos = () =>{
        let datos:Instrumento[] = getInstrumentosJSON();
        setCards(datos);
    }

    useEffect(() =>{
        getInstrumentos();
    },[]);

  return (
    <>
        <div className='row' style={{ display:'flex' , flexDirection:'row', flexWrap:'wrap', justifyContent:'space-around', gap:'25px', padding:'25px' }}>
            {cards.map((instrumento:Instrumento) =>
            <CardInstrumento id={instrumento.id} instrumento={instrumento.instrumento} imagen={instrumento.imagen} precio={instrumento.precio} costoEnvio={instrumento.costoEnvio} cantidadVendida ={instrumento.cantidadVendida}></CardInstrumento>
            )}
        </div>
    </>
  )
}
export default Lista;
