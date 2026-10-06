package com.travelflow.TravelFlow.controller;

import com.travelflow.TravelFlow.dto.TripRequest;
import com.travelflow.TravelFlow.dto.TripResponse;
import com.travelflow.TravelFlow.service.TripService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @PostMapping
    public ResponseEntity<TripResponse> createTrip(
            @Valid @RequestBody TripRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        TripResponse trip = tripService.createTrip(request, email);

        return ResponseEntity.ok(trip);
    }

    @GetMapping
    public ResponseEntity<List<TripResponse>> getUserTrips(
            Authentication authentication) {

        String email = authentication.getName();

        List<TripResponse> trips =
                tripService.getUserTrips(email);

        return ResponseEntity.ok(trips);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TripResponse> updateTrip(
            @PathVariable Long id,
            @Valid @RequestBody TripRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        TripResponse trip =
                tripService.updateTrip(id, request, email);

        return ResponseEntity.ok(trip);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTrip(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        tripService.deleteTrip(id, email);

        return ResponseEntity.ok("Trip deleted successfully");
    }
}