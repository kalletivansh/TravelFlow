package com.travelflow.TravelFlow.controller;

import com.travelflow.TravelFlow.dto.BudgetSummaryResponse;
import com.travelflow.TravelFlow.dto.ExpenseRequest;
import com.travelflow.TravelFlow.dto.ExpenseResponse;
import com.travelflow.TravelFlow.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips/{tripId}")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping("/expenses")
    public ResponseEntity<ExpenseResponse> createExpense(
            @PathVariable Long tripId,
            @Valid @RequestBody ExpenseRequest request,
            Authentication authentication) {
        return ResponseEntity.ok(expenseService.createExpense(tripId, request, authentication.getName()));
    }

    @GetMapping("/expenses")
    public ResponseEntity<List<ExpenseResponse>> getTripExpenses(
            @PathVariable Long tripId,
            Authentication authentication) {
        return ResponseEntity.ok(expenseService.getTripExpenses(tripId, authentication.getName()));
    }

    @PutMapping("/expenses/{expenseId}")
    public ResponseEntity<ExpenseResponse> updateExpense(
            @PathVariable Long tripId,
            @PathVariable Long expenseId,
            @Valid @RequestBody ExpenseRequest request,
            Authentication authentication) {
        return ResponseEntity.ok(expenseService.updateExpense(tripId, expenseId, request, authentication.getName()));
    }

    @DeleteMapping("/expenses/{expenseId}")
    public ResponseEntity<String> deleteExpense(
            @PathVariable Long tripId,
            @PathVariable Long expenseId,
            Authentication authentication) {
        expenseService.deleteExpense(tripId, expenseId, authentication.getName());
        return ResponseEntity.ok("Expense deleted successfully");
    }

    @GetMapping("/budget-summary")
    public ResponseEntity<BudgetSummaryResponse> getBudgetSummary(
            @PathVariable Long tripId,
            Authentication authentication) {
        return ResponseEntity.ok(expenseService.getBudgetSummary(tripId, authentication.getName()));
    }
}
