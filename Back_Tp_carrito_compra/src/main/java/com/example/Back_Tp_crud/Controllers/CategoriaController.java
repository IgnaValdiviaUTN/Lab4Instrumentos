package com.example.Back_Tp_crud.Controllers;

import com.example.Back_Tp_crud.Entity.Categoria;
import com.example.Back_Tp_crud.Service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categoria")
@CrossOrigin("*")
public class CategoriaController {
    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    ResponseEntity<List<Categoria>> getAll(){
        return ResponseEntity.ok(categoriaService.getAll());
    }
}
