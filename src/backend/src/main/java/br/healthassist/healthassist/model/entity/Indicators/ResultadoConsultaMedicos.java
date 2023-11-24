package br.healthassist.healthassist.model.entity.Indicators;


import br.healthassist.healthassist.model.enums.StatusAprovacao;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResultadoConsultaMedicos {


    @Id
    private int id_medico;
    private double quantidade_media_consultas;

    // Construtores, getters e setters
}