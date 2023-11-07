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

@Entity
@Table(name = Paciente.TABLE_NAME)

public class Paciente {
    public static final String TABLE_NAME = "paciente";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @Column(name = "primeiro_nome")
    private String primeiroNome;

    @Column(name = "ultimo_nome")
    private String ultimoNome;

    @Column(name = "endereco")
    private String endereco;

    @Column(name = "data_nasc")
    private Date dataNasc;

    @Column(name = "prioridade")
    private Integer prioridade;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    //private List<ArquivosPaciente> = new ArrayList<>();

    public Paciente(Long id, String primeiroNome, String ultimoNome, String endereco, Date dateNasc, Integer prioridade ){
        this.id = id;
        this.primeiroNome = primeiroNome;
        this.ultimoNome = ultimoNome;
        this.endereco = endereco;
        this.dataNasc = dateNasc;
        this.prioridade = prioridade;
    }

    public Paciente(){

    }

    public Long getId() {
        return id;
    }


    public String getPrimeiroNome() {
        return primeiroNome;
    }

    public void setPrimeiroNome(String primeiroNome) {
        this.primeiroNome = primeiroNome;
    }

    public String getUltimoNome() {
        return ultimoNome;
    }

    public void setUltimoNome(String ultimoNome) {
        this.ultimoNome = ultimoNome;
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

    public Integer getPrioridade() {
        return prioridade;
    }

    public void setPrioridade(Integer prioridade) {
        this.prioridade = prioridade;
    }


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
        return Objects.equals(id, paciente.id) && Objects.equals(primeiroNome, this.primeiroNome) && Objects.equals(ultimoNome, ultimoNome);
    }
    
    @Override
    public int hashCode(){
        final int prime = 31;
        int result = 1;
        result = prime * result + (( this.id == null ) ? 0 : this.id.hashCode());
        return result;
    }

}
