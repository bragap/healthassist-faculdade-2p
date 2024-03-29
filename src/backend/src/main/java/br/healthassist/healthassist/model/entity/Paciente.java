package br.healthassist.healthassist.model.entity;



import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import br.healthassist.healthassist.model.enums.StatusAprovacao;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "paciente")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "endereco")
    private String endereco;

    @Column(name = "data_nasc")
    private LocalDate dataNasc;

    @Column(name = "nome_completo")
    private String nomeCompleto;

    @Column(name = "aprovacao")
    @Enumerated(EnumType.STRING)
    private StatusAprovacao aprovacao;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;


    
    //@OneToMany(mappedBy = "paciente")
    //private List<ArquivosPaciente> arquivosPaciente= new ArrayList<>();





/* 
    @Override 
    public boolean equals(Object o){
        if(o == this)
            return true;
        if(o == null)
            return false;
        if(! (o instanceof Paciente)){
            return false;
        }
        Paciente paciente = (Paciente) o;
        return Objects.equals(id, paciente.id) && Objects.equals(nomeCompleto, paciente.nomeCompleto) && Objects.equals(this.endereco, paciente.endereco);
    }
    
    @Override
    public int hashCode(){
        final int prime = 31;
        int result = 1;
        result = prime * result + (( this.id == null ) ? 0 : this.id.hashCode());
        return result;
    }
*/

}
