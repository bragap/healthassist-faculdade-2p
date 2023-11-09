package br.healthassist.healthassist.controller.dto;

import lombok.Data;

@Data
public class AvaliarConsultaDto {
    public String titulo;
    public String comentario;
    public Long id_consulta;
}
