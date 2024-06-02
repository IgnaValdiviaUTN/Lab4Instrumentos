package com.example.Back_Tp_crud.Controllers;

import com.example.Back_Tp_crud.Entity.Instrumento;
import com.example.Back_Tp_crud.Entity.Pedido;
import com.example.Back_Tp_crud.Service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pedido")
@CrossOrigin("*")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping()
    public ResponseEntity<Long> create(@RequestBody Pedido pedido){
        return ResponseEntity.ok(pedidoService.createPedido(pedido));
    }
}
