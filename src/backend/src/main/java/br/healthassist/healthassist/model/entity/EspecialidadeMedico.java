package br.healthassist.healthassist.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "especialidade_medico")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EspecialidadeMedico {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "especialidade")
    private String especialidade;

}
