package br.healthassist.healthassist.service.impl.Indicators;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.healthassist.healthassist.model.entity.Indicators.TaxaHorarioConsulta;
import br.healthassist.healthassist.model.repository.Indicators.TaxaHorarioConsultaRepository;
import br.healthassist.healthassist.service.Indicators.TaxaHorarioConsultaService;
@Service
public class TaxaHorarioConsultaServiceImpl implements TaxaHorarioConsultaService{
    
    private  TaxaHorarioConsultaRepository taxaHorarioConsultaRepository;

    @Autowired
    public TaxaHorarioConsultaServiceImpl(TaxaHorarioConsultaRepository taxaHorarioConsultaRepository){
        this.taxaHorarioConsultaRepository = taxaHorarioConsultaRepository;
    }


    public List<TaxaHorarioConsulta> obterResultados(){
        List<TaxaHorarioConsulta> result = taxaHorarioConsultaRepository.obterResultadosConsulta();
        return result;
    }

}
