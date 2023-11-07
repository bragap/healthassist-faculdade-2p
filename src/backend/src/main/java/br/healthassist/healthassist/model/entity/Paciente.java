package br.healthassist.healthassist.model.entity;


import java.sql.Date;
import java.util.Objects;

import org.hibernate.mapping.List;

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
@Table(name = Paciente.TABLE_NAME)
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
    private Date dataNasc;

    @Column(name = "nome_completo")
    private String nomeCompleto;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    //private List<ArquivosPaciente> = new ArrayList<>();

    public Paciente(Long id, String primeiroNome, String nomeCompleto, String endereco, Date dateNasc){
        this.id = id;
        this.endereco = endereco;
        this.dataNasc = dateNasc;
        this.nomeCompleto = nomeCompleto;
    }

    public Paciente(){

    }

    public Long getId() {
        return id;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public Date getDataNasc() {
        return dataNasc;
    }

    public void setDataNasc(Date dataNasc) {
        this.dataNasc = dataNasc;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }


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
