package br.healthassist.healthassist.service;

import java.util.List;
import java.util.Optional;

import br.healthassist.healthassist.model.entity.ArquivosPaciente;


public interface ArquivosPacienteService {

    ArquivosPaciente salvarArquivoPaciente(ArquivosPaciente arquivosPaciente);

    List<ArquivosPaciente> findAllArquivosPaciente();
    
    public Optional<ArquivosPaciente> findArquivosPacienteById(long id);
} 