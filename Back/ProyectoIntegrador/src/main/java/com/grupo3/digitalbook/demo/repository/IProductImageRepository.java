package com.grupo3.digitalbook.demo.repository;

import com.grupo3.digitalbook.demo.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductImageRepository extends JpaRepository<ProductImage, Long> {
}
