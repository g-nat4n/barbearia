package barbearia.barbearia.service;

import barbearia.barbearia.entity.Agendamento;
import barbearia.barbearia.repository.AgendamentoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;



    public Agendamento criaragendamento(@RequestBody Agendamento agendamento){
        if(agendamentoRepository.existsByDataAgendada(agendamento.getDataAgendada())){
            throw new RuntimeException("Horário já reservado");
        }
        return agendamentoRepository.save(agendamento);
    }

    @Transactional
    public List<Agendamento> listar(){
        return agendamentoRepository.findAll();
    }


    @Transactional
    public  Agendamento deletarAgendamento(Long id){
         Agendamento agDelete = agendamentoRepository.findById(id)
                 .orElseThrow(() ->  new RuntimeException("Agendamento nao encontrado por id" + id));
        agendamentoRepository.delete(agDelete);

         return agDelete;
    }
}
