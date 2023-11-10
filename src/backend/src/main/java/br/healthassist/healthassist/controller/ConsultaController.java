package br.healthassist.healthassist.controller;

import br.healthassist.healthassist.controller.dto.ConsultaDto;
import br.healthassist.healthassist.controller.dto.PacienteDto;
import br.healthassist.healthassist.exception.RegraNegocioException;
import br.healthassist.healthassist.model.entity.Consulta;
import br.healthassist.healthassist.model.entity.Medico;
import br.healthassist.healthassist.model.entity.Paciente;
import br.healthassist.healthassist.service.ConsultaService;
import br.healthassist.healthassist.service.MedicoService;
import br.healthassist.healthassist.service.PacienteService;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/consulta")
@RequiredArgsConstructor
public class ConsultaController {

    private final ConsultaService consultaService;
    private final PacienteService pacienteService;
    private final MedicoService medicoService;


    @PostMapping
    public ResponseEntity salvar(@RequestBody ConsultaDto dto){
        try{
            Consulta consultaSalva = consultaService.salvarConsutla(converterDto(dto));
            return new ResponseEntity(consultaSalva, HttpStatus.CREATED);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity obterConsulta(){
        try{
            List<Consulta> consultas = consultaService.findAll();
            return new ResponseEntity<>(consultas, HttpStatus.OK);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
        public ResponseEntity obterConsultaPorId(@PathVariable Long id){
            try{

                Consulta comConsulta = consultaService.findById(id);
                return new ResponseEntity<>(comConsulta , HttpStatus.OK);

            }catch(Exception e){

                return ResponseEntity.badRequest().body(e.getMessage());
                
            }

    }




    public Consulta converterDto(@RequestBody ConsultaDto dto){

        DateTimeFormatter dateTimeFormat = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

        LocalDateTime dataHoraConsulta = LocalDateTime.parse( dto.getDataHoraConsulta(), dateTimeFormat);


        Paciente paciente = pacienteService.findPacienteById(dto.getIdPaciente());
        Medico medico = medicoService.finfById(dto.getIdMedico())
                                      .orElseThrow(() -> new RegraNegocioException("Médico não encontrado para o id informado"));

        return  Consulta.builder()
                                    .respostaAnamnese(dto.getRespostaAnamnese())
                                    .dataHoraConsulta(dataHoraConsulta)
                                    .medico(medico)
                                    .paciente(paciente)
                                    .build();
    }

}
