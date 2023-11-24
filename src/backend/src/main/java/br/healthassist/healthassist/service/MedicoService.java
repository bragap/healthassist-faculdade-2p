package br.healthassist.healthassist.service;

import br.healthassist.healthassist.controller.dto.AtualizarStatusDto;
import br.healthassist.healthassist.model.entity.Medico;

import java.util.List;
import java.util.Optional;

public interface MedicoService {

    Medico salvarMedico(Medico medico);

    List<Medico> findAllMedico();

    Optional<Medico> findById(Long id);

    public Medico updateStatusMedico(Long id, AtualizarStatusDto dto);

    void validar(Medico medico);

    public Medico findMedicoById(Long id);

    public Medico updateMedico(Long id, Medico medico);

    List<Integer> getMedicosByMonth();

}
