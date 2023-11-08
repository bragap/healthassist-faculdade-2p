package br.healthassist.healthassist.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.healthassist.healthassist.controller.dto.PacienteDto;
import br.healthassist.healthassist.model.entity.Paciente;
import br.healthassist.healthassist.model.entity.Usuario;
import br.healthassist.healthassist.service.PacienteService;
import br.healthassist.healthassist.service.UsuarioService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/paciente")
@RequiredArgsConstructor
public class PacienteController {
    

    private final PacienteService pacienteService;
    private final UsuarioService usuarioService;
    

    @PostMapping
    public ResponseEntity salvar(PacienteDto dto){


    }

    private Paciente converter(PacienteDto dto){
        Paciente paciente = Paciente.builder()
                                    .endereco(dto.getEndereco())
                                    .dataNasc(dto.getDataNasc())
                                    .nomeCompleto(dto.getNomeCompleto())
                                    .build();
                                
    }
}
