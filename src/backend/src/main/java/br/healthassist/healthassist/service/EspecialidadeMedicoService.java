package br.healthassist.healthassist.service;

import br.healthassist.healthassist.model.entity.EspecialidadeMedico;

import java.util.Optional;

public interface EspecialidadeMedicoService {

    Optional<EspecialidadeMedico> obterPorId(Long id);

}
