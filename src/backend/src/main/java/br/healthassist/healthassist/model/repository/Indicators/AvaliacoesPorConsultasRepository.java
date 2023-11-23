package br.healthassist.healthassist.model.repository.Indicators;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import br.healthassist.healthassist.model.entity.Indicators.AvaliacoesPorConsulta;
import br.healthassist.healthassist.model.entity.Indicators.ResultadoConsultaMedicos;

@Repository
public interface AvaliacoesPorConsultasRepository extends JpaRepository<ResultadoConsultaMedicos, Long>{
    
    @Query(value = "SELECT EXTRACT(YEAR FROM data_hora_consulta) AS ano, EXTRACT(MONTH FROM data_hora_consulta) AS mes, COUNT(DISTINCT consulta.id) AS qtd_consultas, COUNT(DISTINCT avaliar_consulta.id) AS qtd_avaliacoes, (100 * COUNT(DISTINCT avaliar_consulta.id) / COUNT(*)) AS percentual FROM consulta LEFT JOIN avaliar_consulta ON consulta.id = avaliar_consulta.id_consulta WHERE data_hora_consulta BETWEEN date_trunc('month', now() - interval '12 months') AND date_trunc('month', now()) GROUP BY ano, mes ORDER BY ano, mes;", nativeQuery = true)
    List<AvaliacoesPorConsulta> obterResultadosConsulta();

}
