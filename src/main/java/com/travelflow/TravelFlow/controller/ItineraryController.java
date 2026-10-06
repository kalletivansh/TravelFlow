package com.travelflow.TravelFlow.controller;

import com.travelflow.TravelFlow.dto.ItineraryRequest;
import com.travelflow.TravelFlow.dto.ItineraryResponse;
import com.travelflow.TravelFlow.service.ItineraryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips/{tripId}/itineraries")
public class ItineraryController {

    private final ItineraryService itineraryService;

    public ItineraryController(ItineraryService itineraryService) {
        this.itineraryService = itineraryService;
    }

    // CREATE ITINERARY
    @PostMapping
    public ResponseEntity<ItineraryResponse> createItinerary(
            @PathVariable Long tripId,
            @Valid @RequestBody ItineraryRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        ItineraryResponse response =
                itineraryService.createItinerary(
                        tripId,
                        request,
                        email
                );

        return ResponseEntity.ok(response);
    }

    // GET ALL ITINERARIES OF A TRIP
    @GetMapping
    public ResponseEntity<List<ItineraryResponse>> getTripItineraries(
            @PathVariable Long tripId,
            Authentication authentication) {

        String email = authentication.getName();

        List<ItineraryResponse> response =
                itineraryService.getTripItineraries(
                        tripId,
                        email
                );

        return ResponseEntity.ok(response);
    }

    // UPDATE ITINERARY
    @PutMapping("/{itineraryId}")
    public ResponseEntity<ItineraryResponse> updateItinerary(
            @PathVariable Long tripId,
            @PathVariable Long itineraryId,
            @Valid @RequestBody ItineraryRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        ItineraryResponse response =
                itineraryService.updateItinerary(
                        itineraryId,
                        request,
                        email
                );

        return ResponseEntity.ok(response);
    }

    // DELETE ITINERARY
    @DeleteMapping("/{itineraryId}")
    public ResponseEntity<String> deleteItinerary(
            @PathVariable Long tripId,
            @PathVariable Long itineraryId,
            Authentication authentication) {

        String email = authentication.getName();

        itineraryService.deleteItinerary(
                itineraryId,
                email
        );

        return ResponseEntity.ok(
                "Itinerary deleted successfully"
        );
    }
}