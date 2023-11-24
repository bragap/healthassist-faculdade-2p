package br.healthassist.healthassist.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import br.healthassist.healthassist.model.entity.Paciente;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    @Query(value = "WITH meses AS (SELECT generate_series(DATE_TRUNC('month', CURRENT_DATE - INTERVAL '12 months'), DATE_TRUNC('month', CURRENT_DATE), INTERVAL '1 month') AS mes), clientes_por_mes AS (SELECT DATE_TRUNC('month', data_criacao) AS mes, COUNT(id) AS numero_de_clientes FROM paciente WHERE data_criacao BETWEEN CURRENT_DATE - INTERVAL '12 months' AND CURRENT_DATE GROUP BY mes) SELECT ARRAY_AGG(COALESCE(clientes_por_mes.numero_de_clientes, 0)) AS numero_de_clientes FROM meses LEFT JOIN clientes_por_mes ON meses.mes = clientes_por_mes.mes;", nativeQuery = true)
    String findNumberOfPatientsByMonth();
}
