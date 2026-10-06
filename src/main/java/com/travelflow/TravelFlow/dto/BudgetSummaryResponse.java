package com.travelflow.TravelFlow.dto;

public class BudgetSummaryResponse {
    private Long tripId;
    private Double budget;
    private Double totalSpent;
    private Double remainingBudget;

    public BudgetSummaryResponse() {}

    public BudgetSummaryResponse(Long tripId, Double budget, Double totalSpent, Double remainingBudget) {
        this.tripId = tripId;
        this.budget = budget;
        this.totalSpent = totalSpent;
        this.remainingBudget = remainingBudget;
    }

    public Long getTripId() { return tripId; }
    public void setTripId(Long tripId) { this.tripId = tripId; }
    public Double getBudget() { return budget; }
    public void setBudget(Double budget) { this.budget = budget; }
    public Double getTotalSpent() { return totalSpent; }
    public void setTotalSpent(Double totalSpent) { this.totalSpent = totalSpent; }
    public Double getRemainingBudget() { return remainingBudget; }
    public void setRemainingBudget(Double remainingBudget) { this.remainingBudget = remainingBudget; }
}
