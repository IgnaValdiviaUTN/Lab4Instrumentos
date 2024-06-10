package com.example.Back_Tp_crud.Repository;

import com.example.Back_Tp_crud.Entity.Dto.PedidoBarDto;
import com.example.Back_Tp_crud.Entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    @Query("SELECT new com.example.Back_Tp_crud.Entity.Dto.PedidoBarDto(MONTH(p.fechaPedido), COUNT(p)) " +
            "FROM Pedido p " +
            "WHERE YEAR(p.fechaPedido) = :year " +
            "GROUP BY MONTH(p.fechaPedido)")
    List<PedidoBarDto> countPedidosBarChartByYear(@Param("year") int year);
}
