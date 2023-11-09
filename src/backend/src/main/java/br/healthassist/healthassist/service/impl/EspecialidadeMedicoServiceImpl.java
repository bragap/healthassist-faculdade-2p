package br.healthassist.healthassist.service.impl;

import br.healthassist.healthassist.model.entity.EspecialidadeMedico;
import br.healthassist.healthassist.model.repository.EspecialidadeMedicoRepository;
import br.healthassist.healthassist.service.EspecialidadeMedicoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class EspecialidadeMedicoServiceImpl implements EspecialidadeMedicoService {

    EspecialidadeMedicoRepository especialidadeMedicoRepository;

    public EspecialidadeMedicoServiceImpl(EspecialidadeMedicoRepository especialidadeMedicoRepository) {
        this.especialidadeMedicoRepository = especialidadeMedicoRepository;
    }

    @Override
    @Transactional
    public EspecialidadeMedico salvarEspecialidade(EspecialidadeMedico especialidadeMedico) {
        return especialidadeMedicoRepository.save(especialidadeMedico);
    }

    @Override
    public Optional<EspecialidadeMedico> findById(Long id) {
        return especialidadeMedicoRepository.findById(id);
    }

    @Override
    public List<EspecialidadeMedico> findAllEspecialidade() {
        return especialidadeMedicoRepository.findAll();
    }
}
