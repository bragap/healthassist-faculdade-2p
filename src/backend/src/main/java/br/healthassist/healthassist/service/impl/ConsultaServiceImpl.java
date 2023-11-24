package br.healthassist.healthassist.service.impl;

import br.healthassist.healthassist.model.entity.Consulta;
import br.healthassist.healthassist.model.repository.ConsultaRepository;
import br.healthassist.healthassist.service.ConsultaService;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.apache.catalina.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ConsultaServiceImpl implements ConsultaService {

    private ConsultaRepository consultaRepository;

    public ConsultaServiceImpl(ConsultaRepository consultaRepository) {
        this.consultaRepository = consultaRepository;
    }

    @Override
    public Consulta salvarConsutla(Consulta consulta) {
        return consultaRepository.save(consulta);
    }

    @Override
    public List<Consulta> findAll(){
        return consultaRepository.findAll();
    }

    @Override
    public Consulta findById(Long id){
        return consultaRepository.findById(id).orElseThrow(() -> new RuntimeException(
            "Cosulta não encontrada! : "  + id + "Tipo: " + User.class.getName()
        ));
    }

    @Override
    public Consulta findConsultaById(Long id){
        Optional<Consulta> consulta = consultaRepository.findById(id);
        return consulta.orElseThrow(() -> new RuntimeException(
                "Consulta não encontrado! : "  + id + "Tipo: " + User.class.getName()
        ));
    }

    @Override
    @Transactional
    public Consulta updateConsulta(Long id, Consulta consulta) {
        Consulta newConsulta = findConsultaById(id);

        newConsulta.setDataHoraConsulta(consulta.getDataHoraConsulta());
        newConsulta.setRespostaAnamnese(consulta.getRespostaAnamnese());

        return consultaRepository.save(newConsulta);
    }

    public List<Integer> getConsultasByMonth(){
        String numberOfConsultasByMonth = consultaRepository.findNumberConsultasByMonth();
        
        String[] resultStringArray = numberOfConsultasByMonth.split(",");
        int[] resultIntArray = new int[resultStringArray.length];

        for(int i = 0; i < resultStringArray.length; i++){
            resultIntArray[i] = Integer.parseInt(resultStringArray[i]);
        }

        List<Integer> resultIntList = Arrays.asList(Arrays.stream(resultIntArray).boxed().toArray(Integer[]::new));

        return resultIntList;
    }
}
