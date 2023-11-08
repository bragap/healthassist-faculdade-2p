package br.healthassist.healthassist.service.impl;

import java.util.List;
import java.util.Optional;

import br.healthassist.healthassist.model.entity.ArquivosPaciente;
import br.healthassist.healthassist.model.repository.ArquivosPacienteRepository;
import br.healthassist.healthassist.service.ArquivosPacienteService;
import jakarta.transaction.Transactional;

public class ArquivoPacienteServiceImpl implements ArquivosPacienteService {
    

    private ArquivosPacienteRepository arquivosPacienteRepository;


    @Override
    @Transactional
    public ArquivosPaciente salvarArquivoPaciente(ArquivosPaciente arquivoPacienteServiceImpl) {
        return arquivosPacienteRepository.save(arquivoPacienteServiceImpl);
    }

    @Override
    public List<ArquivosPaciente> findAllArquivosPaciente(){
        return arquivosPacienteRepository.findAll();
    }

    @Override
    public Optional<ArquivosPaciente> findArquivosPacienteById(long id){
        return arquivosPacienteRepository.findById(id);
    }

}
