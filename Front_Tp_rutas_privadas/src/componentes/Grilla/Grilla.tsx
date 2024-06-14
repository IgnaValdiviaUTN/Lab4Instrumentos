import { Button, Table } from "react-bootstrap"
import Menu from "../Menu/Menu"
import Instrumento from "../../entidades/Instrumento"
import { deleteInstrumentoXId, getCategoriasFetchJSON, getInstrumentosFetchJSON, getInstrumentosXCategoriaFetchJSON } from "../../servicios/ApiJson"
import { useEffect, useState } from "react"
import Categoria from "../../entidades/Categoria"
import { Roles } from "../../entidades/Roles"
import Usuario from "../../entidades/Usuario"


const Grilla = () => {
    const [filas,setFila] = useState<Instrumento[]>([])

    const getInstrumentos = async () =>{
        let datos:Instrumento[] = await getInstrumentosFetchJSON();
        setFila(datos);
    }

    useEffect(() =>{
        getInstrumentos();
        getCategorias();
    },[]);

    const deleteInstrumento = async (id:number) => {
        await deleteInstrumentoXId(id);
        window.location.reload();
    }

    const [categorias, setCategorias] = useState<Categoria[]>([])
    
    const getCategorias = async() =>{
       
        let categorias:Categoria[] = await getCategoriasFetchJSON();
        console.log(categorias);
        setCategorias(categorias);
       
    }

    const handleCategoriaChange = async (e) => {
        //console.log(Number(e.target.value));
        if(Number(e.target.value) === 0 ){
            getInstrumentos();
        }
        let datos:Instrumento[] = await getInstrumentosXCategoriaFetchJSON(Number(e.target.value));
        setFila(datos);
    }

    const [jsonUsuario, setJSONUsuario] = useState<any>(localStorage.getItem('usuario'));
    const usuarioLogueado:Usuario = JSON.parse(jsonUsuario) as Usuario;

  return (
    <div style={{width:'100vw', height:'100vh'}}>
        <Menu></Menu>
        <div style={{ display:"flex", justifyContent:'space-between',alignItems:'center', padding:'10px'}}>
        <h2>Instrumentos</h2>
        {
            (usuarioLogueado?.rol == Roles.ADMIN) ? (<a href="/formulario/0">
            <Button variant="success">Nuevo Instrumento</Button>
            </a>) : ''
          }
        </div>
        <div style={{ display:"flex", justifyContent:'center',alignItems:'center'}}>
            <label htmlFor="" className="form-label col-5">Filtrar por Categoría
                <select className="form-control"  onChange={handleCategoriaChange}>
                    <option value=""></option>
                    {categorias.map((categoria:Categoria) =>
                        <option key={categoria.id} value={categoria.id}>{categoria.denominacion}</option>
                    )}
                </select>
            </label>
        </div>
        
        <Table striped hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Imagen</th>
          <th>Instrumento</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Precio</th>
          {
            (usuarioLogueado?.rol == Roles.ADMIN) ? (<th>Acciones</th>) : ''
          }
          
        </tr>
      </thead>
      <tbody>
        {filas.map((instrumento:Instrumento) =>
            <tr>
            <td>{instrumento.id}</td>
            <td><img src={instrumento.imagen} alt="" style={{maxWidth:'20px'}} /></td>
            <td>{instrumento.instrumento}</td>
            <td>{instrumento.marca}</td>
            <td>{instrumento.modelo}</td>
            <td>${instrumento.precio}</td>
            {
              (usuarioLogueado?.rol == Roles.ADMIN) ? (
                <td>
                  <a href={`/formulario/${instrumento.id}`} style={{marginRight:'10px'}}>
                    <Button variant="primary">Editar</Button>
                  </a>
                  <Button variant="danger" onClick={() => deleteInstrumento(instrumento.id)}>Eliminar</Button>
                </td>
                ) : ''
            }
            
          </tr>
            )}
      </tbody>
    </Table>
    </div>
  )
}

export default Grilla
