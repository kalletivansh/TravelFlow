package com.travelflow.TravelFlow.service;

import com.travelflow.TravelFlow.dto.DashboardResponse;
import com.travelflow.TravelFlow.entity.Expense;
import com.travelflow.TravelFlow.entity.Trip;
import com.travelflow.TravelFlow.entity.User;
import com.travelflow.TravelFlow.repository.ExpenseRepository;
import com.travelflow.TravelFlow.repository.TripRepository;
import com.travelflow.TravelFlow.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final TripRepository tripRepository;
    private final ExpenseRepository expenseRepository;

    public DashboardService(
            UserRepository userRepository,
            TripRepository tripRepository,
            ExpenseRepository expenseRepository) {

        this.userRepository = userRepository;
        this.tripRepository = tripRepository;
        this.expenseRepository = expenseRepository;
    }

    public DashboardResponse getDashboard(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<Trip> trips =
                tripRepository.findByUser(user);

        long totalTrips = trips.size();

        long upcomingTrips = trips.stream()
                .filter(trip ->
                        trip.getStartDate() != null &&
                        !trip.getStartDate()
                                .isBefore(LocalDate.now()))
                .count();

        double totalBudget = trips.stream()
                .filter(trip -> trip.getBudget() != null)
                .mapToDouble(Trip::getBudget)
                .sum();

        double totalExpenses = 0.0;

        for (Trip trip : trips) {

            List<Expense> expenses =
                    expenseRepository.findByTrip(trip);

            totalExpenses += expenses.stream()
                    .filter(expense ->
                            expense.getAmount() != null)
                    .mapToDouble(Expense::getAmount)
                    .sum();
        }

        double remainingBudget =
                totalBudget - totalExpenses;

        return new DashboardResponse(
                totalTrips,
                upcomingTrips,
                totalBudget,
                totalExpenses,
                remainingBudget
        );
    }
}