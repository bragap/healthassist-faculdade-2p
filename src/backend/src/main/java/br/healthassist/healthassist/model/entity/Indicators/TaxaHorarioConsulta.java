package br.healthassist.healthassist.model.entity.Indicators;


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
public class TaxaHorarioConsulta {


    @Id
    private int hora;
    private int quantidade_consultas;
    private double percentual;

    // Construtores, getters e setters
}