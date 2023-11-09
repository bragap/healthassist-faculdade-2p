package br.healthassist.healthassist.controller;

import br.healthassist.healthassist.controller.dto.MedicoDto;
import br.healthassist.healthassist.controller.dto.UsuarioAutenticadoDto;
import br.healthassist.healthassist.exception.RegraNegocioException;
import br.healthassist.healthassist.model.entity.EspecialidadeMedico;
import br.healthassist.healthassist.model.entity.Medico;
import br.healthassist.healthassist.model.entity.Usuario;
import br.healthassist.healthassist.service.EspecialidadeMedicoService;
import br.healthassist.healthassist.service.MedicoService;
import br.healthassist.healthassist.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/medico")
@RequiredArgsConstructor
public class MedicoController {

    private final UsuarioService usuarioService;
    private final EspecialidadeMedicoService especialidadeMedicoService;
    private final MedicoService medicoService;

    @PostMapping
    public ResponseEntity cadastrarMedico(@RequestBody MedicoDto dto){

        try {
            Medico medicoSalvo = medicoService.salvarMedico(converter(dto));
            return new ResponseEntity(medicoSalvo, HttpStatus.CREATED);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity buscar(){
        try {
            List<Medico> medicoList = medicoService.findAllMedico();
            return new ResponseEntity(medicoList, HttpStatus.OK);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity buscarPorId(@PathVariable("id") Long id){

        UsuarioAutenticadoDto usuarioAutenticadoDto;

        Optional<Medico> medico = medicoService.finfById(id);

        if(medico.isEmpty()){
            return ResponseEntity.badRequest().body("Medico não encontrado na base de dados");
        } else {
            return new ResponseEntity(medico, HttpStatus.OK);
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity alterarDados(@PathVariable("id") Long id, MedicoDto dto){
        return medicoService.finfById(id).map( entity -> {
            Medico medico = converter(dto);
            medico.setId(entity.getId());
            // falta aqui
            return ResponseEntity.ok(medico);
        }).orElseGet( () ->
                new ResponseEntity("Medico não encontrado na base de dados", HttpStatus.BAD_REQUEST));
    }

    private Medico converter(MedicoDto dto){

        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate dataNasc = LocalDate.parse(dto.getData_nasc(), dateFormat);

        Medico medico = Medico.builder()
                .endereco(dto.getEndereco())
                .dataNasc(dataNasc)
                .codigoDeRegistro(dto.getCodigo_de_registro())
                .nomeCompleto(dto.getNome_completo())
                .build();

        EspecialidadeMedico especialidadeMedico = especialidadeMedicoService
                .findById(dto.getId_especialidade_medico())
                .orElseThrow( () -> new RegraNegocioException("Especialidade não encontrada para o id informado;") );

        medico.setEspecialidadeMedico(especialidadeMedico);

        Usuario usuario = usuarioService
                .findById(dto.getId_usuario())
                .orElseThrow( () -> new RegraNegocioException("Usuario não encontrado para o id informado."));

        medico.setUsuario(usuario);

        return medico;
    }

}
