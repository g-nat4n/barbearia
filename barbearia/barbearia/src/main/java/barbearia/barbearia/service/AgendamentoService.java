package barbearia.barbearia.service;

import barbearia.barbearia.entity.Agendamento;
import barbearia.barbearia.repository.AgendamentoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;



    public Agendamento criaragendamento(@RequestBody Agendamento agendamento){
        Agendamento ag = agendamentoRepository.save(agendamento);
        return ag;
    }

    @Transactional
    public List<Agendamento> listar(){
        return agendamentoRepository.findAll();
    }
}
