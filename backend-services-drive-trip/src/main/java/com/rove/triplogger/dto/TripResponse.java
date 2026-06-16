package com.rove.triplogger.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class TripResponse {

    private Long id;

    private String startLocation;

    private String endLocation;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private Double distance;

    private String notes;

    private Boolean memorable;
}