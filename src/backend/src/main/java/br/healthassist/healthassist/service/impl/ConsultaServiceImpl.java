package br.healthassist.healthassist.service.impl;

import br.healthassist.healthassist.model.entity.Consulta;
import br.healthassist.healthassist.model.repository.ConsultaRepository;
import br.healthassist.healthassist.service.ConsultaService;

import java.util.List;

import org.apache.catalina.User;
import org.springframework.stereotype.Service;

@Service
public class ConsultaServiceImpl implements ConsultaService {

    private ConsultaRepository consultaRepository;

    public ConsultaServiceImpl(ConsultaRepository consultaRepository) {
        this.consultaRepository = consultaRepository;
    }

    @Override
    public Consulta salvarConsutla(Consulta consulta) {
        return consultaRepository.save(consulta);
    }

    @Override
    public List<Consulta> findAll(){
        return consultaRepository.findAll();
    }

    @Override
    public Consulta findById(Long id){
        return consultaRepository.findById(id).orElseThrow(() -> new RuntimeException(
            "Cosulta não encontrada! : "  + id + "Tipo: " + User.class.getName()
        ));
    }
}
