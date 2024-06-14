import  { useEffect, useState } from 'react'
import { getInstrumentosFetchJSON } from '../../servicios/ApiJson';
import Instrumento from '../../entidades/Instrumento';
import CardInstrumento from '../CardInstrumento/CardInstrumento';
import Menu from '../Menu/Menu';

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
        <Menu></Menu>
        <div className='row' style={{ display:'flex' , flexDirection:'row', flexWrap:'wrap', justifyContent:'space-around', gap:'25px', padding:'25px' }}>
            {cards.map((instrumento:Instrumento) =>
            <CardInstrumento id={instrumento.id} instrumento={instrumento.instrumento} imagen={instrumento.imagen} precio={instrumento.precio} costoEnvio={instrumento.costoEnvio} cantidadVendida ={instrumento.cantidadVendida}></CardInstrumento>
            )}
        </div>
    </>
  )
}
export default Lista;
