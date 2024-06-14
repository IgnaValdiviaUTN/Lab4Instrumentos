import { useEffect, useState } from "react"
import Instrumento from "../../entidades/Instrumento"
import { getCategoriasFetchJSON, getInstrumentoXIdFecth, saveInstrumento } from "../../servicios/ApiJson";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Categoria from "../../entidades/Categoria";

const Formulario = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [instrumento, setInstrumento] = useState<Instrumento>()
    

    const getInstrumento = async() =>{
        if(Number(id) !== 0){
            let instrumentoSelect:Instrumento = await getInstrumentoXIdFecth(Number(id));
            console.log(instrumentoSelect);
            setInstrumento(instrumentoSelect);
        }else{
            let instrumentoSelect:Instrumento = new Instrumento();
            setInstrumento(instrumentoSelect);
        }
    }

    const [categorias, setCategorias] = useState<Categoria[]>([])

    const getCategorias = async() =>{
       
        let categorias:Categoria[] = await getCategoriasFetchJSON();
        console.log(categorias);
        setCategorias(categorias);
       
    }
  

    useEffect(()=>{
        getInstrumento();
        getCategorias();
    },[]);

    const titulo = (Number(id) !== 0) ? 'Editar Instrumento' : 'Nuevo Instrumento';

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = () => {
        let errores: { [key: string]: string } = {};
        console.log(instrumento);
        if (!instrumento?.imagen) errores.imagen = "Campo requerido";
        if (!instrumento?.instrumento) errores.instrumento = "Campo requerido";
        if (!instrumento?.marca) errores.marca = "Campo requerido";
        if (!instrumento?.modelo) errores.modelo = "Campo requerido";
        if (!instrumento?.categoria.id) errores.categoria = "Campo requerido";
        if (!instrumento?.precio || instrumento.precio <= 0) errores.precio = "Debe ser un número positivo";
        if (!instrumento?.cantidadVendida || instrumento.cantidadVendida < 0) errores.cantidadVendida = "Debe ser un número positivo";
        if (!instrumento?.costoEnvio) errores.costoEnvio = "Campo requerido";
        if (!instrumento?.descripcion) errores.descripcion = "Campo requerido";
        setErrors(errores);
        console.log(errors);
        return Object.keys(errores).length === 0;
    }

    const guardar = async () =>{
        if (validate()) {
        await saveInstrumento(instrumento);
        //navigate('/grilla');
        }
    }

    const handleCategoriaChange = (e) => {
        const selectedCategoriaId = Number(e.target.value);
        const selectedCategoria = categorias.find(categoria => categoria.id === selectedCategoriaId);
        instrumento.categoria = selectedCategoria;
        //setInstrumento(instrumento);
    }


  return (
    <div style={{width:'100vw', height:'100vh', display:"flex", justifyContent:'center',alignItems:'center'}}>
        <div style={{width:'50%',padding:'20px',border:'1px solid black', borderRadius:'5px'}}>
            <h3>{titulo}</h3>
       <Form>
       <div style={{display:"flex", flexDirection:'column'}}>
      
            <div style={{display:"flex", justifyContent:'center',alignItems:'center'}}>
                <img src={instrumento?.imagen} alt=""  style={{width:'100px'}}/>
            </div>
            <div className="mb-1 row">
                <label htmlFor="" className="form-label col">Imagen
                <input type="text" id='' className="form-control" placeholder="Ingrese url imagen" defaultValue={instrumento?.imagen} onChange={e => instrumento.imagen = String(e.target.value)}/>
                </label>
                {errors.imagen && <div className="text-danger">{errors.imagen}</div>}
            </div>
            <div className="mb-1 row">
                <label htmlFor="" className="form-label col">Instrumento
                <input type="text" id='' className="form-control" placeholder="Ingrese nombre instrumento" defaultValue={instrumento?.instrumento} onChange={e => instrumento.instrumento = String(e.target.value)}/>
                </label>
                {errors.instrumento && <div className="text-danger">{errors.instrumento}</div>}
            </div>

            <div className="mb-1">
                <div style={{display:"flex",flexDirection:'row', justifyContent:'space-between', gap:'10px'}}>
                    <label htmlFor="" className="form-label col">Marca
                        <input type="text" id='' className="form-control" placeholder="marca" defaultValue={instrumento?.marca} onChange={e => instrumento.marca = String(e.target.value)}/>
                    </label>
                    <label htmlFor="" className="form-label col">Modelo
                        <input type="text" id='' className="form-control" placeholder="modelo" defaultValue={instrumento?.modelo} onChange={e => instrumento.modelo = String(e.target.value)}/>
                    </label>
                    <label htmlFor="" className="form-label col">Categoría
                                    <select className="form-control"  onChange={handleCategoriaChange}>
                                        <option value={instrumento?.categoria.id}>{instrumento?.categoria.denominacion}</option>
                                        {categorias.filter(categoria => categoria.id !== instrumento?.categoria.id).map((categoria:Categoria) =>
                                            <option key={categoria.id} value={categoria.id}>{categoria.denominacion}</option>
                                        )}
                                    </select>
                                </label>
            </div>
            </div>
            <div className="mb-1">
                <div style={{display:"flex",flexDirection:'row', gap:'10px'}}>
                <label htmlFor="" className="form-label col">Precio $
                        <input type="number" id='' className="form-control" placeholder="$" defaultValue={instrumento?.precio} onChange={e => instrumento.precio = String(e.target.value)}/>
                    </label>
                <label htmlFor="" className="form-label col">Cantidad Vendida
                        <input type="text" id='' className="form-control" placeholder="" defaultValue={instrumento?.cantidadVendida} onChange={e => instrumento.cantidadVendida = String(e.target.value)}/>
                    </label>
                    <label htmlFor="" className="form-label col">Costo de Envio $
                        <input type="text" id='' className="form-control" placeholder="$" defaultValue={instrumento?.costoEnvio} onChange={e => instrumento.costoEnvio = String(e.target.value)}/>
                    </label>
                </div>
            </div>
            <div className="mb-1 row">
                <label htmlFor="" className="form-label col">Descripción
                    <textarea  id='' className="form-control"  rows='5' placeholder="Ingrese descripción" defaultValue={instrumento?.descripcion} onChange={e => instrumento.descripcion = String(e.target.value)}/>
                </label>
                {errors.descripcion && <div className="text-danger">{errors.descripcion}</div>}
            </div>
        </div>
        <div style={{ display:"flex", justifyContent:'end',gap:'10px'}}>
            <Button onClick={guardar}>Guardar</Button>
            <Button onClick={() => navigate('/grilla')} variant="danger">Cancelar</Button>
        </div>
        
    </Form>
    </div>
    </div>
  )
}

export default Formulario
