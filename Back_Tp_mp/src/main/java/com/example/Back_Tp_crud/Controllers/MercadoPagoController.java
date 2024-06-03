package com.example.Back_Tp_crud.Controllers;

import com.example.Back_Tp_crud.Entity.PreferenceMP;
import com.example.Back_Tp_crud.Service.MercadoPagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;


@Controller
public class MercadoPagoController {
    @Autowired
    private MercadoPagoService mercadoPagoService;

    public PreferenceMP getPreference(Long id){
        return mercadoPagoService.getPreference(id);
    }
}
