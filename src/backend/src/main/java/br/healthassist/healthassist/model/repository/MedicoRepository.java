package br.healthassist.healthassist.model.repository;

import br.healthassist.healthassist.model.entity.Medico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MedicoRepository extends JpaRepository<Medico, Long> {

    @Query(value = "SELECT ARRAY_AGG(COALESCE(numero_de_medicos, 0)) AS numero_de_medicos FROM (SELECT COUNT(medico.id) AS numero_de_medicos FROM generate_series(CURRENT_DATE - INTERVAL '12 months', CURRENT_DATE, INTERVAL '1 month') AS generate_series LEFT JOIN medico ON DATE_TRUNC('month', medico.data_criacao) = DATE_TRUNC('month', generate_series) GROUP BY DATE_TRUNC('month', generate_series) ORDER BY DATE_TRUNC('month', generate_series)) subquery",nativeQuery = true)
            
    String findNumberOfMedicosByMonth();

}
