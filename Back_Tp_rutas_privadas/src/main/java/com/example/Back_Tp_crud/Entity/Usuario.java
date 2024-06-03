package com.example.Back_Tp_crud.Entity;

import com.example.Back_Tp_crud.Entity.BaseEntity.BaseEntity;
import com.example.Back_Tp_crud.Entity.Enum.Rol;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Usuario extends BaseEntity {

    private String nombreUsuario;
    private String clave;

    @Enumerated(EnumType.STRING)
    private Rol rol = Rol.VISOR;
}
