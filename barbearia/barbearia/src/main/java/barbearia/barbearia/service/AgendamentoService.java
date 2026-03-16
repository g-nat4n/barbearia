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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    public List<String> buscarHorariosDisponiveis(LocalDate data) {
        List<LocalTime> todosHorarios = new ArrayList<>();
        LocalTime horarioCheck = LocalTime.of(9, 0);
        LocalTime encerramento = LocalTime.of(18, 0);

        while (horarioCheck.isBefore(encerramento)) {
            todosHorarios.add(horarioCheck);
            horarioCheck = horarioCheck.plusMinutes(30);
        }


        LocalDateTime inicioDia = data.atStartOfDay();
        LocalDateTime fimDia = data.atTime(LocalTime.MAX);
        List<Agendamento> agendados = agendamentoRepository.findByDataAgendadaBetween(inicioDia, fimDia);

        List<LocalTime> horasOcupadas = agendados.stream()
                .map(a -> a.getDataAgendada().toLocalTime())
                .collect(Collectors.toList());

        return todosHorarios.stream()
                .filter(h -> !horasOcupadas.contains(h))
                .map(h -> h.toString()) // Converte para "09:00"
                .collect(Collectors.toList());
    }
}
