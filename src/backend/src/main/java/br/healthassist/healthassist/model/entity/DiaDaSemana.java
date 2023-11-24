package br.healthassist.healthassist.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "dia_da_semana")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DiaDaSemana {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_dia")
    private String nomeDia;

}
