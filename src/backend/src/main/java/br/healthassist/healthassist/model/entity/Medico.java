package br.healthassist.healthassist.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "medico")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Medico {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "endereco")
    private String endereco;

    @Column(name = "data_nasc")
    private LocalDate dataNasc;

    @Column(name = "codigo_de_registro")
    private String codigoDeRegistro;

    @ManyToOne
    @JoinColumn(name = "id_especialidade_medico")
    private EspecialidadeMedico especialidadeMedico;

    @Column(name = "nome_completo")
    private String nomeCompleto;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

}
