package com.travelflow.TravelFlow.controller;

import com.travelflow.TravelFlow.dto.PlaceResponse;
import com.travelflow.TravelFlow.service.PlacesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/places")
public class PlacesController {

    private final PlacesService placesService;

    public PlacesController(PlacesService placesService) {
        this.placesService = placesService;
    }

    // SEARCH DESTINATION
    @GetMapping("/search")
    public ResponseEntity<String> searchDestination(
            @RequestParam String destination) {

        return ResponseEntity.ok(
                placesService.searchDestination(destination)
        );
    }

    // SEARCH ATTRACTIONS USING COORDINATES
    @GetMapping("/attractions")
    public ResponseEntity<String> searchAttractions(
            @RequestParam double latitude,
            @RequestParam double longitude) {

        return ResponseEntity.ok(
                placesService.searchAttractions(
                        latitude,
                        longitude
                )
        );
    }

    // SEARCH ATTRACTIONS USING ONLY DESTINATION NAME
    @GetMapping("/destination-attractions")
    public ResponseEntity<List<PlaceResponse>>
    searchAttractionsByDestination(
            @RequestParam String destination) {

        return ResponseEntity.ok(
                placesService.searchAttractionsByDestination(
                        destination
                )
        );
    }
}