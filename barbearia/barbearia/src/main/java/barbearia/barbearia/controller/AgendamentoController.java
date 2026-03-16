package barbearia.barbearia.controller;

import barbearia.barbearia.entity.Agendamento;
import barbearia.barbearia.repository.AgendamentoRepository;
import barbearia.barbearia.service.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/agendamentos")
@CrossOrigin(origins = "*")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @PostMapping
    public ResponseEntity<?> criarAgendamento(@RequestBody Agendamento agendamento){

        try{

            Agendamento novo = agendamentoService.criaragendamento(agendamento);

            return ResponseEntity.ok(novo);

        }catch(RuntimeException e){

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }

    @GetMapping
    public List<Agendamento> listar(){
        return agendamentoService.listar();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Agendamento> deletar(@PathVariable Long id) {
        Agendamento deletado = agendamentoService.deletarAgendamento(id);
        return ResponseEntity.ok(deletado);
    }

    @GetMapping("/disponiveis")
    public ResponseEntity<List<String>> listarDisponiveis(@RequestParam("data") String dataStr) {
        LocalDate data = LocalDate.parse(dataStr);
        List<String> disponiveis = agendamentoService.buscarHorariosDisponiveis(data);
        return ResponseEntity.ok(disponiveis);
    }
}
