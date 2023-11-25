package br.healthassist.healthassist.model.repository.Indicators;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.healthassist.healthassist.model.entity.Indicators.TaxaHorarioConsulta;

@Repository
public interface TaxaHorarioRepository extends JpaRepository<TaxaHorarioConsulta, Long>{

    @Query(value = "SELECT EXTRACT(HOUR FROM data_hora_consulta) AS hora, COUNT(*) AS quantidade_consultas, ROUND((COUNT(*) * 100.0 / SUM(COUNT(*)) OVER ()), 1) AS percentual FROM consulta WHERE data_hora_consulta BETWEEN CURRENT_DATE - INTERVAL '12 months' AND CURRENT_DATE GROUP BY EXTRACT(HOUR FROM data_hora_consulta) ORDER BY hora;", nativeQuery = true)
    List<TaxaHorarioConsulta> obterResultadosConsulta();


}