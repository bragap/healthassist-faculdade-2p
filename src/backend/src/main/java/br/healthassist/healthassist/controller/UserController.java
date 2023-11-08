package br.healthassist.healthassist.controller;

import br.healthassist.healthassist.controller.dto.MedicoDto;
import br.healthassist.healthassist.controller.dto.UsuarioDto;
import br.healthassist.healthassist.exception.RegraNegocioException;
import br.healthassist.healthassist.model.entity.EspecialidadeMedico;
import br.healthassist.healthassist.model.entity.Medico;
import br.healthassist.healthassist.model.entity.Usuario;
import br.healthassist.healthassist.model.enums.StatusAutorizacao;
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
@RequestMapping("/usuario")
@RequiredArgsConstructor
public class UserController {

    private final UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity salvar(@RequestBody UsuarioDto dto){
        Usuario usuario = Usuario.builder()
                .apelido(dto.getApelido())
                .email(dto.getEmail())
                .senha(dto.getSenha())
                .autorizacao(StatusAutorizacao.valueOf(dto.getAutorizacao()))
                .build();
        try {
            Usuario usuarioSalvo = usuarioService.salvarUsuario(usuario);
            return new ResponseEntity(usuarioSalvo, HttpStatus.CREATED);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
