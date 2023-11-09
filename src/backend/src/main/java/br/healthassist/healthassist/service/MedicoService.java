package br.healthassist.healthassist.service;

import br.healthassist.healthassist.model.entity.Medico;

import java.util.List;
import java.util.Optional;

public interface MedicoService {

    Medico salvarMedico(Medico medico);

    List<Medico> findAllMedico();

    Optional<Medico> finfById(Long id);

}
