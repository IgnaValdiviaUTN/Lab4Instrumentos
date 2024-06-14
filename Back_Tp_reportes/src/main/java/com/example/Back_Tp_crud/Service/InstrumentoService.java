package com.example.Back_Tp_crud.Service;

import com.example.Back_Tp_crud.Entity.Instrumento;
import com.example.Back_Tp_crud.Repository.InstrumentoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InstrumentoService {
    @Autowired
    private InstrumentoRepository instrumentoRepository;
    public List<Instrumento> getAll(){
        return instrumentoRepository.findAllActive();
    }
    public Instrumento getById(Long id){
        return instrumentoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No se encuentra Instrumento con id " + id));
    }

    public Instrumento createInstrumento(Instrumento instrumentoPost){
            return instrumentoRepository.save(instrumentoPost);
    }

    public Instrumento updateInstrumento(Instrumento instrumentoBody,Long id){
        Instrumento instrumento = instrumentoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No se encuentra Instrumento con id " + id));

        instrumento.setInstrumento(instrumentoBody.getInstrumento());
        instrumento.setMarca(instrumentoBody.getMarca());
        instrumento.setModelo(instrumentoBody.getModelo());
        instrumento.setImagen(instrumentoBody.getImagen());
        instrumento.setPrecio(instrumentoBody.getPrecio());
        instrumento.setCostoEnvio(instrumentoBody.getCostoEnvio());
        instrumento.setDescripcion(instrumentoBody.getDescripcion());
        instrumento.setCantidadVendida(instrumentoBody.getCantidadVendida());
        instrumento.setCategoria(instrumentoBody.getCategoria());

        return instrumentoRepository.save(instrumento);
    }

    @Transactional
    public void deleteInstrumento(Long id) {
        instrumentoRepository.logicalDeleteById(id);
    }

    public List<Instrumento> getByCategoria(Long id){
        return instrumentoRepository.getByCategoria(id);
    }
}
