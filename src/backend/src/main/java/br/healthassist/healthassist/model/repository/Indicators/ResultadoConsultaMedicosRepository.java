package br.healthassist.healthassist.model.repository.Indicators;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import br.healthassist.healthassist.model.entity.Indicators.ResultadoConsultaMedicos;

@Repository
public interface ResultadoConsultaMedicosRepository extends JpaRepository<ResultadoConsultaMedicos, Long>{
    
    @Query(value = "SELECT m.id AS id_medico, m.nome_completo AS nome_medico, SUM(CAST(count_c.consultas AS DECIMAL(10, 2))) / 12 AS quantidade_media_consultas FROM medico m LEFT JOIN (SELECT id_medico, COUNT(*) AS consultas FROM consulta WHERE data_hora_consulta BETWEEN CURRENT_DATE - INTERVAL '12 months' AND CURRENT_DATE GROUP BY id_medico) count_c ON m.id = count_c.id_medico GROUP BY m.id, m.nome_completo;\n", nativeQuery = true)
    List<ResultadoConsultaMedicos> obterResultadosConsulta();

}
