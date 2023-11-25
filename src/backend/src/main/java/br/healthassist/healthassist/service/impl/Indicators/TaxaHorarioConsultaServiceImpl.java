package br.healthassist.healthassist.service.impl.Indicators;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.healthassist.healthassist.model.entity.Indicators.TaxaHorarioConsulta;
import br.healthassist.healthassist.model.repository.Indicators.TaxaHorarioRepository;
import br.healthassist.healthassist.service.Indicators.TaxaHorarioConsultaService;
@Service
public class TaxaHorarioConsultaServiceImpl implements TaxaHorarioConsultaService{
    
    private TaxaHorarioRepository taxaHorarioConsultaRepository;

    @Autowired
    public TaxaHorarioConsultaServiceImpl(TaxaHorarioRepository taxaHorarioConsultaRepository){
        this.taxaHorarioConsultaRepository = taxaHorarioConsultaRepository;
    }


    public List<TaxaHorarioConsulta> obterResultados(){
        List<TaxaHorarioConsulta> result = taxaHorarioConsultaRepository.obterResultadosConsulta();
        return result;
    }

}
