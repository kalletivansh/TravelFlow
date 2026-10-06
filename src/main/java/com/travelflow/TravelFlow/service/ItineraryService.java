package com.travelflow.TravelFlow.service;

import com.travelflow.TravelFlow.dto.ItineraryRequest;
import com.travelflow.TravelFlow.dto.ItineraryResponse;
import com.travelflow.TravelFlow.entity.Itinerary;
import com.travelflow.TravelFlow.entity.Trip;
import com.travelflow.TravelFlow.repository.ItineraryRepository;
import com.travelflow.TravelFlow.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItineraryService {

    private final ItineraryRepository itineraryRepository;
    private final TripRepository tripRepository;

    public ItineraryService(
            ItineraryRepository itineraryRepository,
            TripRepository tripRepository) {

        this.itineraryRepository = itineraryRepository;
        this.tripRepository = tripRepository;
    }

    // CREATE ITINERARY
    public ItineraryResponse createItinerary(
            Long tripId,
            ItineraryRequest request,
            String email) {

        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        if (!trip.getUser().getEmail().equals(email)) {
            throw new RuntimeException(
                    "You cannot add itinerary to this trip"
            );
        }

        Itinerary itinerary = new Itinerary();

        itinerary.setActivityDate(request.getActivityDate());
        itinerary.setActivityTime(request.getActivityTime());
        itinerary.setActivity(request.getActivity());
        itinerary.setLocation(request.getLocation());
        itinerary.setNotes(request.getNotes());
        itinerary.setTrip(trip);

        Itinerary savedItinerary =
                itineraryRepository.save(itinerary);

        return convertToResponse(savedItinerary);
    }

    // GET ALL ITINERARIES OF A TRIP
    public List<ItineraryResponse> getTripItineraries(
            Long tripId,
            String email) {

        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        if (!trip.getUser().getEmail().equals(email)) {
            throw new RuntimeException(
                    "You cannot view this itinerary"
            );
        }

        return itineraryRepository.findByTrip(trip)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // UPDATE ITINERARY
    public ItineraryResponse updateItinerary(
            Long itineraryId,
            ItineraryRequest request,
            String email) {

        Itinerary itinerary =
                itineraryRepository.findById(itineraryId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Itinerary not found"
                                )
                        );

        if (!itinerary.getTrip()
                .getUser()
                .getEmail()
                .equals(email)) {

            throw new RuntimeException(
                    "You cannot update this itinerary"
            );
        }

        itinerary.setActivityDate(request.getActivityDate());
        itinerary.setActivityTime(request.getActivityTime());
        itinerary.setActivity(request.getActivity());
        itinerary.setLocation(request.getLocation());
        itinerary.setNotes(request.getNotes());

        Itinerary updatedItinerary =
                itineraryRepository.save(itinerary);

        return convertToResponse(updatedItinerary);
    }

    // DELETE ITINERARY
    public void deleteItinerary(
            Long itineraryId,
            String email) {

        Itinerary itinerary =
                itineraryRepository.findById(itineraryId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Itinerary not found"
                                )
                        );

        if (!itinerary.getTrip()
                .getUser()
                .getEmail()
                .equals(email)) {

            throw new RuntimeException(
                    "You cannot delete this itinerary"
            );
        }

        itineraryRepository.delete(itinerary);
    }

    // CONVERT ENTITY TO RESPONSE DTO
    private ItineraryResponse convertToResponse(
            Itinerary itinerary) {

        return new ItineraryResponse(
                itinerary.getId(),
                itinerary.getActivityDate(),
                itinerary.getActivityTime(),
                itinerary.getActivity(),
                itinerary.getLocation(),
                itinerary.getNotes(),
                itinerary.getTrip().getId()
        );
    }
}