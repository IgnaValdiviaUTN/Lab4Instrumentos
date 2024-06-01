package com.example.Back_Tp_crud.Service;

import com.example.Back_Tp_crud.Entity.Categoria;
import com.example.Back_Tp_crud.Entity.Instrumento;
import com.example.Back_Tp_crud.Repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> getAll(){
        return categoriaRepository.findAll();
    }
}
