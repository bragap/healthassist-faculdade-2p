package br.healthassist.healthassist.service;

import br.healthassist.healthassist.model.entity.EspecialidadeMedico;

import java.util.List;
import java.util.Optional;

public interface EspecialidadeMedicoService {

    EspecialidadeMedico salvarEspecialidade(EspecialidadeMedico especialidadeMedico);

    Optional<EspecialidadeMedico> findById(Long id);

    List<EspecialidadeMedico> findAllEspecialidade();

}
