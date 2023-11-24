package br.healthassist.healthassist.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.healthassist.healthassist.model.entity.ArquivoPaciente;

public interface ArquivoPacienteRepository extends JpaRepository<ArquivoPaciente, Long> {
}