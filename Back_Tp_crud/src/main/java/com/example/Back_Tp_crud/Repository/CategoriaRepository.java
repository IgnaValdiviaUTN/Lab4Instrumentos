package com.example.Back_Tp_crud.Repository;

import com.example.Back_Tp_crud.Entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria,Long> {
}
