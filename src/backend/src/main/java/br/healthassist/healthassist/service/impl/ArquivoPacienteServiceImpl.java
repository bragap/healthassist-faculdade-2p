package br.healthassist.healthassist.service.impl;

import java.util.List;
import java.util.Optional;

import br.healthassist.healthassist.exception.RegraNegocioException;
import br.healthassist.healthassist.model.entity.ArquivoPaciente;
import br.healthassist.healthassist.model.repository.ArquivoPacienteRepository;
import br.healthassist.healthassist.service.ArquivoPacienteService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class ArquivoPacienteServiceImpl implements ArquivoPacienteService {

    private ArquivoPacienteRepository arquivosPacienteRepository;

    public ArquivoPacienteServiceImpl(ArquivoPacienteRepository arquivoPacienteRepository){
        this.arquivosPacienteRepository = arquivoPacienteRepository;
    }

    @Override
    public void salvarArquivoPaciente(ArquivoPaciente arquivoPaciente) {
        arquivosPacienteRepository.save(arquivoPaciente);
    }

    @Override
    public List<ArquivoPaciente> findAllArquivosPaciente(){
        return arquivosPacienteRepository.findAll();
    }

    @Override
    public Optional<ArquivoPaciente> findArquivosPacienteById(long id){
        return arquivosPacienteRepository.findById(id);
    }

    @Override
    public ArquivoPaciente obterArquivoPorId(Long id) {
        Optional<ArquivoPaciente> arquivoPaciente = arquivosPacienteRepository.findById(id);
        return arquivoPaciente.orElseThrow(() -> new RegraNegocioException("Id não encontrado"));
    }

}
