package br.healthassist.healthassist.model.entity;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "arquivos_paciente")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class ArquivosPaciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    @Column(name = "id", unique =  true)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false, updatable = false)
    private Paciente paciente;


    @Column(name = "tipo_mime")
    private String tipoMime; 

    @Column(name = "dados_arquvio")
    private byte[] dadosArquivo; // não é string

    @Column(name = "aprovado")
    private int aprovado;
    
    @Column(name = "motivo_inviabilidade")
    private String motivoInviabiliadade;

}
