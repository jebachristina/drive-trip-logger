package com.rove.triplogger.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TripRequest {

    @NotBlank
    private String startLocation;

    @NotBlank
    private String endLocation;

    @NotNull
    private LocalDateTime startTime;

    @NotNull
    private LocalDateTime endTime;

    @NotNull
    @Positive
    private Double distance;

    @Size(max = 500)
    private String notes;

    private Boolean memorable;
}