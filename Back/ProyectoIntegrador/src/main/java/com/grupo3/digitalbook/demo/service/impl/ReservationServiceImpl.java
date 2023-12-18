package com.grupo3.digitalbook.demo.service.impl;

import com.grupo3.digitalbook.demo.entity.Product;
import com.grupo3.digitalbook.demo.entity.Reservation;
import com.grupo3.digitalbook.demo.entity.ReservationStatus;
import com.grupo3.digitalbook.demo.entity.User;
import com.grupo3.digitalbook.demo.exception.BadRequestException;
import com.grupo3.digitalbook.demo.exception.InsufficientStockException;
import com.grupo3.digitalbook.demo.exception.ResourceNotFoundException;
import com.grupo3.digitalbook.demo.repository.IProductRepository;
import com.grupo3.digitalbook.demo.repository.IReservationRepository;
import com.grupo3.digitalbook.demo.repository.UserRepository;
import com.grupo3.digitalbook.demo.service.IReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationServiceImpl implements IReservationService {

    @Autowired
    IReservationRepository reservationRepository;

    @Autowired
    IProductRepository productRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public Reservation createReservation(Reservation reservation) throws ResourceNotFoundException, BadRequestException, InsufficientStockException {
        Product product = productRepository.findById(reservation.getProduct().getId())
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró el producto con el ID: " + reservation.getProduct().getId()));

        if (product.getStock() < 1) {
            throw new InsufficientStockException("No hay suficiente stock del producto para realizar la reserva");
        }

        if (!isProductAvailable(reservation.getProduct(), reservation.getStartDate(), reservation.getEndDate())) {
            throw new BadRequestException("El producto ya está reservado durante el período de la nueva reserva");
        }

        if (ChronoUnit.DAYS.between(reservation.getStartDate(), reservation.getEndDate()) < 2) {
            throw new BadRequestException("La duración de la reserva debe ser de al menos 2 días");
        }
        if (reservation.getStartDate().isBefore(LocalDate.now())) {
            throw new BadRequestException("La fecha de inicio de la reserva debe ser posterior a la fecha actual");
        }
        if (reservation.getEndDate().isBefore(reservation.getStartDate())) {
            throw new BadRequestException("La fecha de fin de la reserva debe ser posterior a la fecha de inicio de la reserva");
        }
        if (reservation.getStartDate().isEqual(LocalDate.now())) {
            // Si la fecha de inicio es igual a la fecha actual, establecer el estado como ACTIVE
            reservation.setStatus(ReservationStatus.ACTIVE);
        } else {
            reservation.setStatus(ReservationStatus.valueOf("PENDING"));
        }
        reservationRepository.save(reservation);
        return reservation;
    }

    @Override
    public List<Reservation> findAllReservations() {
        List<Reservation> reservations = reservationRepository.findAll();
        System.out.println("Número total de reservas encontradas: " + reservations.size());
        return reservations;
    }

    @Override
    public Optional<Reservation> findReservationById(Long id) throws ResourceNotFoundException {
        Optional<Reservation> reservation = reservationRepository.findById(id);

        if (reservation.isPresent()) {
            return reservation;
        } else {
            throw new ResourceNotFoundException("No se encontró la reserva con el ID: " + id);
        }
    }

    @Override
    public Optional<List<Reservation>> listReservationByProductId(Long id) throws ResourceNotFoundException {
        List<Reservation> reservations = reservationRepository.findByProductId(id);

        if (reservations.isEmpty()) {
            throw new ResourceNotFoundException("No se encontraron reservas para el producto con el ID: " + id);
        }

        return Optional.of(reservations);
    }

    @Override
    public Optional<List<Reservation>> listReservationByUserId(Long id) throws ResourceNotFoundException {
        List<Reservation> reservations = reservationRepository.findByUserId(id);

        if (reservations.isEmpty()) {
            throw new ResourceNotFoundException("No se encontraron reservas para el usuario con el ID: " + id);
        }

        return Optional.of(reservations);
    }

    @Override
    public Reservation editReservation(Reservation reservation) throws ResourceNotFoundException, BadRequestException, InsufficientStockException {
        Optional<Reservation> existingReservationOptional = reservationRepository.findById(reservation.getId());

        if (existingReservationOptional.isPresent()) {
            Reservation existingReservation = existingReservationOptional.get();

            if (!isProductAvailableForEdit(existingReservation.getProduct(), existingReservation.getStartDate(), existingReservation.getEndDate(),
                    reservation.getStartDate(), reservation.getEndDate(), existingReservation.getId())) {
                throw new BadRequestException("El producto ya está reservado durante el período de la nueva reserva");
            }

            if (ChronoUnit.DAYS.between(reservation.getStartDate(), reservation.getEndDate()) < 2) {
                throw new BadRequestException("La duración de la reserva debe ser de al menos 2 días");
            }

            if (reservation.getStartDate().isBefore(LocalDate.now())) {
                throw new BadRequestException("La fecha de inicio de la reserva debe ser posterior a la fecha actual");
            }

            if (reservation.getEndDate().isBefore(reservation.getStartDate())) {
                throw new BadRequestException("La fecha de fin de la reserva debe ser posterior a la fecha de inicio de la reserva");
            }

            if (reservation.getStartDate().isEqual(LocalDate.now())) {
                // Si la fecha de inicio es igual a la fecha actual, establecer el estado como ACTIVE
                reservation.setStatus(ReservationStatus.ACTIVE);
            } else {
                reservation.setStatus(ReservationStatus.PENDING);
            }

            // Actualizar los campos de la reserva
            existingReservation.setStartDate(reservation.getStartDate());
            existingReservation.setEndDate(reservation.getEndDate());
            existingReservation.setExtraData(reservation.getExtraData());
            existingReservation.setStatus(reservation.getStatus());

            // Guardar la reserva actualizada
            reservationRepository.save(existingReservation);

            return existingReservation;
        } else {
            throw new ResourceNotFoundException("No se encontró la reserva con el ID: " + reservation.getId());
        }
    }


    private boolean isProductAvailableForEdit(Product product, LocalDate existingStartDate, LocalDate existingEndDate,
                                              LocalDate newStartDate, LocalDate newEndDate, Long reservationId) {
        List<Reservation> existingReservations = reservationRepository.findByProductId(product.getId());
        for (Reservation existingReservation : existingReservations) {

            if (!existingReservation.getId().equals(reservationId)) {
                if (existingReservation.getStartDate().isBefore(newEndDate) &&
                        existingReservation.getEndDate().isAfter(newStartDate)) {
                    return false;
                }

                // Verificar si la endDate coincide con la startDate de otra reserva existente
                if (existingReservation.getEndDate().isEqual(newStartDate)) {
                    return false;
                }

                // Verificar si la startDate coincide con la endDate de otra reserva existente
                if (existingReservation.getStartDate().isEqual(newEndDate)) {
                    return false;
                }
            }
        }
        return true;
    }

    @Override
    public void deleteReservationById(Long id) throws ResourceNotFoundException, BadRequestException {
        Optional<Reservation> reservationOptional = reservationRepository.findById(id);

        if (reservationOptional.isPresent()) {
            Reservation reservation = reservationOptional.get();

            if (reservation.getStatus() == ReservationStatus.PENDING) {
                System.out.println("Antes de la eliminación de la reserva");

                // Actualizar relaciones
                User user = reservation.getUser();
                if (user != null) {
                    user.removeReservation(reservation);
                }

                Product product = reservation.getProduct();
                if (product != null) {
                    product.removeReservation(reservation);
                }

                // Guardar cambios en las entidades asociadas
                userRepository.save(user);
                productRepository.save(product);

                // Eliminar la reserva
                reservationRepository.deleteById(id);

                System.out.println("Después de la eliminación de la reserva");
            } else {
                throw new BadRequestException("No se puede eliminar una reserva que no está en estado PENDING");
            }
        } else {
            throw new ResourceNotFoundException("No se encontró la reserva con el ID: " + id);
        }
    }


    private boolean isProductAvailable(Product product, LocalDate startDate, LocalDate endDate) {
        List<Reservation> existingReservations = reservationRepository.findByProductId(product.getId());
        for (Reservation existingReservation : existingReservations) {

            LocalDate existingStartDate = existingReservation.getStartDate();
            LocalDate existingEndDate = existingReservation.getEndDate();

            // Verificar si las fechas de la nueva reserva se superponen con las fechas de una reserva existente
            boolean overlap = startDate.isBefore(existingEndDate) && endDate.isAfter(existingStartDate);

            // Verificar si la nueva reserva tiene la misma fecha de inicio que una reserva existente
            boolean sameStartDate = startDate.isEqual(existingStartDate);

            // Verificar si la nueva reserva tiene la misma fecha de fin que una reserva existente
            boolean sameEndDate = endDate.isEqual(existingEndDate);

            if (overlap || sameStartDate || sameEndDate) {
                return false;
            }

            // Verificar si la startDate coincide con la endDate de otra reserva existente
            if (existingEndDate.isEqual(startDate)) {
                return false;
            }

            // Verificar si la endDate coincide con la startDate de otra reserva existente
            if (existingStartDate.isEqual(endDate)) {
                return false;
            }
        }
        return true;
    }

    @Scheduled(cron = "0 0 0 * * ?") // Ejecutar todos los días a la medianoche
    public void processReservations() {
        // Lógica para actualizar el estado de las reservas según la fecha actual
        LocalDate currentDate = LocalDate.now();

        List<Reservation> reservations = reservationRepository.findAll();
        for (Reservation reservation : reservations) {
            if (reservation.getStatus() == ReservationStatus.PENDING) {
                if (currentDate.isEqual(reservation.getStartDate()) || currentDate.isAfter(reservation.getStartDate())) {
                    if (currentDate.isBefore(reservation.getEndDate()) || currentDate.isEqual(reservation.getEndDate())) {
                        reservation.setStatus(ReservationStatus.ACTIVE);
                    } else if (currentDate.isAfter(reservation.getEndDate())) {
                        reservation.setStatus(ReservationStatus.FINISHED);
                    }
                } else if (currentDate.isAfter(reservation.getEndDate())) {
                    reservation.setStatus(ReservationStatus.FINISHED);
                }
                reservationRepository.save(reservation);
            }
        }

    }

    @PostConstruct
    public void initialize() throws InsufficientStockException, ResourceNotFoundException {
        processReservations();
    }
}
