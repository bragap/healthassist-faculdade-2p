package br.healthassist.healthassist.controller;

import br.healthassist.healthassist.controller.dto.EspecialidadeMedicoDto;
import br.healthassist.healthassist.model.entity.EspecialidadeMedico;
import br.healthassist.healthassist.model.entity.Medico;
import br.healthassist.healthassist.service.EspecialidadeMedicoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/especialidade-medico")
@RequiredArgsConstructor
public class EspecialidadeController {

    private final EspecialidadeMedicoService especialidadeMedicoService;

    @PostMapping
    public ResponseEntity cadastrarEspecialidade(@RequestBody EspecialidadeMedicoDto dto){

        EspecialidadeMedico especialidadeMedico = EspecialidadeMedico.builder()
                .especialidade(dto.getEspecialidade()).build();

        try {
            EspecialidadeMedico especialidadeMedicoSalvo = especialidadeMedicoService.salvarEspecialidade(especialidadeMedico);
            return new ResponseEntity(especialidadeMedicoSalvo, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping
    public ResponseEntity buscar(){

        try {
            List<EspecialidadeMedico> especialidadeMedicoList = especialidadeMedicoService.findAllEspecialidade();
            return new ResponseEntity(especialidadeMedicoList, HttpStatus.OK);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity buscarPorId(@PathVariable("id") Long id){

        Optional<EspecialidadeMedico> especialidadeMedico = especialidadeMedicoService.findById(id);

        if(especialidadeMedico.isEmpty()){
            return ResponseEntity.badRequest().body("Especialidade não encontrado na base de dados");
        } else {
            return new ResponseEntity(especialidadeMedico, HttpStatus.OK);
        }

    }

}
