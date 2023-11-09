package br.healthassist.healthassist.controller.dto;

import lombok.Data;

@Data
public class AvaliarConsultaDto {
    
    public String titulo;
    public String descricao;
    public Long id_consulta;
}
