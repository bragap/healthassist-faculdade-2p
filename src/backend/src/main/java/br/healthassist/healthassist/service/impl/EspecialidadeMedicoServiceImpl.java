package br.healthassist.healthassist.service.impl;

import br.healthassist.healthassist.model.entity.EspecialidadeMedico;
import br.healthassist.healthassist.model.repository.EspecialidadeMedicoRepository;
import br.healthassist.healthassist.service.EspecialidadeMedicoService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EspecialidadeMedicoServiceImpl implements EspecialidadeMedicoService {

    EspecialidadeMedicoRepository especialidadeMedicoRepository;

    @Override
    public Optional<EspecialidadeMedico> obterPorId(Long id) {
        return especialidadeMedicoRepository.findById(id);
    }
}
