package br.healthassist.healthassist.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.healthassist.healthassist.model.entity.AvaliarConsulta;

@Repository
public interface AvaliarConsultaRepository extends JpaRepository<AvaliarConsulta, Long>{
    
    @Query(value = "SELECT ARRAY_AGG(COALESCE(quantidade_avaliacoes, 0) ORDER BY mes DESC) AS quantidade_avaliacoes_por_mes FROM (SELECT EXTRACT(MONTH FROM month_series) AS mes, COUNT(DISTINCT avaliar_consulta.id) AS quantidade_avaliacoes FROM generate_series(now() - interval '11 months', now(), interval '1 month') AS month_series LEFT JOIN consulta ON EXTRACT(MONTH FROM month_series) = EXTRACT(MONTH FROM consulta.data_hora_consulta) LEFT JOIN avaliar_consulta ON consulta.id = avaliar_consulta.id_consulta GROUP BY mes) AS subconsulta;",nativeQuery = true)
    String findNumberOfAvaliacoesByMonth();
}
