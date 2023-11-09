package br.healthassist.healthassist.model.repository;

import br.healthassist.healthassist.model.entity.Medico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicoRepository extends JpaRepository<Medico, Long> {
}
