package br.healthassist.healthassist.controller;

import br.healthassist.healthassist.controller.dto.MedicoDto;
import br.healthassist.healthassist.exception.RegraNegocioException;
import br.healthassist.healthassist.model.entity.EspecialidadeMedico;
import br.healthassist.healthassist.model.entity.Medico;
import br.healthassist.healthassist.model.entity.Usuario;
import br.healthassist.healthassist.service.EspecialidadeMedicoService;
import br.healthassist.healthassist.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/medico")
@RequiredArgsConstructor
public class MedicoController {

    private final UsuarioService usuarioService;
    private final EspecialidadeMedicoService especialidadeMedicoService;

    @PostMapping
    public ResponseEntity cadastrarMedico(@RequestBody MedicoDto dto){

        try {
            Medico medicoSalvo = converter(dto);
            return new ResponseEntity(medicoSalvo, HttpStatus.CREATED);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private Medico converter(MedicoDto dto){



        Medico medico = Medico.builder()
                .endereco(dto.getEndereco())
                .dataNasc(dto.getData_nasc())
                .codigoDeRegistro(dto.getCodigo_de_registro())
                .nomeCompleto(dto.getNome_completo())
                .build();

        EspecialidadeMedico especialidadeMedico = especialidadeMedicoService
                .obterPorId(dto.getId_especialidade_medico())
                .orElseThrow( () -> new RegraNegocioException("Especialidade não encontrada para o id informado;") );

        medico.setEspecialidadeMedico(especialidadeMedico);

        Usuario usuario = usuarioService
                .obterPorId(dto.getId_usuario())
                .orElseThrow( () -> new RegraNegocioException("Usuario não encontrado para o id informado."));

        medico.setUsuario(usuario);

        return medico;
    }

}
