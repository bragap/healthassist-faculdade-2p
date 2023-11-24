package br.healthassist.healthassist.controller.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

@Data
public class ConsultaDto {
    private Long idMedico;
    private Long idPaciente;
    private String dataHoraConsulta;
    private String respostaAnamnese;

}
