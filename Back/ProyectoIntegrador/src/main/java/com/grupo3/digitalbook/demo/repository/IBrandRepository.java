package com.grupo3.digitalbook.demo.repository;

import com.grupo3.digitalbook.demo.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IBrandRepository extends JpaRepository<Brand, Long> {
    Brand findByDescription(String description);
}
