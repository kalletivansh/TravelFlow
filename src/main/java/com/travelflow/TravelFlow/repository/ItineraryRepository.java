package com.travelflow.TravelFlow.repository;

import com.travelflow.TravelFlow.entity.Itinerary;
import com.travelflow.TravelFlow.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {

    List<Itinerary> findByTrip(Trip trip);
}