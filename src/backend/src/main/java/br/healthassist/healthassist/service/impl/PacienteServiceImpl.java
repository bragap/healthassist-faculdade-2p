package br.healthassist.healthassist.service.impl;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.healthassist.healthassist.model.entity.Paciente;
import br.healthassist.healthassist.model.repository.PacienteRepository;
import br.healthassist.healthassist.service.PacienteService;
import jakarta.transaction.Transactional;

@Service
public class PacienteServiceImpl implements PacienteService{

    private PacienteRepository pacienteRepository;


    @Autowired
    public PacienteServiceImpl(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    @Override
    @Transactional
    public Paciente salvarPaciente(Paciente paciente) {
        return pacienteRepository.save(paciente);
    }

    

    @Override
    public Paciente findPacienteById(Long id){
        Optional<Paciente> paciente = pacienteRepository.findById(id);
        return  paciente.orElseThrow(() -> new RuntimeException(
            "Paciente não encontrado! : "  + id + "Tipo: " + User.class.getName()
        ));
        
        
    }   
    

    @Override
    public List<Paciente> findAllPacientes(){
        return pacienteRepository.findAll();
    }



    
    @Override
    @Transactional
    public Paciente updatePaciente(Long id, Paciente paciente){
        Paciente newPaciente = findPacienteById(id);
        newPaciente.setNomeCompleto(paciente.getNomeCompleto());
        newPaciente.setEndereco(paciente.getEndereco());
        newPaciente.setDataNasc(paciente.getDataNasc());
        return pacienteRepository.save(paciente);
    }

    @Override
    public Optional<Paciente> findById(Long id) {
        return pacienteRepository.findById(id);
    }

    @Override
    public List<Integer> getPacientesByMonth(){
        
        String numberOfPatientsByMonth = pacienteRepository.findNumberOfPatientsByMonth();
        
        String[] resultStringArray = numberOfPatientsByMonth.split(",");
        int[] resultIntArray = new int[resultStringArray.length];

        for(int i = 0; i < resultStringArray.length; i++){
            resultIntArray[i] = Integer.parseInt(resultStringArray[i]);
        }

        List<Integer> resultIntList = Arrays.asList(Arrays.stream(resultIntArray).boxed().toArray(Integer[]::new));
        
        return resultIntList;
    }


}
