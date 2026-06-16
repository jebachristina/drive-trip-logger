package com.rove.triplogger.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TripSummaryResponse {

    private Long totalTrips;

    private Double totalDistance;

    private Long memorableTrips;
}