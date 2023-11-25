package br.healthassist.healthassist.service.impl.Indicators;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.healthassist.healthassist.service.Indicators.ResultadoConsultaMedicosService;
import br.healthassist.healthassist.model.entity.Indicators.ResultadoConsultaMedicos;
import br.healthassist.healthassist.model.repository.Indicators.ResultadoMedicosRepository;

@Service
public class ResultadoConsultaMedicoServiceImpl implements ResultadoConsultaMedicosService {
    
    private ResultadoMedicosRepository resultadoConsultaMedicosRepository;
    
    @Autowired
    public ResultadoConsultaMedicoServiceImpl(ResultadoMedicosRepository resultadoConsultaMedicosRepository) {
        this.resultadoConsultaMedicosRepository = resultadoConsultaMedicosRepository;
    }
    @Override
    public List<ResultadoConsultaMedicos> obterResultados(){
        List<ResultadoConsultaMedicos> result = resultadoConsultaMedicosRepository.obterResultadosConsulta();
        return result;
    }


}
