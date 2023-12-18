package com.grupo3.digitalbook.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Reservation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    @JsonIgnoreProperties(value = {"reservations"})
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnoreProperties(value = {"password", "role", "enabled", "accountNonExpired", "accountNonLocked", "credentialsNonExpired", "authorities", "reservations"})
    private User user;

    @DateTimeFormat
    private LocalDate startDate;

    @DateTimeFormat
    private LocalDate endDate;

    private String extraData;

    @Enumerated(EnumType.STRING)
    private ReservationStatus status;

}

