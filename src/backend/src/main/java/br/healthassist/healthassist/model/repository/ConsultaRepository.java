package br.healthassist.healthassist.model.repository;

import br.healthassist.healthassist.model.entity.Consulta;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
    @Query(value = "SELECT ARRAY_AGG(COALESCE(quantidade_consultas, 0) ORDER BY mes DESC) AS quantidade_consultas_por_mes FROM (SELECT EXTRACT(MONTH FROM month_series) AS mes, COUNT(DISTINCT consulta.id) AS quantidade_consultas FROM generate_series(now() - interval '11 months', now(), interval '1 month') AS month_series LEFT JOIN consulta ON EXTRACT(MONTH FROM month_series) = EXTRACT(MONTH FROM consulta.data_hora_consulta) GROUP BY mes) AS subconsulta;",nativeQuery = true)
    String findNumberConsultasByMonth();
}
