package br.healthassist.healthassist.model.repository;

import br.healthassist.healthassist.model.entity.ArquivoMedico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArquivoMedicoRepository extends JpaRepository<ArquivoMedico, Long> {
}
