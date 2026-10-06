package com.travelflow.TravelFlow.service;

import com.travelflow.TravelFlow.dto.TripRequest;
import com.travelflow.TravelFlow.dto.TripResponse;
import com.travelflow.TravelFlow.entity.Trip;
import com.travelflow.TravelFlow.entity.User;
import com.travelflow.TravelFlow.repository.TripRepository;
import com.travelflow.TravelFlow.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripService {

    private final TripRepository tripRepository;
    private final UserRepository userRepository;

    public TripService(
            TripRepository tripRepository,
            UserRepository userRepository) {

        this.tripRepository = tripRepository;
        this.userRepository = userRepository;
    }

    public TripResponse createTrip(TripRequest request, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Trip trip = new Trip();

        trip.setDestination(request.getDestination());
        trip.setStartDate(request.getStartDate());
        trip.setEndDate(request.getEndDate());
        trip.setBudget(request.getBudget());
        trip.setDescription(request.getDescription());
        trip.setUser(user);

        Trip savedTrip = tripRepository.save(trip);

        return convertToResponse(savedTrip);
    }

    public List<TripResponse> getUserTrips(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return tripRepository.findByUser(user)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    public TripResponse updateTrip(
            Long id,
            TripRequest request,
            String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        if (!trip.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You cannot update this trip");
        }

        trip.setDestination(request.getDestination());
        trip.setStartDate(request.getStartDate());
        trip.setEndDate(request.getEndDate());
        trip.setBudget(request.getBudget());
        trip.setDescription(request.getDescription());

        Trip updatedTrip = tripRepository.save(trip);

        return convertToResponse(updatedTrip);
    }

    public void deleteTrip(Long id, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        if (!trip.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You cannot delete this trip");
        }

        tripRepository.delete(trip);
    }

    private TripResponse convertToResponse(Trip trip) {

        return new TripResponse(
                trip.getId(),
                trip.getDestination(),
                trip.getStartDate(),
                trip.getEndDate(),
                trip.getBudget(),
                trip.getDescription()
        );
    }
}