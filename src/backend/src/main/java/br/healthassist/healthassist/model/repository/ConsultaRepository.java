package br.healthassist.healthassist.model.repository;

import br.healthassist.healthassist.model.entity.Consulta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
}
