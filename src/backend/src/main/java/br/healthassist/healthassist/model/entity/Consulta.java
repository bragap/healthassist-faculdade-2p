package br.healthassist.healthassist.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "consulta")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Consulta {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_medico")
    private Medico medico;

    @ManyToOne
    @JoinColumn(name = "id_paciente")
    private Paciente paciente;

    @Column(name = "data_hora_consulta")
    private LocalDateTime dataHoraConsulta;

    @Column(name = "resposta_anamnese")
    private String respostaAnamnese;

}
