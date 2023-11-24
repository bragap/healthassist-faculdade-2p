package br.healthassist.healthassist.service.impl;

import br.healthassist.healthassist.exception.RegraNegocioException;
import br.healthassist.healthassist.model.entity.ArquivoMedico;
import br.healthassist.healthassist.model.repository.ArquivoMedicoRepository;
import br.healthassist.healthassist.service.ArquivoMedicoService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ArquivoMedicoServiceImpl implements ArquivoMedicoService {

    private ArquivoMedicoRepository arquivoMedicoRepository;

    public  ArquivoMedicoServiceImpl(ArquivoMedicoRepository arquivoMedicoRepository){
        this.arquivoMedicoRepository = arquivoMedicoRepository;
    }

    @Override
    public void salvarArquivo(ArquivoMedico arquivoMedico) {
        arquivoMedicoRepository.save(arquivoMedico);
    }

    @Override
    public ArquivoMedico obterArquivoPorId(Long id) {
        Optional<ArquivoMedico> arquivoMedico = arquivoMedicoRepository.findById(id);
        return arquivoMedico.orElseThrow(() -> new RegraNegocioException("Id não encontrado"));

    }
}
