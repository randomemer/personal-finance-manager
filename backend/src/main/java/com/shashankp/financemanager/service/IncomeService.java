package com.shashankp.financemanager.service;

import com.shashankp.financemanager.dto.TransactionTotalDTO;
import com.shashankp.financemanager.model.Income;
import com.shashankp.financemanager.repository.IncomeRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IncomeService {
  @Autowired private IncomeRepository incomeRepository;

  public Income saveIncome(Income income) {
    return incomeRepository.save(income);
  }

  public List<Income> findIncomesByUserId(Long id) {
    return incomeRepository.findByUserId(id);
  }

  public TransactionTotalDTO findTotalIncomesForMonth(Long userId, int month, int year) {
    return incomeRepository.findTotalForMonth(userId, month, year);
  }
}
