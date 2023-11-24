package br.healthassist.healthassist.service.impl;

import br.healthassist.healthassist.model.entity.Especialidade;
import br.healthassist.healthassist.model.repository.EspecialidadeRepository;
import br.healthassist.healthassist.service.EspecialidadeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class EspecialidadeServiceImpl implements EspecialidadeService {

    EspecialidadeRepository especialidadeRepository;

    public EspecialidadeServiceImpl(EspecialidadeRepository especialidadeMedicoRepository) {
        this.especialidadeRepository = especialidadeMedicoRepository;
    }

    @Override
    @Transactional
    public Especialidade salvarEspecialidade(Especialidade especialidadeMedico) {
        return especialidadeRepository.save(especialidadeMedico);
    }

    @Override
    public Optional<Especialidade> findById(Long id) {
        return especialidadeRepository.findById(id);
    }

    @Override
    public List<Especialidade> findAllEspecialidade() {
        return especialidadeRepository.findAll();
    }

    @Override
    public Especialidade findByNome(String nome) {
        return especialidadeRepository.findByNome(nome);
    }
}
