package com.example.Back_Tp_crud.Controllers;

import com.example.Back_Tp_crud.Entity.Dto.PedidoBarDto;
import com.example.Back_Tp_crud.Entity.Instrumento;
import com.example.Back_Tp_crud.Entity.Pedido;
import com.example.Back_Tp_crud.Entity.PreferenceMP;
import com.example.Back_Tp_crud.Service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedido")
@CrossOrigin("*")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private MercadoPagoController mercadoPagoController;

    @PostMapping()
    public ResponseEntity<Long> create(@RequestBody Pedido pedido){
        return ResponseEntity.ok(pedidoService.createPedido(pedido));
    }

    @GetMapping("/mp/{id}")
    ResponseEntity<PreferenceMP> getById(@PathVariable Long id){
        return ResponseEntity.ok(mercadoPagoController.getPreference(id));
    }

    @GetMapping("/barchart")
    ResponseEntity<List<PedidoBarDto>> getById(){
        return ResponseEntity.ok(pedidoService.getPedidosBarChart());
    }
}
