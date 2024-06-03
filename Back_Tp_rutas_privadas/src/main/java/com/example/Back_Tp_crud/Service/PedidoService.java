package com.example.Back_Tp_crud.Service;

import com.example.Back_Tp_crud.Entity.DetallePedido;
import com.example.Back_Tp_crud.Entity.Pedido;
import com.example.Back_Tp_crud.Repository.DetallePedidoRepository;
import com.example.Back_Tp_crud.Repository.PedidoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PedidoService {
    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private DetallePedidoRepository detallePedidoRepository;

    @Transactional
    public Long createPedido(Pedido pedidoPost){
        System.out.println("Ejecutando guardar pedido...");
        Pedido pedido = new Pedido();
        pedido.setFechaPedido(pedidoPost.getFechaPedido());
        pedido.setTotalPedido(pedidoPost.getTotalPedido());

        System.out.println("Guardando pedido...");
        Pedido savedPedido = pedidoRepository.save(pedido);

        // Verifica y asegura que la colección de detalles no sea null
        if (pedidoPost.getDetalles() == null) {
            System.out.println("PostDetalles NULL");
            pedidoPost.setDetalles(new HashSet<>());
        }

        List<DetallePedido> detalles = pedidoPost.getDetalles().stream().map(detallePost -> {
            DetallePedido detalle = new DetallePedido();
            detalle.setCantidad(detallePost.getCantidad());
            detalle.setInstrumento(detallePost.getInstrumento());
            detalle.setPedido(savedPedido);
            return detalle;
        }).collect(Collectors.toList());

        System.out.println("Guardando detalles...");
        detallePedidoRepository.saveAll(detalles);

        System.out.println("Retornando id...");
        return savedPedido.getId();

    }
}
