package barbearia.barbearia.service;

import barbearia.barbearia.entity.Agendamento;
import barbearia.barbearia.repository.AgendamentoRepository;
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
        System.out.println("Antes de salvar");
        Agendamento ag = agendamentoRepository.save(agendamento);
        System.out.println("Depois de salvar");
        return ag;
    }

    public List<Agendamento> listar(){
        return agendamentoRepository.findAll();
    }
}
