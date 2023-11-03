package br.healthassist.healthassist.model.repository;

import br.healthassist.healthassist.model.entity.EspecialidadeMedico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EspecialidadeMedicoRepository extends JpaRepository<EspecialidadeMedico, Long> {
}
