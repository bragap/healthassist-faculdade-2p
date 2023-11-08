package br.healthassist.healthassist.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.healthassist.healthassist.model.entity.ArquivosPaciente;

public interface ArquivosPacienteRepository extends JpaRepository<ArquivosPaciente, Long> {
    
}
