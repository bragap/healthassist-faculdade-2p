package br.healthassist.healthassist.controller.dto;

import lombok.Data;

@Data
public class UsuarioAutenticadoDto {

    private Long id;
    private String apelido;
    private String autorizacao;

}
