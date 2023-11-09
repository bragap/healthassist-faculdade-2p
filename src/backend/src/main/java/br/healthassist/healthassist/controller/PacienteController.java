package br.healthassist.healthassist.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.healthassist.healthassist.controller.dto.PacienteDto;
import br.healthassist.healthassist.exception.RegraNegocioException;
import br.healthassist.healthassist.model.entity.Paciente;
import br.healthassist.healthassist.model.entity.Usuario;
import br.healthassist.healthassist.service.PacienteService;
import br.healthassist.healthassist.service.UsuarioService;
import br.healthassist.healthassist.service.impl.PacienteServiceImpl;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/paciente")
@RequiredArgsConstructor
public class PacienteController {
    

    private final PacienteService pacienteService;
    private final UsuarioService usuarioService;
    

    @PostMapping
    public ResponseEntity salvar(@RequestBody PacienteDto dto){
        try{
            Paciente pacienteSalvo = pacienteService.salvarPaciente(converterDto(dto));
            return new ResponseEntity(pacienteSalvo, HttpStatus.CREATED);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity obterPacientes(){
        try{
            List<Paciente> pacientes = pacienteService.findAllPacientes();
            return new ResponseEntity<>(pacientes, HttpStatus.OK);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("/{id}")
        public ResponseEntity obterPacientePorId(@PathVariable Long id){
        System.out.println(id);
        try{
            Paciente paciente = pacienteService.findPacienteById(id);
            return new ResponseEntity<>( paciente , HttpStatus.OK);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
        public ResponseEntity alterarDadosPacientePorId(@PathVariable Long id, @RequestBody PacienteDto dto){
            try{
                Paciente paciente = pacienteService.updatePaciente( id, converterDto(dto));
                return new ResponseEntity<>( paciente , HttpStatus.OK);
            }catch(Exception e){
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
    
    private Paciente converterDto(PacienteDto dto){
        
        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        LocalDate dataNasc = LocalDate.parse(dto.getDataNasc(), dateFormat);
        


        Paciente paciente = Paciente.builder()
                                    .endereco(dto.getEndereco())
                                    .dataNasc(dataNasc)
                                    .nomeCompleto(dto.getNomeCompleto())
                                    .build();


        Usuario usuario = usuarioService.findById(dto.getId_usuario())
                                        .orElseThrow(() -> new RegraNegocioException("Usuário não encontrado para o id informado"));

        paciente.setUsuario(usuario);

        return paciente;
    }




}
