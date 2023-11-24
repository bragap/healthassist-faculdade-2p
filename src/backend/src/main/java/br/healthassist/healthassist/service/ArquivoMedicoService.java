package br.healthassist.healthassist.service;

import br.healthassist.healthassist.model.entity.ArquivoMedico;

public interface ArquivoMedicoService {

    void salvarArquivo(ArquivoMedico arquivoMedico);

    ArquivoMedico obterArquivoPorId(Long id);

}
