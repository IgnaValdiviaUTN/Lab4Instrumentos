import { ChangeEventHandler } from "react";
import Categoria from "./Categoria";

export default class Instrumento{
    id:number = 0;
	instrumento:string = "";
	marca:string = "";
	modelo:string = "";
    imagen:string = "";
	precio:number = 0; 
	costoEnvio:string = ""; 
	cantidadVendida:number = 0;
	descripcion:string = "";
	categoria: Categoria = {
		id: 0,
		denominacion: ""
	};
	addCarrito?:ChangeEventHandler;
}
