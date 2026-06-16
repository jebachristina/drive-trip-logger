package com.rove.triplogger.controller;

import com.rove.triplogger.entity.Trip;
import com.rove.triplogger.repository.TripRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/trips")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TripController {

    private final TripRepository repository;

    @GetMapping
    public List<Trip> getAllTrips() {
        return repository.findAll();
    }

    @PostMapping
    public Trip createTrip(@Valid @RequestBody Trip trip) {
        return repository.save(trip);
    }

    @GetMapping("/memorable")
    public List<Trip> getMemorableTrips() {
        return repository.findByMemorableTrue();
    }

    @GetMapping("/summary")
    public Map<String, Object> getSummary() {

        List<Trip> trips = repository.findAll();

        long totalTrips = trips.size();

        long memorableTrips = trips.stream()
                .filter(trip -> Boolean.TRUE.equals(trip.getMemorable()))
                .count();

        double totalDistance = trips.stream()
                .mapToDouble(Trip::getDistance)
                .sum();

        Map<String, Object> summary = new HashMap<>();

        summary.put("totalTrips", totalTrips);
        summary.put("memorableTrips", memorableTrips);
        summary.put("totalDistance", totalDistance);

        return summary;
    }

    @PutMapping("/{id}")
    public Trip updateTrip(
            @PathVariable Long id,
            @RequestBody Trip updatedTrip) {

        Trip trip = repository.findById(id)
                .orElseThrow();

        trip.setStartLocation(updatedTrip.getStartLocation());
        trip.setEndLocation(updatedTrip.getEndLocation());
        trip.setStartTime(updatedTrip.getStartTime());
        trip.setEndTime(updatedTrip.getEndTime());
        trip.setDistance(updatedTrip.getDistance());
        trip.setNotes(updatedTrip.getNotes());
        trip.setMemorable(updatedTrip.getMemorable());

        return repository.save(trip);
    }

    @DeleteMapping("/{id}")
    public void deleteTrip(@PathVariable Long id) {
        repository.deleteById(id);
    }
}