package br.healthassist.healthassist.controller.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDto {

    private String apelido;
    private String email;
    private String senha;
    private String autorizacao;

}
