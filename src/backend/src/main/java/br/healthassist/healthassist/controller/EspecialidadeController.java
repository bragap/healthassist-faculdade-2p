package br.healthassist.healthassist.controller;

import br.healthassist.healthassist.controller.dto.EspecialidadeDto;
import br.healthassist.healthassist.model.entity.Especialidade;
import br.healthassist.healthassist.service.EspecialidadeService;
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

    private final EspecialidadeService especialidadeService;

    @PostMapping
    public ResponseEntity cadastrarEspecialidade(@RequestBody EspecialidadeDto dto){

        Especialidade especialidadeMedico = Especialidade.builder()
                .nome(dto.getNome()).build();

        try {
            Especialidade especialidadeMedicoSalvo = especialidadeService.salvarEspecialidade(especialidadeMedico);
            return new ResponseEntity(especialidadeMedicoSalvo, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping
    public ResponseEntity buscar(){

        try {
            List<Especialidade> especialidadeMedicoList = especialidadeService.findAllEspecialidade();
            return new ResponseEntity(especialidadeMedicoList, HttpStatus.OK);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity buscarPorId(@PathVariable("id") Long id){

        Optional<Especialidade> especialidadeMedico = especialidadeService.findById(id);

        if(especialidadeMedico.isEmpty()){
            return ResponseEntity.badRequest().body("Especialidade não encontrado na base de dados");
        } else {
            return new ResponseEntity(especialidadeMedico, HttpStatus.OK);
        }

    }

}