package com.example.Back_Tp_crud.Entity;

import com.example.Back_Tp_crud.Entity.BaseEntity.BaseEntity;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Categoria extends BaseEntity {
    private String denominacion;
}
