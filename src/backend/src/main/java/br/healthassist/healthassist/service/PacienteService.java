package br.healthassist.healthassist.service;

import java.util.List;
import java.util.Optional;

import br.healthassist.healthassist.model.entity.Medico;
import br.healthassist.healthassist.model.entity.Paciente;

public interface PacienteService {

    Paciente salvarPaciente(Paciente paciente);
    
    public Paciente findPacienteById(Long id);
    
    public List<Paciente> findAllPacientes();

    public Paciente updatePaciente(Long id, Paciente paciente);

    Optional<Paciente> findById(Long id);
    
}