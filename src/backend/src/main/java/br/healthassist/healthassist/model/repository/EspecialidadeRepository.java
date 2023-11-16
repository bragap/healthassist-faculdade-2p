package br.healthassist.healthassist.model.repository;

import br.healthassist.healthassist.model.entity.Especialidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EspecialidadeRepository extends JpaRepository<Especialidade, Long> {

    Especialidade findByNome(String nome);


//    @Query("SELECT e FROM Especialidade e WHERE e.nome = :nome")
//    Especialidade findByNome(@Param("nome") String nome);

}
