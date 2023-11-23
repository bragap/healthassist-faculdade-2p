package br.healthassist.healthassist.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.healthassist.healthassist.model.entity.Indicators.AvaliacoesPorConsulta;
import br.healthassist.healthassist.model.entity.Indicators.ResultadoConsultaMedicos;
import br.healthassist.healthassist.service.MedicoService;
import br.healthassist.healthassist.service.PacienteService;
import br.healthassist.healthassist.service.Indicators.AvaliacoesPorConsultasService;
import br.healthassist.healthassist.service.Indicators.ResultadoConsultaMedicosService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/indicadores")
@RequiredArgsConstructor
public class IndicadorController {
    
    private final PacienteService pacienteService;
    private final ResultadoConsultaMedicosService resultadoConsultaMedicosService;
    private final MedicoService medicoService;
    private final AvaliacoesPorConsultasService avaliacoesPorConsultasService;

    @GetMapping("/quantidade-pacientes")
    public ResponseEntity pacientePorMes(){
        try{
            List<Integer> pacientes =  pacienteService.getPacientesByMonth();
            return new ResponseEntity<>(pacientes, HttpStatus.OK);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/media-consultas-medicos")
    public ResponseEntity resultadoConsultasMedicos(){
        try{
        List<ResultadoConsultaMedicos> consutasMedicos =  resultadoConsultaMedicosService.obterResultados();
            return new ResponseEntity<>(consutasMedicos, HttpStatus.OK);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/quantidade-medicos")
    public ResponseEntity medicosPorMes(){
        try{
            List<Integer> medicos =  medicoService.getMedicosByMonth();
            return new ResponseEntity<>(medicos, HttpStatus.OK);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/avaliacoes-por-cosulta")
    public ResponseEntity avalicoesPorConsulta(){
        try{
            List<AvaliacoesPorConsulta> avaliacoesPorConsultas =  avaliacoesPorConsultasService.obterResultados();
            return new ResponseEntity<>(avaliacoesPorConsultas, HttpStatus.OK);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
