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
@Table(name = Paciente.TABLE_NAME)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Paciente {
    public static final String TABLE_NAME = "paciente";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @Column(name = "endereco")
    private String endereco;

    @Column(name = "data_nasc")
    private LocalDate dataNasc;

    @Column(name = "nome_completo")
    private String nomeCompleto;

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
