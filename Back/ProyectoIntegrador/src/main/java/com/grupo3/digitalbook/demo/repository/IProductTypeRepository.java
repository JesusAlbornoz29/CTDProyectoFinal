package com.grupo3.digitalbook.demo.repository;

import com.grupo3.digitalbook.demo.entity.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IProductTypeRepository extends JpaRepository<ProductType, Long> {
    Optional<Object> findByDescription(String description);
}

