package br.healthassist.healthassist.service.impl.Indicators;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.healthassist.healthassist.model.entity.Indicators.AvaliacoesPorConsulta;
import br.healthassist.healthassist.model.entity.Indicators.ResultadoConsultaMedicos;
import br.healthassist.healthassist.model.repository.Indicators.AvaliacoesPorConsultasRepository;
import br.healthassist.healthassist.model.repository.Indicators.ResultadoConsultaMedicosRepository;
import br.healthassist.healthassist.service.Indicators.AvaliacoesPorConsultasService;

@Service
public class AvaliacoesPorConsultasServiceImpl implements AvaliacoesPorConsultasService {
    
    private AvaliacoesPorConsultasRepository avaliacoesPorConsultasRepository;

    public AvaliacoesPorConsultasServiceImpl(AvaliacoesPorConsultasRepository avaliacoesPorConsultasRepository){
        this.avaliacoesPorConsultasRepository = avaliacoesPorConsultasRepository;
    }
    @Override
    public List<AvaliacoesPorConsulta> obterResultados(){
        List<AvaliacoesPorConsulta> result = avaliacoesPorConsultasRepository.obterResultadosConsulta();
        return result;
    }

}
