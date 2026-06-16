package com.rove.triplogger.service;

import com.rove.triplogger.entity.Trip;
import com.rove.triplogger.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TripService {

    private final TripRepository repository;

    public Trip save(Trip trip){
        return repository.save(trip);
    }

    public List<Trip> getAllTrips(){
        return repository.findAll();
    }

    public void deleteTrip(Long id){
        repository.deleteById(id);
    }
}