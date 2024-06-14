package com.example.Back_Tp_crud.Repository;

import com.example.Back_Tp_crud.Entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    List<Pedido> findByFechaPedidoBetween(LocalDateTime fechaInicio, LocalDateTime fechaFin);

    @Query("SELECT new map(MONTH(p.fechaPedido) as Mes, COUNT(p) as Cantidad) " +
            "FROM Pedido p " +
            "GROUP BY MONTH(p.fechaPedido) " +
            "ORDER BY MONTH(p.fechaPedido)")
    List<Map<String, Object>> getPedidosPorMes();

    @Query("SELECT new map(d.instrumento.instrumento as Instrumento, SUM(d.cantidad) as Cantidad) " +
            "FROM Pedido p JOIN p.detalles d " +
            "GROUP BY d.instrumento.instrumento " +
            "ORDER BY SUM(d.cantidad) DESC")
    List<Map<String, Object>> getPedidosPorInstrumento();
}
