package com.example.Back_Tp_crud.Entity.BaseEntity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.*;

import java.io.Serializable;

@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
@Setter
public class BaseEntity implements Serializable {
    /*@Id:Marca el campo como la clave primaria de la entidad.
    En JPA, cada entidad debe tener una clave primaria,
    que sirve como identificador único en la base de datos.*/
    /*@GeneratedValue(strategy = GenerationType.IDENTITY):
    Indica que el valor del campo será generado automáticamente por la base de datos al insertar una nueva fila.
    GenerationType.IDENTITY es una estrategia de generación que utiliza una columna auto-incremental
    en la base de datos para asignar valores únicos a la clave primaria.
    Esto significa que la base de datos se encargará de generar el valor del campo id cuando se inserte un nuevo registro.*/
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;
}
