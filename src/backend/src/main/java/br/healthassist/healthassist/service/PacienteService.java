package br.healthassist.healthassist.service;

import java.util.List;
import java.util.Optional;

import br.healthassist.healthassist.model.entity.Paciente;

public interface PacienteService {

    Paciente salvarPaciente(Paciente paciente);
    
    Optional<Paciente> findPacienteById(long id);
    
    public List<Paciente> findAllPacientes();

    public Paciente updatePaciente(Paciente paciente);
    
}