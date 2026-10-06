package com.travelflow.TravelFlow.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.travelflow.TravelFlow.dto.PlaceResponse;

@Service
public class PlacesService {

    @Value("${geoapify.api.key}")
    private String apiKey;

    private final RestClient restClient;

    public PlacesService() {
        this.restClient = RestClient.create();
    }

    // SEARCH DESTINATION
    public String searchDestination(String destination) {

        return restClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("https")
                        .host("api.geoapify.com")
                        .path("/v1/geocode/search")
                        .queryParam("text", destination)
                        .queryParam("format", "json")
                        .queryParam("apiKey", apiKey)
                        .build())
                .retrieve()
                .body(String.class);
    }

    // SEARCH ATTRACTIONS USING COORDINATES
    public String searchAttractions(
            double latitude,
            double longitude) {

        return restClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("https")
                        .host("api.geoapify.com")
                        .path("/v2/places")
                        .queryParam(
                                "categories",
                                "tourism.attraction"
                        )
                        .queryParam(
                                "filter",
                                "circle:" + longitude
                                        + "," + latitude
                                        + ",10000"
                        )
                        .queryParam(
                                "bias",
                                "proximity:" + longitude
                                        + "," + latitude
                        )
                        .queryParam("limit", 20)
                        .queryParam("apiKey", apiKey)
                        .build())
                .retrieve()
                .body(String.class);
    }

    // AUTOMATIC DESTINATION -> ATTRACTIONS
    @SuppressWarnings("unchecked")
    public List<PlaceResponse> searchAttractionsByDestination(
            String destination) {

        Map<String, Object> destinationData =
                restClient
                        .get()
                        .uri(uriBuilder -> uriBuilder
                                .scheme("https")
                                .host("api.geoapify.com")
                                .path("/v1/geocode/search")
                                .queryParam("text", destination)
                                .queryParam("format", "json")
                                .queryParam("apiKey", apiKey)
                                .build())
                        .retrieve()
                        .body(Map.class);

        if (destinationData == null) {
            throw new RuntimeException(
                    "Destination not found"
            );
        }

        List<Map<String, Object>> results =
                (List<Map<String, Object>>)
                        destinationData.get("results");

        if (results == null || results.isEmpty()) {
            throw new RuntimeException(
                    "Destination not found"
            );
        }

        Map<String, Object> firstResult =
                results.get(0);

        double latitude =
                ((Number) firstResult.get("lat"))
                        .doubleValue();

        double longitude =
                ((Number) firstResult.get("lon"))
                        .doubleValue();

        Map<String, Object> attractionData =
                restClient
                        .get()
                        .uri(uriBuilder -> uriBuilder
                                .scheme("https")
                                .host("api.geoapify.com")
                                .path("/v2/places")
                                .queryParam(
                                        "categories",
                                        "tourism.attraction"
                                )
                                .queryParam(
                                        "filter",
                                        "circle:"
                                                + longitude
                                                + ","
                                                + latitude
                                                + ",10000"
                                )
                                .queryParam(
                                        "bias",
                                        "proximity:"
                                                + longitude
                                                + ","
                                                + latitude
                                )
                                .queryParam("limit", 20)
                                .queryParam(
                                        "apiKey",
                                        apiKey
                                )
                                .build())
                        .retrieve()
                        .body(Map.class);

        List<PlaceResponse> places =
                new ArrayList<>();

        if (attractionData == null) {
            return places;
        }

        List<Map<String, Object>> features =
                (List<Map<String, Object>>)
                        attractionData.get("features");

        if (features == null) {
            return places;
        }

        for (Map<String, Object> feature : features) {

            Map<String, Object> properties =
                    (Map<String, Object>)
                            feature.get("properties");

            if (properties == null) {
                continue;
            }

            String name =
                    properties.get("name") != null
                            ? properties.get("name").toString()
                            : "Unnamed Attraction";

            String address =
                    properties.get("formatted") != null
                            ? properties.get("formatted").toString()
                            : "";

            Double placeLatitude = null;
            Double placeLongitude = null;

            if (properties.get("lat") instanceof Number) {
                placeLatitude =
                        ((Number) properties.get("lat"))
                                .doubleValue();
            }

            if (properties.get("lon") instanceof Number) {
                placeLongitude =
                        ((Number) properties.get("lon"))
                                .doubleValue();
            }

            places.add(
                    new PlaceResponse(
                            name,
                            address,
                            placeLatitude,
                            placeLongitude
                    )
            );
        }

        return places;
    }
}