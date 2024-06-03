package com.example.Back_Tp_crud;

import com.example.Back_Tp_crud.Controllers.UsuarioController;
import com.example.Back_Tp_crud.Entity.Enum.Rol;
import com.example.Back_Tp_crud.Entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import javax.enterprise.inject.New;

@SpringBootApplication
public class BackTpCrudApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackTpCrudApplication.class, args);
	}

	@Bean
	public CommandLineRunner run(ApplicationContext context) {
		return args -> {
			System.out.println("Backend Funcionando...");
			/*UsuarioController userController = context.getBean(UsuarioController.class);
			Usuario admin = new Usuario("admin", "123", Rol.ADMIN);
			userController.registrarUsuario(admin);
			Usuario visor = new Usuario("usuario", "123", Rol.VISOR);
			userController.registrarUsuario(visor);
			System.out.println("Usuarios registrados...");*/
		};
	}

}
