package br.healthassist.healthassist.service.impl;

import br.healthassist.healthassist.model.entity.Medico;
import br.healthassist.healthassist.model.repository.MedicoRepository;
import br.healthassist.healthassist.service.MedicoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MedicoServiceImpl implements MedicoService {

    private MedicoRepository medicoRepository;

    public MedicoServiceImpl(MedicoRepository medicoRepository) {
        this.medicoRepository = medicoRepository;
    }

    @Override
    @Transactional
    public Medico salvarMedico(Medico medico) {
        return medicoRepository.save(medico);
    }

    @Override
    public List<Medico> findAllMedico() {
        return medicoRepository.findAll();
    }

    @Override
    public Optional<Medico> finfById(Long id) {
        return medicoRepository.findById(id);
    }
}
