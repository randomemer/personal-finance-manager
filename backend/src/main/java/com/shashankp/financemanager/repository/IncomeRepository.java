package com.shashankp.financemanager.repository;

import com.shashankp.financemanager.model.Income;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IncomeRepository extends JpaRepository<Income, Long> {
    List<Income> findByUserId (Long userId);
}
