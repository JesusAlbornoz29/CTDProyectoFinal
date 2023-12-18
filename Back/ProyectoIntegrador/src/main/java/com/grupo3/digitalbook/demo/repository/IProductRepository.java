package com.grupo3.digitalbook.demo.repository;

import com.grupo3.digitalbook.demo.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product, Long> {
    boolean existsByName(String name);

    List<Product> findTop10ByOrderByIdAsc(Pageable pageable);

    List<Product> findTop20ByOrderByIdAsc(Pageable pageable);
}
