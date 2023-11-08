package br.healthassist.healthassist.controller.dto;

import java.time.LocalDate;
import br.healthassist.healthassist.model.entity.Usuario;
import lombok.Data;

@Data
public class PacienteDto {

    private String endereco;
    private LocalDate dataNasc;
    private String nomeCompleto;
    private Usuario usuario;
    
}
