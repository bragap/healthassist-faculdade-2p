package br.healthassist.healthassist.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.healthassist.healthassist.model.entity.Indicators.ResultadoConsultaMedicos;
import br.healthassist.healthassist.model.entity.Indicators.TaxaHorarioConsulta;
import br.healthassist.healthassist.service.AvaliarConsultaService;
import br.healthassist.healthassist.service.ConsultaService;
import br.healthassist.healthassist.service.MedicoService;
import br.healthassist.healthassist.service.PacienteService;
import br.healthassist.healthassist.service.Indicators.ResultadoConsultaMedicosService;
import br.healthassist.healthassist.service.Indicators.TaxaHorarioConsultaService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/indicadores")
@RequiredArgsConstructor
public class IndicadorController {
    
    private final PacienteService pacienteService;
    private final ResultadoConsultaMedicosService resultadoConsultaMedicosService;
    private final MedicoService medicoService;
    private final AvaliarConsultaService avaliacoesPorConsultasService;
    private final ConsultaService consultaService;
    private final TaxaHorarioConsultaService taxaHorarioConsultaService;


    @GetMapping("/cadastro-pacientes-mensal")
    public ResponseEntity pacientePorMes(){
        try{
            List<Integer> pacientes =  pacienteService.getPacientesByMonth();
            return new ResponseEntity<>(pacientes, HttpStatus.OK);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/media-consultas-medico")
    public ResponseEntity resultadoConsultasMedicos(){
        try{
        List<ResultadoConsultaMedicos> consutasMedicos =  resultadoConsultaMedicosService.obterResultados();
            return new ResponseEntity<>(consutasMedicos, HttpStatus.OK);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/cadastro-medicos-mensal")
    public ResponseEntity medicosPorMes(){
        try{
            List<Integer> medicos =  medicoService.getMedicosByMonth();
            return new ResponseEntity<>(medicos, HttpStatus.OK);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/taxa-avaliacoes-por-cosultas")
    public ResponseEntity avalicoesPorConsulta(){
        try{
            List<Integer> consultasPorMes = consultaService.getConsultasByMonth();
            List<Integer> avaliacoesPorMes =  avaliacoesPorConsultasService.getAvaliacoesByMonth();
            
            List<Double> percentualPorMes = new ArrayList<>();

            for(int i = 0; i < avaliacoesPorMes.size(); i++){
                if(consultasPorMes.get(i) != 0){
                    double avaliacoesPorMesDouble = (double)avaliacoesPorMes.get(i);
                    double consultasPorMesDouble = (double)consultasPorMes.get(i);
                    percentualPorMes.add((avaliacoesPorMesDouble/consultasPorMesDouble)*100);
                }else
                    percentualPorMes.add(0.0);
                
            }
            
            return new ResponseEntity<>(percentualPorMes, HttpStatus.OK);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/consultas-prestadas-mensal")
    public ResponseEntity consultasPrestadasMensais(){
        try{
            List<Integer> consultasPorMes =  consultaService.getConsultasByMonth();
            return new ResponseEntity<>(consultasPorMes, HttpStatus.OK);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/taxa-horario-consulta")
    public ResponseEntity taxaHorarioConsulta(){
        try{
            List<TaxaHorarioConsulta> consultasPorMes =  taxaHorarioConsultaService.obterResultados();
            return new ResponseEntity<>(consultasPorMes, HttpStatus.OK);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
