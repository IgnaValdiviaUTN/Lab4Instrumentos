package com.example.Back_Tp_crud.Repository;

import com.example.Back_Tp_crud.Entity.Instrumento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InstrumentoRepository extends JpaRepository<Instrumento,Long> {

    @Query("SELECT i FROM Instrumento i WHERE i.eliminado = false")
    List<Instrumento> findAllActive();

    @Query("SELECT inst FROM Instrumento inst WHERE inst.categoria.id = :id")
    List<Instrumento> getByCategoria(@Param("id") Long id);

    @Modifying
    @Query("UPDATE Instrumento i SET i.eliminado = true WHERE i.id = :id")
    void logicalDeleteById(@Param("id") Long id);
}
