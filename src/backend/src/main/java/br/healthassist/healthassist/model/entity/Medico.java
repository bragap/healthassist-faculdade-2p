package br.healthassist.healthassist.model.entity;

import br.healthassist.healthassist.model.enums.StatusAprovacao;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import java.time.LocalDate;
import java.util.List;

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
    @Convert(converter = Jsr310JpaConverters.LocalDateConverter.class)
    private LocalDate dataNasc;

    @Column(name = "codigo_de_registro")
    private String codigoDeRegistro;

    @Column(name = "nome_completo")
    private String nomeCompleto;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @Column(name = "aprovacao")
    @Enumerated(EnumType.STRING)
    private StatusAprovacao aprovacao;

    @ManyToMany
    @JoinTable(
            name = "medico_especialidade",
            joinColumns = @JoinColumn(name = "id_medico"),
            inverseJoinColumns = @JoinColumn(name = "id_especialidade"))
    private List<Especialidade> especialidades;

}
