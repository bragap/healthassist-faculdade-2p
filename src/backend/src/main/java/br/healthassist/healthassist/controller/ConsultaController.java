package br.healthassist.healthassist.controller;

import br.healthassist.healthassist.controller.dto.ConsultaDto;
import br.healthassist.healthassist.model.entity.Consulta;
import br.healthassist.healthassist.model.entity.Paciente;
import br.healthassist.healthassist.service.ConsultaService;
import br.healthassist.healthassist.service.PacienteService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/consulta")
@RequiredArgsConstructor
public class ConsultaController {

    private final ConsultaService consultaService;
    private final PacienteService pacienteService;

    public Consulta convertDto(@RequestBody ConsultaDto dto){
        Consulta consulta = Consulta.builder()
                                    .medico()
                                    .paciente()

        Paciente paciente = pacienteService.findPacienteById(dto.getIdPaciente());
        
    }


}
