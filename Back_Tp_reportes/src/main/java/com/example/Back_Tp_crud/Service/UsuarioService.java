package com.example.Back_Tp_crud.Service;

import com.example.Back_Tp_crud.Entity.Usuario;
import com.example.Back_Tp_crud.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    public void registrarUsuario(Usuario usuario) {
        usuario.setClave(encryptPassword(usuario.getClave()));
        // Guardar el usuario en la base de datos
        usuarioRepository.save(usuario);
    }

    public ResponseEntity<Usuario> verficarUsuario(Usuario usuario){
        Optional<Usuario> usuarioBDOpt = usuarioRepository.findByNombreUsuario(usuario.getNombreUsuario());
        System.out.println("USBDOPT" + usuarioBDOpt.toString());
        if (usuarioBDOpt.isPresent()) {
            Usuario usuarioBD = usuarioBDOpt.get();
            System.out.println("usuarioBD" + usuarioBD.toString());
            if (usuarioBD.getClave().equals(encryptPassword(usuario.getClave()))) {
                return ResponseEntity.ok(usuarioBD);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    private String encryptPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] messageDigest = md.digest(password.getBytes());
            BigInteger no = new BigInteger(1, messageDigest);
            String hashtext = no.toString(16);
            while (hashtext.length() < 32) {
                hashtext = "0" + hashtext;
            }
            return hashtext;
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}
