package com.rove.triplogger.repository;

import com.rove.triplogger.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {

    List<Trip> findByMemorableTrue();
}