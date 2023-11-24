package br.healthassist.healthassist.controller.dto;

import br.healthassist.healthassist.model.entity.Paciente;
import lombok.Data;

@Data
public class ArquivoPacienteDto {
    
    private Paciente paciente;
    private String tipoMime; 
    private byte[] dadosArquivo; 
    private int aprovado;
    private String motivoInviabiliadade;
    
}
