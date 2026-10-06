package com.travelflow.TravelFlow.dto;

public class DashboardResponse {

    private long totalTrips;
    private long upcomingTrips;
    private double totalBudget;
    private double totalExpenses;
    private double remainingBudget;

    public DashboardResponse() {
    }

    public DashboardResponse(
            long totalTrips,
            long upcomingTrips,
            double totalBudget,
            double totalExpenses,
            double remainingBudget) {

        this.totalTrips = totalTrips;
        this.upcomingTrips = upcomingTrips;
        this.totalBudget = totalBudget;
        this.totalExpenses = totalExpenses;
        this.remainingBudget = remainingBudget;
    }

    public long getTotalTrips() {
        return totalTrips;
    }

    public void setTotalTrips(long totalTrips) {
        this.totalTrips = totalTrips;
    }

    public long getUpcomingTrips() {
        return upcomingTrips;
    }

    public void setUpcomingTrips(long upcomingTrips) {
        this.upcomingTrips = upcomingTrips;
    }

    public double getTotalBudget() {
        return totalBudget;
    }

    public void setTotalBudget(double totalBudget) {
        this.totalBudget = totalBudget;
    }

    public double getTotalExpenses() {
        return totalExpenses;
    }

    public void setTotalExpenses(double totalExpenses) {
        this.totalExpenses = totalExpenses;
    }

    public double getRemainingBudget() {
        return remainingBudget;
    }

    public void setRemainingBudget(double remainingBudget) {
        this.remainingBudget = remainingBudget;
    }
}