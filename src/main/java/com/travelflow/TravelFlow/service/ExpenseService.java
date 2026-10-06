package com.travelflow.TravelFlow.service;

import com.travelflow.TravelFlow.dto.BudgetSummaryResponse;
import com.travelflow.TravelFlow.dto.ExpenseRequest;
import com.travelflow.TravelFlow.dto.ExpenseResponse;
import com.travelflow.TravelFlow.entity.Expense;
import com.travelflow.TravelFlow.entity.Trip;
import com.travelflow.TravelFlow.repository.ExpenseRepository;
import com.travelflow.TravelFlow.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final TripRepository tripRepository;

    public ExpenseService(ExpenseRepository expenseRepository, TripRepository tripRepository) {
        this.expenseRepository = expenseRepository;
        this.tripRepository = tripRepository;
    }

    public ExpenseResponse createExpense(Long tripId, ExpenseRequest request, String email) {
        Trip trip = getOwnedTrip(tripId, email);
        validateExpenseDate(trip, request);

        Expense expense = new Expense();
        expense.setCategory(request.getCategory());
        expense.setDescription(request.getDescription());
        expense.setAmount(request.getAmount());
        expense.setExpenseDate(request.getExpenseDate());
        expense.setTrip(trip);

        return convertToResponse(expenseRepository.save(expense));
    }

    public List<ExpenseResponse> getTripExpenses(Long tripId, String email) {
        Trip trip = getOwnedTrip(tripId, email);
        return expenseRepository.findByTrip(trip).stream().map(this::convertToResponse).toList();
    }

    public ExpenseResponse updateExpense(Long tripId, Long expenseId, ExpenseRequest request, String email) {
        Trip trip = getOwnedTrip(tripId, email);
        validateExpenseDate(trip, request);

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!expense.getTrip().getId().equals(tripId)) {
            throw new RuntimeException("Expense does not belong to this trip");
        }

        expense.setCategory(request.getCategory());
        expense.setDescription(request.getDescription());
        expense.setAmount(request.getAmount());
        expense.setExpenseDate(request.getExpenseDate());

        return convertToResponse(expenseRepository.save(expense));
    }

    public void deleteExpense(Long tripId, Long expenseId, String email) {
        getOwnedTrip(tripId, email);

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!expense.getTrip().getId().equals(tripId)) {
            throw new RuntimeException("Expense does not belong to this trip");
        }

        expenseRepository.delete(expense);
    }

    public BudgetSummaryResponse getBudgetSummary(Long tripId, String email) {
        Trip trip = getOwnedTrip(tripId, email);
        double budget = trip.getBudget() == null ? 0.0 : trip.getBudget();
        double totalSpent = expenseRepository.findByTrip(trip).stream()
                .mapToDouble(expense -> expense.getAmount() == null ? 0.0 : expense.getAmount())
                .sum();

        return new BudgetSummaryResponse(tripId, budget, totalSpent, budget - totalSpent);
    }

    private Trip getOwnedTrip(Long tripId, String email) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        if (!trip.getUser().getEmail().equals(email)) {
            throw new RuntimeException("You cannot access expenses for this trip");
        }
        return trip;
    }

    private void validateExpenseDate(Trip trip, ExpenseRequest request) {
        if (request.getExpenseDate().isBefore(trip.getStartDate()) || request.getExpenseDate().isAfter(trip.getEndDate())) {
            throw new RuntimeException("Expense date must be within the trip dates");
        }
    }

    private ExpenseResponse convertToResponse(Expense expense) {
        return new ExpenseResponse(
                expense.getId(),
                expense.getCategory(),
                expense.getDescription(),
                expense.getAmount(),
                expense.getExpenseDate(),
                expense.getTrip().getId()
        );
    }
}
