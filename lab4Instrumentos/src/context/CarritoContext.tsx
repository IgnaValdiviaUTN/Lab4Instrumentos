import { ReactNode, createContext, useState } from 'react'
import Instrumento from '../entidades/Instrumento';
import DetallePedido from '../entidades/DetallePedido';
import Pedido from '../entidades/Pedido';
import { savePedido } from '../servicios/ApiJson';

// Definimos el tipo de dato que se almacenará en el contexto del carrito
interface CartContextType {
  cart: DetallePedido[];
  addCarrito: (product: Instrumento) => void;
  removeCarrito: (product: Instrumento) => void;
  removeItemCarrito: (product: Instrumento) => void;
  limpiarCarrito: () => void;
  crearDetallePedido: () => Promise<number>;
}


export const CartContext = createContext<CartContextType>({
  cart: [],
  addCarrito: () => {},
  removeCarrito: () => {},
  removeItemCarrito: () => {},
  limpiarCarrito: () => {},
  crearDetallePedido: async () => 0
});


//crear provider, encargado de proveer acceso al contexto
export function CarritoContextProvider({ children }: { children: ReactNode }){
    
    const[cart, setCart] = useState<DetallePedido[]>([]);

    const addCarrito = async (product: Instrumento) => {
        const existe = cart.some((detalle) => detalle.instrumento.id === product.id);
        if (existe) {
            const cartClonado = cart.map((detalle) =>
                detalle.instrumento.id === product.id
                    ? { ...detalle, cantidad: detalle.cantidad + 1 }
                    : detalle
            );
            setCart(cartClonado);
        } else {
            const nuevoDetalle: DetallePedido = {
                id: 0,
                cantidad: 1,
                instrumento: product,
                pedido: new Pedido(),
            };
            setCart((prevCart) => [...prevCart, nuevoDetalle]);
        }
    };

    const removeCarrito = async (product: Instrumento) => {
        await setCart(prevCart => prevCart.filter(item => item.instrumento.id !== product.id))
    };

    const removeItemCarrito = (product: Instrumento) => {
        // lógica para eliminar un producto del carrito
        const existe = cart.some((detalle) => detalle.instrumento.id === product.id);
        if (existe) {
            const cartClonado = cart.map((detalle) =>
                detalle.instrumento.id === product.id
                    ? { ...detalle, cantidad: detalle.cantidad - 1 }
                    : detalle
            ).filter((detalle) => detalle.cantidad > 0);
            setCart(cartClonado);
        }
    };

    const limpiarCarrito = () => {
        setCart([])
    }

    const crearDetallePedido = async (): Promise<number>  => {
        try {
            // Crear un nuevo pedido con la fecha y el total
            const pedido = new Pedido();
            pedido.fechaPedido = new Date();
            pedido.totalPedido = cart.reduce((total, detalle) => total + detalle.instrumento.precio * detalle.cantidad, 0);
            pedido.detalles = cart;
            console.log("Pedido", pedido)

            let idPedido = await savePedido(pedido);
            console.log("ID PEDIDO", idPedido);


            // Limpiar el carrito después de guardar
            limpiarCarrito();

            return idPedido;
            
        } catch (error) {
            console.error('Error al crear el pedido:', error);
            throw error;
        }
    };

    return (
    <CartContext.Provider value={{ cart, addCarrito, limpiarCarrito, removeCarrito, removeItemCarrito, crearDetallePedido }}>
      {children}
    </CartContext.Provider>
    );
}