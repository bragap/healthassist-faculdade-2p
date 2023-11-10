package br.healthassist.healthassist.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.healthassist.healthassist.controller.dto.AvaliarConsultaDto;
import br.healthassist.healthassist.controller.dto.PacienteDto;
import br.healthassist.healthassist.model.entity.AvaliarConsulta;
import br.healthassist.healthassist.model.entity.Consulta;
import br.healthassist.healthassist.model.entity.Paciente;
import br.healthassist.healthassist.service.AvaliarConsultaService;
import br.healthassist.healthassist.service.ConsultaService;
import br.healthassist.healthassist.service.impl.ConsultaServiceImpl;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/avaliar-consulta")
@RequiredArgsConstructor
public class AvaliarConsultaController {

    private final AvaliarConsultaService avaliarConsultaService;
    private final ConsultaService consultaService;
     
    @PostMapping
    public ResponseEntity salvar(@RequestBody AvaliarConsultaDto dto){
        try{
            AvaliarConsulta avaliarConsultaSalva = avaliarConsultaService.salvarAvaliarConsulta(converterDto(dto));
            return new ResponseEntity(avaliarConsultaSalva, HttpStatus.CREATED);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity obterConsultas(){
        try{
            List<AvaliarConsulta> avaliarConsultaSalvas = avaliarConsultaService.findAllAvaliarConsulta(); 
            return new ResponseEntity(avaliarConsultaSalvas, HttpStatus.OK);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }




   
    private AvaliarConsulta converterDto(AvaliarConsultaDto dto){
        Consulta consulta = consultaService.findById(dto.getId_consulta());

        AvaliarConsulta avaliarConsulta = AvaliarConsulta.builder()
                                                        .titulo(dto.getTitulo())
                                                        .comentario(dto.getComentario())
                                                        .consulta(consulta)
                                                .build();

        return avaliarConsulta;
    }
    
}
