package com.example.Back_Tp_crud.Controllers;

import com.example.Back_Tp_crud.Entity.Pedido;
import com.example.Back_Tp_crud.Entity.Usuario;
import com.example.Back_Tp_crud.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;
   public void registrarUsuario(Usuario usuario){
       usuarioService.registrarUsuario(usuario);
   }

    @PostMapping()
    public ResponseEntity<Usuario> verificar(@RequestBody Usuario usuario){
        return usuarioService.verficarUsuario(usuario);
    }
}
