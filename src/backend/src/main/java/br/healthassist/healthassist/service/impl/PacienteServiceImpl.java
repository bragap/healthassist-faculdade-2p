package br.healthassist.healthassist.service.impl;

import org.springframework.stereotype.Service;

import br.healthassist.healthassist.model.entity.Paciente;
import br.healthassist.healthassist.model.repository.PacienteRepository;
import br.healthassist.healthassist.service.PacienteService;
import jakarta.transaction.Transactional;

@Service
public class PacienteServiceImpl implements PacienteService{

    private PacienteRepository pacienteRepository;

    @Override
    @Transactional
    public Paciente salvarPaciente(Paciente paciente) {
        return pacienteRepository.save(paciente);
    }
    
    

}
