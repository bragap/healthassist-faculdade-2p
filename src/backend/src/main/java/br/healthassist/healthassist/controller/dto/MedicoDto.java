package br.healthassist.healthassist.controller.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicoDto {

    private String endereco;
    private String data_nasc;
    private String codigo_de_registro;
    private String nome_completo;
    private Long id_usuario;
    private List<EspecialidadeDto> especialidades;

}
