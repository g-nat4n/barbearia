package barbearia.barbearia.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table (name = "agendamento")
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeCliente;
    private LocalDateTime dataAgendada;
    private String contato;
    private String servico;


    public Agendamento() {
    }

    public Long getId() {
        return id;
    }

    public String getNomeCliente() {
        return nomeCliente;
    }

    public LocalDateTime getDataAgendada() {
        return dataAgendada;
    }

    public String getContato() {
        return contato;
    }

    public String getServico() {
        return servico;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public void setDataAgendada(LocalDateTime dataAgendada) {
        this.dataAgendada = dataAgendada;
    }

    public void setContato(String contato) {
        this.contato = contato;
    }

    public void setServico(String servico) {
        this.servico = servico;
    }
}
