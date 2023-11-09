package br.healthassist.healthassist.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.stereotype.Service;

import br.healthassist.healthassist.model.entity.AvaliarConsulta;
import br.healthassist.healthassist.model.entity.Paciente;
import br.healthassist.healthassist.model.repository.AvaliarConsultaRepository;
import br.healthassist.healthassist.model.repository.PacienteRepository;
import jakarta.transaction.Transactional;

@Service
public class AvaliarConsultaServiceImpl implements br.healthassist.healthassist.service.AvaliarConsultaService{
    
    private AvaliarConsultaRepository avaliarConsultaRepository;

    @Autowired
    public AvaliarConsultaServiceImpl(AvaliarConsultaRepository avaliarConsultaRepository) {
        this.avaliarConsultaRepository = avaliarConsultaRepository;
    }

    @Override
    @Transactional
    public AvaliarConsulta salvarAvaliarConsulta(AvaliarConsulta avaliarConsulta){
        return avaliarConsultaRepository.save(avaliarConsulta);
    }

    @Override
    public List<AvaliarConsulta> findAllAvaliarConsulta(){
        return avaliarConsultaRepository.findAll();
    }

    @Override
    public Optional<AvaliarConsulta> findAvaliarConsultaById(Long id){
        return avaliarConsultaRepository.findById(id);
    }



}
