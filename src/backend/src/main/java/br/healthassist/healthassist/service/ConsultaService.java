package br.healthassist.healthassist.service;

import java.util.List;

import br.healthassist.healthassist.model.entity.Consulta;

public interface ConsultaService {

    Consulta salvarConsutla(Consulta consulta);

    List<Consulta> findAll();
    
    Consulta findById(Long id);

    Consulta findConsultaById(Long id);

    Consulta updateConsulta(Long id, Consulta consulta);
}
