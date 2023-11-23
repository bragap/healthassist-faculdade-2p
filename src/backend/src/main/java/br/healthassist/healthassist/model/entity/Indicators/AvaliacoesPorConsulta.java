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
public class AvaliacoesPorConsulta {



    private int ano;
    private int mes;
    private int qtd_consultas;
    private int qtd_avaliacoes;
    @Id
    private int percentual;
    

    // Construtores, getters e setters
}