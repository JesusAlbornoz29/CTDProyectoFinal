package com.grupo3.digitalbook.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @NotNull
    @NotBlank
    private String name;

    @NotNull
    @NotBlank
    private Integer price;

    @Lob
    @Column(columnDefinition = "text")
    @NotNull
    @NotBlank
    private String description;


    @NotBlank
    private Integer stock;

    @ManyToOne
    @JoinColumn(name = "productType_id", referencedColumnName = "id")
    @JsonIgnoreProperties(value = {"products", "productTypeImage"})
    private ProductType productType;

    @ManyToOne
    @JoinColumn(name = "brand_id", referencedColumnName = "id")
    @JsonIgnoreProperties("products")
    private Brand brand;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "product_spec",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "specs_id"))
    private Set<Spec> specs;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<ProductImage> productImages;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Reservation> reservations;


    public void removeReservation(Reservation reservation) {
        reservations.remove(reservation);
        reservation.setProduct(null);
    }
}
