package br.healthassist.healthassist.service.impl;

import java.util.List;
import java.util.Optional;

import org.apache.catalina.User;
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

    

    @Override
    public Paciente findPacienteById(long id){
        
        Optional<Paciente> paciente = pacienteRepository.findById(id);

        return paciente.orElseThrow(() -> new RuntimeException(
            "Usuário não encontrado! : "  + id + "Tipo: " + User.class.getName()
        ));
    }   

    @Override
    public List<Paciente> findAllPacientes(){
        return pacienteRepository.findAll();
    }

    @Override
    @Transactional
    public Paciente updatePaciente(Paciente paciente){
        Paciente newPaciente = findPacienteById(paciente.getId());
    }
    

    

}
