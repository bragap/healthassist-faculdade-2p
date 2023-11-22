package br.healthassist.healthassist.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;

@Entity
@Table(name = "disponibilidade_de_horario")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DisponibilidadeDeHorario {

    @ManyToOne
    @JoinColumn(name = "id_medico")
    private Medico idMedico;

    @Column(name = "horario_inicio")
    private Time horarioInicio;

    @Column(name = "horario_fim")
    private Time horarioFim;

    @ManyToOne
    @JoinColumn(name = "id_dia_semana")
    private DiaDaSemana idDiaSemana;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

}
