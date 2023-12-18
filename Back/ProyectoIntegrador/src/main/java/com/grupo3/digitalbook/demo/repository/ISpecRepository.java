package com.grupo3.digitalbook.demo.repository;

import com.grupo3.digitalbook.demo.entity.Spec;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ISpecRepository extends JpaRepository<Spec, Long> {
}
