package com.grupo3.digitalbook.demo.controller;

import com.grupo3.digitalbook.demo.entity.Reservation;
import com.grupo3.digitalbook.demo.exception.BadRequestException;
import com.grupo3.digitalbook.demo.exception.InsufficientStockException;
import com.grupo3.digitalbook.demo.exception.ResourceNotFoundException;
import com.grupo3.digitalbook.demo.service.IReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private IReservationService reservationService;

    @PostMapping("/create")
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation) {
        try {
            Reservation createdReservation = reservationService.createReservation(reservation);
            return new ResponseEntity<>(createdReservation, HttpStatus.CREATED);
        } catch (ResourceNotFoundException | BadRequestException | InsufficientStockException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<List<Reservation>> getAllReservations() {
        List<Reservation> reservations = reservationService.findAllReservations();
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Reservation> reservation = reservationService.findReservationById(id);
        return reservation.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<List<Reservation>> getReservationsByProductId(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<List<Reservation>> reservations = reservationService.listReservationByProductId(id);
        return reservations.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Reservation>> getReservationsByUserId(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<List<Reservation>> reservations = reservationService.listReservationByUserId(id);
        return reservations.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reservation> editReservation(@PathVariable Long id, @RequestBody Reservation reservation) {
        try {
            reservation.setId(id);
            Reservation editedReservation = reservationService.editReservation(reservation);
            return new ResponseEntity<>(editedReservation, HttpStatus.OK);
        } catch (ResourceNotFoundException | BadRequestException | InsufficientStockException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        try {
            reservationService.deleteReservationById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (BadRequestException e) {
            throw new RuntimeException(e);
        }
    }
}
