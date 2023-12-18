package com.grupo3.digitalbook.demo.service;

import com.grupo3.digitalbook.demo.entity.Reservation;
import com.grupo3.digitalbook.demo.exception.BadRequestException;
import com.grupo3.digitalbook.demo.exception.InsufficientStockException;
import com.grupo3.digitalbook.demo.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface IReservationService {
    Reservation createReservation(Reservation reservation) throws ResourceNotFoundException, BadRequestException, InsufficientStockException;

    List<Reservation> findAllReservations();

    Optional<Reservation> findReservationById(Long id) throws ResourceNotFoundException;

    Optional<List<Reservation>> listReservationByProductId(Long id) throws ResourceNotFoundException;

    Optional<List<Reservation>> listReservationByUserId(Long id) throws ResourceNotFoundException;

    Reservation editReservation(Reservation reservation) throws ResourceNotFoundException, BadRequestException, InsufficientStockException;

    void deleteReservationById(Long id) throws ResourceNotFoundException, BadRequestException;

}
