package br.healthassist.healthassist.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.healthassist.healthassist.model.entity.AvaliarConsulta;

public interface AvaliarConsultaRepository extends JpaRepository<AvaliarConsulta, Long>{
    
}
