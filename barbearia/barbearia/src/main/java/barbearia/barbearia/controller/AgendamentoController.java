package barbearia.barbearia.controller;

import barbearia.barbearia.entity.Agendamento;
import barbearia.barbearia.repository.AgendamentoRepository;
import barbearia.barbearia.service.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @PostMapping
    public Agendamento criarAgendamento(@RequestBody  Agendamento agendamento){
        return agendamentoService.criaragendamento(agendamento);
    }

    @GetMapping
    public List<Agendamento> listar(){
        return agendamentoService.listar();
    }
}
