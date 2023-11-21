package br.healthassist.healthassist.model.entity;

import br.healthassist.healthassist.model.enums.StatusAprovacao;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "arquivos_medico")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ArquivoMedico {

    @ManyToOne
    @JoinColumn(name = "id_medico")
    private Medico idMedico;

    @Column(name = "nome_arquivo")
    private String nomeArquivo;

    @Column(name = "tipo_mime")
    private String tipoMime;

    private byte[] dadosArquivo;

    @Lob
    @Column(name = "dados_arquivo")
    @Basic(fetch = FetchType.LAZY)
    public byte[] getDadosArquivo() {
        return this.dadosArquivo;
    }

    public void setDadosArquivo(byte[] dadosArquivo) {
        this.dadosArquivo = dadosArquivo;
    }

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "aprovacao")
    @Enumerated(EnumType.STRING)
    private StatusAprovacao aprovacao;

}
