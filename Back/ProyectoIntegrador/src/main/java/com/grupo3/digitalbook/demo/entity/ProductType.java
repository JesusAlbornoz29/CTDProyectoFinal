package com.grupo3.digitalbook.demo.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "ProductType")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotBlank
    private String description;

    @NotNull
    @NotBlank
    private String extraDescription;

    @Lob
    private byte[] productTypeImage;

    @OneToMany(mappedBy = "productType")
    private List<Product> products = new ArrayList<>();


    public ProductType(String description, String extraDescription, byte[] productTypeImage) {
        this.description = description;
        this.extraDescription = extraDescription;
        this.productTypeImage = productTypeImage;
    }

}






