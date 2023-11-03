package br.healthassist.healthassist.controller.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicoDto {

    private String endereco;
    private LocalDate data_nasc;
    private String codigo_de_registro;
    private Long id_especialidade_medico;
    private String nome_completo;
    private Long id_usuario;


}
