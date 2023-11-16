package br.healthassist.healthassist.service;

import br.healthassist.healthassist.model.entity.Especialidade;

import java.util.List;
import java.util.Optional;

public interface EspecialidadeService {

    Especialidade salvarEspecialidade(Especialidade especialidadeMedico);

    Optional<Especialidade> findById(Long id);

    List<Especialidade> findAllEspecialidade();

    Especialidade findByNome(String nome);

}
