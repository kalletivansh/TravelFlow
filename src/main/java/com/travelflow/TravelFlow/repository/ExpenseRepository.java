package com.travelflow.TravelFlow.repository;

import com.travelflow.TravelFlow.entity.Expense;
import com.travelflow.TravelFlow.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByTrip(Trip trip);
}
