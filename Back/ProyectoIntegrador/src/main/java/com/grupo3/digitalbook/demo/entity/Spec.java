package com.grupo3.digitalbook.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Spec")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Spec {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotBlank
    private String description;

    @NotNull
    @NotBlank
    private String icon;

    @ManyToMany(mappedBy = "specs")
    @JsonIgnore
    private List<Product> products = new ArrayList<>();

    public Spec(String description, String icon) {
        this.description = description;
        this.icon = icon;
    }
}
