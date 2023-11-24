package br.healthassist.healthassist.service;

import java.util.List;
import java.util.Optional;

import br.healthassist.healthassist.model.entity.AvaliarConsulta;

public interface AvaliarConsultaService {

    AvaliarConsulta salvarAvaliarConsulta(AvaliarConsulta avaliarConsulta);

    List<AvaliarConsulta> findAllAvaliarConsulta();

    Optional<AvaliarConsulta> findAvaliarConsultaById(Long id);

    List<Integer> getAvaliacoesByMonth();

}
