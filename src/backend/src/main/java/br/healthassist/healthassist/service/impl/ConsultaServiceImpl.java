package br.healthassist.healthassist.service.impl;

import br.healthassist.healthassist.model.entity.Consulta;
import br.healthassist.healthassist.model.repository.ConsultaRepository;
import br.healthassist.healthassist.service.ConsutaService;
import org.springframework.stereotype.Service;

@Service
public class ConsultaServiceImpl implements ConsutaService {

    private ConsultaRepository consultaRepository;

    @Override
    public Consulta salvarConsutla(Consulta consulta) {
        return consultaRepository.save(consulta);
    }

}
