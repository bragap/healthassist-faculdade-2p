package br.healthassist.healthassist.service.impl;

import br.healthassist.healthassist.exception.RegraNegocioException;
import br.healthassist.healthassist.model.entity.Medico;
import br.healthassist.healthassist.model.repository.MedicoRepository;
import br.healthassist.healthassist.service.MedicoService;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
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

    @Override
    public Medico atualizar(Medico medico) {
        Objects.requireNonNull(medico.getId());
        validar(medico);
        return medicoRepository.save(medico);
    }

    @Override
    public void validar(Medico medico) {

        if(medico.getEndereco() == null || medico.getEndereco().trim().equals("")){
            throw new RegraNegocioException("Informe um endereço válido");
        }

        if(medico.getDataNasc() == null){
            throw new RegraNegocioException("Informe uma data válida");
        }

        if(medico.getCodigoDeRegistro() == null || medico.getCodigoDeRegistro().trim().equals("")){
            throw new RegraNegocioException("Informe um código de registro válido");
        }

        if(medico.getEspecialidadeMedico() == null){
            throw new RegraNegocioException("Informe um especilidade válido");
        }

        if(medico.getNomeCompleto() == null){
            throw new RegraNegocioException("Informe um nome completo válido");
        }

    }

    @Override
    public Medico findMedicoById(Long id) {
        Optional<Medico> medico = medicoRepository.findById(id);
        return  medico.orElseThrow(() -> new RuntimeException(
                "Medico não encontrado! : "  + id + "Tipo: " + User.class.getName()
        ));
    }

    @Override
    @Transactional
    public Medico updateMedico(Long id, Medico medico) {
        Medico newMedico = findMedicoById(id);

        newMedico.setEndereco(medico.getEndereco());
        newMedico.setDataNasc(medico.getDataNasc());
        newMedico.setNomeCompleto(medico.getNomeCompleto());

        return medicoRepository.save(newMedico);
    }
}
