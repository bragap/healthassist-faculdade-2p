package br.healthassist.healthassist.model.entity;



import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "avaliar_consulta")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AvaliarConsulta {
    

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "cometario")
    private String comentario;

    @ManyToOne
    @JoinColumn(name = "id_consulta")
    private Consulta consulta;


}
