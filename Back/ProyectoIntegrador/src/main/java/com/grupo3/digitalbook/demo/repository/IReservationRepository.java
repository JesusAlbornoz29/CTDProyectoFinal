package com.grupo3.digitalbook.demo.repository;

import com.grupo3.digitalbook.demo.entity.Reservation;
import com.grupo3.digitalbook.demo.exception.BadRequestException;
import com.grupo3.digitalbook.demo.exception.ResourceNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByProductId(Long id);

    List<Reservation> findByStatus(String pending);

    List<Reservation> findByUserId(Long id);


}
