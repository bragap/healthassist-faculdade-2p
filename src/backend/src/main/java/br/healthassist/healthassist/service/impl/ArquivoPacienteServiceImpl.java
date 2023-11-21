package br.healthassist.healthassist.service.impl;

import java.util.List;
import java.util.Optional;

import br.healthassist.healthassist.model.entity.ArquivoPaciente;
import br.healthassist.healthassist.model.repository.ArquivoPacienteRepository;
import br.healthassist.healthassist.service.ArquivoPacienteService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class ArquivoPacienteServiceImpl implements ArquivoPacienteService {

    private ArquivoPacienteRepository arquivosPacienteRepository;

    @Override
    @Transactional
    public ArquivoPaciente salvarArquivoPaciente(ArquivoPaciente arquivoPacienteServiceImpl) {
        return arquivosPacienteRepository.save(arquivoPacienteServiceImpl);
    }

    @Override
    public List<ArquivoPaciente> findAllArquivosPaciente(){
        return arquivosPacienteRepository.findAll();
    }

    @Override
    public Optional<ArquivoPaciente> findArquivosPacienteById(long id){
        return arquivosPacienteRepository.findById(id);
    }

}
