
import Instrumento from '../entidades/Instrumento';
import Pedido from '../entidades/Pedido';
import PreferenceMP from '../entidades/PreferenceMP';
import Usuario from '../entidades/Usuario';


/*
export const getBarChartByYear = (year: number) => {
    return fetch(`/api/pedidos/bar-chart?year=${year}`)
      .then(response => response.json());
  };*/

export async function getBarChartByYear(year:number){
    const urlServer = 'http://localhost:8080/pedido/bar-chart/'+year;
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});
	//console.log(response);
	if (!response.ok) {
        throw new Error('Error al obtener los datos del gráfico');
    }

    const data = await response.json();
    return data;
}

//Verificar Usuario
export async function verificarUsuario(usuario: Usuario){
	
	let urlServer = 'http://localhost:8080/user';

    console.log(JSON.stringify(usuario));

	const response = await fetch(urlServer, {
        method: "POST",
        body: JSON.stringify(usuario),
        headers: {
            "Content-Type": 'application/json'
        }
    });

      if (!response.ok) {
        throw new Error('Error en la verificacion del usuario');
    }

    return await response.json() as Usuario;
}

//MercadoPago
export async function createPreferenceMP(idPedido:number){
    let urlServer = 'http://localhost:8080/pedido/mp/'+ idPedido;
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});
    return await response.json() as PreferenceMP;   
}   



//funcion para obtener los datos con el fetch del back JAVA
export async function getInstrumentosFetchJSON(){
    const urlServer = 'http://localhost:8080/instrumento';
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});
	console.log(response);
	return await response.json() ;
}

export async function getCategoriasFetchJSON(){
    const urlServer = 'http://localhost:8080/categoria';
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});
	console.log(response);
	return await response.json() ;
}

export async function getInstrumentosXCategoriaFetchJSON(id:Number){
    const urlServer = 'http://localhost:8080/instrumento/categoria/' + id;
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});
	console.log(response);
	return await response.json() ;
}



//Obtener por id
export async function getInstrumentoXIdFecth(id:number){
	const urlServer = 'http://localhost:8080/instrumento/'+id;
    console.log(urlServer);
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});
	return await response.json() as Instrumento;
    
}

//ELIMINAR
export async function deleteInstrumentoXId(id:number){
	
	let urlServer = 'http://localhost:8080/instrumento/'+id;
	await fetch(urlServer, {
		method: 'DELETE',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});
}

//Guardar
export async function saveInstrumento(instrumento?: Instrumento){
	
	let urlServer = 'http://localhost:8080/instrumento';

    let method:string = "POST";
	if(instrumento && instrumento.id > 0){
        urlServer = 'http://localhost:8080/instrumento/'+ instrumento.id;
		method = "PUT";
	}
    console.log(JSON.stringify(instrumento));

	await fetch(urlServer, {
        "method": method,
        "body": JSON.stringify(instrumento),
        "headers": {
          "Content-Type": 'application/json'
        }
      });
}

//Guardar pedido con detalles
export async function savePedido(pedido: Pedido){
	
	let urlServer = 'http://localhost:8080/pedido';

    console.log(JSON.stringify(pedido));

	const response = await fetch(urlServer, {
        method: "POST",
        body: JSON.stringify(pedido),
        headers: {
            "Content-Type": 'application/json'
        }
    });

      if (!response.ok) {
        throw new Error('Error en la creación del pedido');
    }

    const id = await response.json();
    return id;
}







//funcion para obtener los datos con el fetch del back PHP
export async function getInstrumentosFetchJSONPHP(){
    const urlServer = 'http://localhost/api.php';
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});
	console.log(response);
	return await response.json() ;
}


export async function getInstrumentoXIdFecthPHP(id:number){
	const urlServer = 'http://localhost/api.php?id='+id;
    console.log(urlServer);
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});
	return await response.json() as Instrumento;
    
}

//Funcion para tomar los datos desde el JSON
export function  getInstrumentosJSON() {
    //Tomo los datos del JSON
    let datos/*:Instrumento[]*/ =[{
        "id":"1",
        "instrumento": "Mandolina Instrumento Musical Stagg Sunburst",
        "marca": "Stagg",
        "modelo": "M20",
        "imagen": "nro10.jpg",
        "precio": "2450",
        "costoEnvio": "G",
        "cantidadVendida": "28",
        "descripcion": "Estas viendo una excelente mandolina de la marca Stagg, con un sonido muy dulce, tapa aros y fondo de tilo, y diapasón de palisandro. Es un instrumento acústico (no se enchufa) de cuerdas dobles (4 pares) con la caja ovalada y cóncava, y el mástil corto. Su utilización abarca variados ámbitos, desde rock, folk, country y ensambles experimentales."
    },
    {
        "id":"2",
        "instrumento": "Pandereta Pandero Instrumento Musical ",
        "marca": "DyM ventas",
        "modelo": "32 sonajas",
        "imagen": "nro9.jpg",
        "precio": "325",
        "costoEnvio": "150",
        "cantidadVendida": "10",
        "descripcion": "1 Pandereta - 32 sonajas metálicas. Más de 8 años vendiendo con 100 % de calificaciones POSITIVAS y clientes satisfechos !! "
    },
    {
        "id":"3",
        "instrumento": "Triangulo Musical 24 Cm Percusion",
        "marca": "LBP",
        "modelo": "24",
        "imagen": "nro8.jpg",
        "precio": "260",
        "costoEnvio": "250",
        "cantidadVendida": "3",
        "descripcion": "Triangulo Musical de 24 Centímetros De Acero. ENVIOS POR CORREO O ENCOMIENDA: Se le deberán adicionar $40 en concepto de Despacho y el Costo del envío se abonará al recibir el producto en Terminal, Sucursal OCA o Domicilio"
    },
    {
        "id":"4",
        "instrumento": "Bar Chimes Lp Cortina Musical 72 Barras ",
        "marca": "FM",
        "modelo": "LATIN",
        "imagen": "nro7.jpg",
        "precio": "2250",
        "costoEnvio": "G",
        "cantidadVendida": "2",
        "descripcion": "BARCHIME CORTINA MUSICAL DE 25 BARRAS LATIN CUSTOM. Emitimos factura A y B"
    },
    {
        "id":"5",
        "instrumento": "Shekeres. Instrumento. Música. Artesanía. ",
        "marca": "Azalea Artesanías",
        "modelo": "Cuentas de madera",
        "imagen": "nro6.jpg",
        "precio": "850",
        "costoEnvio": "300",
        "cantidadVendida": "5",
        "descripcion": "Las calabazas utilizadas para nuestras artesanías son sembradas y cosechadas por nosotros, quienes seleccionamos el mejor fruto para garantizar la calidad del producto y ofrecerle algo creativo y original."
    },
    {
        "id":"6",
        "instrumento": "Antiguo Piano Aleman Con Candelabros. ",
        "marca": "Neumeyer",
        "modelo": "Stratus",
        "imagen": "nro3.jpg",
        "precio": "17000",
        "costoEnvio": "2000",
        "cantidadVendida": "0",
        "descripcion": "Buen dia! Sale a la venta este Piano Alemán Neumeyer con candelabros incluidos. Tiene una talla muy bonita en la madera. Una pieza de calidad."
    },
    {
        "id":"7",
        "instrumento": "Guitarra Ukelele Infantil Grande 60cm",
        "marca": "GUITARRA",
        "modelo": "UKELELE",
        "imagen": "nro4.jpg",
        "precio": "500",
        "costoEnvio": "G",
        "cantidadVendida": "5",
        "descripcion": "Material: Plástico smil madera 4 Cuerdas longitud: 60cm, el mejor regalo para usted, su familia y amigos, adecuado para 3-18 años de edad"
    },
    {
        "id":"8",
        "instrumento": "Teclado Organo Electronico Musical Instrumento 54 Teclas ",
        "marca": "GADNIC",
        "modelo": "T01",
        "imagen": "nro2.jpg",
        "precio": "2250",
        "costoEnvio": "G",
        "cantidadVendida": "1375",
        "descripcion": "Organo Electrónico GADNIC T01. Display de Led. 54 Teclas. 100 Timbres / 100 Ritmos. 4 1/2 octavas. 8 Percusiones. 8 Canciones de muestra. Grabación y reproducción. Entrada para Micrófono. Salida de Audio (Auriculares / Amplificador). Vibrato. Sustain Incluye Atril Apoya partitura y Micrófono. Dimensiones: 84,5 x 32,5 x 11 cm"
    },
    {
        "id":"9",
        "instrumento": "Instrumentos De Percusión Niños Set Musical Con Estuche ",
        "marca": "KNIGHT",
        "modelo": "LB17",
        "imagen": "nro1.jpg",
        "precio": "2700",
        "costoEnvio": "300",
        "cantidadVendida": "15",
        "descripcion": "Estas viendo un excelente y completísimo set de percusion para niños con estuche rígido, equipado con los instrumentos mas divertidos! De gran calidad y sonoridad. Ideal para jardines, escuelas primarias, musicoterapeutas o chicos que se quieran iniciar en la música de la mejor manera. Es un muy buen producto que garantiza entretenimiento en cualquier casa o reunión, ya que esta equipado para que varias personas al mismo tiempo estén tocando un instrumento."
    },
    {
        "id":"10",
        "instrumento": "Batería Musical Infantil Juguete Niño 9 Piezas Palillos ",
        "marca": "Bateria",
        "modelo": "Infantil",
        "imagen": "nro5.jpg",
        "precio": "850",
        "costoEnvio": "250",
        "cantidadVendida": "380",
        "descripcion": "DESCRIPCIÓN: DE 1 A 3 AÑOS. EL SET INCLUYE 5 TAMBORES, PALILLOS Y EL PLATILLO TAL CUAL LAS FOTOS. SONIDOS REALISTAS Y FÁCIL DE MONTAR. MEDIDAS: 40X20X46 CM"
    }];

  return datos;
}
