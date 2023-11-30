package br.healthassist.healthassist.service;

import java.util.List;
import java.util.Optional;

import br.healthassist.healthassist.model.entity.ArquivoPaciente;


public interface ArquivoPacienteService {

    void salvarArquivoPaciente(ArquivoPaciente arquivosPaciente);

    List<ArquivoPaciente> findAllArquivosPaciente();
    
    public Optional<ArquivoPaciente> findArquivosPacienteById(long id);

    ArquivoPaciente obterArquivoPorId(Long id);
} 