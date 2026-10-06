package com.travelflow.TravelFlow.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class ItineraryResponse {

    private Long id;
    private LocalDate activityDate;
    private LocalTime activityTime;
    private String activity;
    private String location;
    private String notes;
    private Long tripId;

    public ItineraryResponse() {
    }

    public ItineraryResponse(
            Long id,
            LocalDate activityDate,
            LocalTime activityTime,
            String activity,
            String location,
            String notes,
            Long tripId) {

        this.id = id;
        this.activityDate = activityDate;
        this.activityTime = activityTime;
        this.activity = activity;
        this.location = location;
        this.notes = notes;
        this.tripId = tripId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getActivityDate() {
        return activityDate;
    }

    public void setActivityDate(LocalDate activityDate) {
        this.activityDate = activityDate;
    }

    public LocalTime getActivityTime() {
        return activityTime;
    }

    public void setActivityTime(LocalTime activityTime) {
        this.activityTime = activityTime;
    }

    public String getActivity() {
        return activity;
    }

    public void setActivity(String activity) {
        this.activity = activity;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Long getTripId() {
        return tripId;
    }

    public void setTripId(Long tripId) {
        this.tripId = tripId;
    }
}