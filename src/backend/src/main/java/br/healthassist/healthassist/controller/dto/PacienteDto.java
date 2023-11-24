package br.healthassist.healthassist.controller.dto;

import java.time.LocalDate;
import lombok.Data;

@Data
public class PacienteDto {

    private String endereco;
    private String dataNasc;
    private String nomeCompleto;
    private Long id_usuario;
    
}
