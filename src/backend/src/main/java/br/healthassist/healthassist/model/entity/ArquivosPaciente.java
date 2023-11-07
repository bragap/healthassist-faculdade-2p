package br.healthassist.healthassist.model.entity;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;


@Entity
@Table(name = "arquivos_paciente")
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

    public ArquivosPaciente(){

    }

    public ArquivosPaciente(Long id, Paciente paciente, String tipoMime, byte[] dadosArquivo, int aprovado, String motivoInviabiliadade){
        this.id = id;
        this.paciente = paciente;
        this.tipoMime = tipoMime;
        this.dadosArquivo = dadosArquivo;
        this.aprovado = aprovado;
        this.motivoInviabiliadade = motivoInviabiliadade;
    }
}
