package com.travelflow.TravelFlow.dto;

import java.time.LocalDate;

public class ExpenseResponse {
    private Long id;
    private String category;
    private String description;
    private Double amount;
    private LocalDate expenseDate;
    private Long tripId;

    public ExpenseResponse() {}

    public ExpenseResponse(Long id, String category, String description, Double amount, LocalDate expenseDate, Long tripId) {
        this.id = id;
        this.category = category;
        this.description = description;
        this.amount = amount;
        this.expenseDate = expenseDate;
        this.tripId = tripId;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    public LocalDate getExpenseDate() { return expenseDate; }
    public void setExpenseDate(LocalDate expenseDate) { this.expenseDate = expenseDate; }
    public Long getTripId() { return tripId; }
    public void setTripId(Long tripId) { this.tripId = tripId; }
}
