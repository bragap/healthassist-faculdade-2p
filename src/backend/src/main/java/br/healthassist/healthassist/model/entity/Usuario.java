package br.healthassist.healthassist.model.entity;

import br.healthassist.healthassist.model.enums.StatusAutorizacao;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "usuario")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "apelido")
    private String apelido;

    @Column(name = "email")
    private String email;

    @Column(name = "senha")
    private String senha;

    @Column(name = "autorizacao")
    @Enumerated(EnumType.STRING)
    private StatusAutorizacao autorizacao;
}
