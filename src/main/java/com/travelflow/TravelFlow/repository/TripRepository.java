package com.travelflow.TravelFlow.repository;

import com.travelflow.TravelFlow.entity.Trip;
import com.travelflow.TravelFlow.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {

    List<Trip> findByUser(User user);
}