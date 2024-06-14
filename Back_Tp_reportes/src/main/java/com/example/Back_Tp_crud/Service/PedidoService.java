package com.example.Back_Tp_crud.Service;

import com.example.Back_Tp_crud.Entity.DetallePedido;
import com.example.Back_Tp_crud.Entity.Pedido;
import com.example.Back_Tp_crud.Repository.DetallePedidoRepository;
import com.example.Back_Tp_crud.Repository.PedidoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.*;
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


    public List<Map<String, Object>> getPedidosPorMes() {
        List<Pedido> pedidos = pedidoRepository.findAll();
        return pedidos.stream()
                .collect(Collectors.groupingBy(p -> p.getFechaPedido().getMonth(), Collectors.counting()))
                .entrySet()
                .stream()
                .map(entry -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("mes", entry.getKey().toString());
                    map.put("cantidad", entry.getValue());
                    return map;
                })
                .collect(Collectors.toList());
    }

    public List<Map<String, Object>> getPedidosPorInstrumento() {
        List<Pedido> pedidos = pedidoRepository.findAll();
        Map<String, Integer> conteoInstrumentos = new HashMap<>();
        pedidos.forEach(pedido -> {
            pedido.getDetalles().forEach(detalle -> {
                String instrumento = detalle.getInstrumento().getInstrumento();
                conteoInstrumentos.put(instrumento, conteoInstrumentos.getOrDefault(instrumento, 0) + detalle.getCantidad());
            });
        });
        return conteoInstrumentos.entrySet()
                .stream()
                .map(entry -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("instrumento", entry.getKey());
                    map.put("cantidad", entry.getValue());
                    return map;
                })
                .collect(Collectors.toList());
    }

    public List<Pedido> getPedidosByFechas(Date fechaInicio, Date fechaFin) {
        // Convertir las fechas a LocalDateTime para ajustarlas a la precisión del almacenamiento de fecha en la base de datos
        LocalDateTime inicio = LocalDateTime.ofInstant(fechaInicio.toInstant(), ZoneId.systemDefault());
        LocalDateTime fin = LocalDateTime.ofInstant(fechaFin.toInstant(), ZoneId.systemDefault());

        // Ajustar la hora de inicio al comienzo del día y la hora de fin al final del día
        inicio = inicio.with(LocalTime.MIN);
        fin = fin.with(LocalTime.MAX);

        // Realizar la consulta utilizando las fechas ajustadas
        return pedidoRepository.findByFechaPedidoBetween(inicio, fin);
    }
}
