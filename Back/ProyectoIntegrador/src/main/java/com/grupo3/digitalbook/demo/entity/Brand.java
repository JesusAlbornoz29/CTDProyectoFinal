package com.grupo3.digitalbook.demo.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "Brand")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotBlank
    private String description;

    @OneToMany(mappedBy = "brand")
    private List<Product> products = new ArrayList<>();


    public Brand(String description) {
        this.description = description;
    }
}

