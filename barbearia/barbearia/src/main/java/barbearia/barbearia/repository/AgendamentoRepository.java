package barbearia.barbearia.repository;

import barbearia.barbearia.entity.Agendamento;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.time.LocalDateTime;
import java.util.List;

public interface AgendamentoRepository extends JpaRepository<Agendamento,Long> {

    @Transactional
    @Modifying
    void deleteById(Long id);

    boolean existsByDataAgendada(LocalDateTime dataAgendada);

    List<Agendamento> findByDataAgendadaBetween(LocalDateTime inicio, LocalDateTime fim);
}
