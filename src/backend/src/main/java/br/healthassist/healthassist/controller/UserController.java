package br.healthassist.healthassist.controller;

import br.healthassist.healthassist.controller.dto.UsuarioAutenticadoDto;
import br.healthassist.healthassist.controller.dto.UsuarioDto;
import br.healthassist.healthassist.exception.AutenticacaoException;
import br.healthassist.healthassist.model.entity.Usuario;
import br.healthassist.healthassist.model.enums.StatusAutorizacao;
import br.healthassist.healthassist.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
@RequiredArgsConstructor
public class UserController {

    private final UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity cadastrarUsuario(@RequestBody UsuarioDto dto){
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

    @GetMapping
    public ResponseEntity buscar(){

        try {
            List<Usuario> usuarioSalvo = usuarioService.findAllUsuario();
            return new ResponseEntity(usuarioSalvo, HttpStatus.OK);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity buscarPorId(@PathVariable("id") Long id){

        Optional<Usuario> usuario = usuarioService.findById(id);

        if(usuario.isEmpty()){
            return ResponseEntity.badRequest().body("Usuario não encontrado na base de dados");
        } else {
            return new ResponseEntity(usuario, HttpStatus.OK);
        }

    }

    @PostMapping("/login")
    public ResponseEntity autenticar( @RequestBody UsuarioDto dto ){

        // converter em dto

        try {
            Usuario usuarioAutenticado = usuarioService.autenticar(dto.getEmail(), dto.getSenha());
            UsuarioAutenticadoDto usuarioAutenticadoDto = new UsuarioAutenticadoDto();
            usuarioAutenticadoDto.setApelido(usuarioAutenticado.getApelido());
            usuarioAutenticadoDto.setAutorizacao(usuarioAutenticado.getAutorizacao().toString());
            return new ResponseEntity(usuarioAutenticadoDto, HttpStatus.OK);
        } catch (AutenticacaoException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
